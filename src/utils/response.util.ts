import { Response } from "express";

export const responseHandler = (
  res: Response,
  message: string,
  success?: boolean,
  data?: any,
  statusCode?: number,
) => {
  return res.status(statusCode ?? 200).json({
    success: success ?? true,
    message,
    data: data ?? [],
  });
};
