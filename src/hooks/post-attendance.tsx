import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PostAttendanceRequest, PostAttendanceResponse } from "@/types/attendance-type";

interface PostAttendanceParams extends PostAttendanceRequest {
    authToken: string;
    isProxy: boolean;
}

const postAttendanceMutation = async (params: PostAttendanceParams): Promise<PostAttendanceResponse> => {
    const response = await fetch('/api/attendance/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error('Failed to post attendance');
    }

    return response.json();
}

export const usePostAttendance = () => {
    return useMutation({
        mutationFn: postAttendanceMutation,
        onSuccess: () => {
            toast.success("Attendance posted successfully");
        },
        onError: () => {
            toast.error("Failed to post attendance");
        }
    });
};