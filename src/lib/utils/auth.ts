import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../../models/user";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import config from "../config";

export const createEmailVerificationToken = (): string => {
  return uuid();
};

export const createLoginJWT = (userId: string, role: number, email: string): string => {
  const token = jwt.sign(
    { userId, role, email },
    config.get("JWT_SECRET"),
    { expiresIn: "12h" }
  );


  return token;
};

exports.isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === USER_ROLES.ADMIN) {
    next();
  } else {
    res.status(403).json({ msg: "Unauthorized!" });
  }
};

exports.isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === "user") {
    next();
  } else {
    res.status(403).json({ msg: "Unauthorized!" });
  }
};
