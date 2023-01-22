import express from "express";
const router = express.Router();

import { resetUserPassword, sendPasswordReset } from "../controllers/PasswordResetController.js";

router.post("/", sendPasswordReset);
router.post("/:id/:token", resetUserPassword);

export default router;