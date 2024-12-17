import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './GrantedAppointmentsDashboard.css'; // Import the CSS file

function GrantedAppointmentsDashboard() {
  const [grantedAppointments, setGrantedAppointments] = useState([]);

  useEffect(() => {
    async function fetchGrantedAppointments() {
      try {
        const response = await axios.get('http://localhost:5000/api/granted-appointments');
        setGrantedAppointments(response.data);
      } catch (error) {
        alert("Error fetching granted appointments: " + error.message);
      }
    }
    fetchGrantedAppointments();
  }, []);

  return (
    <div className="granted-appointments-dashboard">
      <h1>Granted Appointments</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Doctor</th>
            <th>Appointment Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {grantedAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.age}</td>
              <td>{appointment.appointment.doctorName}</td>
              <td>{new Date(appointment.appointment.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GrantedAppointmentsDashboard;
