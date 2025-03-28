import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Grid,
  Avatar,
  Button,
  Typography,
  Divider,
  Chip,
  Box,
  Container,
  Paper
} from "@mui/material";
import {
  AccessTime,
  MedicalServices,
  AddCircleOutline
} from "@mui/icons-material";

// Generate time slots (10AM-2PM and 5PM-9PM)
const generateSlots = () => {
  const morningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return {
      time: `${hour}:${minutes} AM`,
      available: i % 4 !== 0 // Mark some as unavailable
    };
  });

  const eveningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 5 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return {
      time: `${hour}:${minutes} PM`, 
      available: i % 3 !== 0 // Mark some as unavailable
    };
  });

  return [...morningSlots, ...eveningSlots].map((slot, index) => ({
    id: index + 1,
    ...slot,
    patientName: slot.available ? `Patient ${index + 1}` : null,
    treatment: slot.available ? 
      (index % 3 === 0 ? 'Dental Checkup' : 
       index % 3 === 1 ? 'Teeth Cleaning' : 'Cavity Filling') : null,
    status: slot.available ? 
      (index % 2 === 0 ? 'Confirmed' : 'Pending') : 'Available'
  }));
};

const AppointmentCard = ({ appointment }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <Box sx={{
        height: 6,
        backgroundColor: 
          !appointment.available ? '#E0E0E0' : 
          appointment.status === 'Confirmed' ? '#4CAF50' : '#FF9800',
      }} />
      <CardContent sx={{ 
        flexGrow: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centered content
        alignItems: 'center',
        textAlign: 'center',
        height: '100%' // Ensure full height
      }}>
        {/* Time Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          mb: 2
        }}>
          <AccessTime 
            color="primary" 
            sx={{ 
              fontSize: 24, 
              opacity: 0.7,
              color: !appointment.available ? '#9E9E9E' : 'primary.main'
            }} 
          />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold', 
              color: !appointment.available ? '#9E9E9E' : 'text.primary' 
            }}
          >
            {appointment.time}
          </Typography>
        </Box>
        
        {appointment.available ? (
          <>
            <Avatar sx={{ 
              width: 50, 
              height: 50, 
              mb: 1,
              bgcolor: '#3F51B5',
              boxShadow: 1
            }}>
              {appointment.patientName?.charAt(0)}
            </Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'medium', 
                mb: 1,
                color: 'text.primary'
              }}
            >
              {appointment.patientName}
            </Typography>
            
            <Chip 
              label={appointment.treatment} 
              icon={<MedicalServices fontSize="small" />}
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(63, 81, 181, 0.1)',
                color: '#3F51B5'
              }}
            />
            
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                bgcolor: 
                  appointment.status === 'Confirmed' ? '#4CAF50' : '#FF9800',
                '&:hover': {
                  bgcolor: 
                    appointment.status === 'Confirmed' ? '#45A049' : '#F57C00'
                }
              }}
            >
              {appointment.status}
            </Button>
          </>
        ) : (
          <>
            <AddCircleOutline 
              sx={{ 
                fontSize: 48, 
                mb: 2, 
                color: '#9E9E9E',
                opacity: 0.6
              }} 
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                fontStyle: 'italic'
              }}
            >
              Need to Book Appointments
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Book Appointment
            </Button>
          </>
        )}
      </CardContent>
    </Paper>
  );
};

export default function Dashboard() {
  const [appointments] = useState(generateSlots());

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      overflow: 'auto',
      py: 3,
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="3xl" sx={{ px: { xs: 0, sm: 2 } }}>
        {/* Morning Session */}
        <Typography variant="h5" sx={{ 
          mb: 3, 
          color: 'primary.main', 
          fontWeight: 'bold',
          px: { xs: 2, sm: 0 }
        }}>
          Morning Session (10:00 AM - 2:00 PM)
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 2, sm: 0 } }}>
          {appointments.slice(0, 8).map((appointment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={appointment.id} sx={{ display: 'flex' }}>
              <AppointmentCard appointment={appointment} />
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Evening Session */}
        <Typography variant="h5" sx={{ 
          mb: 3, 
          color: 'primary.main', 
          fontWeight: 'bold',
          px: { xs: 2, sm: 0 }
        }}>
          Evening Session (5:00 PM - 9:00 PM)
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 2, sm: 0 } }}>
          {appointments.slice(8, 16).map((appointment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={appointment.id} sx={{ display: 'flex' }}>
              <AppointmentCard appointment={appointment} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}