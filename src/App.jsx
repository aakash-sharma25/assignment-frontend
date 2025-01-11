import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Patient from "./components/Dashboard/manager/Patient";
import PantryStaff from "./components/Dashboard/manager/PantryStaff";
import MealBox from "./components/Dashboard/manager/MealBox";
import ManagerLayout from "./components/Dashboard/ManagerLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Signup />} />
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="patient" element={<Patient />} />
          <Route path="pantrystaff" element={<PantryStaff />} />
          <Route path="mealbox" element={<MealBox />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
