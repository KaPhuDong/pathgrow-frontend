import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Main from './Main';

// 🎨 Màu preset cho sự kiện
const presetColors = [
  { name: 'Blue', value: '#cfe9ff' },
  { name: 'Orange', value: '#ffe5cc' },
  { name: 'Purple', value: '#e6ccff' },
  { name: 'Green', value: '#d9f2d9' },
  { name: 'Pink', value: '#ffccf2' },
  { name: 'Yellow', value: '#ffffcc' }
];

// 🧩 Form thêm sự kiện
const AddEvent = ({ datetime, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(presetColors[0].value);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setSelectedColor(presetColors[0].value);
      initialized.current = true;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newEvent = {
      title,
      start: new Date(datetime.start).toISOString(),
      end: new Date(datetime.end).toISOString(),
      color: selectedColor,
    };

    onAdd(newEvent);
  };

  const startDate = new Date(datetime.start);
  const endDate = new Date(datetime.end);

  return (
    <div className="event-form" style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 0 8px rgba(0,0,0,0.15)', width: 300 }}>
      <h3>Add Event</h3>
      <p><strong>From:</strong> {startDate.toLocaleString()}</p>
      <p><strong>To:</strong> {endDate.toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
            style={{ width: '100%', padding: 6, marginTop: 4, marginBottom: 12 }}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Choose Color:</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {presetColors.map((color) => (
              <div
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
                style={{
                  backgroundColor: color.value,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: selectedColor === color.value ? '3px solid #000' : '1px solid #ccc',
                }}
              />
            ))}
          </div>
        </div>

        <div className="form-buttons" style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" onClick={onCancel} style={{ padding: '6px 12px' }}>Cancel</button>
          <button type="submit" style={{ padding: '6px 12px' }}>Add</button>
        </div>
      </form>
    </div>
  );
};

// 🗑️ Form xác nhận xóa sự kiện
const DeleteEvent = ({ eventInfo, onConfirm, onCancel, position }) => {
  if (!eventInfo || !position) return null;

  return (
    <div
      className="delete-modal"
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 10000,
        width: 260,
        maxWidth: '90vw',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-event-title"
    >
      <p id="delete-event-title" style={{ marginBottom: '12px' }}>
        Do you want to delete event: <strong>{eventInfo.title}</strong>?
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onCancel} type="button" style={{ padding: '6px 12px' }}>Cancel</button>
        <button onClick={() => onConfirm(eventInfo)} type="button" style={{ padding: '6px 12px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: 4 }}>Delete</button>
      </div>
    </div>
  );
};

// 📅 Component chính StudentSchedule
const StudentSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);

  // Lấy header Authorization nếu cần
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  // Lấy sự kiện từ API
  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/student-calendar', {
        headers: getAuthHeader(),
        withCredentials: true,
      });

      // Map dữ liệu API về dạng FullCalendar
      const formatted = res.data.map((e) => ({
        id: String(e.id),
        title: e.title,
        start: `${e.date}T${e.start_time}`,
        end: `${e.date}T${e.end_time}`,
        backgroundColor: e.color || '#cfe9ff',
      }));

      setEvents(formatted);
    } catch (err) {
      console.error('Error fetching study plans:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Khi chọn vùng thời gian trên lịch (kéo chuột chọn)
  const handleSelect = (selectInfo) => {
    const { jsEvent } = selectInfo;
    setDeleteInfo(null);
    setFormPosition({ x: jsEvent.pageX, y: jsEvent.pageY });
    setSelectedRange({ start: selectInfo.start, end: selectInfo.end });
  };

  // Khi click vào ngày trên lịch sidebar nhỏ
  const handleDateClick = (arg) => {
    setDeleteInfo(null);
    setFormPosition({ x: arg.jsEvent.pageX, y: arg.jsEvent.pageY });
    setSelectedRange({ start: arg.date, end: arg.date });
  };

  // Thêm event mới lên API và fetch lại events
  const addEvent = async (newEvent) => {
    try {
      const startDate = new Date(newEvent.start);
      const endDate = new Date(newEvent.end);

      const date = startDate.toISOString().split('T')[0];
      const start_time = startDate.toTimeString().split(' ')[0];
      const end_time = endDate.toTimeString().split(' ')[0];

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day_of_week = days[startDate.getDay()];

      const payload = {
        title: newEvent.title,
        day_of_week,
        date,
        start_time,
        end_time,
        color: newEvent.color,
      };

      await axios.post('http://localhost:8000/api/student-calendar', payload, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      await fetchEvents();
      setSelectedRange(null);
    } catch (error) {
      if (error.response) {
        console.error('API error response:', error.response.data);
      } else {
        console.error('Failed to add event:', error.message);
      }
    }
  };

  const cancelAdd = () => setSelectedRange(null);

  // Click event để xóa
  const handleEventClick = (clickInfo) => {
    const { jsEvent, event } = clickInfo;
    setSelectedRange(null);
    setFormPosition(null);
    setDeleteInfo({
      event,
      position: { x: jsEvent.pageX, y: jsEvent.pageY },
    });
  };

  // Xác nhận xóa event trên API
  const confirmDelete = async (eventInfo) => {
    const id = String(eventInfo.id);
    try {
      await axios.delete(`http://localhost:8000/api/student-calendar/${id}`, {
        headers: getAuthHeader(),
        withCredentials: true,
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteInfo(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const cancelDelete = () => setDeleteInfo(null);

  return (
    <Main>
      <div className="calendar-wrapper" style={{ position: 'relative', minHeight: '700px', display: 'flex', gap: '20px' }}>
        {/* Sidebar lịch tháng nhỏ */}
        <div className="calendar-sidebar" style={{ width: '280px' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            initialDate="2025-05-15"
            headerToolbar={{ left: 'title', right: 'prev,next' }}
            height="auto"
            selectable={true}
            dateClick={handleDateClick}
            dayHeaderFormat={{ weekday: 'narrow' }}
            className="mini-calendar"
          />
        </div>

        {/* Lịch tuần chính */}
        <div className="calendar-main" style={{ flexGrow: 1, position: 'relative' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            initialDate="2025-05-15"
            headerToolbar={{ start: 'prev,today,next', center: 'title', end: '' }}
            events={events}
            allDaySlot={false}
            slotMinTime="07:00:00"
            slotMaxTime="19:00:00"
            height="auto"
            selectable={true}
            select={handleSelect}
            eventClick={handleEventClick}
            className="weekly-calendar"
          />

          {/* Form thêm sự kiện */}
          {selectedRange && formPosition && (
            <div
              style={{
                position: 'absolute',
                left: formPosition.x - 310,
                top: formPosition.y,
                zIndex: 1000,
              }}
            >
              <AddEvent
                datetime={selectedRange}
                onAdd={addEvent}
                onCancel={cancelAdd}
              />
            </div>
          )}

          {/* Form xác nhận xóa sự kiện */}
          {deleteInfo && (
            <DeleteEvent
              eventInfo={deleteInfo.event}
              position={deleteInfo.position}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </div>
    </Main>
  );
};

export default StudentSchedule;
