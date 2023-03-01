import express from "express";
import { getUsers, loginController, registerController, testController } from "../controller/authController.js";
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

export default router;
