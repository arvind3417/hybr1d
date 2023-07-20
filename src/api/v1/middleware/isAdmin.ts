import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../helpers";
// import { authenticateToken } from "./authToken";
import * as CustomError from "../errors";
// export const adminMiddleware = async (
//     _req: Request,
//     _res: Response,
//     _next: NextFunction,
//     roles: string[]
//   ) => {
//     if (roles.includes((<any>_req).user.role)) {
//       _next();
//     }

//     // if ((<any>_req).user && (<any>_req).user.isAdmin === true) {
//     //     _next();
//       else {
//         _next(new CustomError.ForbiddenError("Unauthorized access"));
//       }
//   };


export const adminMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if user has the required role
    console.log('====================================');
    console.log((<any>req).user.userId);
    console.log('====================================');
    if (!roles.includes((<any>req).user.role)) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }
    next();
  };
};
