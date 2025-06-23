import { SubjectInfoResponse } from "@/types/class-profile";

// Helper function to ensure HTTP protocol for specific IP


export const getSubjects = async ({ authToken, apiUrl }: { authToken: string, apiUrl: string }): Promise<SubjectInfoResponse> => {
    const response = await fetch(`${apiUrl}/subjects`, {
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