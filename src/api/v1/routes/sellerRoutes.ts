import express from "express";
import {
   newCatalog,ordersToSeller
} from "../controllers/sellerController";
import { authenticateToken } from "../middleware/authToken";
import { adminMiddleware } from "../middleware/isAdmin";
import { Roles } from "../../../config/constants";

export const sellerRouter = express.Router();

sellerRouter.route("/orders").get(authenticateToken,adminMiddleware([Roles.SELLER]),ordersToSeller);
sellerRouter.route("/create-catalog").post(authenticateToken,adminMiddleware([Roles.SELLER]),newCatalog);
