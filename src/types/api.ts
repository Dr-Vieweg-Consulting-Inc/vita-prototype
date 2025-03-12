import { Entity } from "./state";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface APIResponse {}

export interface LoginResponse extends APIResponse {
  id: number;
  name: string;
  email: string;
  entities: Entity[]; // Include entities & roles
  //   isAuthenticated: true;
  token: string;
  // loading: false,
  // error: null,
}
