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
  district?: string;
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

interface AvailableDayAndTime {
  weekDay: WeekDays;
  maxTime: AvailableTime;
  minTime: AvailableTime;
}

interface AvailableTime {
  hour: number;
  minutes: number;
}

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
  collectionRequestMaterials?: CollectionRequestMaterial[];
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

interface CreateOrganizationInput {
  email: string;
  cpfCnpj?: string;
  name: string;
  password: string;
  organizationType: OrganizationType;
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

interface CreateUserLocationAddressInput {
  cep: string;
  city: string;
  complement?: string;
  country: string;
  district: string;
  number: string;
  state: string;
  street: string;
}

interface CreateUserLocationInput {
  userId: string;
  address: CreateUserLocationAddressInput;
  availableDaysAndTimes: [AvailableDayAndTime];
  comments: string;
  placename: string;
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

interface UpdateUserLocationAddressInput {
  _id: string;
  cep: string;
  city: string;
  complement?: string;
  country: string;
  district: string;
  number: string;
  state: string;
  street: string;
}

interface UpdateUserLocationInput {
  userId: string;
  address: UpdateUserLocationAddressInput;
  availableDaysAndTimes: [AvailableDayAndTime];
  comments: string;
  placename: string;
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
  availableDaysAndTimes: AvailableDayAndTime[];
  collectionRequests?: CollectionRequest[];
  comments?: string;
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
  CreateUserLocationAddressInput,
  CreateUserLocationInput,
  Organization,
  OrganizationRegistrationValidation,
  OrganizationUserRegistrationValidation,
  OrganizationUser,
  OrganizationUserPersonalDataInput,
  UpdateOrganizationUserPersonalDataInput,
  UpdateUserLocationAddressInput,
  UpdateUserLocationInput,
  UpdateUserPasswordInput,
  User,
  UserLocation,
};
