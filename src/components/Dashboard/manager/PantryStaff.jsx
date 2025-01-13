import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const PantryStaff = () => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "PantryStaff",
  });

  // Fetch pantry staff data
  useEffect(() => {
    fetchPantryStaff();
  }, []);

  const fetchPantryStaff = async () => {
    try {
      const response = await axios.get(
        "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/all-pantryStaff",
        {
          withCredentials: true,
        }
      );
      setPantryStaff(response.data.pantryStaff);
    } catch (error) {
      console.error("Error fetching pantry staff data:", error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/add-pantryStaff",
        formData,
        {
          withCredentials: true,
        }
      );
      fetchPantryStaff();
      setOpenModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "PantryStaff",
      });
    } catch (error) {
      console.error("Error adding pantry staff:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pantry Staff Management</h1>

      {/* Add Staff Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add Pantry Staff
      </Button>

      {/* Pantry Staff Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Phone</TableCell> */}
              <TableCell>Assigned Meals</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantryStaff.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.info.name}</TableCell>
                <TableCell>{staff.info.email}</TableCell>
                {/* <TableCell>{staff.info.phone}</TableCell> */}
                <TableCell>
                  {staff.assignedMeal && staff.assignedMeal.length > 0
                    ? staff.assignedMeal.join(", ")
                    : "No meals assigned"}
                </TableCell>
                <TableCell>
                  {/* Placeholder buttons for further actions */}
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error">
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Pantry Staff</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ marginBottom: "10px" }}
            />
            <DialogActions>
              <Button onClick={() => setOpenModal(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PantryStaff;
