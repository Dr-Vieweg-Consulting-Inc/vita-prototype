import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import user from "./user";

// Define initial state types
interface Entity {
  id: number;
  name: string;
  type: string;
  industry: string;
  country: string;
  contact_email: string;
}

interface ESGData {
  id: number;
  entityId: number;
  category: string;
  value: string;
  unit: string;
  reportingPeriod: string;
  standard?: string;
  reviewed?: boolean;
}

interface PublishedReport {
  id: number;
  entityName: string;
  category: string;
  value: string;
  reportingPeriod: string;
  standard: string;
  publishedUrl: string;
  timestamp: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Reviewer" | "Auditor";
}

interface PendingTask {
  id: number;
  userId: number;
  description: string;
  status: "Pending" | "Completed";
}

export interface RootState {
  entities: Entity[];
  esgData: ESGData[];
  publishedReports: PublishedReport[];
  users: User[];
  pendingTasks: PendingTask[];
  currentUser: User | null;
}

// Define initial state
const initialState: RootState = {
  entities: [
    {
      id: 1,
      name: "Company A",
      type: "Corporate",
      industry: "Technology",
      country: "USA",
      contact_email: "contact@companya.com",
    },
    {
      id: 2,
      name: "Company B",
      type: "Corporate",
      industry: "Manufacturing",
      country: "Germany",
      contact_email: "contact@companyb.com",
    },
    {
      id: 3,
      name: "Company C",
      type: "Startup",
      industry: "Energy",
      country: "France",
      contact_email: "contact@companyc.com",
    },
  ],
  esgData: [
    {
      id: 1,
      entityId: 1,
      category: "Carbon Emissions",
      value: "150",
      unit: "tons",
      reportingPeriod: "2024",
      standard: "CSRD",
    },
    {
      id: 2,
      entityId: 1,
      category: "Water Usage",
      value: "200",
      unit: "cubic meters",
      reportingPeriod: "2024",
      standard: "ISSB",
    },
    {
      id: 3,
      entityId: 2,
      category: "Carbon Emissions",
      value: "220",
      unit: "tons",
      reportingPeriod: "2024",
      standard: "ESRS",
    },
    {
      id: 4,
      entityId: 2,
      category: "Renewable Energy Usage",
      value: "70",
      unit: "%",
      reportingPeriod: "2024",
      standard: "SEC",
    },
    {
      id: 5,
      entityId: 3,
      category: "Water Usage",
      value: "500",
      unit: "cubic meters",
      reportingPeriod: "2024",
      standard: "CSRD",
    },
    {
      id: 6,
      entityId: 3,
      category: "Carbon Emissions",
      value: "100",
      unit: "tons",
      reportingPeriod: "2024",
      standard: "ISSB",
    },
  ],
  publishedReports: [],
  users: [],
  pendingTasks: [],
  currentUser: null,
};

// Reducers
const entitiesReducer = (
  state = initialState.entities,
  action: { type: string; payload: Entity }
) => {
  switch (action.type) {
    case "ADD_ENTITY":
      return [...state, action.payload];
    default:
      return state;
  }
};

const esgDataReducer = (
  state = initialState.esgData,
  action: { type: string; payload: ESGData }
) => {
  switch (action.type) {
    case "ADD_ESG_DATA":
      return [...state, action.payload];
    default:
      return state;
  }
};

const publishedReportsReducer = (
  state = initialState.publishedReports,
  action: { type: string; payload: PublishedReport }
) => {
  switch (action.type) {
    case "PUBLISH_REPORT":
      return [...state, action.payload];
    default:
      return state;
  }
};

const usersReducer = (
  state = initialState.users,
  action: { type: string; payload: User }
) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "SET_CURRENT_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

const pendingTasksReducer = (
  state = initialState.pendingTasks,
  action: { type: string; payload: PendingTask }
) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "COMPLETE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, status: "Completed" } : task
      );
    default:
      return state;
  }
};

const currentUserReducer = (
  state = initialState.currentUser,
  action: { type: string; payload: User }
) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};

// Combine reducers
export const reducer = combineReducers({
  // entities: entitiesReducer,
  // esgData: esgDataReducer,
  // publishedReports: publishedReportsReducer,
  user,
  // pendingTasks: pendingTasksReducer,
  // currentUser: currentUserReducer,
});

// Create store
const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export default store;

// ------------------

// Action Types
export const ADD_ENTITY = "ADD_ENTITY";
export const ADD_ESG_DATA = "ADD_ESG_DATA";
export const PUBLISH_REPORT = "PUBLISH_REPORT";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// Interfaces for Actions
interface AddEntityAction {
  type: typeof ADD_ENTITY;
  payload: Entity;
}

interface AddESGDataAction {
  type: typeof ADD_ESG_DATA;
  payload: ESGData;
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

// --------------------------
