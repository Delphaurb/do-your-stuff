import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import ChecklistNote from "../components/ChecklistNote";
import HabitNote from "../components/HabitNote";
import LongTermNote from "../components/LongTermNote";
import AddNoteModal from "../components/AddNoteModal";
import { SortableItem } from "../components/SortableItem";
import { FaPlus } from "react-icons/fa";

function Board() {
  const { theme, boardSkin } = useTheme();
  const { notes, setNotes, addNote, updateNote, deleteNote } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts. Fixes input focus issues.
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getSkinStyle = () => {
    // Base style for the board container
    const base = {
      padding: "40px",
      paddingTop: "100px",
      minHeight: "100vh",
      color: theme.colors.text,
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden', // Ensure pseudo-elements don't overflow
      backgroundColor: theme.colors.boardBackground || theme.colors.background, // Use darker board background
      transition: 'background-color 0.3s ease'
    };
    return base;
  };

  const renderSkinBackground = () => {
    switch (boardSkin) {

      case 'ocean':
        return (
          <>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', pointerEvents: 'none', zIndex: 0,
              background: 'linear-gradient(0deg, rgba(33, 150, 243, 0.2) 0%, transparent 100%)',
              animation: 'wave 10s infinite linear'
            }} />
            <style>{`
                @keyframes wave {
                    0% { transform: translateY(0) scaleY(1); }
                    50% { transform: translateY(-20px) scaleY(1.1); }
                    100% { transform: translateY(0) scaleY(1); }
                }
             `}</style>
            <div style={{
              position: 'absolute', bottom: '-50px', left: 0, width: '200%', height: '300px',
              background: 'rgba(33, 150, 243, 0.1)',
              borderRadius: '40%',
              animation: 'drift 15s infinite linear'
            }} />
            <div style={{
              position: 'absolute', bottom: '-50px', left: '-50%', width: '200%', height: '320px',
              background: 'rgba(33, 150, 243, 0.1)',
              borderRadius: '45%',
              animation: 'drift 20s infinite linear reverse'
            }} />
            <style>{`
                @keyframes drift {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
             `}</style>
          </>
        );

      case 'galaxy':
        return (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          }}>
            {/* Stars Generation */}
            <style>{`
                .star {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    animation: twinkle 2s infinite ease-in-out;
                }
                @keyframes twinkle {
                    0% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                    100% { opacity: 0.3; transform: scale(0.8); }
                }
              `}</style>

            {/* Generate random stars */}
            {[...Array(50)].map((_, i) => (
              <div key={i} className="star" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 ${Math.random() * 5 + 2}px white`
              }} />
            ))}

            {/* Nebula / Glow */}
            <div style={{
              position: 'absolute', top: '20%', left: '30%', width: '300px', height: '300px',
              background: 'radial-gradient(circle, rgba(103, 58, 183, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
            <div style={{
              position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.15) 0%, transparent 70%)',
              filter: 'blur(50px)'
            }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={getSkinStyle()}>
      {renderSkinBackground()}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={notes.map((n) => n.id)}
            strategy={rectSortingStrategy}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px", // Increased gap
                alignItems: "flex-start",
                justifyContent: 'center'
              }}
            >
              {notes.map((note) => (
                <SortableItem key={note.id} id={note.id}>
                  {note.type === "checklist" && (
                    <ChecklistNote
                      {...note}
                      onUpdate={updateNote}
                      onDelete={deleteNote}
                    />
                  )}
                  {note.type === "habit" && (
                    <HabitNote
                      {...note}
                      onUpdate={updateNote}
                      onDelete={deleteNote}
                    />
                  )}
                  {note.type === "longterm" && (
                    <LongTermNote
                      {...note}
                      onUpdate={updateNote}
                      onDelete={deleteNote}
                    />
                  )}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "70px", // Larger FAB
          height: "70px",
          borderRadius: "50%",
          backgroundColor: theme.colors.primary,
          color: "#fff",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          zIndex: 100
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
        }}
      >
        <FaPlus />
      </button>

      {isModalOpen && (
        <AddNoteModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addNote}
        />
      )}
    </div>
  );
}

export default Board;
