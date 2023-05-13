import { useEffect, useRef, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"

type Entity = {
    name: string,
    position: {x: number, y: number},
    trigger: (entitiesList: Entity[])=>void,
    triggerMessage: string,
    proximity: Entity[],
}

/**
 * 
 * @param direction 
 * @param position 
 * @param render 
 * @returns 
 */
const Control = ({direction, position, render})=>{
    const speed = 10
    const diagSpeed = Math.ceil(Math.sqrt((speed^2)/2))+1//3.5
    const up = ()=>{position.current.y-=speed;render({})}
    const down = ()=>{position.current.y+=speed;render({})}
    const left = ()=>{position.current.x-=speed;render({})}
    const right = ()=>{position.current.x+=speed;render({})}
    const moveKeyDown = (e)=>{
        switch(e.key){
            case 'ArrowUp':
                e.preventDefault()
                direction.current.up=true
                //render({})
                break
            case 'ArrowDown':
                e.preventDefault()
                direction.current.down=true
                //render({})
                break
            case 'ArrowLeft':
                e.preventDefault()
                direction.current.left=true
                //render({})
                break
            case 'ArrowRight':
                e.preventDefault()
                direction.current.right=true
                //render({})
                break
        }
    }
    const moveKeyUp = (e)=>{
        switch(e.key){
            case 'ArrowUp':
                e.preventDefault()
                direction.current.up=false
                //render({})
                break
            case 'ArrowDown':
                e.preventDefault()
                direction.current.down=false
                //render({})
                break
            case 'ArrowLeft':
                e.preventDefault()
                direction.current.left=false
                //render({})
                break
            case 'ArrowRight':
                e.preventDefault()
                direction.current.right=false
                //render({})
                break
        }
    }
    const move = (d)=>{
        //console.log(d)
        let s = speed
        if(!d.up&&!d.down&&!d.left&&!d.right)return
        if(d.up||d.down&&d.left||d.right){
            s=diagSpeed
        }
        if(d.up){
            if(!d.right&&!d.left)position.current.y-=speed//up
            else if(d.right&&!d.left){position.current.y-=speed;position.current.x+=speed}//up right
            else if(!d.right&&d.left){position.current.y-=speed;position.current.x-=speed}//up left
        }else if(d.down){
            if(!d.right&&!d.left)position.current.y+=speed//down
            else if(d.right&&!d.left){position.current.y+=speed;position.current.x+=speed}//down right
            else if(!d.right&&d.left){position.current.y+=speed;position.current.x-=speed}//down left
        }else{
            if(d.left)position.current.x-=speed//left
            else if(d.right)position.current.x+=speed//right
        }
        render({})
    }
    useEffect(()=>{
        const movement = setInterval(()=>move(direction.current), 100);
        return ()=>{clearInterval(movement)}
    },[])
    useEffect(()=>{
        window.onkeydown = (event)=>{
            //console.log(event)
            moveKeyDown(event)
        }; 
        window.onkeyup = (event)=>{
            //console.log(event)
            moveKeyUp(event)
        };
    },[])

    return <>
        <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
                <Button id={'up'} name={'ArrowUp'} onMouseDown={()=>{direction.current.up=true}} onMouseUp={()=>{direction.current.up=false}} onTouchStart={()=>{direction.current.up=true}} onTouchEnd={()=>{direction.current.up=false}}>Up</Button>
            </Col>
            <Col xs={4}></Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button id={'left'} name={'ArrowLeft'} onMouseDown={()=>{direction.current.left=true}} onMouseUp={()=>{direction.current.left=false}} onTouchStart={()=>{direction.current.left=true}} onTouchEnd={()=>{direction.current.left=false}}>Left</Button>
            </Col> 
            <Col xs={4}></Col> 
            <Col xs={4}>
                <Button id={'right'} name={'ArrowRight'} onMouseDown={()=>{direction.current.right=true}} onMouseUp={()=>{direction.current.right=false}} onTouchStart={()=>{direction.current.right=true}} onTouchEnd={()=>{direction.current.right=false}}>Right</Button>
            </Col> 
        </Row>
        <Row>
            <Col xs={4}></Col> 
            <Col xs={4}>
                <Button id={'down'} name={'ArrowDown'} onMouseDown={()=>{direction.current.down=true}} onMouseUp={()=>{direction.current.down=false}} onTouchStart={()=>{direction.current.down=true}} onTouchEnd={()=>{direction.current.down=false}}>Down</Button>
            </Col> 
            <Col xs={4}></Col> 
        </Row></>
}

export default function Field({dispatch}: {dispatch: React.Dispatch<any>}){
    const render = useState({})[1]
    const position = useRef({x: 0, y: 0})
    const direction = useRef({up: false, down: false, left: false, right: false})
    const entities: {current: Entity[]} = useRef([])
    function RenderPlayer({pos}: {pos: {x: number, y: number}}){
        return <Col><Button style={{position: 'absolute', zIndex: 1, top: pos.y+'px', left: pos.x+'px'}} 
            onClick={()=>{pos.x=0;pos.y=0;render({})}}>Player</Button></Col>
    }
    function RenderEntities({ents}: {ents: Entity[]}){
        return <>{ents.map((e, i)=>{
            return <Col key={i}><Button style={{position: 'absolute', top: e.position.y+'px', left: e.position.x+'px'}}
                onClick={()=>{e.trigger(ents);e.position.x+=1;render({})}}>{e.name}</Button></Col>
        })}</>
    }
    useEffect(()=>{
        entities.current.push({name: 'Colider Hawk', position: {x: 100, y: 100}, trigger: (entitiesList)=>{
            let self = entitiesList.filter(e=>e.name==='Hawk')[0]
            if(self){
                if(self.position)if(isNear(self.position, position.current, 50))console.log('Entity 1 triggered: collided with player')
            }
        }, triggerMessage: 'You found a hawk!', proximity: []})

        entities.current.push({name: 'Gem Mine', position: {x: 50, y: 50}, trigger: (entitiesList)=>{
            let self = entitiesList.filter(e=>e.name==='Gem Mine')[0]
            if(self){
                if(self.position)if(new Date().getMilliseconds()%5==0)if(isNear(self.position, position?.current, 50))dispatch({type: 'addGem', payload: {amount: 1}})
            }
        }, triggerMessage: 'You found a gem mine!', proximity: []})

        return ()=>{entities.current = []}
    },[])

    function isNear(p1: {x: number, y: number}, p2: {x: number, y: number}, dist: number){
        if(!p1||!p2)return false
        return p1.x>=p2.x-dist&&p1.y>=p2.y-dist&&p1.x<=p2.x+dist&&p1.y<=p2.y+dist
    }
    useEffect(()=>{
        entities.current.forEach(e=>{
            if(isNear(e.position, position.current, 50)) e.trigger(entities.current)
        });
    },[position.current.x, position.current.y])
    return <>
        <Row id={'Field Control'}>
            <Col xs={12} sm={6} md={3} style={{backgroundColor: 'lightgrey'}}>
                <Control direction={direction} position={position} render={render}/>
                {
                    //JSON.stringify(direction.current)
                }
            </Col>
        </Row>
        <Row id={'Field'} style={{position: 'relative', height: '20%'}}>
            <RenderPlayer pos={position.current}/>
            <RenderEntities ents={entities.current}/>
        </Row>
    </>
}