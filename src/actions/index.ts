// Action Types
export const ADD_ENTITY = "ADD_ENTITY";
export const ADD_ESG_DATA = "ADD_ESG_DATA";
export const ADD_PROCEDURE = "ADD_PROCEDURE";
export const PUBLISH_REPORT = "PUBLISH_REPORT";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// Entity Interface
export interface Entity {
  id: number;
  name: string;
  type: string;
  industry: string;
  country: string;
  contact_email: string;
}

// ESG Data Interface
export interface ESGData {
  id: number;
  entityId: number;
  category: string;
  value: string;
  unit: string;
  reportingPeriod: string;
  standard?: string;
  reviewed?: boolean;
}

// Procedure Interface
export interface Procedure {
  id: number;
  entityId: number;
  name: string;
  description: string;
}

// Published Report Interface
export interface PublishedReport {
  id: number;
  entityName: string;
  category: string;
  value: string;
  reportingPeriod: string;
  standard: string;
  publishedUrl: string;
  timestamp: string;
}

// User Interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Reviewer" | "Auditor";
}

// Define Action Interfaces
interface AddEntityAction {
  type: typeof ADD_ENTITY;
  payload: Entity;
}

interface AddESGDataAction {
  type: typeof ADD_ESG_DATA;
  payload: ESGData;
}

interface AddProcedureAction {
  type: typeof ADD_PROCEDURE;
  payload: Procedure;
}

interface PublishReportAction {
  type: typeof PUBLISH_REPORT;
  payload: PublishedReport;
}

interface CompleteTaskAction {
  type: typeof COMPLETE_TASK;
  payload: number; // Task ID
}

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  payload: User;
}

// Union Type for All Actions
export type ActionTypes =
  | AddEntityAction
  | AddESGDataAction
  | AddProcedureAction
  | PublishReportAction
  | CompleteTaskAction
  | SetCurrentUserAction;

// Action Creators
export const addEntity = (entity: Entity): AddEntityAction => ({
  type: ADD_ENTITY,
  payload: entity,
});

export const addEsgData = (data: ESGData): AddESGDataAction => ({
  type: ADD_ESG_DATA,
  payload: data,
});

export const addProcedure = (procedure: Procedure): AddProcedureAction => ({
  type: ADD_PROCEDURE,
  payload: procedure,
});

export const publishReport = (
  report: PublishedReport
): PublishReportAction => ({
  type: PUBLISH_REPORT,
  payload: report,
});

export const completeTask = (taskId: number): CompleteTaskAction => ({
  type: COMPLETE_TASK,
  payload: taskId,
});

export const setCurrentUser = (user: User): SetCurrentUserAction => ({
  type: SET_CURRENT_USER,
  payload: user,
});
