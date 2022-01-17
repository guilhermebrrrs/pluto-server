import { Address, CreateUserLocationInput, User, UserLocation } from "../types";
import { AddressSchema, UserLocationSchema, UserSchema } from "../schemas";
import { ObjectId } from "mongodb";

class UserLocationRepository {
  public static async create(input: CreateUserLocationInput) {
    try {
      console.log(input.availableDaysAndTimes);

      const user: User = await UserSchema.findById(input.userId);

      const userLocation: UserLocation = await UserLocationSchema.create({
        _id: new ObjectId(),
        user,
        availableDaysAndTimes: input.availableDaysAndTimes,
        placename: input.placename,
      });

      const address: Address = await AddressSchema.create({
        _id: new ObjectId(),
        ...input.address,
      });

      if (address && userLocation) {
        const userLocationAfterUpdate: UserLocation =
          await UserLocationSchema.findByIdAndUpdate(userLocation._id, {
            address,
          });
        const addressAfterUpdate: Address =
          await AddressSchema.findByIdAndUpdate(address._id, { userLocation });

        return !!userLocationAfterUpdate && !!addressAfterUpdate;
      }

      await UserLocationSchema.findOneAndDelete(userLocation._id);
      await AddressSchema.findOneAndDelete(address._id);

      return false;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByUserId(id: string) {
    try {
      const user: User = await UserSchema.findById(id);

      return !!user ? await UserLocationSchema.find().where({ user }) : null;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { UserLocationRepository };
