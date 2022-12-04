import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (err: HttpException, req: Request, res: Response) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
};

export default errorMiddleware;
