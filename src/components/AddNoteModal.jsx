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
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="p-8 rounded-2xl w-[90%] max-w-[400px] shadow-2xl"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-center mb-5 text-xl font-bold"
          style={{ color: theme.colors.primary }}
        >
          Add New Note
        </h2>

        <div className="flex flex-col gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="flex items-center p-4 border-none rounded-xl cursor-pointer text-left transition-transform duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: opt.color,
                color: theme.colors.text,
              }}
            >
              <div className="mr-4 opacity-70">{opt.icon}</div>
              <div>
                <div className="font-bold text-lg">{opt.title}</div>
                <div className="text-sm opacity-80">{opt.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full p-2 bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          style={{
            color: theme.colors.text,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNoteModal;
