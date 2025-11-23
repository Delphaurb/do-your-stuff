import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, addDays, parseISO, isWithinInterval, getDate } from 'date-fns';

function Calendar() {
    const { theme } = useTheme();
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const handleDayClick = (date) => {
        setSelectedDate(date);
    };

    const handleSaveEvent = (data) => {
        if (selectedDate) {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');

            // Check if event exists for this date to update it, or create new
            const existingEvent = events.find(e => e.date === dateStr && !e.recurring); // Simple check for single day events

            if (existingEvent) {
                updateEvent(existingEvent.id, data);
            } else {
                addEvent({
                    id: Date.now(),
                    date: dateStr,
                    ...data
                });
            }
            setSelectedDate(null);
        }
    };

    const getEventForDay = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');

        // 1. Check for exact date match
        const exactMatch = events.find(e => e.date === dayKey);
        if (exactMatch) return exactMatch;

        // 2. Check for multi-day and recurring
        for (const event of events) {
            if (!event.date) continue;

            // Multi-day
            if (event.endDate && event.endDate !== event.date) {
                const start = parseISO(event.date);
                const end = parseISO(event.endDate);
                if (isWithinInterval(day, { start, end })) {
                    return { ...event, isMultiDay: true, isStart: isSameDay(day, start) };
                }
            }

            // Recurring
            if (event.recurring && event.recurring !== 'none') {
                const start = parseISO(event.date);
                if (day >= start) {
                    if (event.recurring === 'weekly' && day.getDay() === start.getDay()) {
                        return { ...event, isRecurring: true };
                    }
                    if (event.recurring === 'monthly' && getDate(day) === getDate(start)) {
                        return { ...event, isRecurring: true };
                    }
                }
            }
        }
        return null;
    };

    // Helper to get initial data for modal
    const getInitialModalData = (date) => {
        const dayKey = format(date, 'yyyy-MM-dd');
        return events.find(e => e.date === dayKey) || {};
    };

    return (
        <div className="p-4 pt-24 md:p-10 md:pt-24 min-h-screen font-sans" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
            <div className="flex justify-between items-center max-w-full md:max-w-[900px] mx-auto mb-6 md:mb-8">
                <button onClick={prevMonth} className="bg-transparent border-none text-2xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity" style={{ color: theme.colors.text }}>&lt;</button>
                <h1 className="text-xl md:text-2xl font-bold" style={{ color: theme.colors.text }}>{format(currentMonth, "MMMM yyyy")}</h1>
                <button onClick={nextMonth} className="bg-transparent border-none text-2xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity" style={{ color: theme.colors.text }}>&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-[1px] max-w-full md:max-w-[900px] mx-auto bg-black/5 border border-black/5 rounded-xl overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold p-2 md:p-4 text-xs md:text-sm opacity-80" style={{ backgroundColor: theme.colors.surface, color: theme.colors.text }}>{day}</div>
                ))}

                {allDays.map((day, index) => {
                    const event = getEventForDay(day);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => handleDayClick(day)}
                            className="h-16 md:h-[120px] p-2 md:p-3 cursor-pointer relative transition-colors"
                            style={{
                                backgroundColor: theme.colors.surface,
                                opacity: isCurrentMonth ? 1 : 0.4,
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isCurrentMonth ? 'rgba(0,0,0,0.02)' : theme.colors.surface)}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.colors.surface)}
                        >
                            <div
                                className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full mb-1 md:mb-2 text-xs md:text-sm"
                                style={{
                                    fontWeight: isToday ? '700' : '500',
                                    backgroundColor: isToday ? theme.colors.primary : 'transparent',
                                    color: isToday ? '#fff' : 'inherit',
                                }}
                            >
                                {format(day, dateFormat)}
                            </div>

                            {event && (
                                <div
                                    className="text-[0.6rem] md:text-xs text-white px-1 md:px-2 py-1 rounded whitespace-nowrap overflow-hidden text-ellipsis shadow-sm font-medium"
                                    style={{
                                        backgroundColor: event.color || theme.colors.primary,
                                    }}
                                >
                                    {event.isRecurring && <span className="opacity-80 mr-1">↻</span>}
                                    {event.description || 'Event'}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <DayModal
                    date={selectedDate}
                    initialData={getInitialModalData(selectedDate)}
                    onClose={() => setSelectedDate(null)}
                    onSave={handleSaveEvent}
                    theme={theme}
                />
            )}
        </div>
    );
}

function DayModal({ date, initialData, onClose, onSave, theme }) {
    const [color, setColor] = useState(initialData.color || '#1e88e5');
    const [description, setDescription] = useState(initialData.description || '');
    const [endDate, setEndDate] = useState(initialData.endDate || format(date, 'yyyy-MM-dd'));
    const [recurring, setRecurring] = useState(initialData.recurring || 'none');

    const colors = [
        '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#303f9f',
        '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c',
        '#689f38', '#afb42b', '#fbc02d', '#ffa000', '#f57c00',
        '#e64a19', '#5d4037', '#616161', '#455a64'
    ];

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                backgroundColor: theme.colors.surface, padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '450px',
                color: theme.colors.text, boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '700' }}>Edit {format(date, 'MMM d, yyyy')}</h2>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '0.9rem' }}>Color Label</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {colors.map(c => (
                            <div
                                key={c}
                                onClick={() => setColor(c)}
                                style={{
                                    width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c,
                                    cursor: 'pointer', border: color === c ? `2px solid ${theme.colors.text}` : '2px solid transparent',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.1s'
                                }}
                                onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '0.9rem' }}>Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{
                            width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px',
                            border: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'rgba(255,255,255,0.5)', outline: 'none',
                            fontFamily: 'Inter, sans-serif', color: theme.colors.text, fontSize: '0.95rem'
                        }}
                        placeholder="Add event details..."
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            min={format(date, 'yyyy-MM-dd')}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Recurring</label>
                        <select
                            value={recurring}
                            onChange={e => setRecurring(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}
                        >
                            <option value="none">None</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ padding: '10px 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: theme.colors.text, fontWeight: '600' }}>Cancel</button>
                    <button onClick={() => onSave({ color, description, endDate, recurring })} style={{
                        padding: '10px 24px', border: 'none', borderRadius: '8px',
                        backgroundColor: theme.colors.primary, color: '#fff', cursor: 'pointer', fontWeight: '600',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>Save Event</button>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
