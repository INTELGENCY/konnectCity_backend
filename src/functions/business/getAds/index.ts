import { Request, Response } from "express";
import AdModel from "../../../models/Business/AdModel";

export const getAllAds = async function (req: Request, res: Response) {
    try {
        const result = await AdModel.find({});
        res.status(200).send(result);
    } catch (error) {
        
    }
}