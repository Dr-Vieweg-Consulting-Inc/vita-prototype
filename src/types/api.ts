import { Entity } from "./state";

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  entities: Entity[]; // Include entities & roles
  //   isAuthenticated: true;
  token: string;
  // loading: false,
  // error: null,
}
