import { NextRequest, NextResponse } from "next/server";
import { forceHttpForLocalIPs } from "@/utils/api-utils";

async function handler(req: NextRequest) {
    try {
        const login = await req.json();
        const { prof, isProxy } = login;

        let apiUrl = isProxy ? 'http://proxy.nimbushq.xyz/api' : 'http://10.10.1.35/api';
        apiUrl = forceHttpForLocalIPs(apiUrl);

        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            referrerPolicy: 'unsafe-url',
            body: JSON.stringify({ email: prof.email, password: prof.password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${''}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export { handler as POST };