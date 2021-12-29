import { ObjectId } from "mongodb";
import { OrganizationSchema } from "../schemas";
import { CreateOrganizationInput } from "../types";

class OrganizationRepository {
  public static async create(input: CreateOrganizationInput) {
    try {
      await OrganizationSchema.create({ ...input, _id: new ObjectId() });
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { OrganizationRepository };
