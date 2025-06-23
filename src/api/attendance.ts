import { GetAttendanceStatusRequest, GetAttendanceStatusResponse, PostAttendanceRequest, PostAttendanceResponse } from "../types/attendance-type";



export const getAttendance = async (attendance: GetAttendanceStatusRequest, authToken: string, apiUrl: string): Promise<GetAttendanceStatusResponse> => {
    const response = await fetch(`${apiUrl}/attendance`, {
        method: 'POST',
        body: JSON.stringify(attendance),
        referrerPolicy: "unsafe-url",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.json();
};

export const postAttendance = async (attendance: PostAttendanceRequest, authToken: string, apiUrl: string): Promise<PostAttendanceResponse> => {
    const response = await fetch(`${apiUrl}/saveAttendance`, {
        method: 'POST',
        body: JSON.stringify(attendance),
        referrerPolicy: "unsafe-url",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.json();
};