import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Token is not provided",
    });
    return;
  }

  jwt.verify(token as string, "accesstoken", (err) => {
    if (err) {
      res.status(403).send({
        message: "Token is invalid",
      });
      return;
    }

    next();
  });
};
