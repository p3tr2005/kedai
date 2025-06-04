import {
  nonEmpty,
  object,
  pipe,
  string,
  minLength,
  maxLength,
  union,
  literal,
  InferOutput,
} from "valibot";

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
