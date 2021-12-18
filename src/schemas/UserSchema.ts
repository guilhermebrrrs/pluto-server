import { Model, model, Schema } from "mongoose";
import { User } from "../types";

const UserSchema: Model<User> = model(
  "User",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      collectionRequests: [
        {
          ref: "CollectionRequest",
          type: Schema.Types.ObjectId,
        },
      ],
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
      locations: [
        {
          ref: "UserLocation",
          type: Schema.Types.ObjectId,
        },
      ],
      name: {
        required: true,
        type: String,
      },
      password: {
        required: true,
        type: String,
      },
    },
    {
      timestamps: true,
    }
  ),
  "users"
);

export default UserSchema;
