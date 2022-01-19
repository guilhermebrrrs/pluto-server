import { model, Model, Schema } from "mongoose";
import { default as AutoPopulate } from "mongoose-autopopulate";
import { UserLocation } from "../types";

const UserLocationSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    address: {
      autopopulate: true,
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    availableDaysAndTimes: [
      {
        autopopulate: true,
        required: true,
        type: {
          weekDay: String,
          maxTime: {
            type: {
              hour: Number,
              minutes: Number,
            },
          },
          minTime: {
            type: {
              hour: Number,
              minutes: Number,
            },
          },
        },
      },
    ],
    collectionRequests: [
      {
        autopopulate: true,
        type: Schema.Types.ObjectId,
        ref: "CollectionRequest",
      },
    ],
    latitude: Number,
    longitude: Number,
    placename: {
      required: true,
      type: String,
    },
    user: {
      autopopulate: true,
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

UserLocationSchema.plugin(AutoPopulate);

const UserLocationModel: Model<UserLocation> = model(
  "UserLocation",
  UserLocationSchema,
  "user_locations"
);

export default UserLocationModel;
