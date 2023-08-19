import React from "react"

export type StrBldrProps = {
    value:{
        last?: string,
        current: string,
    }
}
export default function StrBldr(props){
    
    return <>
        Add 'str1 + 'str2':_ {"new Str('str1').append('str2').current"} = {new Str('str1').append('str2').current}<br/>
        Add 'str3 + 'str4':_ {"new String('str3').concat('str4')"} = {new String('str3').concat('str4')}<br/><br/>
        Add 3+4:_ {'new Calc(3,4).add()'} = {new Calc(3,4).add()}<br/>
        Sub 3-4:_ {'new Calc().sub(3,4)'} = {new Calc().sub(3,4)}<br/>
        Mul 3*4:_ {'new Calc(3).mul(4)'} = {new Calc(3).mul(4)}<br/>
        Div 3/4:_ {'new Calc(3,4).div(1,2)'} = {new Calc(3,4).div(1,2)}<br/>
        Div 0/1:_ {'new Calc().div()'} = {new Calc().div()}<br/>
    </>
}
export function concat(str1: StrBldrProps, str2: StrBldrProps){
    return str1.value.current+str2.value.current
}
class Str {
    last: string
    current: string
    constructor(str?: string){
        this.last = str || ''
        this.current = str || ''
    }
    append(str?: string){
        this.last = this.current
        this.current += str || ''
        return this
    }
    toString(){
        return this.current
    }
}
class Calc {
    num1: number
    num2: number
    constructor(n1?: number, n2?: number){
        this.num1 = n1 || null
        this.num2 = n2 || null
    }
    add(a?: number, b?: number){
        return (this.num1?this.num1:(a?a:0))
        + (this.num2?this.num2:(b?b:(a?a:0)))
    }
    sub(a?: number, b?: number){
        return (this.num1?this.num1:(a?a:0))
        - (this.num2?this.num2:(b?b:(a?a:0)))
    }
    mul(a?: number, b?: number){
        return (this.num1?this.num1:(a?a:0))
        * (this.num2?this.num2:(b?b:(a?a:0)))
    }
    div(a?: number, b?: number){
        return (this.num1?this.num1:(a?a:0))
        / (this.num2?this.num2:(b?b:(a?a:1)))
    }
}