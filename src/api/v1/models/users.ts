import mongoose from 'mongoose';
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *       - name
 *       - password
 *       - email
 *       - role
 *      properties:
 *        email:
 *          type: string
 *          default: example@email.com
 *        name:
 *          type: string
 *          default: example
 *        password:
 *          type: string
 *          default: password
 *        role:
 *          type: string
 *          default: buyer
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserResponse:
 *      type: object

 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        role:
 *          type: string
 *        _id:
 *          type: string
 * 
 */
const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String, default: "buyer" },
});

export const User = mongoose.model('User', userSchema);
