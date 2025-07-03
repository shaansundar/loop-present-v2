import { useQuery } from "@tanstack/react-query";
import { GetAttendanceStatusResponse } from "@/types/attendance-type";

interface FetchCurrentAttendanceParams {
    authToken: string;
    programId: number;
    termId: number;
    subjectId: number;
    sectionId: number;
    isProxy: boolean;
}

const getAttendance = async (params: FetchCurrentAttendanceParams): Promise<GetAttendanceStatusResponse> => {
    const { authToken, programId, termId, subjectId, sectionId, isProxy } = params;
    const response = await fetch('/api/attendance/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            program_id: programId, 
            term_id: termId, 
            subject_id: subjectId, 
            section_id: sectionId, 
            authToken,
            isProxy
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch current attendance');
    }

    return response.json();
};

export const useFetchCurrentAttendance = (params: FetchCurrentAttendanceParams) => {
    const { authToken, programId, termId, subjectId, sectionId, isProxy } = params;
    return useQuery({
        queryKey: ["current-attendance", authToken, programId, termId, subjectId, sectionId, isProxy],
        queryFn: () => getAttendance(params),
        enabled: !!authToken && !!programId && !!termId && !!subjectId && !!sectionId,
        refetchInterval: 1000
    });
};