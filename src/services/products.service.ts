import { NextFunction, Request, Response } from "express";
import { productModel } from "../mongoose";
import { Types } from "mongoose";
import { PreferenceRequest, Product, Size } from "../types";

type reqBody = {
  product: string;
  image: string;
};

export const getManyById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const idList: { _id: string }[] = req.body;
    const productsList = await productModel.find({ $or: idList });
    if (productsList.length) return res.send(productsList);
    return res.sendStatus(404);
  } catch (error) {
    return res.send(error);
  }
};

export const verifyStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items }: PreferenceRequest = req.body;
    console.log(req.body);
    let sufficientStock: boolean[] = [];
    const list = items.map(async (product) => {
      const item: Size[] = await productModel
        .aggregate([
          { $unwind: "$inventary" },
          { $unwind: "$inventary.sizes" },
          {
            $match: {
              "inventary.sizes._id": new Types.ObjectId(product.id),
            },
          },
          {
            $limit: 1,
          },
          {
            $project: {
              _id: "$inventary.sizes._id",
              size: "$inventary.sizes.size",
              stock: "$inventary.sizes.stock"
            },
          },
        ])
        .exec();
        console.log({ result: item, item: item[0].stock, q: product.quantity});
      sufficientStock.push(item[0].stock >= (product.quantity || 0));
      return item;
    });
    const ready = await Promise.all(list);
    const resultsList = ready.flat(1)
    console.log({ sufficientStock });
    if (sufficientStock.includes(false)) return res.status(403).send(resultsList);
    return next();
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const product: reqBody = JSON.parse(JSON.stringify(req.body));
    const info = JSON.parse(product.product);
    info.image = req.file?.filename as string;
    delete info._id;
    const addProduct = new productModel(info);
    await addProduct.save();
    return res.send("product added");
  } catch (error) {
    return res.send(error);
  }
};

export const getAllAvailableProducts = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const findAllProducts: Product[] = await productModel.find({
      available: true,
    });
    return res.send(findAllProducts);
  } catch (error) {
    return res.send(error);
  }
};

export const getAllProducts = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const findAllProducts: Product[] = await productModel.find({});
    return res.send(findAllProducts);
  } catch (error) {
    return res.send(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    console.log("hi");
    const find: Product | null = await productModel.findByIdAndDelete(id);
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return res.send(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const find: Product | null = await productModel.findById(id);
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return res.send(error);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const category: string = req.params.category;
    const find: Product[] | null = await productModel.find({
      category: category,
    });
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return res.send(error);
  }
};

export const modifyProduct = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const product: Product = req.body;
    const edit = await productModel.findByIdAndUpdate(product._id, product);
    if (edit) return res.send(edit);
    return res.send(404);
  } catch (error) {
    return res.send(error);
  }
};
