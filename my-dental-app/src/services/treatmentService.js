// src/services/treatmentService.js
// Mock service to simulate API calls
export const fetchTreatmentDetails = async (appointmentId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock treatment data based on appointment ID
    const treatments = {
      'APT-1001': {
        appointmentId: 'APT-1001',
        patientId: 'P-5678',
        patientName: 'John Smith',
        patientDOB: '1975-06-12',
        date: '2025-04-18T09:30:00',
        doctor: 'Dr. Sarah Wilson',
        diagnosis: 'Healthy teeth with minor tartar buildup',
        procedures: [
          {
            name: 'Routine Cleaning',
            code: 'D1110',
            area: 'Full mouth',
            notes: 'Regular cleaning performed',
            cost: 85.00
          },
          {
            name: 'X-Ray',
            code: 'D0210',
            area: 'Full mouth',
            notes: 'Annual full mouth x-ray',
            cost: 120.00
          }
        ],
        totalCost: 205.00,
        medications: [],
        followUp: {
          recommendation: 'Continue regular brushing and flossing. Schedule next cleaning in 6 months.',
          appointmentDate: '2025-10-18T10:00:00'
        },
        notes: 'Patients oral hygiene has improved since last visit.',
        documents: [
          {
            name: 'X-Ray Results',
            type: 'Image',
            url: '#'
          }
        ]
      },
      'APT-1002': {
        appointmentId: 'APT-1002',
        patientId: 'P-9124',
        patientName: 'Emily Johnson',
        patientDOB: '1988-11-24',
        date: '2025-04-18T11:00:00',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Severe decay in upper right molar (tooth #3) requiring root canal treatment',
        procedures: [
          {
            name: 'Root Canal Therapy',
            code: 'D3330',
            area: 'Tooth #3',
            notes: 'Complete root canal treatment on molar',
            cost: 950.00
          },
          {
            name: 'Temporary Crown',
            code: 'D2970',
            area: 'Tooth #3',
            notes: 'Temporary crown placed',
            cost: 250.00
          }
        ],
        totalCost: 1200.00,
        medications: [
          {
            name: 'Amoxicillin',
            dosage: '500mg',
            instructions: 'Take 1 capsule three times a day for 7 days'
          },
          {
            name: 'Ibuprofen',
            dosage: '600mg',
            instructions: 'Take 1 tablet every 6 hours as needed for pain'
          }
        ],
        followUp: {
          recommendation: 'Return in 2 weeks for permanent crown placement',
          appointmentDate: '2025-05-02T14:30:00'
        },
        notes: 'Patient tolerated procedure well. Root canal was successful with no complications.',
        documents: [
          {
            name: 'Pre-Treatment X-Ray',
            type: 'Image',
            url: '#'
          },
          {
            name: 'Post-Treatment X-Ray',
            type: 'Image',
            url: '#'
          },
          {
            name: 'Treatment Consent Form',
            type: 'PDF',
            url: '#'
          }
        ]
      },
      'APT-1006': {
        appointmentId: 'APT-1006',
        patientId: 'P-8901',
        patientName: 'Kelly Thompson',
        patientDOB: '1992-03-17',
        date: '2025-04-15T09:00:00',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Dental staining appropriate for whitening procedure',
        procedures: [
          {
            name: 'In-Office Teeth Whitening',
            code: 'D9972',
            area: 'Full mouth',
            notes: 'Professional whitening treatment using hydrogen peroxide gel activated with LED light',
            cost: 350.00
          }
        ],
        totalCost: 350.00,
        medications: [],
        followUp: {
          recommendation: 'Avoid staining foods and beverages for 48 hours. Continue using whitening toothpaste.',
          appointmentDate: null
        },
        notes: 'Patient achieved 5 shades whiter. Very satisfied with results.',
        documents: [
          {
            name: 'Before Photos',
            type: 'Image',
            url: '#'
          },
          {
            name: 'After Photos',
            type: 'Image',
            url: '#'
          },
          {
            name: 'Whitening Procedure Consent',
            type: 'PDF',
            url: '#'
          }
        ]
      },
      'APT-1008': {
        appointmentId: 'APT-1008',
        patientId: 'P-3214',
        patientName: 'Sophie Chen',
        patientDOB: '1983-09-05',
        date: '2025-04-16T13:15:00',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Acute pulpitis in lower left premolar (tooth #20) with abscess formation',
        procedures: [
          {
            name: 'Emergency Pulpectomy',
            code: 'D3221',
            area: 'Tooth #20',
            notes: 'Emergency removal of pulp to alleviate pain',
            cost: 375.00
          },
          {
            name: 'Drainage of Abscess',
            code: 'D7510',
            area: 'Buccal space, left mandible',
            notes: 'Incision and drainage of abscess',
            cost: 225.00
          }
        ],
        totalCost: 600.00,
        medications: [
          {
            name: 'Clindamycin',
            dosage: '300mg',
            instructions: 'Take 1 capsule four times a day for 10 days'
          },
          {
            name: 'Hydrocodone/Acetaminophen',
            dosage: '5-325mg',
            instructions: 'Take 1 tablet every 6 hours as needed for severe pain'
          }
        ],
        followUp: {
          recommendation: 'Return in 3 days for follow-up. Will need complete root canal therapy once infection resolves.',
          appointmentDate: '2025-04-19T09:30:00'
        },
        notes: 'Emergency treatment provided for severe infection. Patient had significant swelling which was addressed. Pain was substantially reduced by end of appointment.',
        documents: [
          {
            name: 'Emergency X-Ray',
            type: 'Image',
            url: '#'
          },
          {
            name: 'Prescription',
            type: 'PDF',
            url: '#'
          }
        ]
      }
    };
    
    return treatments[appointmentId] || null;
  };  