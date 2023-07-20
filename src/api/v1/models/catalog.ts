import mongoose from 'mongoose';

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
