import express from "express";
import {
   newCatalog,ordersToSeller
} from "../controllers/sellerController";
import { authenticateToken } from "../middleware/authToken";
import { adminMiddleware } from "../middleware/isAdmin";
import { Roles } from "../../../config/constants";

export const sellerRouter = express.Router();


/**
 * @swagger
 * /seller/orders:
 *   get:
 *     tags:
 *       - Seller
 *     summary: Get a list of orders received by a seller
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateOrderResponseSeller'
 */
sellerRouter.route("/orders").get(authenticateToken,adminMiddleware([Roles.SELLER]),ordersToSeller);


/**
 * @swagger
 * /seller/create-catalog:
 *   post:
 *     tags:
 *       - Seller
 *     summary: Create a new catalog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CreateCatalogInput'
 */
sellerRouter.route("/create-catalog").post(authenticateToken,adminMiddleware([Roles.SELLER]),newCatalog);
