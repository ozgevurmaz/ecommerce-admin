import mongoose from "mongoose";
import "./models/categories";
import "./models/products";
import "./models/collections";
import "./models/Customer";
import "./models/Order";

let isConnection: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnection) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "stylie_admin",
    });

    isConnection = true;

  } catch (error) {
    console.log(error);
  }
};
