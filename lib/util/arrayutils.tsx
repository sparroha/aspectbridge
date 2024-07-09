
import React from 'react';

const ArrayUtilTest = (props)=>{

    const a1 = [1,2,3,4]
    const a2 = [5,6,7]
    return <>
        <div className={'row'}>
            Push {JSON.stringify(a2)} to {JSON.stringify(a1)} = {JSON.stringify(pushTo(a1,a2).a)}<br/>
            Pop {JSON.stringify(a1)} = {JSON.stringify(popFrom(a1).a)}<br/>
            Shift {JSON.stringify(a1)} = {JSON.stringify(shiftFrom(a1).a)}<br/>
            Unshift {JSON.stringify(a2)} to {JSON.stringify(a1)} = {JSON.stringify(unshiftTo(a1,a2).a)}<br/>
        </div>
    </>
}
export default ArrayUtilTest;

/**
 * Last Index
 */
export const pushTo = (array: any[], push: any | any[]): {a: any[], l: number}=>{
    let a = [...array]
    let p = []
    if(push instanceof Array) p = [...push]
    else p = [push]
    let l = a.push(...p)
    return {a,l}
}

/**
 * Last Index
 */
export const popFrom = (array: any[]): {a: any[], p: any}=>{
    let a = [...array]
    let p = a.pop()
    return {a,p}
}

/**
 * First Index
 */
export const shiftFrom = (array: any[]): {a: any[], s: any}=>{
    let a = [...array]
    let s = a.shift()
    return {a,s}
}

/**
 * First Index
 */
export const unshiftTo = (array: any[], unshift: any | any[]): {a: any[], l: number}=>{
    let a = [...array]
    let s = []
    if(unshift instanceof Array) s = [...unshift]
    else s = [unshift]
    let l = a.unshift(...unshift)
    return {a,l}
}