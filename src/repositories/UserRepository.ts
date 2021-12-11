import { Document, ObjectId, WithId } from "mongodb";
import { MongoDBService } from "../services";
import { User } from "../types";

class UserRepository {
  private static readonly collectionName = "user";
  private static instance: UserRepository;

  private constructor() {}

  async authenticateUser(email: string, password: string) {
    try {
      const db = await MongoDBService.getInstance();

      const user = await db.collection(UserRepository.collectionName).findOne({
        email,
        password,
      });
      console.log("in auth", user);

      return !!user ?? false;
    } catch (err) {
      console.error(err.message);
    }
  }

  async create(obj: User) {
    try {
      const db = await MongoDBService.getInstance();

      await db.collection(UserRepository.collectionName).insertOne(obj);
    } catch (err) {
      console.error(err.message);
    }
  }

  async delete(id: string) {
    try {
      const db = await MongoDBService.getInstance();

      await db
        .collection(UserRepository.collectionName)
        .deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async getInstance(): Promise<UserRepository> {
    if (!UserRepository.instance)
      UserRepository.instance = new UserRepository();

    return UserRepository.instance;
  }

  async findAll(): Promise<WithId<Document>[]> {
    try {
      const db = await MongoDBService.getInstance();

      return await await db
        .collection(UserRepository.collectionName)
        .find({})
        .toArray();
    } catch (err) {
      console.error(err.message);
    }
  }

  async findById(id: string) {
    try {
      const db = await MongoDBService.getInstance();

      return await await db.collection(UserRepository.collectionName).findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  async update(obj: User) {
    obj.updatedAt = new Date();

    try {
      const db = await MongoDBService.getInstance();

      await db
        .collection(UserRepository.collectionName)
        .findOneAndUpdate({ id: new ObjectId(obj?._id) }, obj);
    } catch (err) {
      console.error(err.message);
    }
  }

  async updatePassword({ id, newPassword }: any) {
    try {
      const db = await MongoDBService.getInstance();

      await db.collection(UserRepository.collectionName).findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            password: newPassword,
            updatedAt: new Date(),
          },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { UserRepository };
