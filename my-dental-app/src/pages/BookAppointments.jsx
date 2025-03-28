import React, { useState } from 'react';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Avatar,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  Person,
  MedicalServices,
  Search
} from '@mui/icons-material';

const treatments = [
  'Dental Checkup',
  'Teeth Cleaning',
  'Cavity Filling',
  'Root Canal',
  'Tooth Extraction',
  'Dental Crown',
  'Teeth Whitening',
  'Braces Consultation'
];

const dentists = [
  { id: 1, name: 'Dr. Smith', specialty: 'General Dentistry' },
  { id: 2, name: 'Dr. Johnson', specialty: 'Orthodontics' },
  { id: 3, name: 'Dr. Williams', specialty: 'Endodontics' },
  { id: 4, name: 'Dr. Brown', specialty: 'Periodontics' }
];

// Generate time slots (10AM-2PM and 5PM-9PM)
const generateTimeSlots = () => {
  const morningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes} AM`;
  });

  const eveningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 5 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes} PM`;
  });

  return [...morningSlots, ...eveningSlots];
};

export default function BookAppointment() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      date,
      treatment: selectedTreatment,
      dentist: selectedDentist,
      time: selectedSlot,
      patientName,
      patientPhone
    });
    // Add your booking logic here
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Book New Appointment
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side - Appointment Form */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Appointment Details
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Appointment Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Select Treatment"
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <MedicalServices sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  >
                    {treatments.map((treatment) => (
                      <MenuItem key={treatment} value={treatment}>
                        {treatment}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Select Dentist"
                    value={selectedDentist}
                    onChange={(e) => setSelectedDentist(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  >
                    {dentists.map((dentist) => (
                      <MenuItem key={dentist.id} value={dentist.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 2 }}>
                            {dentist.name.charAt(0)}
                          </Avatar>
                          <div>
                            <Typography>{dentist.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {dentist.specialty}
                            </Typography>
                          </div>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Available Time Slots
                  </Typography>
                  <Grid container spacing={2}>
                    {timeSlots.map((slot) => (
                      <Grid item xs={6} sm={4} key={slot}>
                        <Button
                          variant={selectedSlot === slot ? 'contained' : 'outlined'}
                          color={selectedSlot === slot ? 'primary' : 'inherit'}
                          fullWidth
                          onClick={() => setSelectedSlot(slot)}
                          startIcon={<AccessTime />}
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2, width: '100%' }} />

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Patient Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!selectedSlot}
                    sx={{ mt: 2 }}
                  >
                    Confirm Appointment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        {/* Right Side - Available Dentists */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Available Dentists</Typography>
              <TextField
                size="small"
                placeholder="Search dentists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {dentists.map((dentist) => (
                <Grid item xs={12} key={dentist.id}>
                  <Card variant="outlined">
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 56, height: 56, mr: 3 }}>
                        {dentist.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{dentist.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {dentist.specialty}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip 
                            label="Available Today" 
                            size="small" 
                            color="success" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label="10+ Years Experience" 
                            size="small" 
                            color="info" 
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => setSelectedDentist(dentist.id)}
                      >
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}