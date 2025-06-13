import { getSections } from "@/api/sections";
import { useQuery } from "@tanstack/react-query";

export const useFetchSections = ({ subjectId, authToken }: { subjectId: number, authToken: string }) => {
    return useQuery({
        queryKey: ["sections", subjectId],
        queryFn: () => getSections({ subjectId, authToken }),
        enabled: !!subjectId && !!authToken
    });
};