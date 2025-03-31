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
  Paper,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Stack, Stepper, Step, StepLabel,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  Person,
  MedicalServices,
  Search,
  Phone,
  Badge,
  Email,
  Cake,
  Transgender,
  Home,
  Add,
  ArrowForward,
  ExpandMore
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
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    specialty: 'General Dentistry',
    experience: '12 years',
    available: true,
    rating: '4.9 (120 reviews)'
  }
  // Additional dentists can be added here in the future
];

// Generate time slots (10AM-2PM and 5PM-9PM) with 12-hour format
const generateTimeSlots = () => {
  const morningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    
    // Convert to 12-hour format
    let displayHour = hour;
    let period = "AM";
    
    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        displayHour = hour - 12;
      }
    }
    
    return {
      value: `${hour}:${minutes}`,
      display: `${displayHour}:${minutes} ${period}`
    };
  });

  const eveningSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 17 + Math.floor(i / 2); // Using 24-hour format (5PM = 17)
    const minutes = i % 2 === 0 ? '00' : '30';
    
    // Convert to 12-hour format
    let displayHour = hour - 12; // Convert to 12-hour format for PM
    
    return {
      value: `${hour}:${minutes}`,
      display: `${displayHour}:${minutes} PM`
    };
  });

  return [...morningSlots, ...eveningSlots];
};

