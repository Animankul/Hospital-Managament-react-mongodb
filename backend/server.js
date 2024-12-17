const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection strings
const mongoURI = 'mongodb+srv://anishkulkarni141:Anish184507@cluster0.gq4wi.mongodb.net/Medical';
const grantedDBURI = 'mongodb+srv://anishkulkarni141:Anish184507@cluster0.gq4wi.mongodb.net/Granted';

// MongoDB connections
const medicalDB = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const grantedDB = mongoose.createConnection(grantedDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection logs
medicalDB.once('open', () => console.log("Connected to Medical Database"));
grantedDB.once('open', () => console.log("Connected to Granted Database"));

// Patient schema (same for both databases)
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  healthIssues: String,
  appointment: {
    doctorName: String,
    date: Date,
  },
});

// Models for both databases
const Patient = medicalDB.model('Patient', patientSchema);
const GrantedPatient = grantedDB.model('GrantedPatient', patientSchema);

// Routes

// Add patient details (Receptionist)
app.post('/api/patients', async (req, res) => {
  const { name, age, gender, healthIssues } = req.body;
  const newPatient = new Patient({ name, age, gender, healthIssues });
  try {
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error saving patient" });
  }
});

// Get all patient details (Doctor)
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching patients" });
  }
});

// Grant an appointment with custom date and time (Doctor)
app.put('/api/patients/:id/grant-appointment', async (req, res) => {
  const { id } = req.params;
  const { doctorName, appointmentDate } = req.body;

  try {
    // Find and update the patient in the 'Medical' database
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { appointment: { doctorName, date: new Date(appointmentDate) } },
      { new: true }
    );

    if (!updatedPatient) {
      console.log("Patient not found.");
      return res.status(404).json({ message: "Patient not found" });
    }
    console.log("Updated Patient in Medical DB:", updatedPatient);

    // Create a new patient record in the 'Granted' database
    const grantedPatient = new GrantedPatient({
      ...updatedPatient.toObject(),
      appointment: { doctorName, date: new Date(appointmentDate) },
    });

    await grantedPatient.save();  // Save to grantedAppointments
    console.log("Granted Appointment saved:", grantedPatient);

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Error granting appointment:", error);
    res.status(400).json({ message: "Error granting appointment" });
  }
});

// Get all granted appointments (Receptionist or Admin)
app.get('/api/granted-appointments', async (req, res) => {
  try {
    const grantedAppointments = await GrantedPatient.find();
    res.status(200).json(grantedAppointments);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching granted appointments" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
