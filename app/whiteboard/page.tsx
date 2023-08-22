'use client'
import useUser from "../../lib/util/^user";
import Hello from "./client/hello";
import ActiveUsers from "../../lib/util/-activeusers-";

export default function Page({params}){
    const user = useUser()
    return <div>
        <Hello/>
        {JSON.stringify(user)}
        <ActiveUsers/>
        </div>
}