E-Commerce Marketplace API

Welcome to the E-Commerce Marketplace API! This API provides endpoints to manage an e-commerce marketplace, including user authentication, seller and buyer operations, product catalogs, and order management. The API is built with Node.js and Express and uses MongoDB as the database.

Getting Started

To run the API locally, follow these steps:

1. Clone the repository to your local machine:
   git clone https://github.com/your-username/e-commerce-marketplace-api.git

2. Navigate to the project directory:
   cd e-commerce-marketplace-api

3. Install the required dependencies:
   npm install

4. Configure Environment Variables:
   - Create a .env file in the root directory of the project.
   - Add the following environment variables to the .env file:
     PORT=8001
     BASEURL=/api/v1
     CONNECTIONSTR=mongodb://localhost:27017/e-commerce-db
     JWT_SECRET=your-jwt-secret-key

5. Start the development server:
   npm run dev

The API will now be running on http://localhost:8001/api/v1/.

API Documentation

You can access the Swagger documentation for the API by visiting http://localhost:8001/api/v1/docs in your browser. The Swagger documentation provides detailed information about each endpoint, including request parameters, response types, and authentication requirements.

Endpoints

The API provides the following endpoints:

- POST /api/v1/auth/register: Register a new user.
- POST /api/v1/auth/login: User login.
- GET /api/v1/buyer/list-of-sellers: Get a list of sellers.
- POST /api/v1/buyer/create-order/:sellerId: Create a new order with a specific seller.
- GET /api/v1/buyer/seller-catalog/:sellerId: Get a specific seller's catalog.
- GET /api/v1/seller/orders: Get a list of orders received by a seller.
- POST /api/v1/seller/create-catalog: Create a new product catalog for a seller.

Contributing

Contributions to this project are welcome! If you find a bug, have a feature request, or want to make any improvements, please open an issue or submit a pull request. We appreciate your contributions and feedback.

License

This project is licensed under the MIT License.

---

Thank you for using the E-Commerce Marketplace API! If you have any questions or need further assistance, feel free to reach out. Happy coding!
