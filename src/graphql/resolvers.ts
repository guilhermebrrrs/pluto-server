import { OrganizationRepository, UserRepository } from "../repositories";

const generateResolvers = async () => {
  return {
    Mutation: {
      createOrganization: async (_: any, { createOrganizationInput }: any) =>
        await OrganizationRepository.create(createOrganizationInput),
      createUser: async (_: any, { createUserInput }: any) =>
        await UserRepository.create(createUserInput),
      updateUserPassword: async (_: any, { updateUserPasswordInput }: any) =>
        await UserRepository.updatePassword(updateUserPasswordInput),
    },
    Query: {
      authenticateUser: async (_: any, { authenticateUserInput }: any) =>
        await UserRepository.authenticate(authenticateUserInput),
      findUserById: async (_: any, { id }: any) =>
        await UserRepository.findById(id),
      findAllOrganizations: async () => await OrganizationRepository.findAll(),
      findAllUsers: async () => await UserRepository.findAll(),
    },
  };
};

export default generateResolvers;
