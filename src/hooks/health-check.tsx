import { getPrograms } from "@/api/programs";
import { useQuery } from "@tanstack/react-query";

export const useHealthCheck = () => {
    return useQuery({
        queryKey: ['health-check'],
        queryFn: () => getPrograms({ isHealthCheck: true })
    });
};