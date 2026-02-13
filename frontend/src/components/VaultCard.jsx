import { useState } from "react";

export default function VaultCard({ vault, category, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      onClick={() => setShowPassword(!showPassword)}
      className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{vault.name}</h3>
        {vault.username && (
          <p className="text-sm text-slate-500 mb-1">👤 {vault.username}</p>
        )}
        {vault.url && (
          <p className="text-sm text-slate-400 truncate">🌐 {vault.url}</p>
        )}
        {vault.password && (
          <p className="text-sm text-slate-600 mt-1">
            🔑 {showPassword ? vault.password : "••••••••"}
          </p>
        )}
      </div>

      {category && (
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 font-medium">
          {category.name}
        </span>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(vault.id);
        }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200"
      >
        ✕
      </button>
    </div>
  );
}
