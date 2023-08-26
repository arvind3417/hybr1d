// POST /api/buyer/create-order/:seller_id
// GET /api/buyer/list-of-sellers
// GET /api/buyer/seller-catalog/:seller_id

import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as CustomErrors from "../errors";
import { httpResponse } from "../helpers";
import { User } from "../models/users";
import asyncWrapper from "../helpers/asyncWrapper";
import { Catalog } from "../models/catalog";
import { Order } from "../models/orders";
import normalizeModel from "../helpers/normalizer";
import * as validators from "../helpers/validators";
import { buyerRouter } from "../routes/BuyerRoutes";

const FIELDS = [
    { name: "buyerId", validator: validators.isString },
    { name: "sellerId", validator: validators.isString, },
    { name: "products", validator: validators.isArray, },
  
    
  ];


  //
// user, catalog, quantity

  export const sellerCatalog = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
        try {
            const { sellerId } = _req.params;
            const catalog = await Catalog.findOne({ sellerId }).populate('products');
            _res
            .status(StatusCodes.OK)
            .json(
              httpResponse(
                true,
                `Seller Catalog retrieved successfully`,
                catalog
              )
            );
          } catch (error:any) {
            return _next(new CustomErrors.InternalServerError(error.message));

          }
    }
  );


export const createOrder = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
        try {
         
            
            const order = await Order.create(normalizeModel({buyerId: (<any>_req).user.userId, sellerId:_req.params.sellerId, products: _req.body.products}, FIELDS));
            _res
            .status(StatusCodes.CREATED)
            .json(
              httpResponse(
                true,
                'Order created successfully',
                order
              )
            );
          } catch (error:any) {
            return _next(new CustomErrors.InternalServerError(error.message));

          }
    }
  );

  export const ordersByBuyer = 
  asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
      try {
        const { buyerId } = _req.params;
        const orders = await Order.find({ buyerId }).populate('products');
        _res
        .status(StatusCodes.OK)
        .json(
          httpResponse(
            true,
            `Orders placed by a buyer retrieved successfully`,
            orders
          )
        );
        _res.json(orders);
      } catch (error:any) {
        return _next(new CustomErrors.InternalServerError(error.message));

      }
    }
  );

  export const sellers = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
        try {
            // const sellers = await User.find({ role: 'seller' });
            const sellers = await User.find({ role: 'seller' }).select('-password');
            _res
          .status(StatusCodes.OK)
          .json(
            httpResponse(
              true,
              `Sellers retrieved successfully`,
              sellers
            )
          );
          } catch (error:any) {
            return _next(new CustomErrors.InternalServerError(error.message));

          }
    }
  );