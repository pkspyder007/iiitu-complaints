import { Request, Response } from "express";
import { comparePassword } from "../lib/utils";
import { createLoginJWT } from "../lib/utils/auth";
import { User } from "../models/user";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).json({
        message: "Email not found",
      });
    }

    if (!(await comparePassword(req.body.password, user.password))) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }
    // genearate JWT token
    const tkn = createLoginJWT(user._id.toString(), user.role, user.email);
    res.cookie("authtkn", tkn, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).json({
      msg: "Logged in successfully",
      role: user.role,
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("authtkn");
    res.json({ message: "Logged Out" });
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { userId, token } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).send("INVALID USER");
    }

    if (user.token !== token) {
      return res.status(403).send("INVALID TOKEN");
    }

    await user.update({
      token: "",
      verified: true,
    });

    return res.status(200).send("Email verified");
  } catch (error: any) {
    res.status(501).json({
      message: error.message,
    });
  }
};

export const autoLogin = (req: Request, res: Response) => {
    if (req.user) {
      res.json({ loggedIn: true, role: req.user.role });
    } else {
      res.json({ loggedIn: false, role: "" });
    }
  };