import { env } from "../../env";
import { GetAttendanceStatusRequest, GetAttendanceStatusResponse, PostAttendanceRequest, PostAttendanceResponse } from "../types/attendance-type";

export const getAttendance = async (attendance: GetAttendanceStatusRequest, authToken: string): Promise<GetAttendanceStatusResponse> => {
    const response = await fetch(`${env.apiUrl}/attendance`, {
        method: 'POST',
        body: JSON.stringify(attendance),
        referrerPolicy: "unsafe-url",
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.json();
};

export const postAttendance = async (attendance: PostAttendanceRequest, authToken: string): Promise<PostAttendanceResponse> => {
    const response = await fetch(`${env.apiUrl}/saveAttendance`, {
        method: 'POST',
        body: JSON.stringify(attendance),
        referrerPolicy: "unsafe-url",
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.json();
};