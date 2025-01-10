// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// const MealBox = () => {
//   const [dietCharts, setDietCharts] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedDietChart, setSelectedDietChart] = useState(null);
//   const [selectedStaff, setSelectedStaff] = useState("");
//   const [updateType, setUpdateType] = useState(""); // "Preparation" or "Delivery"

//   // Fetch all diet charts and staff on component mount
//   useEffect(() => {
//     const fetchDietChartsAndStaff = async () => {
//       setLoading(true);
//       try {
//         // const [dietChartResponse:data, staffResponse] = await Promise.all([
//         //   axios.get("/api/v1/manager/all-dietCharts"),
//         //   axios.get("/api/v1/manager/all-pantryStaff"),
//         // ]);
//         const { data: dietChartResponse } = await axios.get(
//           "/api/v1/manager/all-dietCharts"
//         );
//         const { data: staffResponse } = await axios.get(
//           "/api/v1/manager/all-pantryStaff"
//         );

//         setDietCharts(dietChartResponse.dietCharts);
//         setStaff(staffResponse.pantryStaff);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDietChartsAndStaff();
//   }, []);

//   const handleDialogOpen = (dietChart, type) => {
//     setSelectedDietChart(dietChart);
//     setUpdateType(type);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setSelectedDietChart(null);
//     setSelectedStaff("");
//   };

//   const handleUpdateStatus = async () => {
//     try {
//       const endpoint =
//         updateType === "Preparation"
//           ? "/api/v1/manager/update-preparationStatus"
//           : "/api/v1/manager/update-deliveryStatus";

//       const data =
//         updateType === "Preparation"
//           ? {
//               dietChartId: selectedDietChart._id,
//               preparationStatus: "In Progress",
//               preparedBy: selectedStaff,
//             }
//           : {
//               dietChartId: selectedDietChart._id,
//               deliveryStatus: "In Progress",
//               deliveredBy: selectedStaff,
//             };

//       const response = await axios.put(endpoint, data);

//       console.log(response.data.message);
//       setDietCharts((prev) =>
//         prev.map((chart) =>
//           chart._id === selectedDietChart._id ? response.data.dietChart : chart
//         )
//       );

//       handleDialogClose();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Diet Charts</h1>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Patient Name</TableCell>
//                 <TableCell>Room Details</TableCell>
//                 <TableCell>Prepared By</TableCell>
//                 <TableCell>Delivered By</TableCell>
//                 <TableCell>Preparation Status</TableCell>
//                 <TableCell>Delivery Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {dietCharts?.map((chart) => (
//                 <TableRow key={chart._id}>
//                   <TableCell>{chart.patientId?.name || "N/A"}</TableCell>
//                   <TableCell>
//                     {chart.patientId?.roomDetails
//                       ? `Room: ${chart.patientId.roomDetails.roomNumber}, Bed: ${chart.patientId.roomDetails.bedNumber}`
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>{chart.preparedBy?.name || "N/A"}</TableCell>
//                   <TableCell>{chart.deliveredBy?.name || "N/A"}</TableCell>
//                   <TableCell>{chart.preparationStatus}</TableCell>
//                   <TableCell>{chart.deliveryStatus}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleDialogOpen(chart, "Preparation")}
//                     >
//                       Assign Prepared By
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDialogOpen(chart, "Delivery")}
//                       style={{ marginLeft: 10 }}
//                     >
//                       Assign Delivered By
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Dialog for assigning staff */}
//       <Dialog
//         open={dialogOpen}
//         onClose={handleDialogClose}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           Assign {updateType === "Preparation" ? "Prepared By" : "Delivered By"}
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Staff</InputLabel>
//             <Select
//               value={selectedStaff}
//               onChange={(e) => setSelectedStaff(e.target.value)}
//             >
//               {staff.map((member) => (
//                 <MenuItem key={member._id} value={member._id}>
//                   {member.info.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdateStatus}
//             color="primary"
//             disabled={!selectedStaff}
//           >
//             Assign
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default MealBox;

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

const MealBox = () => {
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
      const response = await axios.get("/api/v1/manager/all-dietCharts");
      setDietCharts(response.data.dietCharts);
    } catch (error) {
      console.error("Error fetching diet charts:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/v1/manager/all-pantryStaff");
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
        await axios.patch("/api/v1/pantry/assign-preparation", {
          dietChartId: selectedDietChart._id,
          preparationStatus: "In Progress",
          preparedBy: selectedStaff,
        });
      } else if (assignType === "delivery") {
        await axios.patch("/api/v1/pantry/assign-delivery", {
          dietChartId: selectedDietChart._id,
          deliveryStatus: "In Progress",
          deliveredBy: selectedStaff,
        });
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
        await axios.patch("/api/v1/pantry/update-preparation-status", {
          dietChartId,
          preparationStatus: statusValue,
        });
      } else if (statusType === "delivery") {
        await axios.patch("/api/v1/pantry/update-delivery-status", {
          dietChartId,
          deliveryStatus: statusValue,
        });
      }

      fetchDietCharts(); // Refresh the data
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
              <TableCell>Actions</TableCell>
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
                  {chart.preparedBy
                    ? staff.find((s) => s._id === chart.preparedBy)?.info.name
                    : "Not Assigned"}
                </TableCell>
                <TableCell>
                  {chart.deliveredBy
                    ? staff.find((s) => s._id === chart.deliveredBy)?.info.name
                    : "Not Assigned"}
                </TableCell>
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
