import { RetrieveEntityDetailsResponse } from "../types";
import { getRequest } from "./utils";

export async function retrieveEntityDetails(entityId: number) {
  return await getRequest<RetrieveEntityDetailsResponse>(
    `entities/${entityId}/members`
  );
}
