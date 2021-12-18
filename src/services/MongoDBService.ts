import mongoose from "mongoose";

class MongoDBService {
  public static async connect(): Promise<void> {
    const { connect } = mongoose;
    if (!connect) {
      console.error("connect doesn't exists");
      return;
    }

    connect &&
      (await connect(process.env["DATABASE_URL"], {
        dbName: process.env["DATABASE_NAME"],
      }));
    const status = mongoose.connection.readyState;
    switch (status) {
      case 0:
        console.log("Disconnected from MongoAtlas");
        break;
      case 1:
        console.log("MongoAtlas Connected");
        break;
      case 2:
        console.log("Connecting to MongoAtlas...");
        break;
      case 3:
        console.log("Disconnecting from MongoAtlas...");
        break;
      default:
        console.log("No connection Status");
        break;
    }
  }
}

export { MongoDBService };
