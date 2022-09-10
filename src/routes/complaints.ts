import { Router } from "express";
import { createComplaint, getAllComplaintsForAdmin, getAllComplaintsForUser } from "../controllers/complaint.controller";
import { checkAuth, isAdmin } from "../middlewares/auth";

const complainsRouter = Router();

complainsRouter.use(checkAuth);

complainsRouter.get('/complaints', getAllComplaintsForUser);

complainsRouter.post('/complaints', createComplaint);

complainsRouter.get('/complaints/all', isAdmin, getAllComplaintsForAdmin);

export default complainsRouter;