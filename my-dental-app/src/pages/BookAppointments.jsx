import React, { useState } from 'react';

// SVG Icons for use throughout the application
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const MedicalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    <path d="M12 5v16"></path>
    <path d="M5 12h14"></path>
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5"></circle>
    <path d="M20 21a8 8 0 1 0-16 0"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path>
    <path d="M2 21h20"></path>
    <path d="M7 8v2"></path>
    <path d="M12 8v2"></path>
    <path d="M17 8v2"></path>
    <path d="M7 4h.01"></path>
    <path d="M12 4h.01"></path>
    <path d="M17 4h.01"></path>
  </svg>
);

const GenderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5"></circle>
    <path d="M12 14v7"></path>
    <path d="M9 18h6"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Constants
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
  const [timeTabValue, setTimeTabValue] = useState(0);

  const timeSlots = generateTimeSlots();
  const morningSlots = timeSlots.slice(0, 8);
  const eveningSlots = timeSlots.slice(8);

  const handleTimeTabChange = (newValue) => {
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

  // Check if all required fields are filled for each step
  const step1Complete = date && selectedTreatment && selectedDentist && selectedSlot;
  const step2Complete = patientName && patientPhone && patientEmail && patientDob;

  // Filter slots based on selected tab
  const displaySlots = timeTabValue === 0 ? morningSlots : eveningSlots;

  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Book Your Dental Appointment
            </h2>
            
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center ${activeStep >= 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${activeStep >= 0 ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Appointment</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${activeStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Patient Info</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activeStep === 0 ? (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left section - Date & Treatment */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 bg-gray-100 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Select Date & Treatment
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Date Input */}
                        <div className="relative">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="pl-4 pr-3 w-full py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Treatment Select */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MedicalIcon />
                          </div>

                          <select
                            value={selectedTreatment}
                            onChange={(e) => setSelectedTreatment(e.target.value)}
                            className="pl-10 pr-10 w-full py-3 border border-gray-300 rounded-lg text-gray-700 bg-white appearance-none focus:ring-blue-500 focus:border-blue-500"
                            required
                          >
                            <option value="">Select Treatment</option>
                            {treatments.map((treatment) => (
                              <option key={treatment} value={treatment}>
                                {treatment}
                              </option>
                            ))}
                          </select>

                          {/* Custom Dropdown Arrow */}
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gray-100 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Select Time Slot
                      </h3>
                      
                      <div className="flex mb-4">
                        <button
                          type="button"
                          className={`flex items-center pb-3 px-4 ${timeTabValue === 0 ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                          onClick={() => handleTimeTabChange(0)}
                        >
                          <ClockIcon />
                          <span className="ml-2">Morning</span>
                        </button>
                        <button
                          type="button"
                          className={`flex items-center pb-3 px-4 ${timeTabValue === 1 ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                          onClick={() => handleTimeTabChange(1)}
                        >
                          <ClockIcon />
                          <span className="ml-2">Evening</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {displaySlots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => setSelectedSlot(slot.value)}
                            className={`py-3 rounded-lg text-center text-sm transition-colors ${
                              selectedSlot === slot.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right section - Dentist selection */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-100 rounded-xl p-6 h-full">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Choose Your Dentist
                      </h3>
                      
                      <div className="space-y-4">
                        {dentists.map((dentist) => (
                          <div 
                            key={dentist.id}
                            className={`bg-white rounded-xl p-5 border ${
                              selectedDentist === dentist.id
                                ? 'border-blue-500'
                                : 'border-gray-200'
                            } transition-all`}
                          >
                            <div className="flex items-start mb-4">
                              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                {dentist.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <h4 className="font-semibold text-gray-800">{dentist.name}</h4>
                                <p className="text-sm text-gray-500">{dentist.specialty}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                <StarIcon className="text-yellow-500 mr-1" /> {dentist.rating}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                {dentist.experience} exp.
                              </span>
                              {dentist.available && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                  Available Today
                                </span>
                              )}
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => setSelectedDentist(dentist.id)}
                              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedDentist === dentist.id
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {selectedDentist === dentist.id ? 'Selected' : 'Select Dentist'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!step1Complete}
                    className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${
                      step1Complete
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Continue to Patient Info 
                    <ArrowRightIcon className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Appointment Summary */}
                <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-3">
                    Appointment Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Slot Date */}
                    <div className="flex items-center text-gray-700 gap-2">
                      <span className="font-semibold">Selected Slot Date:</span>
                      <CalendarIcon className="text-blue-600 w-5 h-5" />
                      <span>{date}</span>
                    </div>

                    {/* Slot Time */}
                    <div className="flex items-center text-gray-700 gap-2">
                      <span className="font-semibold">Selected Slot Time:</span>
                      <ClockIcon className="text-blue-600 w-5 h-5" />
                      <span>{timeSlots.find(slot => slot.value === selectedSlot)?.display}</span>
                    </div>

                    {/* Treatment Type */}
                    <div className="flex items-center text-gray-700 gap-2">
                      <span className="font-semibold">Selected Treatment Type:</span>
                      <MedicalIcon className="text-blue-600 w-5 h-5" />
                      <span>{selectedTreatment}</span>
                    </div>
                  </div>
                </div>

                {/* Patient Information Form */}
                <div className="bg-gray-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PersonIcon className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EmailIcon className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CakeIcon className="text-gray-500" />
                      </div>
                      <input
                        type="date"
                        value={patientDob}
                        onChange={(e) => setPatientDob(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="pl-10 pr-4 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GenderIcon className="text-gray-500" />
                      </div>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Alternate Phone (Optional)"
                        value={patientAltPhone}
                        onChange={(e) => setPatientAltPhone(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    
                    <div className="relative md:col-span-2 lg:col-span-3">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <HomeIcon className="text-gray-500" />
                      </div>
                      <textarea
                        placeholder="Full Address"
                        rows="2"
                        value={patientAddress}
                        onChange={(e) => setPatientAddress(e.target.value)}
                        className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
                  >
                    <ArrowLeftIcon className="mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!step2Complete}
                    className={`px-6 py-3 rounded-lg text-white font-medium ${
                      step2Complete
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}