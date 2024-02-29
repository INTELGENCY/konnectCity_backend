import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import AdModel from "../../../models/Business/AdModel";

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/AdsImages/"); // Define the destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create multer instance using custom storage
const upload = multer({ storage: storage }).any();

const cloudinaryImageUploadMethod = async (file: any) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, (_err: any, res: any) => {
      resolve({
        res: res.secure_url,
      });
    });
  });
};

export const createAds = function (req: Request, res: Response) {
  try {
    upload(req, res, async function (err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      let data = JSON.parse(req.body.data);
      let url: string="";
      // Ensure req.files is defined and it's an array of files
      if (req.files) {
        // Use type assertion to tell TypeScript that req.files is an array of files
        for (const file of req.files as Express.Multer.File[]) {
            const { path } = file;
            const newPath: any = await cloudinaryImageUploadMethod(path);
            url = newPath.res;
        }
      } else {
        // Handle the case where req.files is undefined
        console.error("No files uploaded");
      }
      const result = await AdModel.create({
          AdsDetail: data.AdsDetail,
          AdsUrl: url,
          Price: data.Price,
          Link: data.Link,
      })
      res.status(200).send(result);
    });
    // res.status(200).send(req.body)
  } catch (error) {
    console.log("the error is", error);
  }
};
