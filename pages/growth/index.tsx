import { relative } from "path";
import { useEffect, useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Growth(props){
    const [food, setFood] = useState({fruit: 0, herb: 0, grain: 0})
    const [grid, dispatch] = useReducer((state, action)=>{
        switch(action.type){
            case 'plant'://dispatch({type: 'plant', payload: [0,0]})
                let newState = state.map((a,i)=>
                    a.map((b,j)=>{//b is cell
                        //console.log('planting')
                        //console.log(i+','+j)
                        if(i==action.payload.location[0]&&j==action.payload.location[1]&&b.planted==false){
                            console.log('planted')
                            return {...b, planted: true, plantedAt: Date.now(), food: action.payload.food, growth: 1}
                        }
                        return b
                    })
                )
                return newState
            case 'harvest':
                let r = state.map((a,i)=>
                    a.map((b,j)=>{//b is cell
                        //console.log('harvesting')
                        //console.log(i+','+j)
                        if(b.planted){
                            if(b.growth>=100){
                                console.log('harvested')
                                setFood((f)=>{
                                    let newFood = {...f}
                                    newFood[b.food]++
                                    return newFood
                                })
                                return {...b, planted: false, plantedAt: null, food: '', growth: 0}
                            }
                        }
                        return b
                    })
                )
                return r
                case 'grow':
                    let g = state.map((a,i)=>
                        a.map((b,j)=>{//b is cell
                            //console.log('harvesting')
                            //console.log(i+','+j)
                            if(b.growth>0 && b.growth<100){
                                return {...b, growth: b.growth+1}
                            }
                            return b
                        })
                    )
                    return g
            default:
                return state
        }
    }, [//spread deep
        [//shallow
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
        ],
        [
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
        ],
        [
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
            {planted: false, food: '', growth: 0, plantedAt: null},
        ]
    ])

    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const f = setInterval(() => {
            //setProgress((p)=>p<100?p+1:0)
            dispatch({type: 'grow', payload: null})
        }, 1000); 
        return () => clearInterval(f);
    }, [])
    const NOW = Date.now()
    return <Container style={{margin: '20px'}}>
        <button onClick={
            (e)=>dispatch({type: 'harvest', payload: null})
        }>harvest</button>
        {grid.map((row, i)=>{return <Row key={-i}>
            {row.map((cell, j)=>{return <Col key={i+j}>
                <div id={'growth_cell'} style={{position: 'relative', width: '100px', height: '100px', background: 'grey'}}>
                    <select style={{position: 'absolute', right: '0px', top: '0px'}} value={cell.food} onChange={
                        (e)=>{e.target.value && dispatch({type: 'plant', payload: {location: [i,j], food: e.target.value}})}
                    }>
                        <option></option>
                        <option>fruit</option>
                        <option>herb</option>
                        <option>grain</option>
                    </select>
                    
                    <div id={'growth_progress'} style={{position: 'absolute', left: '0px', bottom: '0px', width: '10px', height: '100px', backgroundImage: 'linear-gradient(to top, red, orange, yellow, yellow, lightgreen, lightgreen, lightgreen, green, green, green, green, green, green, green, blue, purple, white)'}}>
                        <div id={'growth_progress'} style={{position: 'absolute', left: '0px', top: '0px', width: '10px', height: 100-cell.growth+'px', backgroundColor: '#777'}}></div>
                    </div>
                    <div id={'growth_progress'} style={{position: 'absolute', left: 50-20+'px', top: 50-20+'px', width: '40px', height: 40+'px', borderRadius: '50%',backgroundColor: cell.food=='fruit'?'red':cell.food=='herb'?'lightgreen':cell.food=='grain'?'tan':'#777', textAlign: 'center', verticalAlign: 'middle'}}>{cell.food}</div>
                </div>
            </Col>})}
        </Row>})}
        {JSON.stringify(grid)}
        {JSON.stringify(food)}
    </Container>
}