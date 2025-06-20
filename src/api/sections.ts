import { env } from "../../env";
import { SectionInfoResponse } from "@/types/class-profile";

export const getSections = async ({ subjectId, authToken }: { subjectId: number, authToken: string }): Promise<SectionInfoResponse> => {
    const response = await fetch(`${env.apiUrl}/sections`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        },
        referrerPolicy: "unsafe-url",
        method: 'POST',
        body: JSON.stringify(
            { "program_id": "1", "term_id": "4", "subject_id": subjectId })
    });
    return response.json();
};