import {
  CollectionStatus,
  CreateUserLocationInput,
  UpdateUserLocationInput,
  User,
} from "../types";
import { AddressModel, UserLocationModel, UserModel } from "../schemas";
import { ObjectId } from "mongodb";
import { CollectionRequestService } from "./CollectionRequestService";

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
        latitude: input.latitude,
        longitude: input.longitude,
      });

      const address = await AddressModel.create({
        _id: new ObjectId(),
        ...input.address,
      }).catch((err) => {
        throw new Error(err.message);
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
          (location) => location._id.toString !== userLocation._id.toString()
        );

        userLocation.user = undefined;

        await user.save();
        await userLocation.save();

        await Promise.all(
          userLocation.collectionRequests.map(async (item) => {
            item.collectionStatus = CollectionStatus.CANCELED;
            await CollectionRequestService.cancelById(item?._id?.toString());
          })
        );

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
