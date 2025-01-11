import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response): any => {
  return res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: [],
  });
};
