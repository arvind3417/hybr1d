import express from "express";
import {
   createOrder,ordersByBuyer,sellers,sellerCatalog
} from "../controllers/buyerController";
import { authenticateToken } from "../middleware/authToken";
import { adminMiddleware } from "../middleware/isAdmin";
import { Roles } from "../../../config/constants";

export const buyerRouter = express.Router();

buyerRouter.route("/list-of-sellers").get(authenticateToken,adminMiddleware([Roles.BUYER]),sellers);
buyerRouter.route("/create-order/:sellerId").post(authenticateToken,adminMiddleware([Roles.BUYER]),createOrder);
buyerRouter.route("/seller-catalog/:sellerId").get(authenticateToken,adminMiddleware([Roles.BUYER]),sellerCatalog);
