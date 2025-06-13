import { Attendance } from "./student-profile";

export interface GetAttendanceStatusRequest {
    program_id: string;
    term_id: string;
    subject_id: string;
    section_id: string;
}

export interface GetAttendanceStatusResponse {
    attendance: Attendance[];
}

export interface PostAttendanceRequest {
    id: number,
    pageid: number,
    program_id: number,
    term_id: number,
    subject_id: number,
    section_id: number,
    student_id: number
}

export interface PostAttendanceResponse {
    message: string;
    attendance: {
        id: number;
        pageid: number;
        program_id: number;
        term_id: number;
        subject_id: number;
        section_id: number;
        student_id: number;
        status: number;
        created_at: string;
        updated_at: string;
    }
}
