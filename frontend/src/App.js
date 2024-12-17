import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import GrantedAppointmentsDashboard from './components/GrantedAppointmentsDashboard';
import HomePage from './components/HomePage'; // Import the HomePage component
import ReceptionistDashboard from './components/ReceptionistDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home page route */}
        <Route path="/receptionist" element={<ReceptionistDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/granted-appointments" element={<GrantedAppointmentsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
