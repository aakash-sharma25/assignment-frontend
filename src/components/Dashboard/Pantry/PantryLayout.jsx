import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function PantryLayout() {
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
              <Link to={"/pantry/staff"} style={{ color: "white" }}>
                Assigned Task
              </Link>
              <Link to={"/pantry/add-delivery"} style={{ color: "white" }}>
                Add Delivery
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
