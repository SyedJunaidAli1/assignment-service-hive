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

interface Bid {
  _id: string;
  message: string;
  price: number;
  status: string;
  freelancerId: {
    name: string;
    email: string;
  };
}

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get(`/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch(() => setGig(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!gig) return;

    api
      .get(`/bids/${gig._id}`)
      .then((res) => setBids(res.data))
      .catch(() => {
        // not owner or no bids → silently ignore
      });
  }, [gig]);

  const handleHire = async (bidId: string) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully");

      // Refresh page state
      setBids((prev) =>
        prev.map((bid) =>
          bid._id === bidId
            ? { ...bid, status: "hired" }
            : { ...bid, status: "rejected" },
        ),
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to hire");
    }
  };

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/bids", {
        gigId: id,
        message,
        price,
      });

      setSuccess("Bid submitted successfully");
      setMessage("");
      setPrice(0);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit bid");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!gig) return <div className="p-4">Gig not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Gig Info */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{gig.title}</h1>
        <p>{gig.description}</p>
        <p className="font-semibold">Budget: ₹ {gig.budget}</p>
        <p className="text-sm text-gray-600">Status: {gig.status}</p>
      </div>

      {/* Bid Form */}
      {gig.status === "open" && (
        <form
          onSubmit={handleBid}
          className="border p-4 rounded space-y-4 max-w-md"
        >
          <h2 className="text-lg font-medium">Place a Bid</h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <textarea
            placeholder="Message to client"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Your price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit Bid
          </button>
        </form>
      )}

      {bids.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Bids</h2>

          {bids.map((bid) => (
            <div key={bid._id} className="border p-4 rounded space-y-2">
              <p className="font-medium">
                {bid.freelancerId.name} ({bid.freelancerId.email})
              </p>

              <p>{bid.message}</p>
              <p className="font-semibold">₹ {bid.price}</p>

              <p className="text-sm text-gray-600">Status: {bid.status}</p>

              {gig.status === "open" && bid.status === "pending" && (
                <button
                  onClick={() => handleHire(bid._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Hire
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GigDetails;