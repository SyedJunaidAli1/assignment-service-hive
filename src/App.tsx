import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/gigs/:id"
        element={
          <ProtectedRoute>
            <GigDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gigs"
        element={
          <ProtectedRoute>
            <Gigs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-gig"
        element={
          <ProtectedRoute>
            <PostGig />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
