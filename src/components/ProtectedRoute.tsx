import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return authorized ? children : <Navigate to="/login" />;
}
