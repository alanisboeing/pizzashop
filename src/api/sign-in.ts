import { api } from "@/lib/axios";

export interface SigninBody{
    email: string
}

export async function signIn({email}: SigninBody){
    await api.post('/authenticate', { email })
}