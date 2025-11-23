import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaRegCalendarCheck, FaRegListAlt, FaRegFlag } from "react-icons/fa";


const AddNoteModal = ({ onClose, onAdd }) => {
  const { theme } = useTheme();

  const options = [
    {
      id: "checklist",
      title: "Checklist",
      subtitle: "Short-term tasks",
      color: theme.colors.noteChecklist,
      icon: <FaRegListAlt size={24} />,
    },
    {
      id: "habit",
      title: "Habit Tracker",
      subtitle: "Weekly routines",
      color: theme.colors.noteHabit,
      icon: <FaRegCalendarCheck size={24} />,
    },
    {
      id: "longterm",
      title: "Long Term",
      subtitle: "Goals & Descriptions",
      color: theme.colors.noteLongTerm,
      icon: <FaRegFlag size={24} />,
    },
  ];

  const handleSelect = (type) => {
    let newNote = { type };
    if (type === 'checklist') {
      newNote = { ...newNote, title: '', items: [] };
    } else if (type === 'habit') {
      newNote = { ...newNote, title: '', habits: [] };
    } else if (type === 'longterm') {
      newNote = { ...newNote, title: '', tasks: [] };
    }
    onAdd(newNote);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: "30px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          color: theme.colors.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: theme.colors.primary }}>
          Add New Note
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                backgroundColor: opt.color,
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                textAlign: "left",
                transition: "transform 0.2s",
                color: theme.colors.text,
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ marginRight: "15px", opacity: 0.7 }}>{opt.icon}</div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{opt.title}</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>{opt.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "transparent",
            border: "none",
            color: theme.colors.text,
            cursor: "pointer",
            opacity: 0.6,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNoteModal;
