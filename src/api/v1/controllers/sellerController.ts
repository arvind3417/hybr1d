
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
import { Product } from "../models/product";



export const sellerCatalog = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
        try {
            const { sellerId } = _req.params;
            const catalog = await Catalog.findOne({ sellerId }).populate('products');
            _res.json(catalog);
          } catch (error:any) {
            return _next(new CustomErrors.InternalServerError(error.message));

          }
    }
  );

 

  export const ordersToSeller = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
      try {
        const { sellerId } = _req.params;
        const orders = await Order.find({ sellerId }).populate('products');
        _res
        .status(StatusCodes.OK)
        .json(
          httpResponse(
            true,
            `Orders received by a seller retrieved successfully`,
            orders
          )
        );
      } catch (error:any) {
        _next(new CustomErrors.BadRequestError(error.message));

      }
    }
  );

  const catalog_FIELDS = [
    { name: "sellerId", validator: validators.isObjectId },
    { name: "products", validator: validators.isArray },
    
  ];

  export const newCatalog = asyncWrapper(
    async (_req: Request, _res: Response, _next: NextFunction) => {
        try {
            const {  products } = _req.body;
            const existingCatalog = await Catalog.findOne({sellerId: (<any>_req).user.userId });

            if (existingCatalog) {
           return _next(
                new CustomErrors.NotFoundError("A catalog already exists for this seller'")
              );
            }
            const createdProducts = await Product.create(products);

            const catalog = await Catalog.create(normalizeModel({sellerId : (<any>_req).user.userId,products:createdProducts}, catalog_FIELDS));

        _res
        .status(StatusCodes.OK)
        .json(
          httpResponse(
            true,
            "Catalog created successfully",
            catalog
          )
        );
          } catch (error:any) {
            _next(new CustomErrors.BadRequestError(error.message));

          }
    }
  );