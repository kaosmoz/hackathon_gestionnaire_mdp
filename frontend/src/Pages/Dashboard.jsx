import { useState } from "react";

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(null);

  const passwords = [
    {
      id: 1,
      name: "Gmail",
      category: "Social",
      color: "bg-blue-100 text-blue-600",
      url: "https://gmail.com",
      username: "jean.dupont@gmail.com",
      password: "password123",
    },
    {
      id: 2,
      name: "GitHub",
      category: "Travail",
      color: "bg-purple-100 text-purple-600",
      url: "https://github.com",
      username: "jeandupont",
      password: "password123",
    },
    {
      id: 3,
      name: "Banque en ligne",
      category: "Finance",
      color: "bg-green-100 text-green-600",
      url: "https://mabanque.fr",
      username: "jdupont",
      password: "password123",
    },
    {
      id: 4,
      name: "Amazon",
      category: "Shopping",
      color: "bg-orange-100 text-orange-600",
      url: "https://amazon.fr",
      username: "jean.dupont@gmail.com",
      password: "password123",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center">
            🛡️
          </div>
          <div>
            <p className="font-semibold leading-none">SecureVault</p>
            <span className="text-xs text-gray-500">
              Gestionnaire de mots de passe
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button>⚙️</button>
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center">
            JD
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-72 p-6 space-y-6">
          <button className="w-full bg-slate-900 text-white py-2 rounded-lg flex items-center justify-center gap-2">
            ➕ Nouveau mot de passe
          </button>

          {/* Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-semibold mb-2">🔒 Statistiques</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex justify-between">
                <span>Total</span>
                <span>{passwords.length}</span>
              </li>
              <li className="flex justify-between text-orange-500">
                <span>Mots de passe faibles</span>
                <span>0</span>
              </li>
              <li className="flex justify-between">
                <span>Doublons</span>
                <span>0</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-semibold mb-2">📂 Catégories</p>
            <ul className="text-sm space-y-2">
              {[
                "Tous",
                "Social",
                "Travail",
                "Finance",
                "Shopping",
                "Autre",
              ].map((cat, i) => (
                <li
                  key={i}
                  className={`px-3 py-2 rounded-lg cursor-pointer ${
                    cat === "Tous"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-slate-100"
                  }`}>
                  {cat}
                </li>
              ))}
            </ul>
          </div>


        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Rechercher un mot de passe..."
            className="w-full mb-6 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passwords.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-4 relative">
                {/* top */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <a
                      href={item.url}
                      className="text-sm text-blue-500 hover:underline">
                      {item.url}
                    </a>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${item.color}`}>
                    {item.category}
                  </span>
                </div>

                {/* username */}
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-500">Nom d'utilisateur</p>
                    <p>{item.username}</p>
                  </div>
                  <button>📋</button>
                </div>

                {/* password */}
                <div className="mt-3 flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-500">Mot de passe</p>
                    <p>
                      {showPassword === item.id ? item.password : "••••••••••"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setShowPassword(
                          showPassword === item.id ? null : item.id,
                        )
                      }>
                      👁️
                    </button>
                    <button>📋</button>
                  </div>
                </div>

                {/* menu */}
                <button className="absolute top-3 right-3">⋮</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
