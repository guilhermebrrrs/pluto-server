import {
  CollectionPathStatus,
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

interface AvailableDayAndTimeInput {
  weekDay: WeekDays;
  maxTime: AvailableTimeInput;
  minTime: AvailableTimeInput;
}

interface AvailableTime {
  hour: number;
  minutes: number;
}

interface AvailableTimeInput {
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
  collectionPathStatus?: CollectionPathStatus;
  description?: string;
  estimatedTimeInMinutes?: number;
  name?: string;
  organization?: Organization;
  totalEstimatedDistance?: number;
}

interface CollectionPoint extends DateMetadata {
  _id?: ObjectId;
  collectionPath?: CollectionPath;
  collectionRequest?: CollectionRequest;
  destination?: CollectionPoint;
  location?: UserLocation;
  origin?: CollectionPoint;
}

interface CollectionRequest extends DateMetadata {
  _id?: ObjectId;
  acceptedBy?: Organization | OrganizationUser;
  canceledOrCompletedBy?: Organization | OrganizationUser | User;
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

interface CreateCollectionPathInput {
  description?: string;
  name: string;
  organizationId: string;
}

interface CreateCollectionRequestInput {
  collectionRequestMaterials: CreateCollectionRequestMaterialInput[];
  details?: string;
  locationId: string;
  userId: string;
}

interface CreateCollectionRequestMaterialInput {
  amount?: number;
  description?: string;
  materialType: MaterialType;
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

interface CreateUserLocationAvailableDaysAndTimesInput {
  weekDay: WeekDays;
  maxTime: CreateUserLocationAvailableTimeInput;
  minTime: CreateUserLocationAvailableTimeInput;
}

interface CreateUserLocationAvailableTimeInput {
  hour: number;
  minutes: number;
}

interface CreateUserLocationInput {
  userId: string;
  address: CreateUserLocationAddressInput;
  availableDaysAndTimes: [CreateUserLocationAvailableDaysAndTimesInput];
  comments: string;
  placename: string;
}

interface DateMetadata {
  createdAt?: Date;
  updatedAt?: Date;
}

interface GraphHopperGeocodingRequestSchema {
  hits?: GraphHopperGeocodingLocation[];
  took?: number;
}

interface GraphHopperGeocodingLocation {
  city?: string;
  country?: string;
  houseNumber?: string;
  name?: string;
  osm_id?: string;
  osm_key?: string;
  osm_type?: string;
  point?: GraphHopperGeocodingPoint;
  postcode?: string;
  state?: string;
  street?: string;
}

interface GraphHopperGeocodingPoint {
  lat?: number;
  lng?: number;
}

interface Organization extends BaseUser {
  _id?: ObjectId;
  collectionRequests?: CollectionRequest[];
  collectionPaths?: CollectionPath[];
  cpfCnpj?: string;
  organizationType: OrganizationType;
  users?: OrganizationUser[];
}

interface OrganizationRegistrationValidation {
  cpfCnpjAlreadyExists: boolean;
  emailAlreadyExists: boolean;
  organizationNameAlreadyExists: boolean;
  passwordConstraintDoesntMatch: boolean;
  registrationSucceeded: boolean;
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

interface OrganizationUserRegistrationValidation {
  emailAlreadyExists: boolean;
  emailAndOrganizationAlreadyExists: boolean;
  noOrganizationFound: boolean;
  organizationNameAlreadyExists: boolean;
  organizationWithSameNameAlreadyExists: boolean;
  passwordConstraintDoesntMatch: boolean;
  registrationSucceeded: boolean;
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
  _id: string;
  address: UpdateUserLocationAddressInput;
  availableDaysAndTimes: [AvailableDayAndTimeInput];
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
  availableDaysAndTimes?: AvailableDayAndTime[];
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
  AvailableDayAndTimeInput,
  AvailableTime,
  AvailableTimeInput,
  CollectionPath,
  CollectionPoint,
  CollectionRequest,
  CollectionRequestMaterial,
  CreateCollectionPathInput,
  CreateCollectionRequestInput,
  CreateCollectionRequestMaterialInput,
  CreateOrganizationInput,
  CreateOrganizationUserInput,
  CreateUserInput,
  CreateUserLocationAddressInput,
  CreateUserLocationAvailableDaysAndTimesInput,
  CreateUserLocationAvailableTimeInput,
  CreateUserLocationInput,
  GraphHopperGeocodingLocation,
  GraphHopperGeocodingPoint,
  GraphHopperGeocodingRequestSchema,
  Organization,
  OrganizationRegistrationValidation,
  OrganizationUser,
  OrganizationUserPersonalDataInput,
  OrganizationUserRegistrationValidation,
  UpdateOrganizationUserPersonalDataInput,
  UpdateUserLocationAddressInput,
  UpdateUserLocationInput,
  UpdateUserPasswordInput,
  User,
  UserLocation,
};
