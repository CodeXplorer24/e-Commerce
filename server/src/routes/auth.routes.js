import { Router } from "express";
import {logoutUser, registerUser, loginUser, refreshSession, checkAuth} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh").post(refreshSession);
router.route("/check-auth").get(verifyJWT, checkAuth);
export default router;