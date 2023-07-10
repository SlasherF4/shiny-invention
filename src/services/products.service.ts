import { NextFunction, Request, Response } from "express";
import { Product, productModel } from "../mongoose";

type reqBody = {
  product: string;
  image: string;
};

type verifyBody = {
  _id: string;
  size: string;
  model: string;
  quantity: number
}

export const getManyById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const idList: { _id: string }[] = req.body;
    const productsList = await productModel.find({ $or: idList });
    if(productsList.length) return res.send(productsList);
    return res.sendStatus(404)
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
    const products: verifyBody[] = req.body;
    const idList = products.map(({_id}) => {
      return { _id };
    });
    const productsList = await productModel.find({ $or: idList });
    const insufficientStock = productsList.map((product) => {
      const current = products.find(e => e._id == product._id as any) as verifyBody;
      const model = product.inventary.find(e => e.model == current.model)
      const size = model?.sizes.find(e => e.size == current.size)
      return size?.stock as number >= current?.quantity
    }).includes(false)
    if(insufficientStock) return res.status(404).send(productsList);
    return next();
  } catch (error) {
    return res.send(error);
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
