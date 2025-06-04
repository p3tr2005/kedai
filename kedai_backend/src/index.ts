// import "../types/express";
import "dotenv/config";
import cors from "cors";
import { flatten, safeParse } from "valibot";
import express, { type Request, type Response } from "express";
import bcrypt, { compare } from "bcryptjs";

import { Products } from "./core/products";
import { Users } from "./core/users";
import { loginSchema, registerSchema } from "./lib/schemas";
import { createSession } from "./core/session";

const App = express();

App.use(cors());
App.use(express.json());

App.get("/register", async (req: Request, res: Response) => {
  const payload = req.body;

  const {
    output: values,
    success,
    issues,
  } = safeParse(registerSchema, payload);

  if (!success) {
    res.status(400).json({ errors: flatten(issues).nested });

    return;
  }

  const existingUser = await Users.getByName(values.name);

  if (existingUser) {
    res.status(400).json({ errors: "Invalid credentials!" });

    return;
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  await Users.insert({ ...values, password: hashedPassword });

  res.status(201).json({ message: "Successfully register!" });

  return;
});

App.get("/login", async (req: Request, res: Response) => {
  const payload = req.body;

  const { output: values, success, issues } = safeParse(loginSchema, payload);

  if (!success) {
    res.status(400).json({ errors: flatten(issues).nested });

    return;
  }

  const isUserExist = await Users.getByName(values.name);

  if (!isUserExist) {
    res.status(400).json({ errors: "Invalid credentials!" });

    return;
  }

  const isPasswordMatch = await compare(values.password, isUserExist.password);

  if (!isPasswordMatch) {
    res.status(400).json({ errors: "Invalid name or password!" });

    return;
  }

  await createSession(isUserExist.id, res);
});

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
  console.log("[API] - APP RUNNING ON PORT 3001");
});
