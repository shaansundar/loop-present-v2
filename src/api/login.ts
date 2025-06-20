import { env } from "../../env";
import { LoginRequest, LoginResponse } from "../types/prof-profile";

export const login = async (login: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${env.apiUrl}/login`, {
        method: 'POST',
        referrerPolicy: "unsafe-url",
        body: JSON.stringify(login),
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${''}`
        }
    });
    return response.json();
};