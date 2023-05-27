import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (info: Object) => {
  const token = jwt.sign(info, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const verify = jwt.verify(token, secretKey, { complete: false });
    return verify;
  } catch (error: any) {
    return false;
  }
};
