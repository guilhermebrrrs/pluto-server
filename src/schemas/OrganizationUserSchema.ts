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
      name: {
        required: true,
        type: String,
      },
      organization: {
        ref: "Organization",
        type: Schema.Types.ObjectId,
      },
      responsibleForCollectionPaths: [
        {
          ref: "CollectionPath",
          type: Schema.Types.ObjectId,
        },
      ],
      userLoginKeys: [
        {
          ref: "OrganizationUserLoginKey",
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
