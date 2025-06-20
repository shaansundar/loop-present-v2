import { env } from "../../env";
import { SubjectInfoResponse } from "@/types/class-profile";

export const getSubjects = async ({ authToken }: { authToken: string }): Promise<SubjectInfoResponse> => {
    const response = await fetch(`${env.apiUrl}/subjects`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        },
        referrerPolicy: "unsafe-url",
        method: 'POST',
        body: JSON.stringify(
            { "term_id": "4" })
    });
    return response.json();
};