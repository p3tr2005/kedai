// import "../../types/express";
import { SignJWT, jwtVerify } from "jose";
import { env } from "../lib/env";
import { NextFunction, Request, Response } from "express";

export type Session = {
  id: string;
  expires: Date;
};

const cookieOpts = {
  name: "AUTH_SESSION",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 1000 * 60 * 60 * 24 * 30, // 30d
};

const key = new TextEncoder().encode(env.SECRET);

export async function encrypt(payload: Session) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30day")
    .sign(key);
}

export async function decrypt(session: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string, res: Response) {
  const expires = new Date(Date.now() + cookieOpts.duration);

  const token = await encrypt({ id: userId, expires });

  res
    .cookie(cookieOpts.name, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: cookieOpts.duration,
    })
    .status(200)
    .json({ message: "Successfully login!" });

  return;
}

export async function verifySession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies[cookieOpts.name];

  if (!token) {
    res.status(401).json({ errors: "Not authenticated!" });

    return;
  }

  try {
    const session = await decrypt(token);

    req.user = session;

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
}
