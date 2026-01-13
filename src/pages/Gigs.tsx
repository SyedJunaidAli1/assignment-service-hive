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
    <div className="flex text-center justify-between px-2 py-4 h-screen">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Available Gigs</h1>

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
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/post-gig">Post a Gig</a>
        </button>
      </div>
    </div>
  );
};

export default Gigs;
