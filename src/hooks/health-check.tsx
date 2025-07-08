import { PROF_LIST } from "@/constants/prof-list";
import { useQuery } from "@tanstack/react-query";
export const useHealthCheck = ({isProxy}:{isProxy:boolean}) => {
    const authToken = PROF_LIST[0].accessToken || PROF_LIST.find(prof => prof.accessToken !== '')?.accessToken;
    return useQuery({
        queryKey: ['health-check', isProxy],
        queryFn: async () => {
            const response = await fetch(`/api/programs?authToken=${authToken}&isProxy=${isProxy}`,{
                method:'GET',
                // body:JSON.stringify({isProxy, authToken}),
                headers:{
                    'Content-Type':'application/json'
                }
            })

            console.log("🚀 ~ queryFn: ~ response:", response);

            return response.status === 200
        },
        refetchInterval: 2000,
    });
};