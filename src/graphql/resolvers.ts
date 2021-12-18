import {
  AuthenticateUserInput,
  CreateUserInput,
  UpdateUserPasswordInput,
} from "../types";
import { UserRepository } from "../repositories";

const generateResolvers = async () => {
  return {
    Mutation: {
      createUser: async (_: any, createUserInput: CreateUserInput) =>
        await UserRepository.create(createUserInput),
      updateUserPassword: async (
        _: any,
        updateUserPasswordInput: UpdateUserPasswordInput
      ) => await UserRepository.updatePassword(updateUserPasswordInput),
    },
    Query: {
      authenticateUser: async (
        _: any,
        authenticateUserInput: AuthenticateUserInput
      ) => await UserRepository.authenticateUser(authenticateUserInput),
      findUserById: async () => "Oi",
      findAllUsers: async () => await UserRepository.findAll(),
    },
  };
};

export default generateResolvers;
