import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const fields = [
    { name: "email", label: "Email", type: "email", validation: { required: "Email requis" } },
    { name: "password", label: "Mot de passe", type: "password", validation: { required: "Mot de passe requis" } },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // redirection après login réussi
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT GRAPHIC */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 bg-white/70 w-fit px-4 py-2 rounded-full shadow">
            <div className="w-9 h-9 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">🛡️</div>
            <div>
              <p className="font-semibold leading-none">SecureVault</p>
              <span className="text-sm text-gray-500">Votre coffre-fort numérique</span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
            Sécurisez tous vos{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">mots de passe</span> <br />
            en un seul endroit
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Gérez, générez et protégez vos identifiants avec un chiffrement de niveau militaire.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center">Bon retour !</h2>
          <p className="text-center text-gray-500 mt-1 mb-6">
            Connectez-vous pour accéder à vos mots de passe
          </p>

          <Form inputs={fields} onSubmit={onSubmit} submitLabel="Se connecter" />

          <p className="text-center text-sm text-gray-500 pt-4">
            Pas encore de compte ?{" "}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Créer un compte
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
