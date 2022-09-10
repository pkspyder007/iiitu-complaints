import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../../models/user";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import config from "../config";

exports.checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authtkn = req.cookies.authtkn;
  if (!authtkn) {
    return res
      .status(400)
      .json({ msg: "No auth token found. Please login again." });
  }
  try {
    let decoded = jwt.verify(authtkn, config.get("JWT_SECRET"));
    req.user = decoded;
    // console.log("Data: " , decoded);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Invalid auth token. Please login again." });
  }

  next();
};

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
