import { useEffect, useState } from "react";

export default function Page({params, searchParams}){
    //SEARCH
    const queryArray: [string, string][] = Object.entries(searchParams)
    const urlsearch: string = queryArray.map(([key, value])=>`${key}=${value}`).join('&')
    return <>{JSON.stringify(urlsearch)}</>
}