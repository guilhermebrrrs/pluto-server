import { model, Model, Schema } from "mongoose";
import { default as AutoPopulate } from "mongoose-autopopulate";
import { Address } from "../types";

const AddressSchema = new Schema(
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
      autopopulate: true,
      ref: "UserLocation",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
).plugin(AutoPopulate);

const AddressModel: Model<Address> = model(
  "Address",
  AddressSchema,
  "addresses"
);

export default AddressModel;
