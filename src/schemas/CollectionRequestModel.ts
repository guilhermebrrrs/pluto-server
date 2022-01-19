import { Model, model, Schema } from "mongoose";
import { CollectionRequest } from "../types";

const CollectionRequestModel: Model<CollectionRequest> = model(
  "CollectionRequest",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      acceptedBy: {
        ref: "OrganizationUser",
        type: Schema.Types.ObjectId,
      },
      canceledOrCompletedBy: {
        type: Schema.Types.ObjectId,
        refPath: {
          enum: ["OrganizationUser", "User"],
          required: true,
          type: String,
        },
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
      collectionRequestMaterials: [String],
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
