import { getPrograms } from "@/app/api/programs/route";
import { useQuery } from "@tanstack/react-query";

export const useHealthCheck = () => {
    return useQuery({
        queryKey: ['health-check'],
        queryFn: () => getPrograms({ isHealthCheck: true })
    });
};