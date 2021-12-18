import {
  AuthenticateUserInput,
  CreateUserInput,
  UpdateUserPasswordInput,
  User,
} from "../types";
import { UserSchema } from "../schemas";

class UserRepository {
  public static async authenticateUser(
    authenticateUserInput: AuthenticateUserInput
  ) {
    try {
      const user = await UserSchema.find({ ...authenticateUserInput });

      return user ?? false;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async create(input: CreateUserInput) {
    try {
      await UserSchema.create({ ...input });
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
    _id,
    newPassword,
  }: UpdateUserPasswordInput) {
    try {
      UserSchema.findOneAndUpdate({ _id }, { password: newPassword });
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { UserRepository };
