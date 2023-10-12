import React from "react"

export type StrBldrProps = {
    value:{
        last?: string,
        current: string,
    }
}
export default function StrBldr(props){
    return <>
    <h4>Code examples</h4>
        Add 'str1 + 'str2':_ <code>{"new Str('str1').append('str2').current"}</code> = {new Str('str1').append('str2').current}<br/>
        Add 'str3 + 'str4':_ <code>{"new String('str3').concat('str4')"}</code> = {new String('str3').concat('str4')}<br/><br/>
        Add 3+4:_ <code>{'new Calc(3,4).add()'}</code> = {new Calc(3,4).add()}<br/>
        Sub 3-4:_ <code>{'new Calc().sub(3,4)'}</code> = {new Calc().sub(3,4)}<br/>
        Mul 3*4:_ <code>{'new Calc(3).mul(4)'}</code> = {new Calc(3).mul(4)}<br/>
        Div 3/4:_ <code>{'new Calc(3,4).div(1,2)'}</code> = {new Calc(3,4).div(1,2)}<br/>
        Div 0/1:_ <code>{'new Calc().div()'}</code> = {new Calc().div()}<br/>
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