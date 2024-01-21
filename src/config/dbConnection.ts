import mongoose from "mongoose";

export const connectToDbFunc = async () => {
    console.log("Database connection is in progress...");
    try {
        let url: string = process.env.MONGODB_CONNECTION_URL ?? '';
        await mongoose.connect(url);
        console.log(`Connected to Database`);
    } catch (error) {
        console.log("Error connecting database", error);
    }

}