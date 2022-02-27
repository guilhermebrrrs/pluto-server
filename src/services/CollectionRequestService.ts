import {
  CollectionRequestMaterialModel,
  CollectionRequestModel,
  UserLocationModel,
  UserModel,
} from "../schemas";
import {
  CollectionRequest,
  CollectionRequestMaterial,
  CollectionStatus,
  CreateCollectionRequestInput,
} from "../types";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

class CollectionRequestService {
  public static async cancelById(id: string) {
    try {
      const collectionRequest = await CollectionRequestModel.findOne({
        _id: id,
      });

      if (!collectionRequest) new Error("CollectionRequest not found!");

      collectionRequest.collectionStatus = CollectionStatus.CANCELED;

      await collectionRequest.save();
    } catch (err) {
      console.log(err.message);
    }
  }

  public static async create(input: CreateCollectionRequestInput) {
    try {
      const user = await UserModel.findOne({ _id: input.userId });
      const userLocation = await UserLocationModel.findOne({
        _id: input.locationId,
      });

      if (!user && !userLocation) {
        console.error(
          "User or User Location are not found. Was not possible to complete the operation!"
        );

        return false;
      }

      const collectionRequest = await CollectionRequestModel.create({
        _id: new ObjectId(),
        collectionStatus: CollectionStatus.OPENED,
        createdBy: user,
        details: input.details,
        location: userLocation,
      });

      if (!collectionRequest) {
        console.error(
          "Collection Request could not be created. Was not possible to complete the operation! "
        );

        return false;
      }

      const collectionRequestMaterialsArray = [] as CollectionRequestMaterial[];

      await Promise.all(
        input.collectionRequestMaterials.map(
          async (item: CollectionRequestMaterial) => {
            await CollectionRequestMaterialModel.create({
              _id: new ObjectId(),
              amount: item.amount,
              description: item.description,
              materialType: item.materialType,
            }).then(
              (collectionRequestMaterial) =>
                !!collectionRequestMaterial &&
                collectionRequestMaterialsArray.push(collectionRequestMaterial)
            );
          }
        )
      );

      if (
        collectionRequestMaterialsArray.length !==
        input.collectionRequestMaterials.length
      ) {
        await Promise.all(
          collectionRequestMaterialsArray.map(
            async (item) => await (item as mongoose.Document).delete()
          )
        );

        console.error(
          "Could not save materials. Was not possible to complete the operation!"
        );

        return false;
      }

      await Promise.all(
        collectionRequestMaterialsArray.map(async (item) => {
          item.collectionRequest = collectionRequest;
          await (item as mongoose.Document).save();
        })
      );

      collectionRequest.collectionRequestMaterials =
        collectionRequestMaterialsArray;
      user.collectionRequests.push(collectionRequest);
      userLocation.collectionRequests.push(collectionRequest);

      await collectionRequest.save();
      await user.save();
      await userLocation.save();

      return true;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByUserId(id: string) {
    try {
      const user = await UserModel.findOne({ _id: id });

      return !!user
        ? await CollectionRequestModel.find({ createdBy: user })
            .populate("createdBy")
            .populate({
              path: "collectionRequestMaterials",
              model: "CollectionRequestMaterial",
            })
            .populate({
              path: "location",
              populate: { path: "address", model: "Address" },
            })
        : ([] as CollectionRequest[]);
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByUserIdAndIsInStatusArray(
    id: string,
    statusArray?: CollectionStatus[]
  ) {
    try {
      const user = await UserModel.findOne({ _id: id });

      return !!user
        ? await CollectionRequestModel.find({
            createdBy: user,
            $and: [
              {
                collectionStatus: {
                  $in: statusArray || Object.values(CollectionStatus),
                },
              },
            ],
          })
            .populate("createdBy")
            .populate({
              path: "collectionRequestMaterials",
              model: "CollectionRequestMaterial",
            })
            .populate({
              path: "location",
              populate: { path: "address", model: "Address" },
            })
        : ([] as CollectionRequest[]);
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { CollectionRequestService };
