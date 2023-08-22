'use client'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"

export function useHashCookie(searchParams?): [string, Dispatch<SetStateAction<string>>]{
    const [hash, setHash] = useState(searchParams?.hash || null)
    const [cookie, setCookie] = useState(null)

    /**
     * IF VALID COOKIE
     */
    //get local cookie
    useEffect(()=>{
        if(!document.cookie) return //console.log('@^HashCookie: no cookie ', document.cookie)
        if(!cookie)setCookie(document.cookie)
        //else console.log('@^HashCookie: got cookie ', cookie)
        //console.log('@^HashCookie: getting cookie ', document.cookie)
    },[cookie])
    //get parse array from cookie
    const parsedCookies: [[string, string]] | null = useMemo(()=>{
        if(!cookie) return null
        //console.log('@^HashCookie: parsing cookie ', cookie)
        return cookie.split(';').map((c)=>c.trim().split('='))
    },[cookie])
    //get secret hash from parsed array
    const secretHash: string | null = useMemo(()=>{
        if(!parsedCookies) return null
        //console.log('@^HashCookie: extracting secret from parsed', parsedCookies)
        let [,secret] = parsedCookies.find((c, i)=>c[0]=='secret')
        if(!secret) return null
        //console.log('@^HashCookie: extracting secret value from pair', secret)
        return secret
    },[parsedCookies])
    //set hash from cookie secret
    useEffect(()=>{
        if(!secretHash) return
        setHash(secretHash)
        //console.log('@^HashCookie: sending secret to client page ', secretHash)
    },[secretHash])
    /**
     * THEN SET HASH
     */

    /**
     * IF VALID HASH
     */
    //new cookie only valid hash from logged in user
    const newcookie: string | null = useMemo(()=>hash?`secret=${hash}; max-age=604800; path=/`:null,[hash])
    //save cookie once user is logged in
    useEffect(()=>{
        if(!newcookie)return
        //console.log('@^HashCookie: sending new cookie to local save ', newcookie)
        document.cookie = newcookie
        console.log('@^HashCookie: ', document.cookie)
    },[newcookie])
    /**
     * THEN SET COOKIE
     */

    return [hash, setHash]
}