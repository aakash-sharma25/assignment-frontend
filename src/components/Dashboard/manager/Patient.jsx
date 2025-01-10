import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import AddDietChart from "./AddDietChart";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDietModal, setOpenDietModal] = useState(false);
  const [patientId, setPatientId] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    age: "",
    gender: "",
    phone: "",
    secondaryPhone: "",
    notes: "",
  });

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/v1/manager/patients");
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for adding a new patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/manager/add-patient",
        formData
      );
      setPatients([...patients, response.data.patient]);
      setOpenModal(false); // Close the modal
      setFormData({
        name: "",
        diseases: "",
        allergies: "",
        roomNumber: "",
        bedNumber: "",
        age: "",
        gender: "",
        phone: "",
        secondaryPhone: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Patient
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Bed</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.roomDetails?.roomNumber}</TableCell>
                <TableCell>{patient.roomDetails?.bedNumber}</TableCell>
                <TableCell>{patient.contactInfo?.phone}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setPatientId(patient._id);
                      setOpenDietModal(true);
                    }}
                  >
                    add diet
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Patient Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Room Number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bed Number"
                  name="bedNumber"
                  value={formData.bedNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Secondary Phone"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Diseases"
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button onClick={() => setOpenModal(false)} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Add Patient
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      {openDietModal && (
        <AddDietChart
          openModal={openDietModal}
          setOpenModal={setOpenDietModal}
          selectedPatientId={patientId}
        />
      )}
    </Container>
  );
};

export default Patient;
