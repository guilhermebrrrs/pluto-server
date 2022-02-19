import { CollectionPathModel, OrganizationModel } from "../schemas";
import { CollectionPathStatus, CreateCollectionPathInput } from "../types";
import { ObjectId } from "mongodb";

class CollectionPathService {
  public static async create(input: CreateCollectionPathInput) {
    try {
      console.log(input);

      const organization = await OrganizationModel.findById(
        input.organizationId
      );

      if (!organization) return false;

      const collectionPath = await CollectionPathModel.create({
        _id: new ObjectId(),
        collectionPathStatus: CollectionPathStatus.IN_DEFINITION,
        description: input.description,
        name: input.name,
        organization: organization,
      });

      if (!collectionPath) return false;

      organization.collectionPaths.push(collectionPath);
      await organization.save();

      console.log("deu bom");
      return true;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { CollectionPathService };
