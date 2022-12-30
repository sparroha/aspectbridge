import React from 'react'
import useDomainRoot from '../components/domain';
export default function Main(props) {
    useDomainRoot(props)
    return <>Redirecting...{JSON.stringify(props)}</>
}