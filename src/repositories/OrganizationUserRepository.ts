import { ObjectId } from "mongodb";
import {
  OrganizationSchema,
  OrganizationUserLoginKeySchema,
  OrganizationUserSchema,
} from "../schemas";
import {
  AuthenticateOrganizationUserInput,
  CreateOrganizationUserInput,
  OrganizationUser,
  OrganizationUserLoginKey,
  OrganizationUserRegistrationValidation,
} from "../types";

class OrganizationUserRepository {
  public static async authenticate(
    input: AuthenticateOrganizationUserInput
  ): Promise<OrganizationUser> {
    try {
      const organization = await OrganizationSchema.findOne({
        email: input.organizationEmail,
      });

      if (!organization) return null;

      const organizationUserLoginKey =
        await OrganizationUserLoginKeySchema.findOne({
          organization,
          email: input.email,
          password: input.password,
        });

      if (!organizationUserLoginKey?.organizationUser) return null;

      const user = await OrganizationUserSchema.findOne({
        _id: organizationUserLoginKey?.organizationUser as unknown as string,
      }).populate("organization");

      if (user) {
        user.userLoginKeys = [organizationUserLoginKey];

        console.log(user);

        return user;
      }

      return null;
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
        name: input.username,
        organization,
        _id: new ObjectId(),
      };

      const organizationUserLoginKey: OrganizationUserLoginKey = {
        email: input.email,
        organization,
        organizationUser,
        password: input.password,
        _id: new ObjectId(),
      };

      if (!organizationUser?.userLoginKeys) {
        organizationUser.userLoginKeys = [] as OrganizationUserLoginKey[];
      }

      organizationUser?.userLoginKeys.push(organizationUserLoginKey);

      const wasOrganizationUserCreated = !!(await OrganizationUserSchema.create(
        organizationUser
      ));

      const wasOrganizationUserLoginKeyCreated =
        !!(await OrganizationUserLoginKeySchema.create(
          organizationUserLoginKey
        ));

      if (wasOrganizationUserCreated && wasOrganizationUserLoginKeyCreated) {
        validationObj.registrationSucceeded = true;

        return validationObj;
      }

      if (!wasOrganizationUserCreated) {
        await OrganizationUserSchema.deleteOne({ _id: organizationUser._id });
      }

      if (!wasOrganizationUserLoginKeyCreated) {
        await OrganizationUserLoginKeySchema.deleteOne({
          _id: organizationUserLoginKey._id,
        });
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
}

export { OrganizationUserRepository };
