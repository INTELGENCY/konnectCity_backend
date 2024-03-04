import { Request, Response } from "express";
import AdModel,{Ad} from '../../../models/Business/AdModel';

export const updateStats = async function (req: Request, res: Response) {
    const { id, count } = req.body;
    try {
        // Find the document by ID
        const doc = await AdModel.findById(id);
    
        if (doc) {
          // Get the current impression count
          const currentImpression: number = doc.Stats.Impression;
    
          // Update the document with the incremented impression count
          const result: Ad | null  = await AdModel.findByIdAndUpdate(id, { 'Stats.Impression': currentImpression + count }, { new: true });
          
          res.status(200).send(result);
        } else {
          console.log('Document not found.');
        }
      } catch (error) {
        console.error('Error updating document:', error);
      }
}