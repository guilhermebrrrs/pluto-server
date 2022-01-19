import { model, Model, Schema } from "mongoose";
import { default as AutoPopulate } from "mongoose-autopopulate";
import { CollectionPath } from "../types";

const CollectionPathSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    collectionPoints: [
      {
        autopopulate: true,
        ref: "CollectionPoint",
        required: true,
        type: Schema.Types.ObjectId,
      },
    ],
    collectionPathResponsibleOrganizationUser: {
      autopopulate: true,
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
).plugin(AutoPopulate);

const CollectionPathModel: Model<CollectionPath> = model(
  "CollectionPath",
  CollectionPathSchema,
  "collection_paths"
);

export default CollectionPathModel;
