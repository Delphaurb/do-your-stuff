import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaPalette } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useData, noteColors } from "../context/DataContext";

function ChecklistNote({ id, title, items, color, onUpdate, onDelete }) {
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

  const addItem = () => {
    const newItem = { id: Date.now(), text: "", checked: false };
    onUpdate(id, { items: [...items, newItem] });
  };

  const updateItem = (itemId, field, value) => {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    onUpdate(id, { items: updated });
  };

  const deleteItem = (itemId) => {
    const updated = items.filter((item) => item.id !== itemId);
    onUpdate(id, { items: updated });
  };

  const handleColorSelect = (newColor) => {
    onUpdate(id, { color: newColor });
    setShowColorPicker(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full md:w-[360px] min-h-[320px] rounded-xl p-6 shadow-md relative flex flex-col transition-all duration-200"
      style={{
        backgroundColor: color || theme.colors.noteChecklist,
        color: theme.colors.text,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '20px' }}>
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Checklist"
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => updateItem(item.id, "checked", e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: theme.colors.primary
              }}
            />
            <input
              value={item.text}
              onChange={(e) => updateItem(item.id, "text", e.target.value)}
              placeholder="Item..."
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                flex: 1,
                textDecoration: item.checked ? "line-through" : "none",
                opacity: item.checked ? 0.6 : 1,
                fontSize: "1rem",
                color: theme.colors.text,
                fontFamily: 'Inter, sans-serif'
              }}
            />
            {hovered && (
              <FaTrash
                onClick={() => deleteItem(item.id)}
                style={{
                  cursor: "pointer",
                  color: theme.colors.text,
                  fontSize: '0.8rem',
                  opacity: 0.3
                }}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
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
        + Add Item
      </button>
    </div>
  );
}

export default ChecklistNote;
