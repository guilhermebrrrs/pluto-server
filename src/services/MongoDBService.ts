import { Db, MongoClient } from "mongodb";

class MongoDBService {
  private static instance: MongoClient;

  constructor() {}

  public static async getInstance(): Promise<Db> {
    if (!this.instance) await MongoDBService.connect();

    return this.instance?.db(process.env["DATABASE_NAME"]);
  }

  private static async connect(): Promise<void> {
    if (!MongoDBService.instance) {
      const client = new MongoClient(process.env["DATABASE_URL"]);
      client.connect((err, result) => {
        if (err) console.log("err", err);
        if (result) {
          console.log(`Application has been connect to MongoAtlas`);
          MongoDBService.instance = client;
        }
      });
    }
  }
}

export { MongoDBService };
