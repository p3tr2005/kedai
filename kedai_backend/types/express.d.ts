import { Session } from "../src/core/session";

// types/express.d.ts
declare module "express" {
  interface Request {
    user?: Session | null;
  }
}
