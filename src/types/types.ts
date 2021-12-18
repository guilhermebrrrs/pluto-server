import { CollectionStatus, MaterialType, OrganizationType } from "./enums";
import { ObjectId } from "mongodb";

interface Address extends DateMetadata {
  _id?: ObjectId;
  cep?: string;
  city?: string;
  complement?: string;
  country?: string;
  number?: string;
  state?: string;
  street?: string;
  userLocation?: UserLocation;
}

interface AuthenticateUserInput {
  email: string;
  password: string;
}

interface BaseUser extends DateMetadata {
  email?: string;
  isActive?: boolean;
  name?: string;
  password?: string;
}

interface CollectionPath extends DateMetadata {
  _id?: ObjectId;
  collectionPoints?: CollectionPoint[];
  collectionPathResponsibleOrganizationUser?: OrganizationUser;
  collectionPathStatus?: CollectionStatus;
  description?: string;
  estimatedTimeInMinutes?: number;
  name?: string;
  totalEstimatedDistance?: number;
}

interface CollectionPoint extends DateMetadata {
  _id?: ObjectId;
  collectionPath?: CollectionPath;
  collectionRequest?: CollectionRequest;
  destination?: CollectionPoint;
  origin?: CollectionPoint;
}

interface CollectionRequest extends DateMetadata {
  _id?: ObjectId;
  acceptedBy?: OrganizationUser;
  canceledOrCompletedBy?: OrganizationUser | User;
  createdBy?: User;
  collectionPoint?: CollectionPoint;
  collectedRequestMaterials?: CollectionRequestMaterial[];
  collectionStatus?: CollectionStatus;
  details?: string;
  location?: UserLocation;
  organization?: Organization;
}

interface CollectionRequestMaterial extends DateMetadata {
  _id?: ObjectId;
  amount?: number;
  collectionRequest?: CollectionRequest;
  description?: string;
  materialType?: MaterialType;
}

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface DateMetadata {
  createdAt?: Date;
  updatedAt?: Date;
}

interface Organization extends BaseUser {
  _id?: ObjectId;
  collectionRequests?: CollectionRequest[];
  cpfCnpj?: string;
  organizationType?: OrganizationType;
  users?: OrganizationUser[];
}

interface OrganizationUser
  extends Omit<BaseUser, "email" & "isActive" & "password"> {
  _id?: ObjectId;
  collectionRequests: CollectionRequest[];
  organization?: Organization;
  responsibleForCollectionPaths?: CollectionPath[];
  userLoginKeys?: OrganizationUserLoginKey[];
}

interface OrganizationUserLoginKey {
  _id: ObjectId;
  organization?: Organization;
  email?: string;
  isActive?: boolean;
  password?: string;
  organizationUser: OrganizationUser;
}

interface UpdateUserPasswordInput {
  _id: string;
  newPassword: string;
}

interface User extends BaseUser {
  _id?: ObjectId;
  collectionRequests?: CollectionRequest[];
  locations?: UserLocation[];
}

interface UserLocation extends DateMetadata {
  _id?: ObjectId;
  address?: Address;
  collectionRequests?: CollectionRequest[];
  latitude?: number;
  longitude?: number;
  placename?: string;
  user?: User;
}

export type {
  Address,
  AuthenticateUserInput,
  CollectionPath,
  CollectionPoint,
  CollectionRequest,
  CollectionRequestMaterial,
  CreateUserInput,
  Organization,
  OrganizationUser,
  OrganizationUserLoginKey,
  UpdateUserPasswordInput,
  User,
  UserLocation,
};
