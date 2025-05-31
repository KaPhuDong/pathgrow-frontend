import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Main from './Main';
import Loading from '../../../components/ui/Loading';

const presetColors = [
  { name: 'Green', value: '#d9f2d9' },
  { name: 'Pink', value: '#ffccf2' },
  { name: 'Yellow', value: '#ffffcc' },
  { name: 'Blue', value: '#cfe9ff' },
  { name: 'Orange', value: '#ffe5cc' },
  { name: 'Purple', value: '#e6ccff' },
];

const AddEvent = ({ datetime, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(presetColors[0].value);
  const initialized = useRef(false);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginTop: 4,
  };

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
    <div
      className="event-form"
      style={{
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 0 8px rgba(0,0,0,0.15)',
        width: 300,
        position: 'absolute',
        zIndex: 10,
        top: 100,
        left: 100,
      }}
    >
      <h3>Add Event</h3>
      <p>
        <strong>From:</strong> {startDate.toLocaleString()}
      </p>
      <p>
        <strong>To:</strong> {endDate.toLocaleString()}
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <div style={{ marginBottom: 12 }}>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            {/* <div style={{ marginBottom: 12 }}>
                            <label>Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                style={inputStyle}
                            >
                                <option value="all">All Classes</option>
                                {classOptions.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}

            {/* <div style={{ marginBottom: 12 }}>
                            <label>Add Reminder</label>
                            <input
                                type="text"
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                                style={inputStyle}
                                placeholder="e.g., 1 hour before"
                            />
                        </div> */}
          </div>

          {/* <div style={{ flex: 1, minWidth: 250 }}>
                        <div style={{ marginBottom: 12 }}>
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={inputStyle}
                                placeholder="Enter description"
                            />
                        </div>

                        <div style={{ marginBottom: 12 }}>
                            <label>Student</label>
                            <select disabled style={inputStyle}>
                                <option>All students</option>
                            </select>
                        </div>
                    </div> */}
        </div>

        <div
          className="form-buttons"
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '6px 12px' }}
          >
            Cancel
          </button>
          <button type="submit" style={{ padding: '6px 12px' }}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteEvent = ({ eventInfo, onConfirm, onCancel, position }) => {
  if (!eventInfo || !position) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y - 80,
        left: position.x - 500,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 10,
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
        <button
          onClick={onCancel}
          type="button"
          style={{ padding: '6px 12px' }}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(eventInfo)}
          type="button"
          style={{
            padding: '6px 12px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const StudentSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        'http://localhost:8000/api/student-calendar',
        {
          headers: getAuthHeader(),
          withCredentials: true,
        }
      );

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelect = (selectInfo) => {
    const { jsEvent } = selectInfo;
    setDeleteInfo(null);
    setFormPosition({ x: jsEvent.pageX, y: jsEvent.pageY });
    setSelectedRange({ start: selectInfo.start, end: selectInfo.end });
  };

  const handleDateClick = (arg) => {
    setDeleteInfo(null);
    setFormPosition({ x: arg.jsEvent.pageX, y: arg.jsEvent.pageY });
    setSelectedRange({ start: arg.date, end: arg.date });
  };

  const addEvent = async (newEvent) => {
    setIsLoading(true);
    try {
      const startDate = new Date(newEvent.start);
      const endDate = new Date(newEvent.end);

      const date = startDate.toISOString().split('T')[0];
      const start_time = startDate.toTimeString().split(' ')[0];
      const end_time = endDate.toTimeString().split(' ')[0];

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
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
      console.error('Failed to add event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAdd = () => setSelectedRange(null);

  const handleEventClick = (clickInfo) => {
    const { jsEvent, event } = clickInfo;
    setSelectedRange(null);
    setFormPosition(null);
    setDeleteInfo({ event, position: { x: jsEvent.pageX, y: jsEvent.pageY } });
  };

  const confirmDelete = async (eventInfo) => {
    const id = String(eventInfo.id);
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/student-calendar/${id}`, {
        headers: getAuthHeader(),
        withCredentials: true,
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteInfo(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDelete = () => setDeleteInfo(null);

  return (
    <Main>
      <div
        className="calendar-wrapper"
        style={{
          position: 'relative',
          minHeight: '700px',
          display: 'flex',
          gap: '20px',
        }}
      >
        <div style={{ width: '280px' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            initialDate="2025-05-15"
            headerToolbar={{ left: 'title', right: 'prev,next' }}
            height="auto"
            selectable={true}
            dateClick={handleDateClick}
            dayHeaderFormat={{ weekday: 'narrow' }}
          />
        </div>

        <div style={{ flexGrow: 1, position: 'relative' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            initialDate="2025-05-15"
            headerToolbar={{
              start: 'prev,today,next',
              center: 'title',
              end: '',
            }}
            events={events}
            allDaySlot={false}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            height="auto"
            selectable={true}
            select={handleSelect}
            eventClick={handleEventClick}
          />

          {selectedRange && formPosition && (
            <AddEvent
              datetime={selectedRange}
              onAdd={addEvent}
              onCancel={cancelAdd}
            />
          )}

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
      {isLoading && <Loading />}
    </Main>
  );
};

export default StudentSchedule;
