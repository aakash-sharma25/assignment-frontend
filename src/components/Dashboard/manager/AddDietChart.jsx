import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
export default function AddDietChart({
  selectedPatientId,
  openModal,
  setOpenModal,
}) {
  const [formData, setFormData] = useState({
    morningIngredients: "",
    morningInstructions: "",
    afternoonIngredients: "",
    afternoonInstructions: "",
    nightIngredients: "",
    nightInstructions: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDietChart = (e) => {
    e.preventDefault();

    const dietChartData = {
      patientId: selectedPatientId,
      meals: {
        morning: {
          ingredients: formData.morningIngredients,
          instructions: formData.morningInstructions,
        },
        afternoon: {
          ingredients: formData.afternoonIngredients,
          instructions: formData.afternoonInstructions,
        },
        night: {
          ingredients: formData.nightIngredients,
          instructions: formData.nightInstructions,
        },
      },
    };

    axios
      .post(
        "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/add-diet",
        dietChartData
      )
      .then((response) => {
        console.log("Diet chart added successfully", response.data.dietChart);
        setOpenModal(false);
        setFormData({
          morningIngredients: "",
          morningInstructions: "",
          afternoonIngredients: "",
          afternoonInstructions: "",
          nightIngredients: "",
          nightInstructions: "",
        });
      })
      .catch((error) => {
        console.error("Error adding diet chart", error);
      });
  };
  const fetchDiet = async () => {
    const { data } = await axios.get(
      "https://assignment-aakashs-projects-ae05d47e.vercel.app/api/v1/manager/diet/" +
        selectedPatientId
    );
    console.log(data);
    setFormData({
      morningIngredients: data?.dietChart?.meals?.morning?.ingredients,
      morningInstructions: data?.dietChart?.meals?.morning?.instructions,
      afternoonIngredients: data?.dietChart?.meals?.afternoon?.ingredients,
      afternoonInstructions: data?.dietChart?.meals?.afternoon?.instructions,
      nightIngredients: data?.dietChart?.meals?.night?.ingredients,
      nightInstructions: data?.dietChart?.meals?.night?.instructions,
    });
  };
  useEffect(() => {
    fetchDiet();
  }, []);

  return (
    <div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Diet Chart</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitDietChart}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Morning Ingredients"
                  name="morningIngredients"
                  fullWidth
                  value={formData.morningIngredients}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Morning Instructions"
                  name="morningInstructions"
                  fullWidth
                  value={formData.morningInstructions}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Afternoon Ingredients"
                  name="afternoonIngredients"
                  fullWidth
                  value={formData.afternoonIngredients}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Afternoon Instructions"
                  name="afternoonInstructions"
                  fullWidth
                  value={formData.afternoonInstructions}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Night Ingredients"
                  name="nightIngredients"
                  fullWidth
                  value={formData.nightIngredients}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Night Instructions"
                  name="nightInstructions"
                  fullWidth
                  value={formData.nightInstructions}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add Diet Chart
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
