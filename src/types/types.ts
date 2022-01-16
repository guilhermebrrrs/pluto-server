import {
  CollectionStatus,
  MaterialType,
  OrganizationType,
  WeekDays,
} from "./enums";
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

interface AuthenticateOrganizationInput {
  organizationEmail: string;
  password: string;
}

interface AuthenticateOrganizationUserInput {
  email: string;
  organizationEmail: string;
  password: string;
}

interface AuthenticateUserInput {
  email: string;
  password: string;
}

type AvailableDayAndTime = {
  weekDay: WeekDays;
  maxTime: AvailableTime;
  minTime: AvailableTime;
};

type AvailableTime = {
  hour: number;
  minutes: number;
};

interface BaseUser extends DateMetadata {
  email: string;
  isActive?: boolean;
  name: string;
  password: string;
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

interface CreateOrganizationUserInput {
  email: string;
  username: string;
  organizationEmail: string;
  password: string;
}

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface CreateOrganizationInput {
  email: string;
  cpfCnpj?: string;
  name: string;
  password: string;
  organizationType: OrganizationType;
}

interface DateMetadata {
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrganizationRegistrationValidation {
  cpfCnpjAlreadyExists: boolean;
  emailAlreadyExists: boolean;
  organizationNameAlreadyExists: boolean;
  passwordConstraintDoesntMatch: boolean;
  registrationSucceeded: boolean;
}

interface OrganizationUserRegistrationValidation {
  emailAlreadyExists: boolean;
  emailAndOrganizationAlreadyExists: boolean;
  noOrganizationFound: boolean;
  organizationNameAlreadyExists: boolean;
  organizationWithSameNameAlreadyExists: boolean;
  passwordConstraintDoesntMatch: boolean;
  registrationSucceeded: boolean;
}

interface Organization extends BaseUser {
  _id?: ObjectId;
  collectionRequests?: CollectionRequest[];
  cpfCnpj?: string;
  organizationType: OrganizationType;
  users?: OrganizationUser[];
}

interface OrganizationUser extends BaseUser {
  _id?: ObjectId;
  collectionRequests?: CollectionRequest[];
  organization?: Organization;
  responsibleForCollectionPaths?: CollectionPath[];
}

interface OrganizationUserPersonalDataInput {
  email: string;
  name: string;
  isActive: boolean;
  password: string;
}

interface UpdateOrganizationUserPersonalDataInput {
  _id: string;
  data: OrganizationUserPersonalDataInput;
}

interface UpdateUserPasswordInput {
  email: string;
  newPassword: string;
  oldPassword: string;
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
  AuthenticateOrganizationInput,
  AuthenticateOrganizationUserInput,
  AuthenticateUserInput,
  AvailableDayAndTime,
  AvailableTime,
  CollectionPath,
  CollectionPoint,
  CollectionRequest,
  CollectionRequestMaterial,
  CreateOrganizationInput,
  CreateOrganizationUserInput,
  CreateUserInput,
  Organization,
  OrganizationRegistrationValidation,
  OrganizationUserRegistrationValidation,
  OrganizationUser,
  OrganizationUserPersonalDataInput,
  UpdateOrganizationUserPersonalDataInput,
  UpdateUserPasswordInput,
  User,
  UserLocation,
};
