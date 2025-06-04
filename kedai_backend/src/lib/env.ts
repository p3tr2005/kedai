import { nonEmpty, object, parse, pipe, string } from "valibot";

const envSchema = object({
  DB_FILE_NAME: pipe(string(), nonEmpty()),
  SECRET: pipe(string(), nonEmpty()),
});

export const env = parse(envSchema, process.env);
