import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [tabValue, setTabValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOpenSlot, setSelectedOpenSlot] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        patientName: '',
        slotTime: '10:00',
        treatmentType: 'Regular Checkup',
        phoneNumber: '',
        date: new Date().toISOString().split('T')[0],
        isOpen: false
    });

    // Sample data - you would typically fetch this from an API
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: "John Doe",
            slotTime: "10:00",
            treatmentType: "Regular Checkup",
            phoneNumber: "123 4567 890",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 2,
            patientName: "Jane Smith",
            slotTime: "10:30",
            treatmentType: "Dental Cleaning",
            phoneNumber: "234 5678 901",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 3,
            patientName: "",
            slotTime: "11:00",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 4,
            patientName: "Emily Davis",
            slotTime: "11:30",
            treatmentType: "Tooth Extraction",
            phoneNumber: "456 7890 123",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 5,
            patientName: "",
            slotTime: "12:00",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 6,
            patientName: "Sarah Brown",
            slotTime: "12:30",
            treatmentType: "Regular Checkup",
            phoneNumber: "678 9012 345",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 7,
            patientName: "David Taylor",
            slotTime: "13:00",
            treatmentType: "Dental Cleaning",
            phoneNumber: "789 0123 456",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 8,
            patientName: "",
            slotTime: "13:30",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 9,
            patientName: "Thomas Martinez",
            slotTime: "17:00",
            treatmentType: "Root Canal",
            phoneNumber: "901 2345 678",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 10,
            patientName: "",
            slotTime: "17:30",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 11,
            patientName: "James Clark",
            slotTime: "18:00",
            treatmentType: "Tooth Extraction",
            phoneNumber: "123 4567 890",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 12,
            patientName: "",
            slotTime: "18:30",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 13,
            patientName: "Christopher Lewis",
            slotTime: "19:00",
            treatmentType: "Dental Cleaning",
            phoneNumber: "345 6789 012",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 14,
            patientName: "Amanda Lee",
            slotTime: "19:30",
            treatmentType: "Consultation",
            phoneNumber: "456 7890 123",
            date: "March 29, 2025",
            isOpen: false
        },
        {
            id: 15,
            patientName: "",
            slotTime: "20:00",
            treatmentType: "",
            phoneNumber: "",
            date: "March 29, 2025",
            isOpen: true
        },
        {
            id: 16,
            patientName: "Michelle Hall",
            slotTime: "20:30",
            treatmentType: "Regular Checkup",
            phoneNumber: "678 9012 345",
            date: "March 29, 2025",
            isOpen: false
        }
    ]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setSelectedOpenSlot(null);
        // Reset form
        setNewAppointment({
            patientName: '',
            slotTime: tabValue === 0 ? '10:00' : '17:00',
            treatmentType: 'Regular Checkup',
            phoneNumber: '',
            date: new Date().toISOString().split('T')[0],
            isOpen: false
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOpenSlot(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({
            ...newAppointment,
            [name]: value
        });
    };

    // const handleOpenSlotClick = (appointment) => {
    //     if (appointment.isOpen) {
    //         setSelectedOpenSlot(appointment);
    //         setNewAppointment({
    //             patientName: '',
    //             slotTime: appointment.slotTime,
    //             treatmentType: 'Regular Checkup',
    //             phoneNumber: '',
    //             date: new Date(appointment.date).toISOString().split('T')[0],
    //             isOpen: false
    //         });
    //         setOpenDialog(true);
    //     }
    // };

    const handleOpenSlotClick = (appointment) => {
        if (appointment.isOpen) {
            // Navigate to the book-appointments page with the slot details
            navigate('/book-appointments', {
                state: {
                    slotTime: appointment.slotTime,
                    date: appointment.date
                }
            });
        }
    };

    const handleSaveAppointment = () => {
      // Validate required fields
      if (!newAppointment.patientName || !newAppointment.phoneNumber || !newAppointment.treatmentType) {
          alert('Please fill all required fields');
          return;
      }
  
      // For Open Slot booking, ensure we're updating an existing Open Slot
      if (selectedOpenSlot && !selectedOpenSlot.isOpen) {
          alert('Cannot book a slot that is not marked as Open');
          return;
      }
  
      // Only count BOOKED appointments (not open slots) when checking session capacity
      const morningBookedAppointments = appointments.filter(app => {
          const hour = parseInt(app.slotTime.split(':')[0]);
          return hour >= 10 && hour < 14 && !app.isOpen;
      }).length;
      
      const eveningBookedAppointments = appointments.filter(app => {
          const hour = parseInt(app.slotTime.split(':')[0]);
          return hour >= 17 && hour < 21 && !app.isOpen;
      }).length;
      
      const newHour = parseInt(newAppointment.slotTime.split(':')[0]);
      const isMorning = newHour >= 10 && newHour < 14;
      
      if ((isMorning && morningBookedAppointments >= 8) || (!isMorning && eveningBookedAppointments >= 8)) {
          alert(`Maximum of 8 booked appointments reached for this session.`);
          return;
      }
  
      let updatedAppointments;
      
      if (selectedOpenSlot) {
          // Update the existing open slot with new data
          updatedAppointments = appointments.map(app => 
              app.id === selectedOpenSlot.id ? {
                  ...newAppointment,
                  id: app.id,
                  date: formatDate(newAppointment.date),
                  isOpen: false // Mark as booked
              } : app
          );
      } else {
          // Add new appointment (only if not Open Slot)
          if (newAppointment.isOpen) {
              alert('Cannot create new Open Slot this way. Please book an existing Open Slot.');
              return;
          }
          updatedAppointments = [...appointments, {
              ...newAppointment,
              id: appointments.length + 1,
              date: formatDate(newAppointment.date)
          }];
      }
      
      setAppointments(updatedAppointments);
      setOpenDialog(false);
      setSelectedOpenSlot(null);
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Format time from 24h to 12h with AM/PM
    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') {
            return "10:00 AM"; // default if invalid
        }
        
        try {
            const [hours, minutes] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;
            return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
        } catch (error) {
            console.error("Error formatting time:", error);
            return "10:00 AM"; // default if parsing fails
        }
    };

    // Calculate end time (assuming 30-minute slots)
    const calculateEndTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') {
            return "10:30"; // default if invalid
        }
        
        try {
            const [hours, minutes] = timeString.split(':').map(Number);
            let newHours = hours;
            let newMinutes = minutes + 30;
            
            if (newMinutes >= 60) {
                newHours += 1;
                newMinutes -= 60;
            }
            
            return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
        } catch (error) {
            console.error("Error calculating end time:", error);
            return "10:30"; // default if parsing fails
        }
    };

    // Filter appointments based on the selected tab and limit to 8
    const filteredAppointments = appointments
        .filter(appointment => {
            // Morning: 10AM-2PM
            if (tabValue === 0) {
                const hour = parseInt(appointment.slotTime.split(':')[0]);
                return hour >= 10 && hour < 14;
            } 
            // Evening: 5PM-9PM
            else {
                const hour = parseInt(appointment.slotTime.split(':')[0]);
                return hour >= 17 && hour < 21;
            }
        })
        .slice(0, 8); // Limit to 8 appointments per session

    return (
        <Container maxWidth="xl">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': { 
                    fontWeight: 500, // Semibold
                    color: '#64748B' // Unselected tab color (slate-500)
                  },
                  '& .Mui-selected': { 
                    color: '#101828 !important' // Selected tab color 1976d2
                  },
                  '& .MuiTabs-indicator': { 
                    backgroundColor: '#101828' // Indicator color matches selected tab 1976d2
                  }
                }}
              >
                <Tab label="MORNING (10AM-2PM)" />
                <Tab label="EVENING (5PM-9PM)" />
              </Tabs>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
                    <TableHead sx={{ backgroundColor: '#313131' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "40px" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "5px" }}>Patient Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "45px"  }}>Slot Timing</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "18px"  }}>Treatment Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "10px"  }}>Phone Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "45px"  }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingLeft: "60px"  }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAppointments.map((appointment) => {
                            const endTime = calculateEndTime(appointment.slotTime);
                            const timeRange = `${formatTime(appointment.slotTime)} - ${formatTime(endTime)}`;
                            
                            return (
                            <TableRow 
                                key={appointment.id}
                                sx={{ 
                                height: '48px',
                                '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                '&:hover': { 
                                    backgroundColor: appointment.isOpen ? '#f0f9ff' : '#f0f0f0',
                                    cursor: appointment.isOpen ? 'pointer' : 'default'
                                }
                                }}
                                onClick={() => appointment.isOpen && handleOpenSlotClick(appointment)}
                            >
                                <TableCell sx={{ py: 1, px: 2 }}>
                                <Box 
                                    sx={{ 
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: appointment.isOpen ? '#4ECCA3' : '#FF416C', 
                                    color: 'white', 
                                    py: 0.3, 
                                    px: 1, 
                                    borderRadius: 1, 
                                    fontSize: '0.7rem', 
                                    fontWeight: 'bold',
                                    width: '80px',
                                    minWidth: '80px',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    lineHeight: '1.2'
                                    }}
                                > 
                                    {appointment.isOpen ? 'OPEN SLOT' : 'BOOKED'} 
                                </Box>
                                </TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>{appointment.isOpen ? "—" : appointment.patientName}</TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>{timeRange}</TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>{appointment.isOpen ? "—" : appointment.treatmentType}</TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>{appointment.isOpen ? "—" : appointment.phoneNumber}</TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>{appointment.date}</TableCell>
                                <TableCell sx={{ py: 1, px: 2 }}>
                                {!appointment.isOpen && (
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    <Button 
                                        size="small" 
                                        variant="outlined" 
                                        sx={{ 
                                        borderColor: '#4ECCA3', 
                                        color: '#4ECCA3',
                                        '&:hover': { borderColor: '#3da683', backgroundColor: 'rgba(78, 204, 163, 0.1)' },
                                        minWidth: '60px',
                                        py: 0.5,
                                        fontSize: '0.75rem'
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        size="small" 
                                        variant="outlined" 
                                        sx={{ 
                                        borderColor: '#FF416C', 
                                        color: '#FF416C',
                                        '&:hover': { borderColor: '#e53256', backgroundColor: 'rgba(255, 65, 108, 0.1)' },
                                        minWidth: '60px',
                                        py: 0.5,
                                        fontSize: '0.75rem'
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    </Box>
                                )}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* New Appointment Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#101828', color: 'white' }}>
                    {selectedOpenSlot ? 'Book Open Slot' : 'Create New Appointment'}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Patient Name"
                            name="patientName"
                            value={newAppointment.patientName}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={newAppointment.phoneNumber}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Appointment Date"
                                name="date"
                                value={newAppointment.date}
                                onChange={handleInputChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="Appointment Time"
                                name="slotTime"
                                type="time"
                                value={newAppointment.slotTime}
                                onChange={handleInputChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ step: 300 }} // 5 min steps
                            />
                        </Box>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Treatment Type</InputLabel>
                            <Select
                                label="Treatment Type"
                                name="treatmentType"
                                value={newAppointment.treatmentType}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Regular Checkup">Regular Checkup</MenuItem>
                                <MenuItem value="Dental Cleaning">Dental Cleaning</MenuItem>
                                <MenuItem value="Root Canal">Root Canal</MenuItem>
                                <MenuItem value="Tooth Extraction">Tooth Extraction</MenuItem>
                                <MenuItem value="Consultation">Consultation</MenuItem>
                            </Select>
                        </FormControl>
                        {!selectedOpenSlot && (
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Slot Status</InputLabel>
                                <Select
                                    label="Slot Status"
                                    name="isOpen"
                                    value={newAppointment.isOpen}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={false}>Booked</MenuItem>
                                    <MenuItem value={true}>Open Slot</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveAppointment} 
                        variant="contained"
                        sx={{ bgcolor: '#101828', '&:hover': { bgcolor: '#2e4574' } }}
                        disabled={!newAppointment.patientName || !newAppointment.phoneNumber || !newAppointment.treatmentType}
                    >
                        {selectedOpenSlot ? 'Book Slot' : 'Save Appointment'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;