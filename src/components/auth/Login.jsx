import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", form);
      //   setUser(res.data);
      localStorage.setItem("userData", JSON.stringify(data.user));
      if (data.user?.role === "Manager") {
        // console.log(user);
        navigate("/manager/patient");
      } else {
        navigate("/pantry");
      }
      console.log(data);
      alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("userData");
    user = JSON.parse(user);
    if (!user) {
      return;
    }
    if (user?.role === "Manager") {
      console.log(user);
      navigate("/manager/patient");
    } else {
      navigate("/pantry");
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
