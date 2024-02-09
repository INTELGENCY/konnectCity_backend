import express, { Request, Response, NextFunction } from "express";
import { AdminFunctions } from "../../../functions/_exports";

const cloudFunctions: any = { ...AdminFunctions };
export default (req: Request, res: Response, next: NextFunction) => {
  const { cloudFunctionName } = req.params;
  if (!cloudFunctions.hasOwnProperty(cloudFunctionName))
    return res.json({
      error: "Req not found",
      message: "The requested API endpoint could not be found.",
    });
  const cloudFunctionToCall =
    cloudFunctions[cloudFunctionName as keyof typeof cloudFunctions];
  if (typeof cloudFunctionToCall !== "function")
    return res.json({ error: "Internal error" }).status(500);
  return cloudFunctionToCall(req, res);
};
