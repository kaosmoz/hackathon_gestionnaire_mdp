import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending"); 
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:5174/`;

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token manquant !");
        return;
      }

      try {
        console.log("Appel backend pour token :", token);

        const res = await axios.get(`${apiUrl}/auth/verify-email?token=${encodeURIComponent(token)}`);
        
        console.log("Réponse backend :", res.data);

        setStatus("success");
        setMessage(res.data.message || "Email vérifié avec succès !");

        // Redirection automatique vers Dashboard après 3 secondes
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        console.error("Erreur vérification token :", err);
        setStatus("error");
        setMessage(err.response?.data?.message || "Erreur lors de la vérification.");
      }
    };

    verify();
  }, [token, apiUrl, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-4">
        {status === "pending" && (
          <p className="text-gray-500">Vérification en cours...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 font-semibold">
            {message} <br />
            Redirection vers le Dashboard...
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 font-semibold">{message}</p>
        )}
      </div>
    </main>
  );
}
