'use client'
import { useRouter } from "next/navigation"

export default function Login({params}){
    const r = useRouter()
    r.push('/login/login')
    return <>Login...</>
}