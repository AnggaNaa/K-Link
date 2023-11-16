import express = require("express");
import AuthController from "../controllers/AuthController";
import verifyToken from "../../middlewares/Auth";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", verifyToken, AuthController.check);
router.get("/product", verifyToken, ProductController.find);
router.post("/product", verifyToken, ProductController.create);
router.delete("/product/delete/:id"), verifyToken, ProductController.delete;

export default router;
