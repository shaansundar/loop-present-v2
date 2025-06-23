import { SectionInfoResponse } from "@/types/class-profile";


export const getSections = async ({ subjectId, authToken, apiUrl }: { subjectId: number, authToken: string, apiUrl: string }): Promise<SectionInfoResponse> => {
    const response = await fetch(`${apiUrl}/sections`, {
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