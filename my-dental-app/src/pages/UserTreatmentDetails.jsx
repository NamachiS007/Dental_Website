// src/components/TreatmentDetails.js
import React, { useState, useEffect } from 'react';
import { formatDate, formatCurrency } from '../utils/dateUtils';
import { fetchTreatmentDetails } from '../services/treatmentService';
import '../components/TreatmentDetails.css';

function UserTreatmentDetails({ appointmentId }) {
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appointmentId) return;
    
    const getTreatmentDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchTreatmentDetails(appointmentId);
        setTreatment(data);
        setError(null);
      } catch (err) {
        setError('Failed to load treatment details. Please try again later.');
        console.error('Error fetching treatment details:', err);
      } finally {
        setLoading(false);
      }
    };

    getTreatmentDetails();
  }, [appointmentId]);

  if (!appointmentId) return (
    <div className="no-treatment-selected">
      <p>Please select an appointment to view treatment details.</p>
    </div>
  );

  if (loading) return <div className="loading">Loading treatment details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!treatment) return null;

  return (
    <div className="treatment-details">
      <h2>Treatment Details</h2>
      
      <div className="treatment-header">
        <div className="patient-info">
          <h3>{treatment.patientName}</h3>
          <p>Patient ID: {treatment.patientId}</p>
          <p>Date of Birth: {formatDate(treatment.patientDOB)}</p>
        </div>
        
        <div className="appointment-info">
          <p><strong>Appointment ID:</strong> {treatment.appointmentId}</p>
          <p><strong>Date:</strong> {formatDate(treatment.date)}</p>
          <p><strong>Doctor:</strong> {treatment.doctor}</p>
        </div>
      </div>
      
      <div className="treatment-section">
        <h4>Diagnosis</h4>
        <p>{treatment.diagnosis}</p>
        
        <h4>Procedures Performed</h4>
        <table className="procedures-table">
          <thead>
            <tr>
              <th>Procedure</th>
              <th>Code</th>
              <th>Tooth/Area</th>
              <th>Notes</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {treatment.procedures.map((procedure, index) => (
              <tr key={index}>
                <td>{procedure.name}</td>
                <td>{procedure.code}</td>
                <td>{procedure.area}</td>
                <td>{procedure.notes}</td>
                <td>{formatCurrency(procedure.cost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="total-label">Total</td>
              <td className="total-amount">{formatCurrency(treatment.totalCost)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="treatment-section">
        <h4>Medications Prescribed</h4>
        {treatment.medications.length > 0 ? (
          <ul className="medications-list">
            {treatment.medications.map((medication, index) => (
              <li key={index}>
                <strong>{medication.name}</strong> - {medication.dosage} - {medication.instructions}
              </li>
            ))}
          </ul>
        ) : (
          <p>No medications prescribed.</p>
        )}
      </div>
      
      <div className="treatment-section">
        <h4>Follow-up Recommendation</h4>
        <p>{treatment.followUp.recommendation}</p>
        {treatment.followUp.appointmentDate && (
          <p><strong>Next Appointment:</strong> {formatDate(treatment.followUp.appointmentDate)}</p>
        )}
      </div>
      
      <div className="treatment-section">
        <h4>Notes</h4>
        <p>{treatment.notes || 'No additional notes.'}</p>
      </div>
      
      <div className="treatment-documents">
        <h4>Treatment Documents</h4>
        {treatment.documents.length > 0 ? (
          <ul className="documents-list">
            {treatment.documents.map((document, index) => (
              <li key={index}>
                <a href={document.url} target="_blank" rel="noopener noreferrer">
                  {document.name}
                </a>
                <span className="document-type">({document.type})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents available.</p>
        )}
      </div>
    </div>
  );
}

export default UserTreatmentDetails;