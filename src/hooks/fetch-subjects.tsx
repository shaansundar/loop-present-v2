import { getSubjects } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

export const useFetchSubjects = ({ authToken, apiUrl }: { authToken: string, apiUrl: string }) => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => getSubjects({ authToken: authToken || "", apiUrl: apiUrl || "" }),
        enabled: !!authToken
    });
};