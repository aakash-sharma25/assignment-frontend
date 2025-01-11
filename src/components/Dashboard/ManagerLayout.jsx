import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function ManagerLayout() {
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
            <Box sx={{display:"flex" , gap:3}}>
              <Link to={"/manager/mealbox"} style={{ color: "white" }}>
                Meal
              </Link>
              <Link to={"/manager/pantrystaff"} style={{ color: "white" }}>
                Pantry
              </Link>
            </Box>
            <Button>Logout</Button>
          </Box>
        </AppBar>
      </Toolbar>
      <Outlet />
    </>
  );
}
