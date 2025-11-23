// src/components/AddNoteBox.jsx
import React, { useState } from "react";

export default function AddNoteBox({ onAddNote }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-2xl p-6 w-72 h-44 text-center shadow-sm bg-white transition-all duration-300"
    >
      {!showOptions ? (
        <div
          onClick={() => setShowOptions(true)}
          className="cursor-pointer flex flex-col items-center justify-center h-full"
        >
          <span className="text-5xl text-gray-400">+</span>
          <p className="text-gray-500 mt-2 font-medium">Add Note</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-left font-semibold text-gray-700 mb-1">
            Add New Note
          </h3>

          <button
            onClick={() => {
              onAddNote && onAddNote("checklist");
              setShowOptions(false);
            }}
            className="bg-yellow-100 hover:bg-yellow-200 text-left rounded-xl px-4 py-3 transition-all"
          >
            <p className="font-medium text-gray-700">Checklist</p>
            <p className="text-sm text-gray-500">Short-term tasks</p>
          </button>

          <button
            className="bg-blue-100 hover:bg-blue-200 text-left rounded-xl px-4 py-3 transition-all"
            onClick={() => {
              onAddNote && onAddNote("habit");
              setShowOptions(false);
            }}
          >
            <p className="font-medium text-gray-700">Habit Tracker</p>
            <p className="text-sm text-gray-500">Weekly routines</p>
          </button>

          <button
            className="bg-green-100 hover:bg-green-200 text-left rounded-xl px-4 py-3 transition-all"
            onClick={() => {
              onAddNote && onAddNote("progress");
              setShowOptions(false);
            }}
          >
            <p className="font-medium text-gray-700">Progress Tracker</p>
            <p className="text-sm text-gray-500">Long-term goals</p>
          </button>

          <button
            onClick={() => setShowOptions(false)}
            className="text-gray-600 mt-1 hover:text-gray-800 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
