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

  type Address {
    id: String!
    cep: String
    city: String!
    complement: String
    createdAt: String!
    number: String!
    state: String!
    street: String!
    userLocation: UserLocation!
    updatedAt: String!
  }

  type CollectionPath {
    id: String!
    collectionPoints: [CollectionPoint]
    collectionPathResponsibleOrganizationUser: OrganizationUser
    collectionPathStatus: CollectionStatus!
    createdAt: String!
    description: String
    estimatedTime: Int
    name: String!
    totalEstimatedDistance: Float
    updatedAt: String!
  }

  type CollectionPoint {
    id: String!
    collectionPath: CollectionPath!
    collectionRequest: CollectionRequest!
    createdAt: String!
    destination: CollectionPoint
    origin: CollectionPoint
    updatedAt: String!
  }

  type CollectionRequest {
    id: String!
    acceptedByOrganizationUser: OrganizationUser
    canceledOrCompletedByUser: User
    canceledOrCompletedByOrganizationUser: OrganizationUser
    createdAt: String!
    createdByUser: User!
    collectionPoint: CollectionPoint
    collectedRequestMaterials: [CollectionRequestMaterial]
    collectionStatus: CollectionStatus!
    details: String
    locations: UserLocation!
    organization: Organization
    updatedAt: String!
  }

  type CollectionRequestMaterial {
    id: String!
    amount: Float
    collectionRequest: CollectionRequest!
    createAt: String!
    description: String
    materialType: MaterialType!
    updatedAt: String!
  }

  type Mutation {
    createuser: String!
  }

  type Organization {
    id: String!
    collectionRequests: [CollectionRequest]
    createdAt: String!
    cpfCnpj: String!
    email: String!
    isActive: Boolean!
    name: String!
    organizationType: OrganizationType!
    password: String!
    updatedAt: String!
    users: [OrganizationUser]
  }

  type OrganizationUser {
    id: String!
    acceptedCollectionRequests: [CollectionRequest]
    canceledCollectionRequests: [CollectionRequest]
    email: String!
    createdAt: String!
    isActive: Boolean!
    name: String!
    organization: Organization!
    password: String!
    responsibleForCollectionPaths: [CollectionPath]
    updatedAt: String!
  }

  type Query {
    getUserName: String!
  }

  type User {
    id: String!
    canceledCollectionRequests: [CollectionRequest]
    createdAt: String!
    createdCollectionRequests: [CollectionRequest]
    email: String!
    isActive: Boolean!
    locations: [UserLocation]
    name: String!
    password: String!
    updatedAt: String!
  }

  type UserLocation {
    id: String!
    address: Address
    createdAt: String!
    collectionRequests: [CollectionRequest]
    latitude: Float
    longitude: Float
    placename: String!
    updatedAt: String!
    user: User!
  }

  type TestType {
    name: String!
  }
`;
