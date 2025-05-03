// src/services/appointmentService.js
// Mock service to simulate API calls
export const fetchAppointments = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    return [
      {
        id: 'APT-1001',
        patientId: 'P-5678',
        patientName: 'John Smith',
        dateTime: '2025-04-18T09:30:00',
        doctor: 'Dr. Sarah Wilson',
        type: 'Regular Checkup',
        status: 'Completed',
        notes: 'Patient came in for routine cleaning and checkup.'
      },
      {
        id: 'APT-1002',
        patientId: 'P-9124',
        patientName: 'Emily Johnson',
        dateTime: '2025-04-18T11:00:00',
        doctor: 'Dr. Michael Chen',
        type: 'Root Canal',
        status: 'Completed',
        notes: 'Root canal procedure on upper right molar.'
      },
      {
        id: 'APT-1003',
        patientId: 'P-3421',
        patientName: 'Robert Garcia',
        dateTime: '2025-04-19T14:15:00',
        doctor: 'Dr. Sarah Wilson',
        type: 'Filling',
        status: 'Pending',
        notes: 'Cavity filling on lower left molar.'
      },
      {
        id: 'APT-1004',
        patientId: 'P-7632',
        patientName: 'Linda Martinez',
        dateTime: '2025-04-17T16:45:00',
        doctor: 'Dr. Michael Chen',
        type: 'Wisdom Tooth Extraction',
        status: 'Cancelled', 
        notes: 'Patient cancelled due to personal emergency.'
      },
      {
        id: 'APT-1005',
        patientId: 'P-5678',
        patientName: 'John Smith',
        dateTime: '2025-04-20T10:00:00',
        doctor: 'Dr. Sarah Wilson',
        type: 'Follow-up',
        status: 'Pending',
        notes: 'Follow-up to earlier treatment.'
      },
      {
        id: 'APT-1006',
        patientId: 'P-8901',
        patientName: 'Kelly Thompson',
        dateTime: '2025-04-15T09:00:00',
        doctor: 'Dr. Michael Chen',
        type: 'Teeth Whitening',
        status: 'Completed',
        notes: 'Professional whitening procedure completed.'
      },
      {
        id: 'APT-1007',
        patientId: 'P-4532',
        patientName: 'David Wilson',
        dateTime: '2025-04-19T15:30:00',
        doctor: 'Dr. Sarah Wilson',
        type: 'Consultation',
        status: 'Pending',
        notes: 'Initial consultation for orthodontic treatment.'
      },
      {
        id: 'APT-1008',
        patientId: 'P-3214',
        patientName: 'Sophie Chen',
        dateTime: '2025-04-16T13:15:00',
        doctor: 'Dr. Michael Chen',
        type: 'Emergency',
        status: 'Completed',
        notes: 'Emergency treatment for severe toothache.'
      },
      {
        id: 'APT-1009',
        patientId: 'P-7865',
        patientName: 'James Rodriguez',
        dateTime: '2025-04-18T17:00:00',
        doctor: 'Dr. Sarah Wilson',
        type: 'Crown Fitting',
        status: 'Rescheduled',
        notes: 'Rescheduled at patient request.'
      }
    ];
  };