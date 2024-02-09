// Import mongoose
import mongoose, { Schema, Document } from "mongoose";

// Define interface representing a document in MongoDB
interface IUser extends Document {
  BuildingName: string;
  Price: number;
  Status: string;
  Img_Url: string[];
  Coordinates: string;
  Stats: string;
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
  createdAt: { type: Date, default: Date.now },
});

// Define and export the User model
const MapBox = mongoose.model<IUser>("MapBoxData", MapBoxSchema);
export default MapBox;
