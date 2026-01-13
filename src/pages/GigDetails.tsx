import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
}

const GigDetails = () => {
  const { id } = useParams();
  console.log(id)
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!gig) return <div className="p-4">Gig not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{gig.title}</h1>
      <p>{gig.description}</p>
      <p className="font-semibold">Budget: ₹ {gig.budget}</p>
      <p className="text-sm text-gray-600">Status: {gig.status}</p>
    </div>
  );
};

export default GigDetails;
