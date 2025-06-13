import { getSubjects } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

export const useFetchSubjects = ({ authToken }: { authToken: string }) => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => getSubjects({ authToken: authToken || "" }),
        enabled: !!authToken
    });
};