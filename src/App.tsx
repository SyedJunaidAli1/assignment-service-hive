import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/gigs/:id" element={<GigDetails />} />
      <Route path="/post-gig" element={<PostGig />} />
    </Routes>
  );
}

export default App;
