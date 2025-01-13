import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MealBox = () => {
  const { pathname } = useLocation();
  // console.log(pathname.startsWith("/pantry"));
  const [dietCharts, setDietCharts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDietChart, setSelectedDietChart] = useState(null);
  const [assignType, setAssignType] = useState(""); // "preparation" or "delivery"
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    fetchDietCharts();
    fetchStaff();
  }, []);

  const fetchDietCharts = async () => {
    try {
      const response = await axios.get(
        "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/all-dietCharts",
        {
          withCredentials: true,
        }
      );
      setDietCharts(response.data.dietCharts);
    } catch (error) {
      console.error("Error fetching diet charts:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/all-pantryStaff"
      );
      setStaff(response.data.pantryStaff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleOpenDialog = (dietChart, type) => {
    setSelectedDietChart(dietChart);
    setAssignType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStaff("");
    setSelectedDietChart(null);
    setAssignType("");
  };

  const handleAssignStaff = async () => {
    try {
      if (!selectedStaff) {
        alert("Please select a staff member!");
        return;
      }

      if (assignType === "preparation") {
        await axios.patch(
          "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/pantry/assign-preparation",
          {
            dietChartId: selectedDietChart._id,
            preparationStatus: "In Progress",
            preparedBy: selectedStaff,
          },
          {
            withCredentials: true,
          }
        );
      } else if (assignType === "delivery") {
        await axios.patch(
          "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/pantry/assign-delivery",
          {
            dietChartId: selectedDietChart._id,
            deliveryStatus: "In Progress",
            deliveredBy: selectedStaff,
          },
          {
            withCredentials: true,
          }
        );
      }

      fetchDietCharts(); // Refresh the data
      handleCloseDialog();
    } catch (error) {
      console.error("Error assigning staff:", error);
      alert("Error assigning staff!");
    }
  };

  const updateStatus = async (dietChartId, statusType, statusValue) => {
    try {
      if (statusType === "preparation") {
        await axios.patch(
          "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/pantry/update-preparation-status",
          {
            dietChartId,
            preparationStatus: statusValue,
          },
          {
            withCredentials: true,
          }
        );
      } else if (statusType === "delivery") {
        await axios.patch(
          "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/pantry/update-delivery-status",
          {
            dietChartId,
            deliveryStatus: statusValue,
          },
          {
            withCredentials: true,
          }
        );
      }

      fetchDietCharts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Room Details</TableCell>
              <TableCell>Prepared By</TableCell>
              <TableCell>Delivered By</TableCell>
              <TableCell>Preparation Status</TableCell>
              <TableCell>Delivery Status</TableCell>

              {pathname.startsWith("/manager") && (
                <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dietCharts.map((chart) => (
              <TableRow key={chart._id}>
                <TableCell>{chart.patientId?.name}</TableCell>
                <TableCell>
                  Room {chart.patientId?.roomDetails?.roomNumber}, Bed{" "}
                  {chart.patientId?.roomDetails?.bedNumber}
                </TableCell>
                <TableCell>
                  {chart?.preparedBy?.name}
                  {/* {chart.preparedBy
                    ? staff.find((s) => s._id === chart.preparedBy?.name)?.info.name
                    : "Not Assigned"} */}
                </TableCell>
                <TableCell>{chart?.deliveredBy?.name}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={chart.preparationStatus}
                      onChange={(e) =>
                        updateStatus(chart._id, "preparation", e.target.value)
                      }
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Prepared">Prepared</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={chart.deliveryStatus}
                      onChange={(e) =>
                        updateStatus(chart._id, "delivery", e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                {pathname.startsWith("/manager") && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(chart, "preparation")}
                    >
                      Assign Preparation
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDialog(chart, "delivery")}
                    >
                      Assign Delivery
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Assigning Staff */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {assignType === "preparation"
            ? "Assign Preparation Staff"
            : "Assign Delivery Staff"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Staff</InputLabel>
            <Select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              {staff.map((s) => (
                <MenuItem key={s.info._id} value={s.info._id}>
                  {s.info.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAssignStaff} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealBox;
