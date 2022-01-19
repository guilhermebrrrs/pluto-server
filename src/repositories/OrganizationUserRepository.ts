import { ObjectId } from "mongodb";
import { OrganizationModel, OrganizationUserModel } from "../schemas";
import {
  AuthenticateOrganizationUserInput,
  CreateOrganizationUserInput,
  Organization,
  OrganizationUser,
  OrganizationUserRegistrationValidation,
  UpdateOrganizationUserPersonalDataInput,
} from "../types";

class OrganizationUserRepository {
  public static async authenticate(
    input: AuthenticateOrganizationUserInput
  ): Promise<OrganizationUser> {
    try {
      const organization = (await OrganizationModel.findOne({
        email: input.organizationEmail,
      })) as Organization;

      return await OrganizationUserModel.findOne({
        organization: organization,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public static async create(
    input: CreateOrganizationUserInput
  ): Promise<OrganizationUserRegistrationValidation> {
    try {
      const validationObj: OrganizationUserRegistrationValidation =
        {} as OrganizationUserRegistrationValidation;

      validationObj.emailAlreadyExists = !!(await OrganizationUserModel.findOne(
        { email: input.email }
      ));
      validationObj.organizationWithSameNameAlreadyExists =
        !!(await OrganizationModel.findOne({ name: input.username }));

      const organization = await OrganizationModel.findOne({
        email: input.organizationEmail,
      });

      validationObj.noOrganizationFound = !organization;

      if (
        validationObj.emailAlreadyExists ||
        validationObj.emailAndOrganizationAlreadyExists ||
        validationObj.noOrganizationFound ||
        validationObj.organizationWithSameNameAlreadyExists
      ) {
        validationObj.registrationSucceeded = false;

        return validationObj;
      }

      const organizationUser: OrganizationUser = {
        _id: new ObjectId(),
        email: input.email,
        organization,
        name: input.username,
        password: input.password,
      };

      const wasOrganizationUserCreated = !!(await OrganizationUserModel.create(
        organizationUser
      ));

      if (wasOrganizationUserCreated) {
        validationObj.registrationSucceeded = true;

        return validationObj;
      }

      validationObj.registrationSucceeded = false;

      return validationObj;
    } catch (err) {
      console.error(err);
    }
  }

  public static async updatePersonalData(
    input: UpdateOrganizationUserPersonalDataInput
  ) {
    try {
      return !!(await OrganizationUserModel.findOneAndUpdate(
        { _id: input._id },
        { ...input.data }
      ));
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAll(): Promise<OrganizationUser[]> {
    try {
      return await OrganizationUserModel.find();
    } catch (err) {
      console.error(err);
    }
  }

  public static async findAllByOrganizationId(id: string) {
    try {
      return await OrganizationUserModel.find()
        .where("organization")
        .equals(id)
        .populate("organization")
        .exec();
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async deleteById(id: string) {
    try {
      return !!(await OrganizationUserModel.deleteOne({ _id: id }));
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { OrganizationUserRepository };
