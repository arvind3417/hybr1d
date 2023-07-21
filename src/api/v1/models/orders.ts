import mongoose from 'mongoose';
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateOrderInput:
 *      type: object
 *      required:
 *       - buyerId
 *       - sellerId
 *       - products
 *      properties:
 *        products:
 *          type: array
 *          default: example@email.com
 *        sellerId:
 *          type: string
 *          default: 123
 *        buyerId:
 *          type: string
 *          default: 321
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateOrderResponseSeller:
 *      type: object

 *      properties:
 *        products:
 *          type: array
 */
const orderSchema = new mongoose.Schema({
  buyerId: String,
  sellerId: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});




export const Order = mongoose.model('Order', orderSchema);
