import { postAttendance } from "@/api/attendance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostAttendance = () => {
    return useMutation({
        mutationFn: ({ authToken, id, pageid, program_id, term_id, subject_id, section_id, student_id, apiUrl }: {
            authToken: string,
            id: number,
            pageid: number,
            program_id: number,
            term_id: number,
            subject_id: number,
            section_id: number,
            student_id: number,
            apiUrl: string
        }) => postAttendance({ id, pageid, program_id, term_id, subject_id, section_id, student_id }, authToken, apiUrl),
        onSuccess: () => {
            toast.success("Attendance posted successfully");
        },
        onError: () => {
            toast.error("Failed to post attendance");
        }
    });
};