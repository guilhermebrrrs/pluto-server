import { model, Model, Schema } from "mongoose";
import { OrganizationUserLoginKey } from "../types";

const OrganizationUserLoginKeySchema: Model<OrganizationUserLoginKey> = model(
  "OrganizationUserLoginKey",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      organization: {
        ref: "Organization",
        type: Schema.Types.ObjectId,
      },
      email: {
        required: true,
        type: String,
      },
      isActive: {
        default: false,
        required: true,
        type: Boolean,
      },
      password: {
        required: true,
        type: String,
      },
      organizationUser: {
        ref: "OrganizationUser",
        type: Schema.Types.ObjectId,
      },
    },
    {
      timestamps: true,
    }
  ),
  "organization_user_login_keys"
);

export default OrganizationUserLoginKeySchema;
