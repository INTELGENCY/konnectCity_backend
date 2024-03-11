import { Request, Response } from "express";
import AdModel, { Ad } from "../../../models/Business/AdModel";
import multer from "multer";
import cloudinary from "cloudinary";

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

export const updateAd = async function (req: Request, res: Response) {
  try {
    upload(req, res, async function (err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      let data = JSON.parse(req.body.data);
      let id: string | undefined = data._id;
      let url: string = "";
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
      const doc = await AdModel.findById({ _id: id });
      if (doc) {
        const result: Ad | null = await AdModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              AdsDetail: data.AdsDetail,
              Link: data.Link,
              AdsUrl: req.files?.length !== 0 ? url : data.AdsUrl,
            },
          },
          { new: true }
        );

        res.status(200).send(result);
      } else {
        console.log("Document not found.");
      }
    });
  } catch (error) {
    console.log("the error is", error);
  }
};
