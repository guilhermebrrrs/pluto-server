import {
  AuthenticateUserInput,
  CreateUserInput,
  UpdateUserPasswordInput,
  User,
} from "../types";
import { UserModel } from "../schemas";
import { ObjectId } from "mongodb";

class UserRepository {
  public static async authenticate(
    input: AuthenticateUserInput
  ): Promise<User> {
    try {
      return await UserModel.findOne(input);
    } catch (err) {
      console.error(err);
    }
  }

  public static async create(input: CreateUserInput) {
    try {
      return !!(await UserModel.create({ ...input, _id: new ObjectId() }));
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(id: string) {
    try {
      await UserModel.deleteOne({ _id: id });
    } catch (err) {
      console.error(err);
    }
  }

  public static async findAll() {
    try {
      return await UserModel.find();
    } catch (err) {
      console.error(err);
    }
  }

  public static async findById(id: string) {
    try {
      return UserModel.findOne({ _id: id });
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(obj: User) {
    try {
      await UserModel.findOneAndUpdate({ _id: obj?._id }, obj);
    } catch (err) {
      console.error(err);
    }
  }

  public static async updatePassword({
    email,
    newPassword,
    oldPassword,
  }: UpdateUserPasswordInput) {
    try {
      await UserModel.findOneAndUpdate(
        {
          email: email,
          password: oldPassword,
        },
        { password: newPassword }
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export { UserRepository };
