import { UserRepository } from "../repositories";

const generateResolvers = async () => {
  return {
    Mutation: {
      createUser: async (_: any, { createUserInput }: any) =>
        await UserRepository.create(createUserInput),
      updateUserPassword: async (_: any, { updateUserPasswordInput }: any) =>
        await UserRepository.updatePassword(updateUserPasswordInput),
    },
    Query: {
      authenticateUser: async (_: any, { authenticateUserInput }: any) =>
        await UserRepository.authenticateUser(authenticateUserInput),
      findUserById: async (_: any, { id }: any) =>
        await UserRepository.findById(id),
      findAllUsers: async () => await UserRepository.findAll(),
    },
  };
};

export default generateResolvers;
