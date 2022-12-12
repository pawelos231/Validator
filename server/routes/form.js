import express from "express";
import { sendForm, renderPage } from "../controllers/form.js";

const router = express.Router();

router.post("/form", sendForm);
router.get("/", renderPage);

export default router;
