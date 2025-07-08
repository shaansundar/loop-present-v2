import { NextRequest, NextResponse } from "next/server";
import { forceHttpForLocalIPs } from "@/utils/api-utils";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const isProxy = searchParams.get('isProxy') === 'true';
        const authToken = searchParams.get('authToken');

        let apiUrl = isProxy ? 'http://proxy.nimbushq.xyz/api' : 'http://10.10.1.35/api';
        apiUrl = forceHttpForLocalIPs(apiUrl);

        const response = await fetch(`${apiUrl}/programs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${authToken}`
            },
            cache: 'no-store',
        });

        return NextResponse.json({response},{status: response.status});

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}