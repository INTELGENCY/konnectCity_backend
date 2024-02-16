import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
// import MapBox from "models/Admin/mapmodel";
import MapBox from "../../../models/Admin/mapmodel";
import { adminMapboxResult } from "../../interfaces";
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/"); // Define the destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create multer instance using custom storage
const upload = multer({ storage: storage });

// Function for to cloudinary
const cloudinaryImageUploadMethod = async (file: any) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, (_err: any, res: any) => {
      resolve({
        res: res.secure_url,
      });
    });
  });
};

export const draft = function (req: Request, res: Response) {
  try {
    upload.array("file")(req, res, async function (err: any) {
      if (err) {
        // Handle multer errors
        return res.status(500).json({ error: err.message });
      }
      // try {
      let data = JSON.parse(req.body.data);

      data.status = JSON.parse(req.body.status);
      data.coordinates = JSON.parse(req.body.Coordinates);
      data.BuildingHeight = JSON.parse(req.body.BuildingHeight);
      data.SeaLevelHeight = JSON.parse(req.body.SeaLevelHeight);
      data.NearCoord = JSON.parse(req.body.NearCoord);
      if (!req.files) {
        // If req.file is undefined, handle the case accordingly
        return res.status(400).json({ error: "No file uploaded" });
      }
      const urls: string[] = [];

      let files: any;
      files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath: any = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
      }
      const multiImage = urls.map((url: any) => url.res);
      // return res.status(200).json(multiImage);
      const result = await MapBox.create({
        BuildingName: data.building_name,
        Price: data.price,
        Status: data.status,
        Img_Url: multiImage,
        Coordinates: {
          longitude: data?.coordinates?.longitude,
          latitude: data?.coordinates?.latitude,
        },
        Stats: {
          Resold: 1,
          Ads: 1,
          TopAds: 1,
          DailyImpression: 1,
        },
        BuildingHeight: data.BuildingHeight,
        SeaLevelHeight: data.SeaLevelHeight,
        BuildingNearCoord: {
          longitude: data.NearCoord.longitude,
          latitude: data.NearCoord.latitude,
        },
      });
      if (result) {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("the catch error is", error);
  }
};
