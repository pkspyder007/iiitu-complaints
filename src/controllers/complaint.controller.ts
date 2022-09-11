import { Request, Response } from "express";
import { Complaint } from "../models/complaint";
import { validtors } from "../lib/validators";
import { getErrorMessageString } from "../lib/utils";
import { sendEmail } from "../lib/utils/email";
import { escalateEmailTemplate } from "../lib/misc/escalateEmailTemplate";
import { IUser } from "../models/user";
import { logger } from "../middlewares/logger";

export const createComplaint = async (req: Request, res: Response) => {
  try {
    // validate user body
    const payload = { ...req.body, user: req.user.userId };
    const validateResult = validtors.createComplain.safeParse(payload);
    if (!validateResult.success) {
      return res.status(401).json({
        success: false,
        message: getErrorMessageString(validateResult),
      });
    }

    const complain = await Complaint.create({ ...payload });

    if (!complain) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong while creating complain",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Complain created successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating complain",
    });
  }
};

export const getAllComplaintsForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const complains = await Complaint.find({ userId });

    return res.json({
      success: true,
      complains,
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const getAllComplaintsForAdmin = async (req: Request, res: Response) => {
  try {
    const complains = await Complaint.find({});

    return res.json({
      success: true,
      complains,
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const addRemark = async (req: Request, res: Response) => {
  try {
    const complain = await Complaint.findByIdAndUpdate(req.body.complainId, {
      $set: {
        remarks: req.body.remarks,
      },
    });

    return res.json({
      success: true,
      complain,
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const complain = await Complaint.findByIdAndUpdate(req.body.complainId, {
      $set: {
        status: req.body.status,
      },
    });

    return res.json({
      success: true,
      complain,
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const escalate = async (req: Request, res: Response) => {
  try {
    const complain = await Complaint.findByIdAndUpdate(req.body.complainId, {
      $set: {
        status: "ESCALATED",
      },
    }).populate("user");

    if (!complain) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    await sendEmail(
      "pkspyder007@gmail.com",
      "Complaint resolution pending ... Escalation requested",
      escalateEmailTemplate(
        (complain.user as unknown as IUser).name,
        (complain.user as unknown as IUser).rollno,
        complain._id.toString(),
        `${req.protocol}://${req.get("host")}/complaints/pdf/${complain._id}`
      )
    );
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};