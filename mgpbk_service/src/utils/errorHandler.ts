import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError";

export function errorMiddleware(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
}
