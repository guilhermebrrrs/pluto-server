import { Model, model, Schema } from "mongoose";
import { default as AutoPopulate } from "mongoose-autopopulate";
import { User } from "../types";

const UserSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    collectionRequests: [
      {
        autopopulate: true,
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
        autopopulate: true,
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
).plugin(AutoPopulate);

const UserModel: Model<User> = model("User", UserSchema, "users");

export default UserModel;
