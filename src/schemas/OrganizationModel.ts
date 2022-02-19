import { Model, model, Schema } from "mongoose";
import { Organization } from "../types";

const OrganizationModel: Model<Organization> = model(
  "Organization",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      collectionRequests: [
        {
          ref: "CollectionRequest",
          type: Schema.Types.ObjectId,
        },
      ],
      collectionPaths: [
        {
          ref: "CollectionPath",
          type: Schema.Types.ObjectId,
        },
      ],
      cpfCnpj: String,
      email: {
        required: true,
        type: String,
        unique: true,
      },
      isActive: {
        default: true,
        required: true,
        type: Boolean,
      },
      name: {
        required: true,
        type: String,
      },
      organizationType: String,
      password: {
        required: true,
        type: String,
      },
      users: [
        {
          ref: "OrganizationUser",
          type: Schema.Types.ObjectId,
        },
      ],
    },
    {
      timestamps: true,
    }
  ),
  "organizations"
);

export default OrganizationModel;
