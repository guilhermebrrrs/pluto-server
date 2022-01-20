import { CreateUserLocationInput, User } from "../types";
import { AddressModel, UserLocationModel, UserModel } from "../schemas";
import { ObjectId } from "mongodb";

class UserLocationRepository {
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

  public static async updateUserLocation() {}
}

export { UserLocationRepository };
