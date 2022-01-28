import { gql } from "apollo-server";

export default gql`
  enum CollectionStatus {
    ACCEPTED
    CANCELED
    COMPLETED
    NOT_STARTED
    OPENED
    PAUSED
  }

  enum MaterialType {
    GLASS
    HAZARDOUS_MATERIALS
    HOSPITAL_WASTE
    METALS
    NON_RECYCLABLE
    ORGANIC_WASTE
    OTHERS
    PAPERS
    PLASTICS
    RADIOACTIVE_MATERIALS
    SEVERALS
    WOODS
  }

  enum OrganizationType {
    CATADOR
    COOPERATIVA
    EMPRESA_PRIVADA
  }

  enum WeekDays {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

  input AuthenticateOrganizationInput {
    organizationEmail: String!
    password: String!
  }

  input AuthenticateOrganizationUserInput {
    email: String!
    organizationEmail: String!
    password: String!
  }

  input AuthenticateUserInput {
    email: String!
    password: String!
  }

  input AvailableDayAndTimeInput {
    weekDay: WeekDays
    maxTime: AvailableTimeInput
    minTime: AvailableTimeInput
  }

  input AvailableTimeInput {
    hour: Int
    minutes: Int
  }

  input CreateCollectionRequestInput {
    collectionRequestMaterials: [CreateCollectionRequestMaterialInput]!
    details: String
    locationId: ID!
    userId: ID!
  }

  input CreateCollectionRequestMaterialInput {
    amount: Int
    description: String
    materialType: MaterialType!
  }

  input CreateOrganizationInput {
    email: String!
    cpfCnpj: String
    name: String!
    password: String!
    organizationType: OrganizationType!
  }

  input CreateOrganizationUserInput {
    email: String!
    username: String!
    organizationEmail: String!
    password: String!
  }

  input CreateUserInput {
    email: String!
    name: String!
    password: String!
  }

  input CreateUserLocationAddressInput {
    cep: String!
    city: String!
    complement: String
    country: String!
    district: String!
    number: String!
    state: String!
    street: String!
  }

  input CreateUserLocationAvailableDaysAndTimesInput {
    weekDay: WeekDays!
    maxTime: CreateUserLocationAvailableTimeInput!
    minTime: CreateUserLocationAvailableTimeInput!
  }

  input CreateUserLocationAvailableTimeInput {
    hour: Int!
    minutes: Int!
  }

  input CreateUserLocationInput {
    userId: ID!
    address: CreateUserLocationAddressInput!
    availableDaysAndTimes: [CreateUserLocationAvailableDaysAndTimesInput]!
    comments: String
    placename: String!
  }

  input OrganizationUserPersonalDataInput {
    email: String!
    name: String!
    isActive: Boolean!
    password: String!
  }

  input UpdateOrganizationUserPersonalDataInput {
    _id: String!
    data: OrganizationUserPersonalDataInput!
  }

  input UpdateUserLocationAddressInput {
    _id: String!
    cep: String!
    city: String!
    complement: String
    country: String!
    district: String!
    number: String!
    state: String!
    street: String!
  }

  input UpdateUserLocationInput {
    _id: String!
    address: UpdateUserLocationAddressInput
    availableDaysAndTimes: [AvailableDayAndTimeInput]
    comments: String
    placename: String!
  }

  input UpdateUserPasswordInput {
    email: String!
    newPassword: String!
    oldPassword: String!
  }

  type Address {
    _id: ID
    cep: String
    city: String
    complement: String
    country: String
    createdAt: String
    district: String
    number: String
    state: String
    street: String
    userLocation: UserLocation
    updatedAt: String
  }

  type AvailableDayAndTime {
    weekDay: WeekDays
    maxTime: AvailableTime
    minTime: AvailableTime
  }

  type AvailableTime {
    hour: Int
    minutes: Int
  }

  type CollectionPath {
    _id: ID
    collectionPoints: [CollectionPoint]
    collectionPathResponsibleOrganizationUser: OrganizationUser
    collectionPathStatus: CollectionStatus
    createdAt: String
    description: String
    estimatedTimeInMinutes: Int
    name: String
    totalEstimatedDistance: Float
    updatedAt: String
  }

  type CollectionPoint {
    _id: ID
    collectionPath: CollectionPath
    collectionRequest: CollectionRequest
    createdAt: String
    destination: CollectionPoint
    origin: CollectionPoint
    updatedAt: String
  }

  type CollectionRequest {
    _id: ID
    acceptedBy: OrganizationUser
    canceledOrCompletedBy: UserOrOrganizationUser
    createdAt: String
    createdBy: User
    collectionPoint: CollectionPoint
    collectionRequestMaterials: [CollectionRequestMaterial]
    collectionStatus: CollectionStatus
    details: String
    locations: UserLocation
    organization: Organization
    updatedAt: String
  }

  type CollectionRequestMaterial {
    _id: ID
    amount: Float
    collectionRequest: CollectionRequest
    createdAt: String
    description: String
    materialType: MaterialType
    updatedAt: String
  }

  type Mutation {
    createCollectionRequest(
      createCollectionRequestInput: CreateCollectionRequestInput
    ): Boolean

    createOrganization(
      createOrganizationInput: CreateOrganizationInput
    ): OrganizationRegistrationValidation

    createOrganizationUser(
      createOrganizationUserInput: CreateOrganizationUserInput
    ): OrganizationUserRegistrationValidation

    createUser(createUserInput: CreateUserInput): Boolean

    createUserLocation(
      createUserLocationInput: CreateUserLocationInput
    ): Boolean

    deleteOrganizationUserById(id: ID): Boolean

    deleteUserLocationById(id: ID!): Boolean

    updateOrganizationUserPersonalData(
      updateOrganizationUserPersonalDataInput: UpdateOrganizationUserPersonalDataInput
    ): Boolean

    updateUserLocation(
      updateUserLocationInput: UpdateUserLocationInput
    ): Boolean

    updateUserPassword(updateUserPasswordInput: UpdateUserPasswordInput): String
  }

  type Organization {
    _id: ID
    collectionRequests: [CollectionRequest]
    createdAt: String
    cpfCnpj: String
    email: String
    isActive: Boolean
    name: String
    organizationType: OrganizationType
    password: String
    updatedAt: String
    users: [OrganizationUser]
  }

  type OrganizationRegistrationValidation {
    cpfCnpjAlreadyExists: Boolean
    emailAlreadyExists: Boolean
    organizationNameAlreadyExists: Boolean
    passwordConstraintDoesntMatch: Boolean
    registrationSucceeded: Boolean
  }

  type OrganizationUser {
    _id: ID
    collectionRequests: [CollectionRequest]
    createdAt: String
    email: String
    isActive: Boolean
    name: String
    password: String
    organization: Organization
    responsibleForCollectionPaths: [CollectionPath]
    updatedAt: String
  }

  type OrganizationUserRegistrationValidation {
    emailAlreadyExists: Boolean
    emailAndOrganizationAlreadyExists: Boolean
    noOrganizationFound: Boolean
    organizationNameAlreadyExists: Boolean
    organizationWithSameNameAlreadyExists: Boolean
    passwordConstraintDoesntMatch: Boolean
    registrationSucceeded: Boolean
  }

  type Query {
    authenticateUser(authenticateUserInput: AuthenticateUserInput): User

    authenticateOrganization(
      authenticateOrganizationInput: AuthenticateOrganizationInput
    ): Organization

    authenticateOrganizationUser(
      authenticateOrganizationUserInput: AuthenticateOrganizationUserInput
    ): OrganizationUser

    findAllOrganizations: [Organization]

    findAllOrganizationUsers: [OrganizationUser]

    findAllOrganizationUsersByOrganizationId(id: ID!): [OrganizationUser]

    findAllUserLocationsByUserId(id: ID!): [UserLocation]

    findAllUsers: [User]

    findUserById(id: ID!): User
  }

  type User {
    _id: ID
    collectionRequests: [CollectionRequest]
    createdAt: String
    email: String
    isActive: Boolean
    locations: [UserLocation]
    name: String
    password: String
    updatedAt: String
  }

  type UserLocation {
    _id: ID
    address: Address
    availableDaysAndTimes: [AvailableDayAndTime]
    collectionRequests: [CollectionRequest]
    comments: String
    createdAt: String
    latitude: Float
    longitude: Float
    placename: String
    updatedAt: String
    user: User
  }

  union UserOrOrganizationUser = User | OrganizationUser
`;
