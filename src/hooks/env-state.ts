import { atom, useAtom } from "jotai";

export const isProxyAtom = atom(true);

export const useEnvState = (): [boolean, (value: boolean) => void] => {
    const [isProxy, setIsProxy] = useAtom(isProxyAtom);
    return [isProxy, setIsProxy];
}