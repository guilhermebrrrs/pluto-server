import { model, Model, Schema } from "mongoose";
import { CollectionRequestMaterial } from "../types";

const CollectionRequestMaterialModel: Model<CollectionRequestMaterial> = model(
  "CollectionRequestMaterial",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
      collectionRequest: {
        ref: "CollectionRequest",
        type: Schema.Types.ObjectId,
      },
      description: String,
      materialType: String,
    },
    {
      timestamps: true,
    }
  ),
  "collection_request_materials"
);

export default CollectionRequestMaterialModel;
