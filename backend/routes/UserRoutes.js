import express from "express";
const router = express.Router();

import { Login, Register, Update, Delete, Current } from "../controllers/UserController.js";
import { protect } from "../middleware/AuthMiddleware.js";

router.post("/register", Register)
router.post("/login", Login);
router.route('/details').get(protect, Current);
router.route('/update').put(protect, Update);
router.route('/delete').put(protect, Delete);

export default router;