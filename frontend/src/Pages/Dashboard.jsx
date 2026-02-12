import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/Form";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Charger les catégories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur chargement catégories :", err);
        setCategories([]);
      }
    };
    loadCategories();
  }, [token]);

  // Charger les vaults
  useEffect(() => {
    let isMounted = true;
    const loadVaults = async () => {
      try {
        const res = await axios.get(`${API_URL}/vaults`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setVaults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur chargement vaults :", err);
        if (isMounted) setVaults([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadVaults();
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
      console.error("Erreur suppression coffre :", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r px-6 py-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-lg">
            🛡️
          </div>
          <div>
            <p className="font-bold">SecureVault</p>
            <p className="text-xs text-gray-500">Password Manager</p>
          </div>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="w-full py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
        >
          ➕ Créer un coffre
        </button>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
            Catégories
          </p>
          <ul className="space-y-2">
            <li
              onClick={() => setVaults(vaults)}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100"
            >
              Tous
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-2">Mes coffres</h1>
        <p className="text-gray-500 mb-8">
          Gérez vos accès et mots de passe en toute sécurité
        </p>

        {loading ? (
          <p>Chargement des coffres...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Tuile "Nouveau coffre" */}
            <div
              onClick={() => setShowCreate(true)}
              className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mb-3">
                ➕
              </div>
              <p className="font-semibold">Nouveau coffre</p>
              <p className="text-sm text-gray-500">
                Ajouter un site ou une application
              </p>
            </div>

            {/* Tuile vaults existants */}
            {vaults.map((vault) => {
              const category = categories.find((c) => c.id === vault.category_id);
              return (
                <div
                  key={vault.id}
                  className="relative bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{vault.name}</h3>
                    {vault.username && <p className="text-sm text-gray-600 mb-1">Utilisateur: {vault.username}</p>}
                    {vault.url && <p className="text-sm text-gray-600 mb-1">URL: {vault.url}</p>}
                    {category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                        {category.name}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteVault(vault.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL CREATE VAULT */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Créer un nouveau coffre</h2>
            <Form
              submitLabel="Créer le coffre"
              successMessage="Coffre créé avec succès"
              inputs={[
                {
                  name: "name",
                  label: "Nom du service",
                  type: "text",
                  validation: { required: "Champ requis" },
                },
                {
                  name: "url",
                  label: "URL",
                  type: "text",
                },
                {
                  name: "username",
                  label: "Nom d'utilisateur",
                  type: "text",
                },
                {
                  name: "password",
                  label: "Mot de passe",
                  type: "password",
                  validation: { required: "Champ requis" },
                },
                {
                  name: "category_id",
                  label: "Catégorie",
                  type: "select",
                  options: categories,
                  validation: { required: "Sélection obligatoire" },
                },
              ]}
              onSubmit={async (data) => {
                try {
                  const decodedToken = JSON.parse(atob(token.split(".")[1]));
                  await axios.post(`${API_URL}/vaults`, {
                    user_id: decodedToken.id,
                    category_id: data.category_id,
                    name: data.name,
                    url: data.url || null,
                    username: data.username || null,
                    password: data.password,
                  }, { headers: { Authorization: `Bearer ${token}` } });
                  setShowCreate(false);
                } catch (err) {
                  console.error("Erreur création coffre :", err);
                }
              }}
            />

            <button
              onClick={() => setShowCreate(false)}
              className="mt-4 w-full text-sm text-gray-500 hover:underline"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
