import { model, Model, Schema } from "mongoose";
import { UserLocation } from "../types";

const UserLocationModel: Model<UserLocation> = model(
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
          required: true,
          type: {
            weekDay: {
              required: true,
              type: String,
            },
            maxTime: {
              required: true,
              type: {
                hour: Number,
                minutes: Number,
              },
            },
            minTime: {
              required: true,
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
          type: Schema.Types.ObjectId,
          ref: "CollectionRequest",
        },
      ],
      comments: String,
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

export default UserLocationModel;
