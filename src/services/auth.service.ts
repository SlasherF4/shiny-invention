import { NextFunction, Request, Response } from "express";
import { userModel } from "../mongoose";
import { generateToken, verifyToken } from "../middlewares/jwt";
import { User } from "../types";

type userToken = {
  email: string;
};

type UserLogin = Omit<User, "role">;

export const loginUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const { email, password }: UserLogin = req.body;
    if (!email || !password) {
      return res.sendStatus(403);
    }
    const login = await userModel.find({ email, password });
    if (login.length > 0) {
      const token = generateToken({ email });
      return res.send({ token });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.send(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const header = req.headers.authorization;
    if (header) {
      const token = header.split(" ")[1];
      const decoded = verifyToken(token) as userToken | false;
      if (!decoded) {
        return res.sendStatus(403);
      }
      const verify = await userModel.findOne({email: decoded.email});
      if (verify) return next();
      return res.sendStatus(403);
    }
    return res.sendStatus(403);
  } catch (error) {
    return res.send(error);
  }
};
