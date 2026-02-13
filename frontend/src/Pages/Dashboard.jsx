import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import Sidebar from "../components/Sidebar";
import VaultCard from "../components/VaultCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();

  const [showCreate, setShowCreate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("token");

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Protection si pas de token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Charger catégories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };
    if (token) loadCategories();
  }, [token]);

  // Charger vaults
  useEffect(() => {
    let isMounted = true;
    const loadVaults = async () => {
      try {
        const res = await axios.get(`${API_URL}/vaults`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setVaults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        if (isMounted) setVaults([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (token) loadVaults();
    return () => { isMounted = false; };
  }, [token]);

  const handleDeleteVault = async (id) => {
    if (!confirm("Supprimer ce coffre ?")) return;
    try {
      await axios.delete(`${API_URL}/vaults/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVaults((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVaults = selectedCategory
    ? vaults.filter((v) => v.category_id === selectedCategory)
    : vaults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex relative overflow-hidden">

      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 flex items-center justify-between px-12 shadow-xl z-10">
        <div className="flex items-center gap-4 text-white">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
            🛡️
          </div>
          <div>
            <p className="font-bold text-lg tracking-wide">SecureVault</p>
            <p className="text-xs text-white/80">Dashboard sécurisé</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-white/15 backdrop-blur-md text-white font-medium hover:bg-white/25 transition-all duration-200 shadow-md"
        >
          Déconnexion
        </button>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onCreateClick={() => setShowCreate(true)}
      />

      {/* MAIN */}
      <main className="flex-1 pt-28 px-14 pb-14">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mes coffres</h1>
          <p className="text-slate-500">
            Gérez vos identifiants et mots de passe en toute sécurité
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            Chargement des coffres...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {/* CARD CREATE */}
            <div
              onClick={() => setShowCreate(true)}
              className="group bg-white/70 backdrop-blur-xl rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
                ➕
              </div>
              <p className="font-semibold text-slate-700 text-lg">Ajouter un coffre</p>
              <p className="text-sm text-slate-400 mt-1">Site web ou application</p>
            </div>

            {/* VAULT CARDS */}
            {filteredVaults.map((vault) => {
              const category = categories.find(c => c.id === vault.category_id);
              return (
                <VaultCard
                  key={vault.id}
                  vault={vault}
                  category={category}
                  onDelete={handleDeleteVault}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-fadeIn">
            <h2 className="text-xl font-bold text-slate-800 mb-6">✨ Nouveau coffre</h2>

            <Form
              submitLabel="Créer le coffre"
              successMessage="Coffre créé avec succès"
              inputs={[
                { name: "name", label: "Nom du service", type: "text" },
                { name: "url", label: "URL", type: "text" },
                { name: "username", label: "Nom d'utilisateur", type: "text" },
                { name: "password", label: "Mot de passe", type: "password" },
                { name: "category_id", label: "Catégorie", type: "select", options: categories },
              ]}
              onSubmit={async (data) => {
                try {
                  const decodedToken = JSON.parse(atob(token.split(".")[1]));

                  await axios.post(
                    `${API_URL}/vaults`,
                    {
                      user_id: decodedToken.id,
                      category_id: data.category_id,
                      name: data.name,
                      url: data.url || null,
                      username: data.username || null,
                      password: data.password,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  setShowCreate(false);
                } catch (err) {
                  console.error("Erreur création coffre :", err);
                }
              }}
            />

            <button
              onClick={() => setShowCreate(false)}
              className="mt-6 w-full text-sm text-slate-400 hover:text-slate-600 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
