'use client';

import { FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full p-3 bg-[#101828] shadow-none drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] relative z-10">
      <div className="flex items-center justify-end space-x-4">
        {/* Search and Icons */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-3 py-1 text-sm w-full rounded-full bg-gray-100 focus:outline-none"
            aria-label="Search"
          />
          <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <button 
          className="relative"
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
        >
          <FaBell className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
            3
          </span>
        </button>
        <button 
          aria-label="Calendar"
          onClick={() => navigate('/calendar')}
        >
          <FaCalendarAlt className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}