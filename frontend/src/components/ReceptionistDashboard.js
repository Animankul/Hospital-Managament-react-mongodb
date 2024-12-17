import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceptionistDashboard.css'; // Import the CSS file

function ReceptionistDashboard() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = { name, age, gender, healthIssues };
    try {
      await axios.post('http://localhost:5000/api/patients', patientData);
      alert("Patient added successfully");
      setName('');
      setAge('');
      setGender('');
      setHealthIssues('');
    } catch (error) {
      alert("Error adding patient");
    }
  };

  const handleViewGrantedAppointments = () => {
    navigate('/granted-appointments'); // Navigate to the granted appointments page
  };

  return (
    <div className="receptionist-dashboard">
      <header className="dashboard-header">
        <h1>Receptionist Dashboard</h1>
        <p className="dashboard-subheading">Manage patient records and view appointments</p>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="patient-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-input"
          />
          <textarea
            placeholder="Health Issues"
            value={healthIssues}
            onChange={(e) => setHealthIssues(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
          <button type="submit" className="btn-submit">Add Patient</button>
        </form>
      </div>

      <div className="appointments-button-container">
        <button className="btn-view-appointments" onClick={handleViewGrantedAppointments}>
          <i className="fa fa-arrow-right"></i> View Granted Appointments
        </button>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
