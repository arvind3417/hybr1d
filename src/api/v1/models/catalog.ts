import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
  *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the product.
 *        price:
 *          type: number
 *          default: The price of the product.
 *    CreateCatalogInput:
 *      type: object
 *      required:
 *       - sellerId
 *       - products
 *      properties:
 *        products:
 *          type: array
 *          items: 
 *            $ref: "#/components/schemas/Product"
 *        sellerId:
 *          type: string
 *          default: 123
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateCatalogResponse:
 *      type: object

 *      properties:
 *        sellerId:
 *          type: string
 *        products:
 *          type: array

 * 
 */
const CatalogSchema = new mongoose.Schema({
    // sellerId: String,
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for sellers
        required: true,
      },
    
     products: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
});

export const Catalog  = mongoose.model('Catalog ', CatalogSchema);
