import db from "../1_config/db.js";


export const getCategories = async () => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    return rows;
  } catch (error) {
    console.error("Erreur getCategories :", error.message);
    throw error;
  }
};
