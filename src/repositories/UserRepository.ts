import {
  AuthenticateUserInput,
  CreateUserInput,
  UpdateUserPasswordInput,
  User,
} from "../types";
import { UserSchema } from "../schemas";
import { ObjectId } from "mongodb";

class UserRepository {
  public static async authenticate(input: AuthenticateUserInput) {
    try {
      return await UserSchema.findOne(input);
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async create(input: CreateUserInput) {
    try {
      await UserSchema.create({ ...input, _id: new ObjectId() });
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async delete(id: string) {
    try {
      await UserSchema.deleteOne({ _id: id });
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAll() {
    try {
      return await UserSchema.find();
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findById(id: string) {
    try {
      return UserSchema.findOne({ _id: id });
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async update(obj: User) {
    try {
      await UserSchema.findOneAndUpdate({ _id: obj?._id }, obj);
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async updatePassword({
    email,
    newPassword,
    oldPassword,
  }: UpdateUserPasswordInput) {
    console.log(email, newPassword, oldPassword);

    try {
      await UserSchema.findOneAndUpdate(
        {
          email: email,
          password: oldPassword,
        },
        { password: newPassword }
      );
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { UserRepository };
