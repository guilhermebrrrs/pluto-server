import { model, Model, Schema } from "mongoose";
import { CollectionPoint } from "../types";

const CollectionPointModel: Model<CollectionPoint> = model(
  "CollectionPoint",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      collectionPath: {
        ref: "CollectionPath",
        type: Schema.Types.ObjectId,
      },
      collectionRequest: {
        ref: "CollectionRequest",
        required: true,
        type: Schema.Types.ObjectId,
      },
      destination: {
        ref: "CollectionPoint",
        type: Schema.Types.ObjectId,
      },
      origin: {
        ref: "CollectionPoint",
        type: Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
    }
  ),
  "collection_points"
);

export default CollectionPointModel;
