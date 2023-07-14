import { NextFunction, Request, Response } from "express";
import { categoryModel } from "../mongoose";
import { Category } from "../types";

export const getAllCategories = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const list = await categoryModel.find({});
    return res.send(list);
  } catch (error) {
    return res.send(error);
  }
};

export const addCategory = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const category: Category = req.body;
    const newCategory = new categoryModel(category);
    await newCategory.save();
    return res.send("category added");
  } catch (error) {
    return res.send(error);
  }
};
