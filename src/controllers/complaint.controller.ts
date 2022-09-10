import { Request, Response } from "express";
import { Complaint } from "../models/complaint";
import { validtors } from "../lib/validators";
import { getErrorMessageString } from "../lib/utils";

export const createComplaint = async (req: Request, res: Response) => {
  try {
    // validate user body
    const validateResult = validtors.createComplain.safeParse(req.body);
    if (!validateResult.success) {
      return res.status(401).json({
        success: false,
        message: getErrorMessageString(validateResult),
      });
    }

    const complain = await Complaint.create({ ...req.body });

    if(!complain) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while creating complain"
        });
    }

    return res.status(201).json({
        success: true,
        message: "Complain created successfully"
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Something went wrong while creating user"
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
      const complains = await Complaint.find({ });
  
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
