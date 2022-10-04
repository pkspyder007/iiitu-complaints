import { Request, Response, NextFunction } from "express";

export const customCors = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [
      "http://localhost:3000",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin!)) {
      res.setHeader("Access-Control-Allow-Origin", origin!);
    }
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", 'true');
    return next();
  }