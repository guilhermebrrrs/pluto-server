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

class CollectionRequestRepository {
  public static async create(input: CreateCollectionRequestInput) {
    try {
      const user = await UserModel.findOne({ _id: input.userId });
      const userLocation = await UserLocationModel.findOne({
        _id: input.locationId,
      });

      if (!!user && !!userLocation) {
        const collectionRequestMaterialsArray =
          [] as CollectionRequestMaterial[];

        await (async () => {
          input.collectionRequestMaterials.map(
            async (item: CollectionRequestMaterial) => {
              await CollectionRequestMaterialModel.create({
                _id: new ObjectId(),
                amount: item.amount,
                description: item.description,
                materialType: item.materialType,
              }).then((collectionRequestMaterial) => {
                if (!!collectionRequestMaterial) {
                  collectionRequestMaterialsArray.push(
                    collectionRequestMaterial
                  );
                  console.log("salvou");
                } else {
                  console.log("não salvou");
                }
              });
            }
          );
        })().then(() => {
          if (
            collectionRequestMaterialsArray.length !==
            input.collectionRequestMaterials.length
          ) {
            return false;
          }
        });

        const collectionRequest = await CollectionRequestModel.create({
          _id: new ObjectId(),
          collectionRequestMaterials: [...collectionRequestMaterialsArray],
          collectionStatus: CollectionStatus.OPENED,
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

export { CollectionRequestRepository };
