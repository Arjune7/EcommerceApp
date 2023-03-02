import express from "express";
import { getUsers, loginController, registerController, testController, forgotPasswordController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", registerController);

//GETUSERS || METHOD GET
router.get("/people", getUsers);

//LOGIN || METHOD GET
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

export default router;
