import { NextRequest, NextResponse } from "next/server";
import { forceHttpForLocalIPs } from "@/utils/api-utils";

async function handler(req: NextRequest) {
    try {
        const attendanceData = await req.json();
        const { authToken, isProxy } = attendanceData;

        let apiUrl = isProxy ? 'http://proxy.nimbushq.xyz/api' : 'http://10.10.1.35/api';
        apiUrl = forceHttpForLocalIPs(apiUrl);

        const response = await fetch(`${apiUrl}/saveAttendance`, {
            method: 'POST',
            body: JSON.stringify(attendanceData),
            referrerPolicy: "unsafe-url",
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${authToken}`
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