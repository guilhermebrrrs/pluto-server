import { ObjectId } from "mongodb";
import { OrganizationSchema } from "../schemas";
import {
  CreateOrganizationInput,
  OrganizationRegistrationValidation,
} from "../types";

class OrganizationRepository {
  public static async create(input: CreateOrganizationInput) {
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

        console.log("validationObj", validationObj);
        return validationObj;
      }

      validationObj.registrationSucceeded = !!(await OrganizationSchema.create({
        ...input,
        _id: new ObjectId(),
      }));

      console.log("validationObj", validationObj);
      return validationObj;
    } catch (err) {
      console.error(err.message);
    }
  }

  public static async findAll() {
    try {
      return await OrganizationSchema.find();
    } catch (err) {
      console.error(err.mesage);
    }
  }
}

export { OrganizationRepository };
