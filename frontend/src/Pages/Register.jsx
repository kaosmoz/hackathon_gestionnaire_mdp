import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Définition des champs du formulaire
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: { required: "Email requis" },
    },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      validation: { required: "Mot de passe requis" },
    },
  ];

  // Fonction appelée à la soumission du formulaire
  const onSubmit = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // Appel à l'API pour créer le compte
      await axios.post(`${apiUrl}/auth/register`, {
        email: data.email,
        password: data.password,
        
      }, 
  { withCredentials: true });

      // Ne pas naviguer directement → Form.jsx affichera le message de confirmation
    } catch (error) {
      console.error(error);
      throw error; // Form.jsx gérera l'affichage de l'erreur
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Section texte / branding */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 bg-white/70 w-fit px-4 py-2 rounded-full shadow">
            <div className="w-9 h-9 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              🛡️
            </div>
            <div>
              <p className="font-semibold leading-none">SecureVault</p>
              <span className="text-sm text-gray-500">
                Votre coffre-fort numérique
              </span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
            Sécurisez tous vos{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              mots de passe
            </span>{" "}
            <br />
            en un seul endroit
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Gérez, générez et protégez vos identifiants avec un chiffrement
            de niveau militaire.
          </p>
        </div>

        {/* Section formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center">Créer un compte</h2>
          <p className="text-center text-gray-500 mt-1 mb-6">
            Remplissez le formulaire pour vous inscrire
          </p>

          <Form
            inputs={fields}
            onSubmit={onSubmit}
            submitLabel="S'inscrire"
            successMessage="Un email de confirmation vous a été envoyé. Vérifiez votre boîte mail."
          />

          <p className="text-center text-sm text-gray-500 pt-4">
            Déjà un compte ?{" "}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
