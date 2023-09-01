'use client'
import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
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
        try{
            setDB('lexicon:lexical_bridge:'+wordInput, {word: wordInput, definition: definitionInput, examples: examplesInput})
        }catch(e){
            try{
                setDB('lexicon:lexical_bridge:'+wordInput, {word: wordInput, definition: definitionInput, examples: examplesInput})
                console.log('New entry lexicon:lexical_bridge:'+wordInput, e)
            }catch(a){
                console.log('Failed to save lexicon:lexical_bridge:'+wordInput, a)
            }
        }
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
        populateSearch(w)
        setWordInput(words.filter((wd)=>wd==w)[0]?.word || w)
        setDefinitionInput(words.filter((wd)=>wd==w)[0]?.definition || '')
        setExamplesInput(words.filter((wd)=>wd==w)[0]?.examples || '')
        
    }
    return <div style={{color: '#9af'}}>
        <h1>Lexical Information Manager</h1>
        {/*JSON.stringify(examplesInput)*/}
        <Form id="wordForm">
            <Form.Label id="word">Word:</Form.Label>
            <Form.Control type="text" name="word" id="word" value={wordInput} onChange={(e)=>{setWordInput(e.target.value);populateSearch(e.target.value)}} required/>
            <Form.Label id="definition">Bridges:{/*Definitions*/}</Form.Label>
            <Form.Control type="textarea" id="definition" value={definitionInput} onChange={(e)=>{setDefinitionInput(e.target.value)}} required></Form.Control>
            <Form.Label id="examples">
                <div style={{float: 'left'}}>Notes:{/*Examples*/}</div>
                <div style={{visibility: 'collapse', float: 'left', marginLeft: '5px', backgroundColor: 'blue', borderRadius: '50%', width: '17px', height: '17px', fontSize: '12px', textAlign: 'center'}}><i>i</i></div>
            </Form.Label>
            <textarea className={'form-control'} id="examples" value={examplesInput} onChange={(e)=>{setExamplesInput(e.target.value)}}></textarea>
            <Button type="button" id="addButton" onClick={clickSaveButton}>Save Word</Button>
        </Form>
        <div id="table-outer" style={{width: '100%', maxHeight: '300px', overflow: 'auto', tableLayout: 'fixed'}}>
            <Table id="wordList" style={wordList}>
                <thead style={{position: 'sticky', top: '0'}}>
                    <tr style={wordList_thtd}>
                        <th>Word</th>
                        <th>Bridges{/*Definitions*/}</th>
                        <th>Notes{/*Examples*/}</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody id="wordTableBody">  
                {
                    words.map((w, wi)=>{
                        return <tr key={wi}>
                            <td>{w.word}</td>
                            <td><Row>{w.definition.split(',').map((line, i)=>{
                                return <Col key={i} sm={12} md={6} lg={4} style={{margin: '0', padding: '0'}}>
                                    <Button style={{margin: '0 1px 0 1px', padding: '1px', border: 'none', background: 'none', color: '#caf'}} onClick={()=>{clickEditButton(line.trim())}}>{line}</Button>
                                </Col>
                            })}</Row></td>
                            <td><Row>{w.examples.split('\n').map((line, i)=>{
                                return <Col key={i} sm={12}>{line}.</Col>
                            })}</Row></td>
                            <td><Button className="editButton" onClick={()=>clickEditButton(w)}>{'Edit '+w.word}</Button></td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
        <iframe id="wordFrame" name="wordFrame" width={'100%'} height={'500px'} src={"https://en.m.wiktionary.org/wiki/"+wordInput}/>
    </div>
}