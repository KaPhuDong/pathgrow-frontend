import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Main from './Main';

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
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [selectedStudent, setSelectedStudent] = useState('All students');
    const [reminder, setReminder] = useState('');

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
                background: '#e6f4ec',
                padding: 20,
                borderRadius: 12,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                width: 350,
                position: 'absolute',
                zIndex: 10000,
                top: 100,
                left: 100,
            }}
        >
            <h3 style={{ color: '#00bfa6', marginBottom: 20 }}>Set Schedule</h3>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Enter deadline title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    >
                        <option>All Classes</option>
                        {/* thêm option khác nếu cần */}
                    </select>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Student</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    >
                        <option>All students</option>
                        {/* thêm option khác nếu cần */}
                    </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <label>Add Reminder</label>
                    <input
                        type="text"
                        placeholder="1 hour before"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginTop: 4,
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            backgroundColor: '#00bfa6',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#00bfa6',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Set Deadline
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

const TeacherSchedule = () => {
    const [events, setEvents] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [formPosition, setFormPosition] = useState(null);
    const [deleteInfo, setDeleteInfo] = useState(null);

    const getAuthHeader = () => ({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/student-calendar', {
                headers: getAuthHeader(),
                withCredentials: true,
            });

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
        <Main>
            <div className="calendar-wrapper" style={{ position: 'relative', minHeight: '700px', display: 'flex', gap: '20px' }}>
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
                        headerToolbar={{ start: 'prev,today,next', center: 'title', end: '' }}
                        events={events}
                        allDaySlot={false}
                        slotMinTime="00:00:00"
                        slotMaxTime="24:00:00"
                        selectable={true}
                        select={handleSelect}
                        eventClick={handleEventClick}
                    />
                    {selectedRange && (
                        <AddEvent datetime={selectedRange} onAdd={addEvent} onCancel={cancelAdd} />
                    )}
                    {deleteInfo && (
                        <DeleteEvent
                            eventInfo={deleteInfo.event}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                            position={deleteInfo.position}
                        />
                    )}
                </div>
            </div>
        </Main>
    );
};

export default TeacherSchedule;
