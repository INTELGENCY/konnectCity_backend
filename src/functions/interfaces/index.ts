import { ObjectId } from "mongoose";

export interface Coordinates {
    longitude?: number;
    latitude?: number;
}

export interface Stats {
    Resold?: number;
    Ads?: number;
    TopAds?: number;
    DailyImpression?: number;
}
export interface adminMapboxResult {
  _id?: ObjectId;
  BuildingName?: string;
  Price?: number;
  Status?: string;
  Img_Url?: string[];
//   Coordinates?: Coordinates;
//   Stats?: Stats;
//   Coordinates: {
//     longitude?: number;
//     latitude?: number;
//   };
//   Stats: {
//     Resold?: number;
//     Ads?: number;
//     TopAds?: number;
//     DailyImpression?: number;
//   };
}
