import {
  nonEmpty,
  pipe,
  minLength,
  maxLength,
  union,
  literal,
  array,
  InferOutput,
  number,
  object,
  string,
} from "valibot";

export const productSchema = object({
  id: string(),
  imageUrl: string(),
  title: string(),
  description: string(),
  price: number(),
});

export const productsSchema = object({
  products: array(productSchema),
});

export const registerSchema = object({
  name: pipe(
    string("should be valid string!"),
    nonEmpty("should not empty!"),
    maxLength(20, "should be less than 20 characters!")
  ),
  password: pipe(
    string("should be valid string!"),
    nonEmpty("should not empty!"),
    minLength(6, "should at least 6 characters!")
  ),
  role: pipe(union([literal("USER"), literal("ADMIN")])),
});

export const loginSchema = object({
  name: pipe(string("should be valid string!"), nonEmpty("should not empty!")),
  password: pipe(
    string("should be valid string!"),
    nonEmpty("should not empty!"),
    minLength(6, "should at least 6 characters!")
  ),
});

export type registerSchemaType = InferOutput<typeof registerSchema>;
export type loginSchemaType = InferOutput<typeof loginSchema>;

export type Product = InferOutput<typeof productSchema>;
export type Products = InferOutput<typeof productsSchema>;
