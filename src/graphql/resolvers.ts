import { UserRepository } from "../repositories";

const generateResolvers = async () => {
  const userRepository = await UserRepository.getInstance();

  return {
    Mutation: {
      createUser: async (_: any, { createUserInput }: any) =>
        await userRepository.create(createUserInput),
      updateUserPassword: async (_: any, { updateUserPasswordInput }: any) =>
        await userRepository.updatePassword(updateUserPasswordInput),
    },
    Query: {
      authenticateUser: async (
        _: any,
        { authenticateUserInput: { email, password } }: any
      ) => await userRepository.authenticateUser(email, password),
      findUserById: async (_: any, { id }: any) =>
        await userRepository.findById(id),
      findAllUsers: async () => await userRepository.findAll(),
    },
  };
};

export default generateResolvers;
