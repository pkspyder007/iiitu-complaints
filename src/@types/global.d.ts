import { Request, Response, NextFunction } from 'express';
import User from "../models/user";

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
   type MiddleWareFn = (req: Request, res: Response, next: NextFunction) => void;

   type ControllerShape = {
      validate: Function,
      exec: Function,
   }

   namespace Express {
      interface Request {
          user: Partial<User>
      }
  }
}