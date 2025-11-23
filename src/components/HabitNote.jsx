import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaPalette } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useData, noteColors } from "../context/DataContext";

function HabitNote({ id, title, habits, color, onUpdate, onDelete }) {
    const { theme } = useTheme();
    const [hovered, setHovered] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const pickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleTitleChange = (e) => {
        onUpdate(id, { title: e.target.value });
    };

    const addHabit = () => {
        const newHabit = {
            id: Date.now(),
            text: "",
            days: [0, 0, 0, 0, 0, 0, 0],
        };
        onUpdate(id, { habits: [...habits, newHabit] });
    };

    const updateHabitText = (habitId, text) => {
        const updated = habits.map((h) =>
            h.id === habitId ? { ...h, text } : h
        );
        onUpdate(id, { habits: updated });
    };

    const cycleColor = (habitId, dayIndex) => {
        const updated = habits.map((h) => {
            if (h.id === habitId) {
                const newDays = [...h.days];
                newDays[dayIndex] = (newDays[dayIndex] + 1) % 4;
                return { ...h, days: newDays };
            }
            return h;
        });
        onUpdate(id, { habits: updated });
    };

    const deleteHabit = (habitId) => {
        const updated = habits.filter((h) => h.id !== habitId);
        onUpdate(id, { habits: updated });
    };

    const handleColorSelect = (newColor) => {
        onUpdate(id, { color: newColor });
        setShowColorPicker(false);
    };

    const getColor = (status) => {
        switch (status) {
            case 1: return '#ef5350'; // Red
            case 2: return '#66bb6a'; // Green
            case 3: return '#fdd835'; // Yellow
            default: return 'rgba(0,0,0,0.05)'; // Subtle gray for empty
        }
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-full md:w-[460px] min-h-[320px] rounded-xl p-6 shadow-md relative flex flex-col transition-all duration-200"
            style={{
                backgroundColor: color || theme.colors.noteHabit,
                color: theme.colors.text,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '20px' }}>
                <input
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Habit Tracker"
                    style={{
                        border: "none",
                        background: "transparent",
                        fontWeight: "700",
                        fontSize: "1.25rem",
                        outline: "none",
                        width: "70%",
                        color: theme.colors.text,
                        fontFamily: 'Inter, sans-serif'
                    }}
                />
                <div style={{ display: 'flex', gap: '8px', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', position: 'relative' }}>
                    <div
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        style={{
                            cursor: "pointer",
                            color: theme.colors.text,
                            opacity: 0.5,
                            padding: '4px',
                            transition: 'opacity 0.2s'
                        }}
                        title="Change Color"
                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                        onMouseOut={e => e.currentTarget.style.opacity = 0.5}
                    >
                        <FaPalette size={14} />
                    </div>
                    <div
                        onClick={() => onDelete(id)}
                        style={{
                            cursor: "pointer",
                            color: theme.colors.text,
                            opacity: 0.5,
                            padding: '4px',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                        onMouseOut={e => e.currentTarget.style.opacity = 0.5}
                    >
                        <FaTrash size={14} />
                    </div>

                    {/* Color Picker Popover */}
                    {showColorPicker && (
                        <div
                            ref={pickerRef}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: theme.colors.surface,
                                padding: '10px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                zIndex: 10,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '8px',
                                width: '140px',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        >
                            {noteColors.map(c => (
                                <div
                                    key={c}
                                    onClick={() => handleColorSelect(c)}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: c,
                                        cursor: 'pointer',
                                        border: color === c ? '2px solid #333' : '1px solid rgba(0,0,0,0.1)',
                                        transition: 'transform 0.1s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Days Header */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginBottom: '12px', paddingRight: '2px' }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} style={{ width: '28px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', opacity: 0.6 }}>{d}</div>
                ))}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {habits.map((habit) => (
                    <div key={habit.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginRight: '16px' }}>
                            <input
                                value={habit.text}
                                onChange={(e) => updateHabitText(habit.id, e.target.value)}
                                placeholder="Habit name..."
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    width: "100%",
                                    fontSize: "0.95rem",
                                    color: theme.colors.text,
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            />
                            {hovered && (
                                <FaTrash
                                    onClick={() => deleteHabit(habit.id)}
                                    style={{
                                        cursor: "pointer",
                                        color: theme.colors.text,
                                        fontSize: '0.8rem',
                                        opacity: 0.3,
                                        marginLeft: '8px'
                                    }}
                                />
                            )}
                        </div>
                        <div style={{ display: "flex", gap: "6px" }}>
                            {habit.days.map((status, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => cycleColor(habit.id, idx)}
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        backgroundColor: getColor(status),
                                        cursor: "pointer",
                                        borderRadius: "6px",
                                        transition: 'all 0.2s',
                                        border: status === 0 ? `1px solid rgba(0,0,0,0.1)` : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addHabit}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: '0.9rem',
                    marginTop: "24px",
                    color: theme.colors.text,
                    width: '100%',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
            >
                + Add Habit
            </button>
        </div>
    );
}

export default HabitNote;
