import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(String(process.env.MONGODB_URL), { dbName: 'fca-db' });
        console.log("[fca-server]: Connected to Database.");
    } catch (err) {
        console.log(err);
    }
}