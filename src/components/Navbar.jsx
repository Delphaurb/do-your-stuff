import { Link, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-[#A0826D] text-[#FAF6F1] px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50 shadow-md">
      <h1 className="text-2xl font-bold font-[Comfortaa]">Do your stuff.</h1>

      <div className="flex items-center space-x-6">
        <Link
          to="/board"
          className={`px-3 py-1 rounded-lg transition-all duration-200 ${
            location.pathname === "/board"
              ? "bg-[#8F6F5B]"
              : "hover:bg-[#95785E]"
          }`}
        >
          Board
        </Link>

        <Link
          to="/calendar"
          className={`px-3 py-1 rounded-lg transition-all duration-200 ${
            location.pathname === "/calendar"
              ? "bg-[#8F6F5B]"
              : "hover:bg-[#95785E]"
          }`}
        >
          Calendar
        </Link>

        <button
          className={`p-2 rounded-lg transition-all duration-200 ${
            location.pathname === "/settings"
              ? "bg-[#8F6F5B]"
              : "hover:bg-[#95785E]"
          }`}
        >
          <Settings size={22} />
        </button>
      </div>
    </nav>
  );
}
