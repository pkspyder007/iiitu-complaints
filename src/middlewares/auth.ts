import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import config from "../lib/config";
import { USER_ROLES } from "../models/user";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authtkn = req.cookies.authtkn;
    if (!authtkn) {
      return res
        .status(400)
        .json({ msg: "No auth token found. Please login again." });
    }
    try {
      let decoded = jwt.verify(authtkn, config.get("JWT_SECRET"));
      req.user = decoded;
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Invalid auth token. Please login again." });
    }
  
    next();
  };

  export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === USER_ROLES.ADMIN) {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized!" });
    }
  };
  
  export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === "user") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized!" });
    }
  };
  