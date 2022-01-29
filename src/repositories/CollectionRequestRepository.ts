import {
  CollectionRequestModel,
  UserLocationModel,
  UserModel,
} from "../schemas";
import {
  CollectionRequest,
  CollectionRequestMaterial,
  CreateCollectionRequestInput,
} from "../types";
import { ObjectId } from "mongodb";

class CollectionRequestRepository {
  public static async create(input: CreateCollectionRequestInput) {
    try {
      const user = await UserModel.findOne({ _id: input.userId });
      const userLocation = await UserLocationModel.findOne({
        _id: input.locationId,
      });

      if (!!user && !!userLocation) {
        const collectionRequest = await CollectionRequestModel.create({
          _id: new ObjectId(),
          collectionRequestMaterials: input.collectionRequestMaterials.map(
            (item) => ({
              ...(item as CollectionRequestMaterial),
              _id: new ObjectId(),
            })
          ),
          createdBy: user,
          details: input.details,
          location: userLocation,
        });

        if (!!collectionRequest) {
          user.collectionRequests.push(collectionRequest);
          userLocation.collectionRequests.push(collectionRequest);

          user.save();
          userLocation.save();

          return true;
        }

        user.delete();
        userLocation.delete();

        return false;
      }

      return false;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByUserId(id: string) {
    try {
      const user = await UserModel.findOne({ _id: id });

      return !!user
        ? await CollectionRequestModel.find({ createdBy: user })
        : ([] as CollectionRequest[]);
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { CollectionRequestRepository };
