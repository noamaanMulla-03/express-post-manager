import { Router } from "express";
import { index, about, contact } from "../controller/index.js";
const router = Router();

router.get("/", index);

router.get("/about", about);

router.get("/contact", contact);

export default router;
