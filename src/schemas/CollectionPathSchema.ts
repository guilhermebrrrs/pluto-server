import { model, Model, Schema } from "mongoose";
import { CollectionPath } from "../types";

const CollectionPathSchema: Model<CollectionPath> = model(
  "CollectionPath",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      collectionPoints: [
        {
          ref: "CollectionPoint",
          required: true,
          type: Schema.Types.ObjectId,
        },
      ],
      collectionPathResponsibleOrganizationUser: {
        ref: "OrganizationUser",
        type: Schema.Types.ObjectId,
      },
      collectionPathStatus: String,
      description: String,
      estimatedTimeInMinutes: Number,
      name: {
        required: true,
        type: String,
      },
      totalEstimatedDistance: Number,
    },
    {
      timestamps: true,
    }
  ),
  "collection_paths"
);

export default CollectionPathSchema;
