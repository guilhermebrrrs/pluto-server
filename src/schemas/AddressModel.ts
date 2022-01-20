import { model, Model, Schema } from "mongoose";
import { Address } from "../types";

const AddressModel: Model<Address> = model(
  "Address",
  new Schema(
    {
      _id: Schema.Types.ObjectId,
      cep: String,
      city: {
        required: true,
        type: String,
      },
      complement: String,
      country: {
        required: true,
        type: String,
      },
      district: {
        required: true,
        type: String,
      },
      number: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: String,
      },
      street: {
        required: true,
        type: String,
      },
      userLocation: {
        ref: "UserLocation",
        type: Schema.Types.ObjectId,
      },
    },
    { timestamps: true }
  ),
  "addresses"
);

export default AddressModel;
