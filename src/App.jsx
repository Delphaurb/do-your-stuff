import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddNoteBox from "./components/AddNoteBox";

const BoardPage = () => (
  <div className="flex justify-center items-start pt-20 min-h-screen bg-gradient-to-b from-[#D2B48C] to-[#A67B5B]">
    <AddNoteBox />
  </div>
);

const CalendarPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#D2B48C] to-[#A67B5B] text-amber-900">
    Calendar Page (coming soon)
  </div>
);

const SettingsPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#D2B48C] to-[#A67B5B] text-amber-900">
    Settings Page (coming soon)
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen font-comfortaa">
        {/* Navbar appears on all pages */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
