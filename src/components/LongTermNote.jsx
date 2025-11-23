import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaPalette } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useData, noteColors } from "../context/DataContext";

function LongTermNote({ id, title, tasks, color, onUpdate, onDelete }) {
    const { theme } = useTheme();
    const [hovered, setHovered] = useState(false);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
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

    const expandedTask = tasks.find(t => t.id === expandedTaskId);

    const handleTitleChange = (e) => {
        onUpdate(id, { title: e.target.value });
    };

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            text: "",
            description: "",
        };
        onUpdate(id, { tasks: [...tasks, newTask] });
    };

    const updateTask = (taskId, field, value) => {
        const updated = tasks.map((t) =>
            t.id === taskId ? { ...t, [field]: value } : t
        );
        onUpdate(id, { tasks: updated });
    };

    const deleteTask = (taskId) => {
        const updated = tasks.filter((t) => t.id !== taskId);
        onUpdate(id, { tasks: updated });
        if (expandedTaskId === taskId) setExpandedTaskId(null);
    };

    const handleColorSelect = (newColor) => {
        onUpdate(id, { color: newColor });
        setShowColorPicker(false);
    };

    return (
        <>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="w-full md:w-[380px] min-h-[320px] rounded-xl p-6 shadow-md relative flex flex-col transition-all duration-200"
                style={{
                    backgroundColor: color || theme.colors.noteLongTerm,
                    color: theme.colors.text,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '16px' }}>
                    <input
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Long Term Goals"
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

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            style={{
                                cursor: 'pointer',
                                padding: '12px',
                                backgroundColor: 'transparent',
                                borderRadius: '8px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'background-color 0.2s'
                            }}
                            onClick={() => setExpandedTaskId(task.id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: "600", fontSize: '1rem', marginBottom: "4px", color: theme.colors.text }}>
                                    {task.text || "New Goal"}
                                </div>
                                {hovered && (
                                    <FaTrash
                                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                        style={{
                                            cursor: "pointer",
                                            color: theme.colors.text,
                                            fontSize: '0.8rem',
                                            opacity: 0.3
                                        }}
                                    />
                                )}
                            </div>
                            <div style={{
                                fontSize: "0.9rem",
                                color: theme.colors.text,
                                opacity: 0.9,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}>
                                {task.description || "No description..."}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addTask}
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
                    + Add Goal
                </button>
            </div>

            {/* Expanded Task Modal */}
            {expandedTask && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
                }} onClick={() => setExpandedTaskId(null)}>
                    <div style={{
                        backgroundColor: theme.colors.surface,
                        padding: '40px',
                        borderRadius: '20px',
                        width: '90%',
                        maxWidth: '600px',
                        color: theme.colors.text,
                        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                        border: `1px solid rgba(0,0,0,0.05)`
                    }} onClick={e => e.stopPropagation()}>
                        <input
                            value={expandedTask.text}
                            onChange={(e) => updateTask(expandedTask.id, "text", e.target.value)}
                            placeholder="Goal Title"
                            style={{
                                width: '100%', border: 'none', background: 'transparent', fontSize: '1.75rem', fontWeight: '700',
                                marginBottom: '24px', color: theme.colors.text, outline: 'none', fontFamily: 'Inter, sans-serif'
                            }}
                            autoFocus
                        />
                        <textarea
                            value={expandedTask.description}
                            onChange={(e) => updateTask(expandedTask.id, "description", e.target.value)}
                            placeholder="Detailed description..."
                            style={{
                                width: '100%', minHeight: '300px', padding: '20px', borderRadius: '12px',
                                border: 'none', backgroundColor: 'rgba(0,0,0,0.03)', outline: 'none',
                                fontFamily: 'Inter, sans-serif', color: theme.colors.text, fontSize: '1rem', resize: 'vertical',
                                lineHeight: '1.6'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                            <button
                                onClick={() => setExpandedTaskId(null)}
                                style={{
                                    padding: '12px 30px', backgroundColor: theme.colors.primary, color: 'white',
                                    border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600',
                                    fontSize: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LongTermNote;
