import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function ManagerLayout() {
  const navigate = useNavigate();
  return (
    <>
      <Toolbar>
        <AppBar>
          <Box
            padding={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <p style={{}}>Assignment</p>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link to={"/manager/patient"} style={{ color: "white" }}>
                Patinet
              </Link>
              <Link to={"/manager/mealbox"} style={{ color: "white" }}>
                Meal
              </Link>
              <Link to={"/manager/pantrystaff"} style={{ color: "white" }}>
                Pantry
              </Link>
            </Box>
            <Button
              variant="outlined"
              color="white"
              onClick={() => {
                localStorage.clear("userData");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </AppBar>
      </Toolbar>
      <Outlet />
    </>
  );
}
