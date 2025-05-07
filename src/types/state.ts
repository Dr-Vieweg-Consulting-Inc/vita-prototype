import store from "../store";
import { Role } from "./role";

export type RootState = ReturnType<typeof store.getState>;

// export interface UserState {
//   id: number | null;
//   name: string;
//   email: string;
//   //   roles: Role[];
//   entities: Entity[]; // 🔹 Add entities array
//   isAuthenticated: boolean;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// export interface Entity {
//   id: number;
//   name: string;
//   roles: Role[];
// }

export interface Entity {
  id: number;
  name: string;
  // industry: string;
  // country: string;
  roles: Role[];
}

export enum UserStatus {
  Active = "active",
  Pending = "pending",
  Suspended = "suspended",
}

export interface UserState {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  entities: Entity[]; // 🔹 Store assigned entities
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  status: UserStatus | null;
  activeEntityId: number | null;
}
