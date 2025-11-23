import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Board from "./pages/board.jsx";
import Calendar from "./pages/Calendar.jsx";
import Settings from "./pages/Settings.jsx";
import Finance from './pages/Finance.jsx';
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App; // ✅ IMPORTANT
