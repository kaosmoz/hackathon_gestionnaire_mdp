import * as VaultModel from "../2_models/vault.model.js";


export const createVault = async (req, res) => {
  try {
    const data = {
      user_id: req.user.id,
      category_id: req.body.category_id,
      name: req.body.name,
      url: req.body.url || null,
      username: req.body.username || null,
      password: req.body.password,
    };

    console.log(data);
    

    await VaultModel.createVault(data);
    res.status(201).json({ message: "Coffre créé avec succès" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const getVaults = async (req, res) => {
  try {
    const vaults = await VaultModel.getVaultsByUser(req.user.id);
    res.json(vaults);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const getVault = async (req, res) => {
  try {
    const vault = await VaultModel.getVaultById(req.params.id, req.user.id);
    if (!vault) return res.status(404).json({ message: "Coffre introuvable" });
    res.json(vault);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const updateVault = async (req, res) => {
  try {
    const data = {
      category_id: req.body.category_id,
      name: req.body.name,
      url: req.body.url || null,
      username: req.body.username || null,
      password: req.body.password,
    };

    await VaultModel.updateVaultById(req.params.id, req.user.id, data);
    res.json({ message: "Coffre mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteVault = async (req, res) => {
  try {
    const success = await VaultModel.deleteVaultById(req.params.id, req.user.id);
    if (!success) return res.status(404).json({ message: "Coffre introuvable" });

    res.json({ message: "Coffre supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
