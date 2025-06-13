import { env } from "../../env";
import { ProgramInfoResponse } from "../types/class-profile";

export const getPrograms = async ({ isHealthCheck = false }: { isHealthCheck?: boolean }): Promise<boolean | ProgramInfoResponse[]> => {
    const response = await fetch(`${env.apiUrl}/programs`);
    if (isHealthCheck) {
        if (response.status > 400) {
            return false;
        } else {
            return true;
        }
    }
    const data = await response.json();
    return data;
};