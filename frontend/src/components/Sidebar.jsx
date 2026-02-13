import React from "react";

export default function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  onCreateClick,
}) {
  return (
    <aside className="w-72 bg-white/60 backdrop-blur-2xl pt-28 px-6 pb-10 space-y-10 shadow-xl">
      {/* Nouveau coffre */}
      <button
        onClick={onCreateClick}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
      >
        ➕  Nouveau coffre
      </button>

      {/* Catégories */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
          Catégories
        </p>

        <ul className="space-y-2">
          <li
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl cursor-pointer font-medium transition
              ${selectedCategory === null ? "bg-indigo-100 text-indigo-600" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"}`}
          >
            Tous
          </li>

          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl cursor-pointer font-medium transition
                ${selectedCategory === cat.id ? "bg-indigo-100 text-indigo-600" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"}`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
