import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Dashboard from "./pages/Dashboard";
import Diseases from "./pages/Diseases";
import Signup from "./pages/Signup";
import Notification from "./pages/Notification";
import Details from "./pages/Details";
import History from "./pages/History";
import UserCrop from "./pages/UserCrop";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar on Signup page */}
      {location.pathname !== "/signup" && <Navbar />}

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home text/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/history" element={<History />} />
        <Route path="/usercrops" element={<UserCrop />} />
        <Route path="/details" element={<Details />} />
        <Route path="/notify" element={<Notification />} />
      </Routes>
    </>
  );
};

export default App;
