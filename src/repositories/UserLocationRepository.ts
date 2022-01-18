import { Address, CreateUserLocationInput, User, UserLocation } from "../types";
import { AddressSchema, UserLocationSchema, UserSchema } from "../schemas";
import { ObjectId } from "mongodb";

class UserLocationRepository {
  public static async create(input: CreateUserLocationInput) {
    try {
      console.log(input);

      const user: User = await UserSchema.findById(input.userId);

      const userLocation = await UserLocationSchema.create({
        _id: new ObjectId(),
        user,
        availableDaysAndTimes: input.availableDaysAndTimes,
        placename: input.placename,
      });

      const address = await AddressSchema.create({
        _id: new ObjectId(),
        ...input.address,
      });

      if (address && userLocation) {
        userLocation.address = address;
        address.userLocation = userLocation;

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
      const user: User = await UserSchema.findById(id);

      //TODO: fix problem: day of week isn't returning
      return !!user
        ? await UserLocationSchema.find()
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
}

export { UserLocationRepository };
