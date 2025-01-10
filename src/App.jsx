import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Patient from "./components/Dashboard/manager/Patient";
import PantryStaff from "./components/Dashboard/manager/PantryStaff";
import MealBox from "./components/Dashboard/manager/MealBox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Signup />} />
        <Route path="/manager/patient" element={<Patient />} />
        <Route path="/manager/pantrystaff" element={<PantryStaff />} />
        <Route path="/manager/mealbox" element={<MealBox />} />
      </Routes>
    </>
  );
}

export default App;
