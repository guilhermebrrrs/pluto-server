import { ObjectId } from "mongodb";
import { OrganizationSchema } from "../schemas";
import {
  AuthenticateOrganizationInput,
  CreateOrganizationInput,
  Organization,
  OrganizationRegistrationValidation,
} from "../types";

class OrganizationRepository {
  public static async authenticate(
    input: AuthenticateOrganizationInput
  ): Promise<Organization> {
    try {
      return await OrganizationSchema.findOne({
        email: input.organizationEmail,
        password: input.password,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public static async create(
    input: CreateOrganizationInput
  ): Promise<OrganizationRegistrationValidation> {
    try {
      const validationObj: OrganizationRegistrationValidation =
        {} as OrganizationRegistrationValidation;

      validationObj.emailAlreadyExists = !!(await OrganizationSchema.findOne({
        email: input.email,
      }));
      validationObj.cpfCnpjAlreadyExists = !!(await OrganizationSchema.findOne({
        cpfCnpj: input.cpfCnpj,
      }));
      validationObj.organizationNameAlreadyExists =
        !!(await OrganizationSchema.findOne({
          name: input.name,
        }));

      if (
        validationObj.emailAlreadyExists ||
        validationObj.cpfCnpjAlreadyExists ||
        validationObj.organizationNameAlreadyExists
      ) {
        validationObj.registrationSucceeded = false;

        return validationObj;
      }

      validationObj.registrationSucceeded = !!(await OrganizationSchema.create({
        ...input,
        _id: new ObjectId(),
      }));

      return validationObj;
    } catch (err) {
      console.error(err);
    }
  }

  public static async findAll(): Promise<Organization[]> {
    try {
      return await OrganizationSchema.find();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrganizationRepository };
