'use client';

import { FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

export default function Navbar({ onDateRangeSelect }) {
  const navigate = useNavigate();
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleDateSelect = (ranges) => {
    setDateRange([ranges.selection]);
    if (onDateRangeSelect) {
      onDateRangeSelect({
        startDate: format(ranges.selection.startDate, 'yyyy-MM-dd'),
        endDate: format(ranges.selection.endDate, 'yyyy-MM-dd')
      });
    }
    setShowDateRange(false);
  };

  return (
    <div className="w-full p-3 bg-[#101828] shadow-none drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] relative z-10">
      <div className="flex items-center justify-between"> {/* Use justify-between to separate left & right */}
        
        {/* Left: Dental Branding */}
        <div className="flex items-center space-x-1"> {/* Align image & text */}
          {/* Image Before Branding */}
          <img src="../public/teeth.png" alt="Dental Logo" className="w-13 h-12" /> 

          <div className="flex flex-col">
            <h1 className="font-bold text-[#13de00]" style={{fontSize: "18px"}}>VSK Dental Care</h1> {/* Green Text */}
            <p className="text-gray-300" style={{fontSize: "12px"}}>Care for your smile</p>
          </div>
        </div>
  
        {/* Right: Search and Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-3 py-1 text-sm w-full rounded-full bg-gray-100 focus:outline-none"
              aria-label="Search"
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
  
          {/* Notification Bell */}
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
  
          {/* Calendar */}
          <div className="relative">
            <button 
              aria-label="Calendar"
              onClick={() => setShowDateRange(!showDateRange)}
            >
              <FaCalendarAlt className="h-5 w-5 text-white" />
            </button>
            {showDateRange && (
              <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );  
}