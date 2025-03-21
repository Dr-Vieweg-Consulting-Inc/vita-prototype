import { Role } from "./role";
import { Entity, UserStatus } from "./state";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface APIResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface APIRequest {}

export interface LoginRequest extends Request {
  email: string;
  password: string;
}

export interface LoginResponse extends APIResponse {
  id: number;
  // name: string;

  firstName: string;
  lastName: string;

  email: string;
  entities: Entity[]; // Include entities & roles
  //   isAuthenticated: true;
  token: string;

  // loading: false,
  // error: null,

  status: UserStatus;
}

export interface RegisterRequest extends Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends APIResponse {
  id: number;
  // name: string;

  //   firstName: string;
  //   lastName: string;

  //   email: string;
  entities: Entity[]; // Include entities & roles
  //   isAuthenticated: true;
  token: string;

  status: UserStatus;
}

export interface RetrieveMembersRequest extends APIRequest {
  entity: number;
}

export interface RetrieveMembersResponse extends APIResponse {
  members: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
  }[];
}

// export interface RetrieveEntityDetailsRequest extends APIRequest {
//   entity: number;
// }

export interface RetrieveEntityDetailsResponse extends APIResponse {
  name: string;
  industry: string;
  country: string;
  deploymentMode: string;
  standards: { id: number; name: string }[];
  members: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
  }[];
}
