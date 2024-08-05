'use client'
import React from "react";
import AddCaseForm from "./components/form_addcase";
import CaseListForm from "./components/form_caselist";

//boiler plate page export
export default function Page() {
    return <>
        <hr/>
        <h1>Page</h1>
        <AddCaseForm/>
        <br/>
        <h2>Cases</h2>
        <CaseListForm/>
        <hr/>
    </>
}