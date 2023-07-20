import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyerId: String,
  sellerId: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});




export const Order = mongoose.model('Order', orderSchema);
