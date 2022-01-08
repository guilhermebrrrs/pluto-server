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
    PAPERS
    PLASTICS
    RADIOACTIVE_MATERIALS
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
    number: String
    state: String
    street: String
    userLocation: UserLocation
    updatedAt: String
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
    canceledOrCompletedBy: OrganizationUser
    createdAt: String
    createdBy: User
    collectionPoint: CollectionPoint
    collectedRequestMaterials: [CollectionRequestMaterial]
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
    createAt: String
    description: String
    materialType: MaterialType
    updatedAt: String
  }

  type Mutation {
    createOrganization(
      createOrganizationInput: CreateOrganizationInput
    ): OrganizationRegistrationValidation
    createOrganizationUser(
      createOrganizationUserInput: CreateOrganizationUserInput
    ): OrganizationUserRegistrationValidation
    createUser(createUserInput: CreateUserInput): Boolean
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

  type OrganizationUserRegistrationValidation {
    emailAlreadyExists: Boolean
    emailAndOrganizationAlreadyExists: Boolean
    noOrganizationFound: Boolean
    organizationNameAlreadyExists: Boolean
    organizationWithSameNameAlreadyExists: Boolean
    passwordConstraintDoesntMatch: Boolean
    registrationSucceeded: Boolean
  }

  type OrganizationUser {
    _id: ID
    collectionRequests: [CollectionRequest]
    createdAt: String
    name: String
    organization: Organization
    responsibleForCollectionPaths: [CollectionPath]
    updatedAt: String
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
    createdAt: String
    collectionRequests: [CollectionRequest]
    latitude: Float
    longitude: Float
    placename: String
    updatedAt: String
    user: User
  }
`;
