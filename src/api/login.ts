import { LoginRequest, LoginResponse } from "../types/prof-profile";

// Helper function to ensure HTTP protocol for specific IP


export const login = async (login: LoginRequest, apiUrl: string): Promise<LoginResponse> => {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        referrerPolicy: 'unsafe-url',
        cache: 'no-store',
        body: JSON.stringify(login),
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${''}`
        }
    });
    const res = await response.json();
    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error(res.message);
    }
};