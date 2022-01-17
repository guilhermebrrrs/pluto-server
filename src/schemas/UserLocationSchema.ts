import { model, Model, Schema } from "mongoose";
import { UserLocation } from "../types";

const UserLocationSchema: Model<UserLocation> = model(
  "UserLocation",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
      availableDaysAndTimes: [
        {
          weekDay: {
            type: String,
            required: true,
          },
          maxTime: {
            type: {
              hour: Number,
              minutes: Number,
            },
            required: true,
          },
          minTime: {
            type: {
              hour: Number,
              minutes: Number,
            },
            required: true,
          },
        },
      ],
      collectionRequests: [
        {
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
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    },
    { timestamps: true }
  ),
  "user_locations"
);

export default UserLocationSchema;
