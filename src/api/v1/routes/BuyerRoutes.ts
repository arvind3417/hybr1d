import express from "express";
import {
   createOrder,ordersByBuyer,sellers,sellerCatalog
} from "../controllers/buyerController";
import { authenticateToken } from "../middleware/authToken";
import { adminMiddleware } from "../middleware/isAdmin";
import { Roles } from "../../../config/constants";

export const buyerRouter = express.Router();


/**
 * @swagger
 * /buyer/list-of-sellers:
 *   get:
 *     tags:
 *       - Buyer
 *     summary: Get a list of sellers
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
 *                     $ref: '#/components/schemas/CreateUserResponse'
 */


buyerRouter.route("/list-of-sellers").get(authenticateToken,adminMiddleware([Roles.BUYER]),sellers);

/**
 * @swagger
 * /buyer/create-order/{sellerId}:
 *   post:
 *     tags:
 *       - Buyer
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sellerId
 *         in: path
 *         required: true
 *         description: ID of the seller to create the order with
 *         schema:
 *           type: string
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
 *                   type: string
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   $ref: '#/components/schemas/CreateOrderInput'
 */

buyerRouter.route("/create-order/:sellerId").post(authenticateToken,adminMiddleware([Roles.BUYER]),createOrder);

/**
 * @swagger
 * /buyer/seller-catalog/{sellerId}:
 *   get:
 *     tags:
 *       - Buyer
 *     summary: Get a specific seller's catalog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sellerId
 *         in: path
 *         required: true
 *         description: ID of the seller to get the catalog for
 *         schema:
 *           type: string
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
 *                   $ref: '#/components/schemas/CreateCatalogResponse'
 */


buyerRouter.route("/seller-catalog/:sellerId").get(authenticateToken,adminMiddleware([Roles.BUYER]),sellerCatalog);
