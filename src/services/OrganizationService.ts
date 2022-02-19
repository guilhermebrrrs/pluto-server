import { ObjectId } from "mongodb";
import { OrganizationModel } from "../schemas";
import {
  AuthenticateOrganizationInput,
  CreateOrganizationInput,
  Organization,
  OrganizationRegistrationValidation,
} from "../types";

class OrganizationService {
  public static async authenticate(
    input: AuthenticateOrganizationInput
  ): Promise<Organization> {
    try {
      return await OrganizationModel.findOne({
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

      validationObj.emailAlreadyExists = !!(await OrganizationModel.findOne({
        email: input.email,
      }));
      validationObj.cpfCnpjAlreadyExists = !!(await OrganizationModel.findOne({
        cpfCnpj: input.cpfCnpj,
      }));
      validationObj.organizationNameAlreadyExists =
        !!(await OrganizationModel.findOne({
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

      validationObj.registrationSucceeded = !!(await OrganizationModel.create({
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
      return await OrganizationModel.find();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrganizationService };
