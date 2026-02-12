import * as CategoryModel from "../2_models/category.model.js";


export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getCategories();
    res.json(categories); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
