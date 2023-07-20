import express from "express";
import {
    getProducts,
    getProduct,
    postProduct,
    patchProduct,
    deleteProduct
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authToken";
import { adminMiddleware } from "../middleware/isAdmin";
import { Roles } from "../../../config/constants";

export const productRouter = express.Router();

productRouter.route("/product").get(getProducts).post(authenticateToken,adminMiddleware([Roles.BUYER]),postProduct);
productRouter.route("/product/:id").get(authenticateToken,getProduct).patch(authenticateToken,adminMiddleware,patchProduct).delete(authenticateToken,adminMiddleware,deleteProduct);
