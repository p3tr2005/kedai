import "dotenv/config";
import express, { type Request, type Response } from "express";
import { Products } from "./core/products";
import cors from "cors";
import { seed } from "./lib/seed";

const App = express();

App.use(cors());

App.get("/products", async (req: Request, res: Response) => {
  const query = req.query?.search || "";

  if (!query) {
    const products = await Products.getAll();

    res.status(200).json({ products });
    return;
  }

  const product = await Products.getByTitle(query as string);

  if (!product) {
    res.status(200).json({ products: [] });

    return;
  }

  res.status(200).json({ products: [product] });

  return;
});

App.get("/products/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await Products.get(id);

  res.status(200).json({ product });
});

App.listen(3001, () => {
  console.log("APP RUNNING ON PORT 3001");
});

seed();
