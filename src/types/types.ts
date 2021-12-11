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
  estimatedTime?: number;
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
  acceptedByOrganizationUser?: OrganizationUser;
  canceledOrCompletedByUser?: User;
  canceledOrCompletedByOrganizationUser?: OrganizationUser;
  createdByUser?: User;
  collectionPoint?: CollectionPoint;
  collectedRequestMaterials?: CollectionRequestMaterial[];
  collectionStatus?: CollectionStatus;
  details?: string;
  locations?: UserLocation;
  organization?: Organization;
}

interface CollectionRequestMaterial extends DateMetadata {
  _id?: ObjectId;
  amount?: number;
  collectionRequest?: CollectionRequest;
  description?: string;
  materialType?: MaterialType;
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

interface OrganizationUser extends BaseUser {
  _id?: ObjectId;
  acceptedCollectionRequests?: CollectionRequest[];
  canceledCollectionRequests?: CollectionRequest[];
  organization?: Organization;
  responsibleForCollectionPaths?: CollectionPath[];
}

interface User extends BaseUser {
  _id?: ObjectId;
  canceledCollectionRequests?: CollectionRequest[];
  createdCollectionRequests?: CollectionRequest[];
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
  CollectionPath,
  CollectionPoint,
  CollectionRequest,
  CollectionRequestMaterial,
  Organization,
  OrganizationUser,
  User,
  UserLocation,
};
