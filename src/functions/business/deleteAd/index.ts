import { Request, Response } from "express";
import AdModel from "../../../models/Business/AdModel";

export const deleteAd = async function (req: Request, res: Response) {
    const { id } = req.params;
 console.log("the id is", id)

  try {
    const result = await AdModel.findByIdAndDelete({_id: id});
    res.status(200).send({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error while deleting ad:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}