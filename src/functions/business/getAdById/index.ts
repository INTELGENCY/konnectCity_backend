import { Request, Response } from "express";
import AdModel from "../../../models/Business/AdModel";

export const getAdById = async function (req: Request, res: Response) {
    const { _id } = req.body;
    try {
        const result = await AdModel.findById(_id);
        res.status(200).send(result);
    } catch (error) {
        
    }
}