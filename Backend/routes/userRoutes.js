import express from "express";
import { LoginUser, RegisterUser } from "../controller/userController.js";
import {
  LoginValidation,
  SignupValidation,
} from "../middleware/AuthValidation.js";

const router = express.Router();

router.route("/register").post(SignupValidation, RegisterUser);
router.route("/login").post(LoginValidation, LoginUser);

export default router;
