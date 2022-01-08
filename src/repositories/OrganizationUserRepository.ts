import { ObjectId } from "mongodb";
import { OrganizationSchema, OrganizationUserSchema } from "../schemas";
import {
  AuthenticateOrganizationUserInput,
  CreateOrganizationUserInput,
  Organization,
  OrganizationUser,
  OrganizationUserRegistrationValidation,
} from "../types";

class OrganizationUserRepository {
  public static async authenticate(
    input: AuthenticateOrganizationUserInput
  ): Promise<OrganizationUser> {
    try {
      const organization = (await OrganizationSchema.findOne({
        email: input.organizationEmail,
      })) as Organization;

      return await OrganizationUserSchema.findOne({
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

      validationObj.emailAlreadyExists =
        !!(await OrganizationUserSchema.findOne({ email: input.email }));
      validationObj.organizationWithSameNameAlreadyExists =
        !!(await OrganizationSchema.findOne({ name: input.username }));

      const organization = await OrganizationSchema.findOne({
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

      const wasOrganizationUserCreated = !!(await OrganizationUserSchema.create(
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

  public static async findAll(): Promise<OrganizationUser[]> {
    try {
      return await OrganizationUserSchema.find();
    } catch (err) {
      console.error(err);
    }
  }

  public static async findAllByOrganizationId(id: string) {
    try {
      return await OrganizationUserSchema.find()
        .where("organization")
        .equals(id)
        .populate("organization")
        .exec();
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { OrganizationUserRepository };
