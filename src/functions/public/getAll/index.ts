import { Request, Response } from "express";
import MapBox from "../../../models/Admin/mapmodel";

export const getAll = async function (req: Request, res: Response) {
  try {
    const result = await MapBox.find();

    res.status(200).send(result);
  } catch (error) {
    console.log("the catch error is", error);
  }
};
