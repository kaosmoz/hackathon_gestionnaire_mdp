import express from "express";
import { authMiddleware } from "../3_middlewares/auth.middleware.js";
import { getVaults,getVault,createVault,updateVault,deleteVault } from "../4_controllers/vault.controller.js";

const router = express.Router();


router.use(authMiddleware);


router.get("/", getVaults); 
              
router.get("/:id", getVault);

router.post("/", createVault); 

router.put("/:id", updateVault); 

router.delete("/:id", deleteVault);      

export default router;
