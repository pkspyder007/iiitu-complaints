import { Router } from "express";
import { addRemark, createComplaint, escalate, getAllComplaintsForAdmin, getAllComplaintsForUser, updateStatus } from "../controllers/complaint.controller";
import { checkAuth, isAdmin } from "../middlewares/auth";

const complainsRouter = Router();

complainsRouter.get('/complaints', checkAuth, getAllComplaintsForUser);

complainsRouter.post('/complaints', checkAuth, createComplaint);

complainsRouter.get('/complaints/all', checkAuth, isAdmin, getAllComplaintsForAdmin);

complainsRouter.post('/complaints/remarks', checkAuth, addRemark);

complainsRouter.post('/complaints/status', checkAuth, updateStatus);

complainsRouter.post('/complaints/escalate', checkAuth, escalate);


export default complainsRouter;