import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostGig() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number>(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/gigs", {
        title,
        description,
        budget,
      });

      navigate("/gigs");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create gig");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-white p-6 rounded shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Post a Gig</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Gig title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Gig description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Gig
        </button>
      </form>
    </div>
  );
}
