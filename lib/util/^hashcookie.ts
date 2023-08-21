'use client'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"

export function useHashCookie(): [string, Dispatch<SetStateAction<string>>]{
    const [hash, setHash] = useState(null)
    const [cookie, setCookie] = useState(null)

    /**
     * IF VALID COOKIE
     */
    //get local cookie
    useEffect(()=>{
        if(!cookie)setCookie(document.cookie)
        console.log('@^HashCookie: getting cookie ', document.cookie)
    },[cookie])
    //get parse array from cookie
    const parsedCookies: [[string, string]] = useMemo(()=>{
        console.log('@^HashCookie: parsing cookie ', cookie)
        return cookie?cookie.split(';').map((c)=>c.trim().split('=')):null
    },[cookie])
    //get secret hash from parsed array
    const secretHash: string = useMemo(()=>{
        console.log('@^HashCookie: extracting secret from parsed', parsedCookies)
        let secret: [string, string] = parsedCookies?parsedCookies.find((c)=>c[0]=='secret'):null
        console.log('@^HashCookie: extracting secret value from pair', secret)
        return secret?.[1]?secret[1]:null
    },[parsedCookies])
    //set hash from cookie secret
    useEffect(()=>{
        if(secretHash)setHash(secretHash)
        console.log('@^HashCookie: sending secret to client page ', secretHash)
    },[secretHash])
    /**
     * THEN SET HASH
     */

    /**
     * IF VALID HASH
     */
    //new cookie only valid hash from logged in user
    const newcookie = useMemo(()=>hash?`secret=${hash}; max-age=604800; domain=aspectbridge.com`:null,[hash])
    //save cookie once user is logged in
    useEffect(()=>{
        console.log('@^HashCookie: sending new cookie to local save ', newcookie)
        if(!newcookie)return
        document.cookie = newcookie
    },[newcookie])
    /**
     * THEN SET COOKIE
     */

    return [hash, setHash]
}