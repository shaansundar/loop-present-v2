import { env } from "../../env";
import { TermsResponse } from "../types/class-profile";

export const getTerms = async () : Promise<TermsResponse> => {
    const response = await fetch(`${env.apiUrl}/terms`,{
        referrerPolicy: "unsafe-url",
    });
    return response.json();
};