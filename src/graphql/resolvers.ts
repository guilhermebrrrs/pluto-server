import {
  OrganizationRepository,
  OrganizationUserRepository,
  UserLocationRepository,
  UserRepository,
} from "../repositories";
import {
  AuthenticateOrganizationInput,
  AuthenticateOrganizationUserInput,
  AuthenticateUserInput,
  CreateOrganizationInput,
  CreateOrganizationUserInput,
  CreateUserInput,
  CreateUserLocationInput,
  UpdateOrganizationUserPersonalDataInput,
  UpdateUserPasswordInput,
} from "../types";

export default {
  Mutation: {
    createOrganization: async (
      _: any,
      { createOrganizationInput = {} as CreateOrganizationInput }: any
    ) => await OrganizationRepository.create(createOrganizationInput),

    createOrganizationUser: async (
      _: any,
      { createOrganizationUserInput = {} as CreateOrganizationUserInput }: any
    ) => await OrganizationUserRepository.create(createOrganizationUserInput),

    createUser: async (
      _: any,
      { createUserInput = {} as CreateUserInput }: any
    ) => await UserRepository.create(createUserInput),

    createUserLocation: async (
      _: any,
      { createUserLocationInput = {} as CreateUserLocationInput }: any
    ) => await UserLocationRepository.create(createUserLocationInput),

    deleteOrganizationUserById: async (_: any, { id = "" as string }: any) =>
      await OrganizationUserRepository.deleteById(id),

    updateOrganizationUserPersonalData: async (
      _: any,
      {
        updateOrganizationUserPersonalDataInput = {} as UpdateOrganizationUserPersonalDataInput,
      }: any
    ) =>
      await OrganizationUserRepository.updatePersonalData(
        updateOrganizationUserPersonalDataInput
      ),

    updateUserPassword: async (
      _: any,
      { updateUserPasswordInput = {} as UpdateUserPasswordInput }: any
    ) => await UserRepository.updatePassword(updateUserPasswordInput),
  },

  Query: {
    authenticateOrganization: async (
      _: any,
      {
        authenticateOrganizationInput = {} as AuthenticateOrganizationInput,
      }: any
    ) =>
      await OrganizationRepository.authenticate(authenticateOrganizationInput),

    authenticateOrganizationUser: async (
      _: any,
      {
        authenticateOrganizationUserInput = {} as AuthenticateOrganizationUserInput,
      }: any
    ) =>
      await OrganizationUserRepository.authenticate(
        authenticateOrganizationUserInput
      ),

    authenticateUser: async (
      _: any,
      { authenticateUserInput = {} as AuthenticateUserInput }: any
    ) => await UserRepository.authenticate(authenticateUserInput),

    findUserById: async (_: any, { id }: any) =>
      await UserRepository.findById(id),

    findAllOrganizations: async () => await OrganizationRepository.findAll(),

    findAllOrganizationUsers: async () =>
      await OrganizationUserRepository.findAll(),

    findAllOrganizationUsersByOrganizationId: async (_: any, { id }: any) =>
      await OrganizationUserRepository.findAllByOrganizationId(id),

    findAllUserLocationsByUserId: async (_: any, { id }: any) =>
      await UserLocationRepository.findAllByUserId(id),

    findAllUsers: async () => await UserRepository.findAll(),
  },
};
