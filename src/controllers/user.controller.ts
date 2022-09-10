import { Request, Response } from "express";
import _ from "lodash";
import { getErrorMessageString, hashPassword } from "../lib/utils"
import { validtors } from "../lib/validators";
import { User } from "../models/user";
import { sendEmail } from "../lib/utils/email";
import { verifyEmailTemplate } from "../lib/misc/verifyEmailTemplate";
import { createEmailVerificationToken } from "../lib/utils/auth";


export const createUser = async (req: Request, res: Response) => {
    try {
        // validate user body
        const validateResult = validtors.createUser.safeParse(req.body);
        if(!validateResult.success) {
            return res.status(401).json({
                success: false,
                message: getErrorMessageString(validateResult)
            });
        }

        // check for user in DB
        let user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.status(409).json({
                success: false,
                message: "Email Already Exists"
            });
        }

        // encrypt password
        const hashedPassword = await hashPassword(req.body.password);
        
        const token = createEmailVerificationToken();
        user = await User.create({ ...req.body, password: hashedPassword, token });
        if (user) {
            //send verification email
            await sendEmail(
                req.body.email,
                "VERIFY EMAIL @ IIITU COMPLAINTS PORTAL",
                verifyEmailTemplate(
                  `${req.protocol}://${req.get("host")}/auth/verifyEmail/${
                    user._id
                  }/${token}`
                )
              );

            return res.status(201).json({
                success: true,
                message: "User created successfully"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while creating user"
            });
        }
    } catch (error: any) {
        console.error(error);
        
        res.status(501).json({
            message: error.message
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        // check for user in DB
        let user = await User.findOne({ _id: req.params.id });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User NOT FOUND"
            });
        }
        
        return res.status(200).json({
            success: true,
            user: _.pick(user, ['_id', 'name', 'phone', 'email', 'role', 'phone'])
        })
    } catch (error: any) {
        res.status(501).json({
            message: error.message
        });
    }
}