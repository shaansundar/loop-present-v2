import { atom, useAtom } from "jotai";

export const isProxyAtom = atom(true);
export const useAuthTokenAtom = atom(false);

export const useEnvState = (): [boolean, (value: boolean) => void] => {
    const [isProxy, setIsProxy] = useAtom(isProxyAtom);
    return [isProxy, setIsProxy];
}

export const useAuthTokenState = (): [boolean, (value: boolean) => void] => {
    const [usePrefetchedAuthToken, setUsePrefetchedAuthToken] = useAtom(useAuthTokenAtom);
    return [usePrefetchedAuthToken, setUsePrefetchedAuthToken];
}