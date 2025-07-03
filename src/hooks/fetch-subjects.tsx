import { useQuery } from "@tanstack/react-query";
import { SubjectInfoResponse } from "@/types/class-profile";

const getSubjects = async ({ authToken, isProxy }: { authToken: string, isProxy: boolean }): Promise<SubjectInfoResponse> => {
    const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken, isProxy }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch subjects');
    }

    return response.json();
};


export const useFetchSubjects = ({ authToken, isProxy }: { authToken: string, isProxy: boolean }) => {
    return useQuery({
        queryKey: ["subjects", authToken, isProxy],
        queryFn: () => getSubjects({ authToken, isProxy }),
        enabled: !!authToken
    });
};