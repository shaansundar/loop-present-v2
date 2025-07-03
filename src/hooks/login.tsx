import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProfProfile } from "@/types/prof-profile";

const login = async ({ prof, isProxy }: { prof: ProfProfile, isProxy: boolean }) => {
    console.log("🚀 ~ login ~ prof:", prof);
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prof, isProxy }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
};



export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login successful");
        },
        onError: (error) => {
            toast.error(`Login Failed: ${error.message}`);
        },
    });
};