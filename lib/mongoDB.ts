import mongoose from "mongoose";

let isConnection: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnection) {
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "stylie_admin",
    });
    isConnection = true;
    console.log("✅ Connected to MongoDB");

  } catch (error) {
    console.log(error);
  }
};
