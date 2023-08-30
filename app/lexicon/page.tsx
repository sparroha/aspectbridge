'use client'
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import sql from "../../lib/,base/sql";
import { searchDB, setDB } from "../../lib/util/@registry";


    

const wordList = {
    //bordercollapse: 'collapse',
    width: '100%'
}
const wordList_thtd = {
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    padding: '8px',
    textalign: 'left'
}
const wordForm = {
    marginBottom: '20px'
}
export default function Lexicon(p){
    const [wordInput, setWordInput] = useState("")
    const [definitionInput, setDefinitionInput] = useState("")
    const [examplesInput, setExamplesInput] = useState("")
    const [words, setWords] = useState([])

    const saveWord = ()=>{
        setDB('lexicon:lexical_bridge:'+wordInput, {word: wordInput, definition: definitionInput, examples: examplesInput})
    }
    const populateSearch = (search)=>{
        searchDB('lexicon:').then((data)=>{
            let mlexi = data.map((entry)=>{return JSON.parse(entry.registry_data)})
            let searchList = mlexi.filter((entry)=>entry.word.includes(search))
            setWords(searchList)
        })
    }
    
    const clickSaveButton = () => {
        if(!wordInput || !definitionInput) return
        saveWord()
        populateSearch(wordInput)

        setWordInput("")
        setDefinitionInput("")
        setExamplesInput("")
    }
    const clickEditButton = (w) => {
        setWordInput(words.filter((wd)=>wd==w)[0].word)
        setDefinitionInput(words.filter((wd)=>wd==w)[0].definition)
        setExamplesInput(words.filter((wd)=>wd==w)[0].examples)
    }
    return <div style={{color: '#9af'}}>
        <h1>Lexical Information Manager</h1>
        <Form id="wordForm">
            <Form.Label id="word">Word:</Form.Label>
            <Form.Control type="text" name="word" id="word" value={wordInput} onChange={(e)=>{setWordInput(e.target.value);populateSearch(e.target.value)}} required/>
            <Form.Label id="definition">Definition:</Form.Label>
            <Form.Control type="textarea" id="definition" value={definitionInput} onChange={(e)=>{setDefinitionInput(e.target.value)}} required></Form.Control>
            <Form.Label id="examples">Examples:</Form.Label>
            <Form.Control type="textarea" id="examples" value={examplesInput} onChange={(e)=>{setExamplesInput(e.target.value)}}></Form.Control>
            <Button type="button" id="addButton" onClick={clickSaveButton}>Save Word</Button>
        </Form>
        <div id="table-outer" style={{width: '100%', height: '300px', overflow: 'auto', tableLayout: 'fixed'}}>
        <Table id="wordList" style={wordList}>
            <thead style={{position: 'sticky', top: '0'}}>
                <tr style={wordList_thtd}>
                    <th>Word</th>
                    <th>Definition</th>
                    <th>Examples</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody id="wordTableBody">  
            {
                words.map((w)=>{
                    return <tr>
                        <td>{w.word}</td>
                        <td>{w.definition}</td>
                        <td>{w.examples}</td>
                        <td><Button className="editButton" onClick={()=>clickEditButton(w)}>{'Edit '+w.word}</Button></td>
                    </tr>
                })
            }
            </tbody>
        </Table>
        </div>
    </div>
}