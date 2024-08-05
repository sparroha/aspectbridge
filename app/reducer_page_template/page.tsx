'use client'
import React from "react";
import AddCaseForm from "./components/form_addcase";
import CaseListForm from "./components/form_caselist";

//boiler plate page export
export default function Page() {
    return <>
        <h1>Page</h1>
        <AddCaseForm/>
        <hr/>
        <h2>Cases</h2>
        <CaseListForm/>
    </>
}