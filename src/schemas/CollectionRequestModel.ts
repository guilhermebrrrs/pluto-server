import { CollectionRequest } from "../types";
import { Model, model, Schema } from "mongoose";

const CollectionRequestModel: Model<CollectionRequest> = model(
  "CollectionRequest",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      acceptedBy: {
        refPath: {
          enum: ["Organization", "OrganizationUser"],
          required: true,
          type: String,
        },
        type: Schema.Types.ObjectId,
      },
      canceledOrCompletedBy: {
        refPath: {
          enum: ["Organization", "OrganizationUser", "User"],
          required: true,
          type: String,
        },
        type: Schema.Types.ObjectId,
      },
      createdBy: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId,
      },
      collectionPoint: {
        ref: "CollectionPoint",
        type: Schema.Types.ObjectId,
      },
      collectionRequestMaterials: [
        {
          ref: "CollectionRequestMaterial",
          required: true,
          type: Schema.Types.ObjectId,
        },
      ],
      collectionStatus: String,
      details: String,
      location: {
        ref: "UserLocation",
        required: true,
        type: Schema.Types.ObjectId,
      },
      organization: {
        ref: "Organization",
        type: Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
    }
  ),
  "collection_requests"
);

export default CollectionRequestModel;
