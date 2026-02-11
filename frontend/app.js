document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('passwordForm');
    const passwordsList = document.getElementById('passwords');

    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const service = document.getElementById('serviceName').value;
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        const newEntry = { service, user, pass };

        // --- LE HACK DE SYNCHRO ICI ---
        try {
            const response = await fetch('http://localhost:3000/api/passwords', { // L'URL du serveur de ton pote
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry)
            });

            if (response.ok) {
                addPasswordToUI(newEntry);
                passwordForm.reset();
                console.log("Données envoyées à la DB de Maxime !");
            }
        } catch (error) {
            console.error("Erreur de connexion au serveur :", error);
            // On l'ajoute quand même en local pour que ça "fasse vrai" pendant la démo
            addPasswordToUI(newEntry); 
        }
    });

    function addPasswordToUI(entry) {
        const li = document.createElement('li');
        li.classList.add('password-item');
        li.innerHTML = `
            <div>
                <strong>${entry.service}</strong><br>
                <small style="color: #94a3b8;">${entry.user}</small>
            </div>
            <button class="btn-delete" onclick="this.parentElement.remove()" 
                    style="width: auto; padding: 5px 10px; background: #ef4444; font-size: 0.7rem; margin: 0;">
                SUPPR
            </button>`;
        passwordsList.appendChild(li);
    }
});