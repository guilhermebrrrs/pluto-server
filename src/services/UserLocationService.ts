import {
  CreateUserLocationInput,
  UpdateUserLocationInput,
  User,
} from "../types";
import { AddressModel, UserLocationModel, UserModel } from "../schemas";
import { ObjectId } from "mongodb";

class UserLocationService {
  public static async create(input: CreateUserLocationInput) {
    try {
      const user = await UserModel.findById(input.userId);

      if (!user) return false;

      const userLocation = await UserLocationModel.create({
        _id: new ObjectId(),
        user,
        availableDaysAndTimes: input.availableDaysAndTimes,
        placename: input.placename,
      });

      const address = await AddressModel.create({
        _id: new ObjectId(),
        ...input.address,
      });

      if (address && userLocation) {
        user.locations.push(userLocation);
        userLocation.address = address;
        address.userLocation = userLocation;

        await user.save();
        await userLocation.save();
        await address.save();

        return !!(userLocation && address);
      }

      await userLocation?.delete();
      await address?.delete();

      return false;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async deleteById(id: string) {
    try {
      const userLocation = await UserLocationModel.findOne({ _id: id });
      const user = await UserModel.findOne({ _id: userLocation.user._id });

      if (userLocation) {
        user.locations.filter(
          (location) =>
            (location._id as unknown as string) !== (userLocation._id as string)
        );

        user.save();

        await AddressModel.findOneAndDelete({ _id: userLocation.address._id });
        await UserLocationModel.findOneAndDelete({ _id: userLocation._id });

        return true;
      }

      return false;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByUserId(id: string) {
    try {
      const user: User = await UserModel.findById(id);

      return !!user
        ? await UserLocationModel.find()
            .where({ user })
            .populate("address")
            .populate({
              path: "availableDaysAndTimes",
              populate: { path: "day", model: "UserLocation" },
            })
            .exec()
        : [];
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async updateUserLocation(input: UpdateUserLocationInput) {
    try {
      return !!(await UserLocationModel.findOneAndUpdate(
        { _id: input._id },
        {
          address: input.address,
          availableDaysAndTimes: input.availableDaysAndTimes,
          comments: input.comments,
          placename: input.placename,
        }
      ));
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { UserLocationService };
