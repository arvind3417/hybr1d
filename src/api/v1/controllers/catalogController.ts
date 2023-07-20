import * as validators from "../helpers/validators";
import { Catalog } from "../models/catalog";
import generateCrud from "../helpers/generateCrud";
import { asyncWrapper } from "../helpers";
import { NextFunction, Request, Response } from "express";

import * as CustomErrors from "../errors";
const FIELDS = [
  { name: "sellerId", validator: validators.isString, required: true },
  { name: "products", validator: validators.isArray,required:true },
  
];

export const {
    getAllMethod: getCatalogs,
    getByIdMethod: getCatalog,
    postMethod: postCatalog,
    patchMethod: patchCatalog,
    deleteMethod: deleteCatalog,
  } = generateCrud(Catalog, FIELDS);
