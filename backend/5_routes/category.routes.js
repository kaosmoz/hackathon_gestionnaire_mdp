import express from "express";
import { getAllCategories } from "../4_controllers/category.controller.js";

const router = express.Router();


router.get("/", getAllCategories);

export default router;
