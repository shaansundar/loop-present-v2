import { getSections } from "@/api/sections";
import { useQuery } from "@tanstack/react-query";

export const useFetchSections = ({ subjectId, authToken, apiUrl }: { subjectId: number, authToken: string, apiUrl: string }) => {
    return useQuery({
        queryKey: ["sections", subjectId],
        queryFn: () => getSections({ subjectId, authToken, apiUrl }),
        enabled: !!subjectId && !!authToken
    });
};