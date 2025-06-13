import { getAttendance } from "@/api/attendance";
import { useQuery } from "@tanstack/react-query";

export const useFetchCurrentAttendance = ({ authToken, programId, termId, subjectId, sectionId }: { authToken: string, programId: number, termId: number, subjectId: number, sectionId: number }) => {
    return useQuery({
        queryKey: ["current-attendance"],
        queryFn: () => getAttendance({ program_id: programId.toString(), term_id: termId.toString(), subject_id: subjectId.toString(), section_id: sectionId.toString() }, authToken),
        enabled: !!authToken && !!programId && !!termId && !!subjectId && !!sectionId,
        refetchInterval: 1000
    });
};