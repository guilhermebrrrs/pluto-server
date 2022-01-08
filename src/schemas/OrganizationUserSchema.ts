import { Model, model, Schema } from "mongoose";
import { OrganizationUser } from "../types";

const OrganizationUserSchema: Model<OrganizationUser> = model(
  "OrganizationUser",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      collectionRequests: [
        {
          ref: "CollectionRequest",
          type: Schema.Types.ObjectId,
        },
      ],
      isActive: {
        default: false,
        type: Boolean,
      },
      organization: {
        ref: "Organization",
        type: Schema.Types.ObjectId,
      },
      name: {
        required: true,
        type: String,
      },
      password: {
        required: true,
        type: String,
      },
      responsibleForCollectionPaths: [
        {
          ref: "CollectionPath",
          type: Schema.Types.ObjectId,
        },
      ],
    },
    {
      timestamps: true,
    }
  ),
  "organization_users"
);

export default OrganizationUserSchema;
