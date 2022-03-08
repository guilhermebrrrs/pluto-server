import { CollectionPathModel, OrganizationModel } from "../schemas";
import {
  CollectionPath,
  CollectionPathStatus,
  CreateCollectionPathInput,
} from "../types";
import { ObjectId } from "mongodb";

class CollectionPathService {
  public static async create(input: CreateCollectionPathInput) {
    try {
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

      return true;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAllByOrganizationIdAndCollectionPathStatus(
    organizationId: string,
    collectionPathStatus: CollectionPathStatus
  ) {
    try {
      const organization = await OrganizationModel.findById(organizationId);

      console.log(organization);

      return !!organization
        ? await CollectionPathModel.find({
            collectionPathStatus: collectionPathStatus,
            organization,
          })
            .populate({
              path: "collectionPoints",
              populate: [
                {
                  path: "destination",
                  populate: {
                    path: "location",
                    populate: { path: "address", model: "Address" },
                  },
                },
                {
                  path: "location",
                  populate: { path: "address", model: "Address" },
                },
                {
                  path: "origin",
                  populate: {
                    path: "location",
                    populate: { path: "address", model: "Address" },
                  },
                },
              ],
            })
            .populate("collectionPathResponsibleOrganizationUser")
        : ([] as CollectionPath[]);
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { CollectionPathService };
