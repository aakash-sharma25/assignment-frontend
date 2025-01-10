import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const SelectPantryStaffDialog = ({ open, onClose, onSelect }) => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPantryStaff = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/manager/all-pantryStaff");
        setPantryStaff(response.data.pantryStaff);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pantry staff data:", error);
        setLoading(false);
      }
    };

    if (open) {
      fetchPantryStaff();
    }
  }, [open]);

  const handleSubmit = () => {
    if (selectedStaff) {
      onSelect(selectedStaff);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select Pantry Staff</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel>Pantry Staff</InputLabel>
            <Select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              {pantryStaff.map((staff) => (
                <MenuItem key={staff._id} value={staff._id}>
                  {staff.info.name} ({staff.info.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!selectedStaff}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectPantryStaffDialog;
