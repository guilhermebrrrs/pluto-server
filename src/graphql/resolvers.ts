import {
  CollectionPathService,
  CollectionRequestService,
  GraphHopperGeocodingLocationService,
  OrganizationService,
  OrganizationUserService,
  UserLocationService,
  UserService,
} from "../services";
import {
  AuthenticateOrganizationInput,
  AuthenticateOrganizationUserInput,
  AuthenticateUserInput,
  CreateCollectionPathInput,
  CreateCollectionRequestInput,
  CreateOrganizationInput,
  CreateOrganizationUserInput,
  CreateUserInput,
  CreateUserLocationInput,
  UpdateOrganizationUserPersonalDataInput,
  UpdateUserLocationInput,
  UpdateUserPasswordInput,
} from "../types";

export default {
  Mutation: {
    createCollectionPath: async (
      _: any,
      { createCollectionPathInput = {} as CreateCollectionPathInput }: any
    ) => await CollectionPathService.create(createCollectionPathInput),

    createCollectionRequest: async (
      _: any,
      { createCollectionRequestInput = {} as CreateCollectionRequestInput }: any
    ) => await CollectionRequestService.create(createCollectionRequestInput),

    createOrganization: async (
      _: any,
      { createOrganizationInput = {} as CreateOrganizationInput }: any
    ) => await OrganizationService.create(createOrganizationInput),

    createOrganizationUser: async (
      _: any,
      { createOrganizationUserInput = {} as CreateOrganizationUserInput }: any
    ) => await OrganizationUserService.create(createOrganizationUserInput),

    createUser: async (
      _: any,
      { createUserInput = {} as CreateUserInput }: any
    ) => await UserService.create(createUserInput),

    createUserLocation: async (
      _: any,
      { createUserLocationInput = {} as CreateUserLocationInput }: any
    ) => await UserLocationService.create(createUserLocationInput),

    deleteOrganizationUserById: async (_: any, { id }: any) =>
      await OrganizationUserService.deleteById(id),

    deleteUserLocationById: async (_: any, { id }: any) =>
      await UserLocationService.deleteById(id),

    updateOrganizationUserPersonalData: async (
      _: any,
      {
        updateOrganizationUserPersonalDataInput = {} as UpdateOrganizationUserPersonalDataInput,
      }: any
    ) =>
      await OrganizationUserService.updatePersonalData(
        updateOrganizationUserPersonalDataInput
      ),

    updateUserLocation: async (
      _: any,
      { updateUserLocationInput = {} as UpdateUserLocationInput }: any
    ) => await UserLocationService.updateUserLocation(updateUserLocationInput),

    updateUserPassword: async (
      _: any,
      { updateUserPasswordInput = {} as UpdateUserPasswordInput }: any
    ) => await UserService.updatePassword(updateUserPasswordInput),
  },

  Query: {
    authenticateOrganization: async (
      _: any,
      {
        authenticateOrganizationInput = {} as AuthenticateOrganizationInput,
      }: any
    ) => await OrganizationService.authenticate(authenticateOrganizationInput),

    authenticateOrganizationUser: async (
      _: any,
      {
        authenticateOrganizationUserInput = {} as AuthenticateOrganizationUserInput,
      }: any
    ) =>
      await OrganizationUserService.authenticate(
        authenticateOrganizationUserInput
      ),

    authenticateUser: async (
      _: any,
      { authenticateUserInput = {} as AuthenticateUserInput }: any
    ) => await UserService.authenticate(authenticateUserInput),

    findAllCollectionRequestsByUserId: async (_: any, { id }: any) =>
      await CollectionRequestService.findAllByUserId(id),

    findAllCollectionRequestsByUserIdAndIsInStatusArray: async (
      _: any,
      { id, statusArray }: any
    ) =>
      await CollectionRequestService.findAllByUserIdAndIsInStatusArray(
        id,
        statusArray
      ),

    findAllOrganizations: async () => await OrganizationService.findAll(),

    findAllOrganizationUsers: async () =>
      await OrganizationUserService.findAll(),

    findAllOrganizationUsersByOrganizationId: async (_: any, { id }: any) =>
      await OrganizationUserService.findAllByOrganizationId(id),

    findAllUserLocationsByUserId: async (_: any, { id }: any) =>
      await UserLocationService.findAllByUserId(id),

    findAllUsers: async () => await UserService.findAll(),

    findGeocodingLocation: async (_: any, { typedLocation }: any) =>
      GraphHopperGeocodingLocationService.findGeocodingLocation(typedLocation),

    findUserById: async (_: any, { id }: any) => await UserService.findById(id),
  },
};
