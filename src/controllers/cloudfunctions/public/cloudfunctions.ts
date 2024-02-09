import express, { Request, Response, NextFunction } from "express";
import { PublicFunctions } from "../../../functions/_exports";

const cloudFunctions = { ...PublicFunctions };

export default (req: Request, res: Response) => {
  const { cloudFunctionName } = req.params;

  if (!cloudFunctions.hasOwnProperty(cloudFunctionName))
    return res
      .json({
        error: "Resource Not Found",
        message: "The requested API endpoint could not be found.",
      })
      .status(400);
  let cloudFunctionToCall: any = cloudFunctions[cloudFunctionName];
  if (typeof cloudFunctionToCall !== "function")
    return res.json({ error: "Internal error" }).status(500);
  return cloudFunctionToCall(req, res);
};
