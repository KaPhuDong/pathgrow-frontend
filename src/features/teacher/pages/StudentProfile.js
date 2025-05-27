import React, { useEffect, useState, useRef } from 'react';

import Main2 from './Main2';

import avatar from '../../../assets/images/avatar.png';
import banner from '../../../assets/images/banner.png';
import classroom from '../../../assets/images/classroom.png';
import msNhan from '../../../assets/images/msNhan.png';
import msTrang from '../../../assets/images/msTrang.png';
import msUyen from '../../../assets/images/msUyen.png';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
            style={{
              width: '100%',
              padding: 6,
              marginTop: 4,
              marginBottom: 12,
            }}
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
                  border:
                    selectedColor === color.value
                      ? '3px solid #000'
                      : '1px solid #ccc',
                }}
              />
            ))}
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
        top: position.y,
        left: position.x,
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

// Achievements
const AchievementList = ({ achievements }) => {
  return (
    <div
      className="achievement-wrapper"
      style={{ marginTop: '20px', flexDirection: 'column' }}
    >
      <Link
        to="/student/achievements"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <h3>Achievements</h3>
      </Link>
      {achievements.length === 0 ? (
        <p>No achievements yet.</p>
      ) : (
        <div
          className="achievement-list"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}
        >
          {achievements.slice(0, 3).map((ach) => (
            <div
              className="achievement-card"
              key={ach.id}
              style={{
                width: '350px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div className="achievement-image">
                <img
                  src={ach.image_url}
                  alt="achievement"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="achievement-info" style={{ padding: '10px' }}>
                <h4 className="achievement-title">
                  <strong>{ach.title}</strong>
                </h4>
                <p className="achievement-description">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StudentProfile = () => {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const fetchEvents = async () => {
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
    }
  };

  //Achievements
  const fetchAchievements = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/achievements', {
        headers: getAuthHeader(),
      });
      setAchievements(res.data.achievements);
    } catch (err) {
      console.error('Error fetching achievements:', err);
    }
  };
  useEffect(() => {
    fetchEvents();
    fetchAchievements();
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
    <Main2>
      <div className="content-body">
        <div className="content-header">
          <div className="content-info container">
            <div className="profile">
              <div className="profile-info">
                <p className="message">
                  "Learning is a never-ending journey—every step forward builds
                  a brighter future!"
                </p>
              </div>
              <div className="img-profile">
                <img src={banner} alt="banner" />
              </div>
            </div>
          </div>
        </div>

        <div className="content-description">
          {/* Calendar */}
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
                slotMaxTime="12:00:00"
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
          {/* Classes */}
          <div className="class-objects container">
            <div className="class-icon">
              <img src={classroom} className="icon-class"></img>
              <span className="class-name">Class</span>
            </div>
            <div className="class-description">
              <a href="/study/plans" className="class-card">
                <div className="card-header">
                  <div className="card-header">
                    <h3>PNV26B - TOEIC1</h3>
                    <p>Lê Nguyễn Phúc Nhân</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msNhan} alt="Teacher" />
                  </div>
                </div>
              </a>
              <a href="/study/plans" className="class-card">
                <div
                  className="card-header"
                  style={{ backgroundColor: '#D9D9D9' }}
                >
                  <div className="card-header">
                    <h3>IT English 1</h3>
                    <p>Uyên Trần</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msUyen} alt="Teacher" />
                  </div>
                </div>
              </a>
              <a href="/study/plans" className="class-card">
                <div
                  className="card-header"
                  style={{ backgroundColor: '#FA009E' }}
                >
                  <div className="card-header">
                    <h3>PNV26B - TOEIC1</h3>
                    <p>Comunication English</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msTrang} alt="Teacher" />
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* Achievement */}
          <div className="student-achievement-into-profile container">
            <AchievementList achievements={achievements} />
          </div>
        </div>
      </div>
    </Main2>
  );
};

export default StudentProfile;
