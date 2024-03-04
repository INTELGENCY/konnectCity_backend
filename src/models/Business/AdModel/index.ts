import mongoose, { Schema, Document } from 'mongoose';

// Define interface for the data
export interface Ad extends Document {
    AdsDetail: string;
    Price: string;
    Link: string;
    AdsUrl: string;
    Stats: {
        Impression: number,
    }
}

// Define schema for the model
const AdSchema: Schema = new Schema({
    AdsDetail: { type: String, required: true },
    Price: { type: String, required: true },
    Link: { type: String, required: true },
    AdsUrl: { type: String, required: true },
    Stats: {
        Impression: { type: Number, required: true },
    }
});

// Create and export the model
const AdModel = mongoose.model<Ad>('Ad', AdSchema);

export default AdModel;
