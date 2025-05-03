'use client';

import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Badge,
  Typography,
  Box
} from '@mui/material';

export default function Navbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sample notification data
  const notifications = [
    { id: 1, text: 'New appointment scheduled for tomorrow', time: '10 mins ago' },
    { id: 2, text: 'Patient John Doe cancelled his appointment', time: '1 hour ago' },
    { id: 3, text: 'New message from patient Sarah Smith', time: '3 hours ago' },
    { id: 4, text: 'System maintenance scheduled tonight', time: '5 hours ago' },
  ];

  const toggleNotifications = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setNotificationsOpen(open);
  };

  return (
    <div className="w-full p-3 bg-[#101828] shadow-none drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] relative z-10">
      <div className="flex items-center justify-between">
        {/* Left: Dental Branding */}
        <div className="flex items-center space-x-1">
          <img src="../public/teeth.png" alt="Dental Logo" className="w-13 h-12" /> 
          <div className="flex flex-col">
            <h1 className="font-bold text-[#13de00]" style={{fontSize: "18px"}}>VSK Dental Care</h1>
            <p className="text-gray-300" style={{fontSize: "12px"}}>Care for your smile</p>
          </div>
        </div>
  
        {/* Right: Search and Icons */}
        <div className="flex items-center space-x-4">
        <div className='text-white'>ADMIN</div>
          {/* Notification Bell */}
          <IconButton 
            onClick={toggleNotifications(true)}
            aria-label="Notifications"
            sx={{ color: 'white' }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <FaBell className="h-5 w-5" />
            </Badge>
          </IconButton>
        </div>
      </div>

      {/* Notifications Drawer */}
      <Drawer
        anchor="right"
        open={notificationsOpen}
        onClose={toggleNotifications(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box',
            backgroundColor: '#1a1a1a',
            color: 'white'
          },
        }}
      >
        <Box
          sx={{ width: 350 }}
          role="presentation"
          onKeyDown={toggleNotifications(false)}
        >
          <Box sx={{ p: 2, backgroundColor: '#101828', color: 'white' }}>
            <Typography variant="h6" component="div">
              Notifications
            </Typography>
          </Box>
          
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  button
                  sx={{
                    '&:hover': {
                      backgroundColor: '#2a2a2a',
                    }
                  }}
                >
                  <ListItemText 
                    primary={notification.text}
                    secondary={notification.time}
                    primaryTypographyProps={{ color: 'white' }}
                    secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  />
                </ListItem>
                <Divider sx={{ backgroundColor: '#333' }} />
              </React.Fragment>
            ))}
          </List>
          
          {notifications.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                No new notifications
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );  
}