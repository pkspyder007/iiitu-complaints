import { Router } from "express";
import { addRemark, createComplaint, escalate, getAllComplaintsForAdmin, getAllComplaintsForUser, updateStatus } from "../controllers/complaint.controller";
import { checkAuth, isAdmin } from "../middlewares/auth";

const complainsRouter = Router();

complainsRouter.use(checkAuth);

complainsRouter.get('/complaints', getAllComplaintsForUser);

complainsRouter.post('/complaints', createComplaint);

complainsRouter.get('/complaints/all', isAdmin, getAllComplaintsForAdmin);

complainsRouter.post('/complaints/remarks', addRemark);

complainsRouter.post('/complaints/status', updateStatus);

complainsRouter.post('/complaints/escalate', escalate);


export default complainsRouter;