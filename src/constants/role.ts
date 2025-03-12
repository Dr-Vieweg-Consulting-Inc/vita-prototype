import { Role, Permission } from "../types";

export const ROLE_DATA: Record<Role, { permissions: Permission[] }> = {
  [Role.Admin]: {
    permissions: [
      Permission.ManageUser,
      Permission.Review,
      Permission.DataEntry,
      Permission.Audit,
      Permission.Publish,
      Permission.ViewReports,
    ],
  },
  [Role.Reviewer]: {
    permissions: [Permission.Review, Permission.ViewReports],
  },
  [Role.DataEntry]: {
    permissions: [Permission.DataEntry, Permission.ViewReports],
  },
  [Role.Auditor]: {
    permissions: [Permission.Audit, Permission.ViewReports],
  },
  [Role.Publisher]: {
    permissions: [Permission.Publish, Permission.ViewReports],
  },
  [Role.Viewer]: {
    permissions: [Permission.ViewReports], // View-only access
  },
};
