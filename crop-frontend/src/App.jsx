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

  const hideNavbar =
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <Predict />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diseases"
          element={
            <ProtectedRoute>
              <Diseases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usercrops"
          element={
            <ProtectedRoute>
              <UserCrop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notify"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

export default App;