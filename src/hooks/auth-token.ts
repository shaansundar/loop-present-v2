import { atom, useAtom } from 'jotai'

const authTokenAtom = atom<string | null>(null)

export const useAuthToken = () => {
    const [authToken, setAuthToken] = useAtom(authTokenAtom)
    return { authToken, setAuthToken }
}