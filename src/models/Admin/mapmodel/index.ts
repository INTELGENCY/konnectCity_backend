// Import mongoose
import mongoose, { Schema, Document } from "mongoose";

// // interface for coordinates
// interface Coordinates {
//   longitude: number;
//   latitude: number;
// }

// // interface for stats
// interface Stats {
//   Resold: number;
//   Ads: number;
//   TopAds: number;
//   DailyImpression: number;
// }

// Define interface representing a document in MongoDB
interface IUser extends Document {
  BuildingName: string;
  Price: number;
  Status: string;
  Img_Url: string[];
  Coordinates: {
    longitude: number;
    latitude: number;
  };
  Stats: {
    Resold: number;
    Ads: number;
    TopAds: number;
    DailyImpression: number;
  };
  BuildingHeight: number;
  SeaLevelHeight: number;
  BuildingNearCoord:{
    longitude: number;
    latitude: number;
  }
  AdsImgUrl: string;
  createdAt: Date;
}

// Define mongoose schema for the user model
const MapBoxSchema: Schema = new Schema({
  BuildingName: { type: String, required: true },
  Status: { type: String, required: true },
  Price: { type: String, required: true },
  Img_Url: { type: Array, required: true },
  Coordinates: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  Stats: {
    Resold: { type: Number, required: true },
    Ads: { type: Number, required: true },
    TopAds: { type: Number, required: true },
    DailyImpression: { type: Number, required: true },
  },
  BuildingHeight: {type: Number, required: true},
  SeaLevelHeight: {type: Number, required: true},
  BuildingNearCoord:{
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  AdsImgUrl:{type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

// Define and export the User model
const MapBox = mongoose.model<IUser>("MapBoxData", MapBoxSchema);
export default MapBox;
