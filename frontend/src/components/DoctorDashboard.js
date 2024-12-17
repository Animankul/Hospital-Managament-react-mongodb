import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa'; // Icons for the calendar and doctor
import './DoctorDashboard.css'; // Import the CSS file

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorName] = useState('Dr. Smith'); // Set the doctor's name

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        alert("Error fetching patients: " + error.message);
      }
    }
    fetchPatients();
  }, []);

  const handleAppointment = async (patientId) => {
    try {
      if (!appointmentDate) {
        alert("Please select a valid appointment date and time.");
        return;
      }
      const response = await axios.put(`http://localhost:5000/api/patients/${patientId}/grant-appointment`, {
        doctorName,
        appointmentDate,
      });
      if (response.status === 200) {
        alert("Appointment granted and saved successfully!");
      } else {
        alert("Error in granting appointment.");
      }
    } catch (error) {
      alert("Error granting appointment: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Apollo Hospital</h1>
        <p className="dashboard-subheading">Your patients and appointments at a glance</p>
      </header>

      <div className="appointment-form">
        <div className="date-time-container">
          <label className="date-time-label">
            <FaCalendarAlt className="icon" />
            Select Appointment Date & Time:
          </label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="date-time-input"
            required
          />
        </div>
      </div>

      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient._id} className="patient-card">
            <div className="card-header">
              <FaUserMd className="icon" />
              <h2>{patient.name}</h2>
            </div>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Health Issues:</strong> {patient.healthIssues}</p>
            {patient.appointment ? (
              <p><strong>Appointment:</strong> {new Date(patient.appointment.date).toLocaleString()} with {patient.appointment.doctorName}</p>
            ) : (
              <button className="btn-appointment" onClick={() => handleAppointment(patient._id)}>
                Grant Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorDashboard;
