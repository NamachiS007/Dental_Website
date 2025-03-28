// src/components/ASidebar.jsx
'use client';

import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { BiFolder } from "react-icons/bi";
import { useAuth } from '../context/AuthContext';

export default function ASidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      path: '/dashboard', 
      icon: AiOutlineHome, 
      label: 'Todays Appointments' 
    },
    { 
      path: '/book-appointments', 
      icon: BiFolder, 
      label: 'Book Appointments' 
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? 'bg-[#ff8303] font-semibold text-black' 
      : 'text-white-600 font-semibold hover:bg-[rgba(255,131,3,0.2)]';
  };

  return (
    <div className="flex flex-col h-screen w-64 text-gray-800 overflow-y-auto px-3 py-4" style={{backgroundColor: "#101828"}}>
      {/* Header */}
      <div className="flex justify-center items-center mb-4 mr-2">
        <div className="rounded-xl p-3 w-80 bg-white/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={user?.avatar || '/default-avatar.png'} 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-medium text-white">
                {user?.name || 'User'}
              </h5>
              <p className="text-xs text-gray-400">
                {user?.email || '@user'}
              </p>
            </div>
            <IoIosArrowForward className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Menu Label */}
      <div className="mb-2 px-2">
        <p className="text-xs text-gray-500 font-medium">Menu</p>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {menuItems.map((item) => (
          <button 
            key={item.path}
            onClick={() => handleNavigation(item.path)} 
            className={`flex items-center text-white px-2 py-2.5 rounded-lg text-sm ${isActive(item.path)}`}
          >
            <div className="w-8 flex justify-center">
              <item.icon className="h-5 w-5" />
            </div>
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}


      {/* Dark/Light Mode Toggle */}
      {/* <div className="mt-6 p-2">
        <div className="flex items-center justify-between bg-gray-800 rounded-full p-1">
          <button 
            className={`flex items-center justify-center px-3 py-1.5 rounded-full text-xs ${!darkMode ? 'bg-gray-700' : 'text-gray-400'}`}
            onClick={() => setDarkMode(false)}
          >
            <BsSun className="h-4 w-4" />
            <span className="ml-1">Light</span>
          </button>
          <button 
            className={`flex items-center justify-center px-3 py-1.5 rounded-full text-xs ${darkMode ? 'bg-gray-700' : 'text-gray-400'}`}
            onClick={() => setDarkMode(true)}
          >
            <BsMoon className="h-4 w-4" />
            <span className="ml-1">Dark</span>
          </button>
        </div>
      </div> */}


{/* Group Chat */}
      {/* <div className="px-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <p className="text-sm font-medium">Group Chat</p>
            <button className="ml-auto text-gray-400">
              <span className="text-xl">⋮</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src="/profile-mohamad.jpg" alt="Mohamad" className="h-full w-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm">Mohamad</p>
                <p className="text-xs text-gray-400">Designer</p>
              </div>
              <div className="ml-auto">
                <AiOutlineRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src="/profile-reza.jpg" alt="Reza" className="h-full w-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm">Reza</p>
                <p className="text-xs text-gray-400">Developer</p>
              </div>
              <div className="ml-auto">
                <AiOutlineRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src="/profile-sara.jpg" alt="Sara" className="h-full w-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm">Sara</p>
                <p className="text-xs text-gray-400">Product manager</p>
              </div>
              <div className="ml-auto">
                <AiOutlineRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src="/profile-zahra.jpg" alt="Zahra" className="h-full w-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm">Zahra</p>
                <p className="text-xs text-gray-400">Designer</p>
              </div>
              <div className="ml-auto">
                <AiOutlineRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div> */}