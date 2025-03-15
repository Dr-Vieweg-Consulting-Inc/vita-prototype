import { RetrieveMembersResponse } from "../types";
import { getRequest } from "./utils";

export async function retrieveMembers(entity: number) {
  return await getRequest<RetrieveMembersResponse>(
    `entities/${entity}/members`
  );
}