export default function BookAppointment() {
  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientAltPhone, setPatientAltPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeTabValue, setTimeTabValue] = useState(0);

  const timeSlots = generateTimeSlots();
  const morningSlots = timeSlots.slice(0, 8);
  const eveningSlots = timeSlots.slice(8);

  const handleTimeTabChange = (event, newValue) => {
    setTimeTabValue(newValue);
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      date,
      treatment: selectedTreatment,
      dentist: selectedDentist,
      time: selectedSlot,
      patientInfo: {
        name: patientName,
        email: patientEmail,
        dob: patientDob,
        gender: patientGender,
        address: patientAddress,
        phone: patientPhone,
        altPhone: patientAltPhone
      }
    });
    // Add your booking logic here
  };

  // Filter slots based on selected tab
  const displaySlots = timeTabValue === 0 ? morningSlots : eveningSlots;

  // Check if all required fields are filled for each step
  const step1Complete = date && selectedTreatment && selectedDentist && selectedSlot;
  const step2Complete = patientName && patientPhone && patientEmail && patientDob;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              {activeStep === 0 ? 'Appointment Details' : 'Patient Information'}
            </Typography>
            
            <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '200px' }}>
              <Step>
                <StepLabel 
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: activeStep >= 0 ? '#1976d2' : '#eee',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      1
                    </Box>
                  )}
                >
                  Appointment
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: activeStep >= 1 ? '#1976d2' : '#eee',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      2
                    </Box>
                  )}
                >
                  Patient Info
                </StepLabel>
              </Step>
            </Stepper>
          </Box>

          <form onSubmit={handleSubmit}>
            {activeStep === 0 ? (
              <Box>
                <Grid container spacing={4}>
                  {/* Left side - Appointment Details */}
                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '500' }}>
                        Select Date & Treatment
                      </Typography>
                      
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Appointment Date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            min: new Date().toISOString().split('T')[0]
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          required
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        
                        <TextField
                          select
                          fullWidth
                          label="Treatment Type"
                          value={selectedTreatment}
                          onChange={(e) => setSelectedTreatment(e.target.value)}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MedicalServices sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        >
                          {treatments.map((treatment) => (
                            <MenuItem key={treatment} value={treatment}>
                              {treatment}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Box>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '500' }}>
                        Select Time Slot
                      </Typography>
                      
                      <Tabs value={timeTabValue} onChange={handleTimeTabChange} sx={{ mb: 2 }}>
                        <Tab label="Morning" icon={<AccessTime />} iconPosition="start" />
                        <Tab label="Evening" icon={<AccessTime />} iconPosition="start" />
                      </Tabs>
                      
                      <Grid container spacing={2}>
                        {displaySlots.map((slot) => (
                          <Grid item xs={6} sm={4} md={3} key={slot.value}>
                            <Button
                              variant={selectedSlot === slot.value ? "contained" : "outlined"}
                              color={selectedSlot === slot.value ? "primary" : "inherit"}
                              onClick={() => setSelectedSlot(slot.value)}
                              fullWidth
                              sx={{ 
                                height: '56px', // Fixed height
                                minWidth: '100px', // Ensure full width
                                borderRadius: 2,
                                backgroundColor: selectedSlot === slot.value ? 'primary.main' : 'background.paper',
                                '&:hover': {
                                  backgroundColor: selectedSlot === slot.value ? 'primary.dark' : '#f5f5f5'
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {slot.display}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Right side - Dentist selection */}
                  <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ 
                      p: 3, // Increased padding from 2 to 3
                      borderRadius: 2, 
                      border: '1px solid #e0e0e0',
                      position: 'sticky',
                      top: 20,
                      height: '100%', // Added to make it fill available height
                      minHeight: '400px' // Added minimum height
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: '600' }}>
                          Select Dentist
                        </Typography>
                        <TextField
                          size="small"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search sx={{ color: 'action.active', fontSize: '1rem' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ 
                            width: '150px',
                            '& .MuiOutlinedInput-root': { 
                              height: '36px',
                              borderRadius: 1,
                              fontSize: '0.85rem'
                            } 
                          }}
                        />
                      </Box>

                      <Box sx={{ 
                        maxHeight: '450px', // Increased from 300px
                        overflowY: 'auto', 
                        pr: 1 
                      }}>
                        {dentists.map((dentist) => (
                          <Card 
                            key={dentist.id} 
                            variant="outlined" 
                            sx={{ 
                              mb: 2.5,
                              borderRadius: 2,
                              borderColor: selectedDentist === dentist.id ? 'primary.main' : 'divider',
                              // Remove this line that adds the blue box-shadow:
                              // boxShadow: selectedDentist === dentist.id ? '0 0 0 2px #1976d2' : 'none',
                              transition: 'all 0.2s ease-in-out'
                            }}
                          >
                            <CardContent sx={{ p: 3 }}> {/* Increased padding from 2 to 3 */}
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}>
                                  {dentist.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: '600' }}>
                                    {dentist.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {dentist.specialty}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                                {/* Increased font size in chip */}
                                <Chip 
                                  label={`⭐ ${dentist.rating}`} 
                                  size="small" 
                                  color="default" 
                                  variant="outlined"
                                  sx={{ borderRadius: 1, fontSize: '0.8rem', py: 0.5 }}
                                />
                                <Chip 
                                  label={`${dentist.experience} exp.`} 
                                  size="small" 
                                  color="default" 
                                  variant="outlined"
                                  sx={{ borderRadius: 1, fontSize: '0.8rem', py: 0.5 }}
                                />
                                {dentist.available && (
                                  <Chip 
                                    label="Available" 
                                    size="small" 
                                    color="success" 
                                    sx={{ borderRadius: 1, fontSize: '0.8rem', py: 0.5 }}
                                  />
                                )}
                              </Box>
                              
                              <Button 
                                variant={selectedDentist === dentist.id ? 'contained' : 'outlined'}
                                color={selectedDentist === dentist.id ? 'primary' : 'inherit'}
                                fullWidth
                                size="medium" // Changed from small to medium
                                onClick={() => setSelectedDentist(dentist.id)}
                                startIcon={<Person />}
                                sx={{ 
                                  borderRadius: 1,
                                  textTransform: 'none',
                                  fontWeight: 500,
                                  fontSize: '0.9rem', // Increased from 0.8rem
                                  py: 1 // Increased from 0.5
                                }}
                              >
                                {selectedDentist === dentist.id ? 'Selected' : 'Select'}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}

                        <Button 
                          variant="text" 
                          color="primary"
                          size="medium" // Changed from small to medium
                          startIcon={<Add />}
                          sx={{ 
                            textTransform: 'none', 
                            display: 'flex', 
                            margin: '0 auto',
                            fontWeight: 500,
                            fontSize: '0.9rem', // Increased from 0.8rem
                            mt: 2, // Increased from 1
                            py: 1
                          }}
                        >
                          Add New Dentist
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleNextStep}
                    disabled={!step1Complete}
                    endIcon={<ArrowForward />}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Continue to Patient Info
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={3}>
                  {/* Appointment Summary */}
                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: '#f5f9ff',
                        borderColor: '#bbd2f8'
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>
                        Appointment Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday sx={{ color: 'primary.main', mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">{date}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ color: 'primary.main', mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">
                              {timeSlots.find(slot => slot.value === selectedSlot)?.display}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MedicalServices sx={{ color: 'primary.main', mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">{selectedTreatment}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '500' }}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Badge sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Date of Birth"
                          value={patientDob}
                          onChange={(e) => setPatientDob(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split('T')[0]
                          }}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Cake sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          select
                          fullWidth
                          label="Gender"
                          value={patientGender}
                          onChange={(e) => setPatientGender(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Transgender sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2,minWidth: 300 } }}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                          <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Alternate Phone"
                          value={patientAltPhone}
                          onChange={(e) => setPatientAltPhone(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Full Address"
                          multiline
                          rows={2}
                          value={patientAddress}
                          onChange={(e) => setPatientAddress(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                <Home sx={{ color: 'primary.main' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handlePrevStep}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Back to Appointment Details
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!step2Complete}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Confirm Appointment
                  </Button>
                </Box>
              </Box>
            )}
          </form>
        </Box>
      </Paper>
    </Container>
  );
}