import { Router } from "express";
import {
  addRemark,
  createComplaint,
  escalate,
  getAllComplaintsForAdmin,
  getAllComplaintsForUser,
  getComplaintById,
  updateStatus,
  update
} from "../controllers/complaint.controller";
import { checkAuth, isAdmin } from "../middlewares/auth";

const complainsRouter = Router();

complainsRouter.get("/complaints", checkAuth, getAllComplaintsForUser);

complainsRouter.get('/complaint/:id',checkAuth, getComplaintById);

complainsRouter.post("/complaints", checkAuth, createComplaint);

complainsRouter.get(
  "/complaints/all",
  checkAuth,
  isAdmin,
  getAllComplaintsForAdmin
);

complainsRouter.post("/complaints/remarks", checkAuth, addRemark);

complainsRouter.post("/complaints/update/:id", checkAuth, update);

complainsRouter.post("/complaints/status", checkAuth, updateStatus);

complainsRouter.post("/complaints/escalate", checkAuth, escalate);

export default complainsRouter;
