import { CollectionStatus, MaterialType, OrganizationType } from "./enums";

interface Address extends DateMetadata {
  id: string;
  cep: string;
  city: string;
  complement?: string;
  country: string;
  number: string;
  state: string;
  street: string;
  userLocation: UserLocation;
}

interface BaseUser extends DateMetadata {
  email: string;
  isActive: boolean;
  name: string;
  password: string;
}

interface CollectionPath extends DateMetadata {
  id: string;
  collectionPoints: CollectionPoint[];
  collectionPathResponsibleOrganizationUser?: OrganizationUser;
  collectionPathStatus: CollectionStatus;
  description?: string;
  estimatedTime: number;
  name: string;
  totalEstimatedDistance: number;
}

interface CollectionPoint extends DateMetadata {
  id: string;
  collectionPath: CollectionPath;
  collectionRequest: CollectionRequest;
  destination?: CollectionPoint;
  origin?: CollectionPoint;
}

interface CollectionRequest extends DateMetadata {
  id: string;
  acceptedByOrganizationUser?: OrganizationUser;
  canceledOrCompletedByUser?: User;
  canceledOrCompletedByOrganizationUser?: OrganizationUser;
  createdByUser: User;
  collectionPoint?: CollectionPoint;
  collectedRequestMaterials?: CollectionRequestMaterial[];
  collectionStatus: CollectionStatus;
  details?: string;
  locations: UserLocation;
  organization?: Organization;
}

interface CollectionRequestMaterial extends DateMetadata {
  id: string;
  amount: number;
  collectionRequest: CollectionRequest;
  description?: string;
  materialType: MaterialType;
}

interface DateMetadata {
  createdAt: Date;
  updatedAt: Date;
}

interface OrganizationUser extends BaseUser {
  id: string;
  acceptedCollectionRequests: CollectionRequest[];
  canceledCollectionRequests: CollectionRequest[];
  organization: Organization;
  responsibleForCollectionPaths: CollectionPath[];
}

interface Organization extends BaseUser {
  id: string;
  collectionRequests: CollectionRequest[];
  cpfCnpj: string;
  organizationType: OrganizationType;
  users: OrganizationUser[];
}

interface User extends BaseUser {
  id: string;
  canceledCollectionRequests: CollectionRequest[];
  createdCollectionRequests: CollectionRequest[];
  locations: UserLocation[];
}

interface UserLocation extends DateMetadata {
  id: string;
  address?: Address;
  collectionRequests: CollectionRequest[];
  latitude: number;
  longitude: number;
  placename: string;
  user: User;
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
