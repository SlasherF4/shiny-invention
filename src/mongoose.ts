import { Schema, model, connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

//types

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventary: inventary[]
}

type inventary = {
  model: string;
  sizes: sizes[];
}

type sizes = {
  size: string;
  stock: number;
  weight: number
}

// user
export interface User {
  email: string,
  password: string,
  role: string
}

// categories
export type category = {
  name: string,
  available: boolean
}

//transactions
type Item = {
  product: string,
  model: string,
  size: string,
  price: number
}

export type Transaction = {
  detail: Item[],
  total: number,
  date: Date,
  state: "pending" | "successfull" | "refused"
}

// export type id = Types.ObjectId

export type newProduct = Omit<Product, "_id">

//mongoose and Database

const productSchema = new Schema<newProduct>({
  name: String,
  description: String,
  image: String,
  price: Number,
  brand: String,
  available: Boolean,
  category: String,
  inventary: [{
    model: String,
    sizes: [{
      size: String,
      stock: Number,
      weight: Number
    }]
  }]
})

export const productModel = model<newProduct>("Products", productSchema);

// user
const userSchema = new Schema<User>({
  email: String,
  password: String,
  role: String
})

export const userModel = model<User>("Users", userSchema)

//categories
const categorySchema = new Schema<category>({
  name: String,
  available: Boolean
})

export const categoryModel = model<category>("Categories", categorySchema)

//transactions
const transactionSchema = new Schema<Transaction>({
  detail: [{
    product: String,
    model: String,
    size: String,
    price: Number
  }],
  date: { type: Date, default: Date.now() },
  state: String,
  total: Number
})

export const transactionModel = model<Transaction>("Transactions", transactionSchema)
//database connect

const uri = process.env.DATABASE_URI as string

export const DbConnect = async () => {
  console.log(process.env.DATABASE_AUTH)
  console.log(process.env.DATABASE_USER)
  console.log(process.env.DATABASE_PASS)
  console.log(process.env.DATABASE_URI)
  await connect(uri, {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    authSource: process.env.DATABASE_AUTH,
    dbName: "mystore"
  });
  console.log("connected with database")
}