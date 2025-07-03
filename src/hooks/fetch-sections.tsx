import { useQuery } from "@tanstack/react-query";
import { SectionInfoResponse } from "@/types/class-profile";

const getSections = async ({ subjectId, authToken, isProxy }: { subjectId: number, authToken: string, isProxy: boolean }): Promise<SectionInfoResponse> => {
    const response = await fetch('/api/sections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectId, authToken, isProxy }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch sections');
    }

    return response.json();
}

export const useFetchSections = ({ subjectId, authToken, isProxy }: { subjectId: number, authToken: string, isProxy: boolean }) => {
    return useQuery({
        queryKey: ["sections", subjectId, authToken, isProxy],
        queryFn: () => getSections({ subjectId, authToken, isProxy }),
        enabled: !!subjectId && !!authToken
    });
};