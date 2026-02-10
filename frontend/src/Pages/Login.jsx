export default function Login() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          {/* Logo */}
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

          {/*  */}
          <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
            Sécurisez tous vos{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              mots de passe
            </span>{" "}
            <br />
            en un seul endroit
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Gérez, générez et protégez vos identifiants avec un chiffrement de
            niveau militaire.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                title: "Chiffrement AES-256",
                desc: "Vos données sont protégées par un chiffrement de niveau militaire",
                color: "bg-green-100 text-green-600",
                icon: "🔒",
              },
              {
                title: "Génération automatique",
                desc: "Créez des mots de passe ultra-sécurisés en un clic",
                color: "bg-blue-100 text-blue-600",
                icon: "🔑",
              },
              {
                title: "Surveillance active",
                desc: "Alertes en cas de fuite de données ou mot de passe faible",
                color: "bg-purple-100 text-purple-600",
                icon: "👁️",
              },
              {
                title: "Synchronisation cloud",
                desc: "Accédez à vos mots de passe sur tous vos appareils",
                color: "bg-orange-100 text-orange-600",
                icon: "☁️",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white/70 rounded-xl p-4 shadow-sm">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex gap-6 text-sm text-gray-600 pt-4">
            <span>✅ Open Source</span>
            <span>✅ Zero-Knowledge</span>
            <span>✅ RGPD Compliant</span>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center">Bon retour !</h2>
          <p className="text-center text-gray-500 mt-1 mb-6">
            Connectez-vous pour accéder à vos mots de passe
          </p>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="exemple@email.com"
                className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600 accent-black">
                <input type="checkbox" />
                Se souvenir de moi
              </label>
              <button
                type="button"
                className="ml-auto text-indigo-600 hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <button className="w-full bg-linear-to-r from-slate-900 to-slate-800 text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
              Se connecter
            </button>

            <div className="text-center text-xs text-gray-400">
              OU CONTINUER AVEC
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-slate-50">
                G Google
              </button>
              <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-slate-50">
                GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-2">
              Pas encore de compte ?{" "}
              <span className="text-indigo-600 hover:underline cursor-pointer">
                S'inscrire
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
