import { useMutation } from "@tanstack/react-query";

import { ProfProfile } from "@/types/prof-profile";
import { login } from "@/api/login";
import { toast } from "sonner";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ prof, apiUrl }: { prof: ProfProfile, apiUrl: string }) => login({ email: prof?.email || "", password: prof?.password || "" }, apiUrl),
        onSuccess: () => {
            toast.success("Login successful");
        },
        onError: () => {
            toast.error("Login failed, check the email and password");
        },
    });
};