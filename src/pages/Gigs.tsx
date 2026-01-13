import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
}

const Gigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/gigs")
      .then((res) => setGigs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">Loading gigs...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Available Gigs</h1>

      {gigs.length === 0 && <p>No gigs found.</p>}

      {gigs.map((gig) => (
        <div
          key={gig._id}
          onClick={() => navigate(`/gigs/${gig._id}`)}
          className="border p-4 rounded cursor-pointer hover:bg-gray-700"
        >
          <h2 className="text-lg font-medium">{gig.title}</h2>
          <p className="text-gray-400">{gig.description}</p>
          <p className="font-semibold mt-2">₹ {gig.budget}</p>
        </div>
      ))}
    </div>
  );
}

export default Gigs;
