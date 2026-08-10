import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Random-secret-key";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export interface JwtPayload {
  userId: string;
  email?: string;
}

export function createToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  console.log(decoded);
  return decoded;
}
