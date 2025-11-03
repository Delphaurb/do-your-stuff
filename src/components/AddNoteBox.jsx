import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function AddNoteBox() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="w-72 h-72 mx-auto mt-10 p-4 rounded-2xl shadow-lg bg-gradient-to-br from-yellow-100 to-yellow-200 font-comfortaa relative transition-all duration-500">
      {/* Default View — Sticky Note */}
      {!showOptions && (
        <div className="flex flex-col justify-between h-full animate-fadeIn">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Do your stuff.</h2>
            <p className="text-gray-600 text-sm">
              Write down your thoughts, ideas, or plans here.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowOptions(true)}
              className="p-3 rounded-full bg-white shadow hover:bg-yellow-300 transition-colors"
            >
              <Plus className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      )}

      {/* Options View — Replaces Sticky Note Content */}
      {showOptions && (
        <div className="flex flex-col justify-between h-full animate-fadeIn">
          <ul className="flex flex-col gap-3 text-gray-800 text-base">
            <li className="p-3 rounded-lg bg-white/70 hover:bg-yellow-300 transition-all cursor-pointer">
              Change background color
            </li>
            <li className="p-3 rounded-lg bg-white/70 hover:bg-yellow-300 transition-all cursor-pointer">
              Change font style
            </li>
            <li className="p-3 rounded-lg bg-white/70 hover:bg-yellow-300 transition-all cursor-pointer">
              Reset all notes
            </li>
          </ul>

          <button
            onClick={() => setShowOptions(false)}
            className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold hover:from-red-500 hover:to-red-600 transition-all"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
