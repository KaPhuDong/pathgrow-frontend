import React, { useEffect, useState, useRef, use } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import axios from 'axios';
import api from '../../../api/teacher/api';
import Main1 from './Main1';
import Loading from '../../../components/ui/Loading';

const AddEvent = ({ datetime, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [studentOptions, setStudentOptions] = useState([]);
  const [reminder, setReminder] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const initialized = useRef(false);

  const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginTop: 4,
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.fetchClasses();
        setClassOptions(res); // giả sử res là mảng [{ id, name }]
      } catch (err) {
        console.error('Error fetching class list:', err);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchStudentsByClass = async () => {
      try {
        const res = await api.fetchStudentsByClass(selectedClass);

        setStudentOptions(res.data); // giả sử res.data là mảng [{ id, name }]
      } catch (err) {
        console.error('Error fetching student list:', err);
      }
    };

    fetchStudentsByClass();
  }, [selectedClass]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newEvent = {
      student_id: selectedStudent === 'all' ? null : selectedStudent,
      title,
      description,
      class_id: selectedClass === 'all' ? null : selectedClass,
      reminder,
      start: new Date(datetime.start).toISOString(),
      end: new Date(datetime.end).toISOString(),
    };

    onAdd(newEvent);
  };

  const startDate = new Date(datetime.start);
  const endDate = new Date(datetime.end);

  return (
    <div
      className="event-form"
      style={{
        background: '#e6f4ec',
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: 600,
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
                placeholder="Enter Title"
                required
              />
            </div>

            <div style={{ marginBottom: 12 }}>
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
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Add Reminder</label>
              <input
                type="text"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                style={inputStyle}
                placeholder="e.g., 1 hour before"
              />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 250 }}>
            <div style={{ marginBottom: 12 }}>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle}
                placeholder="Enter description"
                required
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                style={inputStyle}
              >
                <option value="all">All Students</option>
                {studentOptions.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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

const TeacherSchedule = () => {
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
      const res = await api.getTeacherCalendar();
      if (!res || !res.data) {
        console.error('No data returned from API');
        return;
      }

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

  const dayOfWeekNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const addEvent = async (newEvent) => {
    setIsLoading(true);
    try {
      // Lấy thông tin ngày, thời gian từ newEvent.start và newEvent.end
      const startDateTime = new Date(newEvent.start);
      const endDateTime = new Date(newEvent.end);

      const dayOfWeek = dayOfWeekNames[startDateTime.getDay()]; // Chuyển số thành chuỗi tên ngày
      const date = startDateTime.toISOString().split('T')[0]; // yyyy-mm-dd
      const start_time = startDateTime.toTimeString().split(' ')[0]; // HH:mm:ss
      const end_time = endDateTime.toTimeString().split(' ')[0]; // HH:mm:ss

      // Tạo payload gửi lên backend
      const payload = {
        student_id: newEvent.student_id || null,
        title: newEvent.title || '',
        description: newEvent.description,
        class_id: newEvent.class_id,
        day_of_week: dayOfWeek,
        date,
        start_time,
        end_time,
        reminder: newEvent.reminder || '',
        color: newEvent.color || '#cfe9ff',
      };

      const res = await api.addEvent(payload);
      const savedEvent = res;

      // Thêm vào events state
      setEvents((prev) => [
        ...prev,
        {
          id: String(savedEvent.id),
          title: savedEvent.title,
          start: `${savedEvent.date}T${savedEvent.start_time}`,
          end: `${savedEvent.date}T${savedEvent.end_time}`,
          backgroundColor: savedEvent.color || '#cfe9ff',
        },
      ]);

      setSelectedRange(null);
      setFormPosition(null);
    } catch (err) {
      console.error('Error adding event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (clickInfo) => {
    setDeleteInfo({
      eventInfo: clickInfo.event,
      position: { x: clickInfo.jsEvent.pageX, y: clickInfo.jsEvent.pageY },
    });
    setSelectedRange(null);
    setFormPosition(null);
  };

  const confirmDelete = async (eventInfo) => {
    setIsLoading(true);
    try {
      await api.deleteEvent(eventInfo.id);

      setEvents((prev) => prev.filter((ev) => ev.id !== eventInfo.id));
      setDeleteInfo(null);
    } catch (err) {
      console.error('Error deleting event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Main1>
      <div
        className="calendar-wrapper"
        style={{ minHeight: '700px', display: 'flex', gap: '20px' }}
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
              onCancel={() => {
                setSelectedRange(null);
                setFormPosition(null);
              }}
            />
          )}

          {deleteInfo && (
            <DeleteEvent
              eventInfo={deleteInfo.eventInfo}
              position={deleteInfo.position}
              onConfirm={confirmDelete}
              onCancel={() => setDeleteInfo(null)}
            />
          )}
        </div>
      </div>
      {isLoading && <Loading />}
    </Main1>
  );
};

export default TeacherSchedule;
