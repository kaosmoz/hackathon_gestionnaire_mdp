import db from "../1_config/db.js";

/**
 * Récupérer tous les coffres d'un utilisateur
 */
export const getVaultsByUser = async (userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM vaults WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Erreur getVaultsByUser :", error.message);
    throw error;
  }
};

/**
 * Récupérer un coffre par ID
 */
export const getVaultById = async (id, userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM vaults WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Erreur getVaultById :", error.message);
    throw error;
  }
};

/**
 * Créer un nouveau coffre
 */
export const createVault = async (data) => {
  try {
    console.log(data);
    
    await db.query(

      
      `INSERT INTO vaults
       (user_id, category_id, name, url, username, password, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        data.user_id,
        data.category_id,
        data.name,
        data.url,
        data.username,
        data.password,
      ]
    );
  } catch (error) {
    console.error("Erreur createVault :", error.message);
    throw error;
  }
};

/**
 * Mettre à jour un coffre
 * Champs non modifiables : id, user_id, created_at
 */
export const updateVaultById = async (id, userId, data) => {
  try {
    await db.query(
      `UPDATE vaults
       SET category_id = ?,
           name = ?,
           url = ?,
           username = ?,
           password = ?,
           updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [
        data.category_id,
        data.name,
        data.url,
        data.username,
        data.password,
        id,
        userId,
      ]
    );
  } catch (error) {
    console.error("Erreur updateVaultById :", error.message);
    throw error;
  }
};

/**
 * Supprimer un coffre
 */
export const deleteVaultById = async (id, userId) => {
  try {
    const [result] = await db.query(
      "DELETE FROM vaults WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Erreur deleteVaultById :", error.message);
    throw error;
  }
};
