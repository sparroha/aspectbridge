import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fireball, icicle, missile, newProjectile } from "./entity";
import { arrayMoveObj, moveClientObj, vec, vecObj } from "./movement";
//engine.js + game.ts + index.html from old version
export default function WASD() {
    const [debugfeed, setDebugfeed] = useState(['initial']);
    const [maxX , setMaxX] = useState(0);
    const [maxY , setMaxY] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [updates, setUpdates] = useState(0);
    var updateRef = useRef(0);
    const [localPlayer, setLocalPlayer] = useState(null);
    //const [locplayerLeft, setLocplayerLeft] = useState(0);
    //const [locplayerTop, setLocplayerTop] = useState(0);
    const [gamespeed, setGamespeed] = useState(1000/20);
    var vecObjs: vecObj[] = [];
    
    //Engine Valiables
    //todo
    const [enginescreen, setEngineScreen] = useState(null);
    const [mousepos, setMousepos] = useState({x:0,y:0});
    //console.log($(EngineScreen))
    const [objOldZIndex, setObjOldZIndex] = useState(0);
    const [keyDown, setKeyDown] = useState("");//only allows 1 key at a time
    const [keyUp, setKeyUp] = useState("");//doesnt really hasve a use

    const [north, setNorth] = useState(false);
    const [east, setEast] = useState(false);
    const [south, setSouth] = useState(false);
    const [west, setWest] = useState(false);
    var KEYS = useRef({
        NORTH: {UNI:"U+0057", DECI: "87", DOWN: false},
        SOUTH: {UNI:"U+0053", DECI: "83", DOWN: false},
        EAST: {UNI:"U+0044", DECI: "68", DOWN: false},
        WEST: {UNI:"U+0041", DECI: "65", DOWN: false},
        //num bar
        ZERO: {UNI:"U+0030", DECI: "48", DOWN: false},
        ONE: {UNI:"U+0031", DECI: "49", DOWN: false},
        TWO: {UNI:"U+0032", DECI: "50", DOWN: false},
        THREE: {UNI:"U+0033", DECI: "51", DOWN: false},
        FOUR: {UNI:"U+0034", DECI: "52", DOWN: false},
        FIVE: {UNI:"U+0035", DECI: "53", DOWN: false},
        SIX: {UNI:"U+0036", DECI: "54", DOWN: false},
        SEVEN: {UNI:"U+0037", DECI: "55", DOWN: false},
        EIGHT: {UNI:"U+0038", DECI: "56", DOWN: false},
        NINE: {UNI:"U+0039", DECI: "57", DOWN: false},
        DASH: {UNI:"U+00BD", DECI: "189", DOWN: false},
        EQUIL: {UNI:"U+00BB", DECI: "187", DOWN: false},
        //num pad
        NUMZERO: {UNI:"U+0060", DECI: "96", DOWN: false},
        NUMONE: {UNI:"U+0041", DECI: "97", DOWN: false},
        NUMTWO: {UNI:"U+0042", DECI: "98", DOWN: false},
        NUMTHREE: {UNI:"U+0043", DECI: "99", DOWN: false},
        NUMFOUR: {UNI:"U+0044", DECI: "100", DOWN: false},
        NUMFIVE: {UNI:"U+0045", DECI: "101", DOWN: false},
        NUMSIX: {UNI:"U+0046", DECI: "102", DOWN: false},
        NUMSEVEN: {UNI:"U+0047", DECI: "103", DOWN: false},
        NUMEIGHT: {UNI:"U+0048", DECI: "104", DOWN: false},
        NUMNINE: {UNI:"U+0049", DECI: "105", DOWN: false},
        NUMMULTIPLY: {UNI:"U+004A", DECI: "106", DOWN: false},
        NUMPLUS: {UNI:"U+004B", DECI: "107", DOWN: false},
        
        NUMMINUS: {UNI:"U+004D", DECI: "109", DOWN: false},
        NUMDECIMAL: {UNI:"U+004E", DECI: "110", DOWN: false},
        NUMDIVIDE: {UNI:"U+004F", DECI: "111", DOWN: false},
        
        F12: {UNI:"F12", DECI: "123", DOWN: false},
    });

    /**
     * * * INITIAL SETUP * * *
     */
    useEffect(() => {
        setEngineScreen(document.querySelector("#battlefield"))
        setLocalPlayer(document.querySelector("#player"))
    }, []);
    useEffect(() => {
        if(enginescreen!=null){
            setMaxX(window.innerWidth-(window.innerWidth-enginescreen.clientWidth));
            setMaxY(window.innerHeight-(window.innerHeight-enginescreen.clientHeight));
        }
    }, [enginescreen]);
    useEffect(() => {//not setting player change
        if(localPlayer&&(localPlayer.style.left==0||localPlayer.style.top==0)){
            localPlayer.style.left = maxX/2;
            localPlayer.style.top = maxY/2;
            console.log('startX = '+maxX/2)
            console.log('startY = '+maxY/2)
        }
    }, [maxX,maxY]);

    /**
    * * * EVENT HANDLERS * * *
    */
    //MOUSE CLICK
    useEffect(() => {
        //TODO develope better key tracker
        window.onkeydown = function handleKeyDown(event) {
            event = event || window.event;
            OnKeyDown(event);
            //debug
            let feed = debugfeed;
            let old = feed.shift()
            let length = feed.push("@index-engine-77-feedw {events:keyIdentifier = "+event.keyIdentifier+" keyCode = "+event.keyCode+" feedLength = "+feed.length+"}")
            let df = debugfeed[length-1]
            setDebugfeed(feed)
        }; 
        window.onkeyup = function handleKeyUp(event) {
            event = event || window.event; // IE-ism
            //setKeyUp(event.keyIdentifier||event.keyCode);
            //if(keyDown==keyUp)setKeyDown("");
            OnKeyUp(event);
            //setKeyUp("");
        };
    }, []);
    //MOUSE MOVE AND CLICK
    useEffect(() => {
        if(enginescreen){
            window.onmousemove = (event) => {
                event = event || window.event; // IE-ism
                let offset = objOffset(enginescreen);
                setMousepos({
                    x:event.clientX-offset.x,
                    y:event.clientY-offset.y
                });
            }
            window.onclick = (event) => {
                event = event || window.event; // IE-ism
                let offset = objOffset(enginescreen);
                setMousepos((mousepos) => {
                    let mp = {
                        x:event.clientX-offset.x,
                        y:event.clientY-offset.y
                    }
                    OnClick(event,mp)
                    return mp
                });
            } 
            window.oncontextmenu = function handleContextMenue(event) {
                //() => window.onclick(event);
                NI();
                return false;
            };
        }
    }, [enginescreen]);

    /**
     * * * GAME LOOP * * *
     */
    useEffect(() => {
        if(enginescreen!=null&&localPlayer!=null&&mousepos!=null&&mousepos!=undefined){
            const gameloopSeconds = setInterval(() => {
                let log = true;
                /*if(!log)console.log('@gameloopSeconds: '
                    +JSON.stringify({
                    enginescreenID: enginescreen.id,
                    localPlayer: localPlayer.id,
                    localLeft: localPlayer.clientLeft,
                    localTop: localPlayer.clientTop,  
                }))*/
                setSeconds(new Date().getSeconds())
                setUpdates(updateRef.current)
                updateRef.current = 0;
            },1000);
            
            const gameloopTicks = setInterval(()=>{
                //Called every game tick to update local player location.
                //Another function will eventuially run with this to update
                //environmental changes from server.
                moveClientObj(localPlayer, 5, maxX, maxY, getDirection());
                //Called every game tick to update positions of other moving entities.
                vecObjs = arrayMoveObj(vecObjs, maxX, maxY);
                debug();
            },gamespeed);
        return () => {
            clearInterval(gameloopSeconds)
            clearInterval(gameloopTicks)
        }}
    }, [enginescreen, maxX, maxY, north, east, south, west]);
    function getDirection(){
        return {
            NORTH: north,
            EAST: east,
            SOUTH: south,
            WEST: west,
        }
    }
    /**
    * * * FRAME RATE * * *
    */
    function debug(){
        var s = new Date().getSeconds();
        updateRef.current++
        //console.log('@gameloopTicks.debug(): '+updates)
        if(s == seconds+1||s==seconds-59){
            //do this every 60 seconds
        }
    }
    /**
    * * * KEY PRESS FUNCTIONS * * *
    */
    function onKeyDown1(){actionKey1()}
    function onKeyUp1(){}
    function onKeyDown2(){actionKey2()}
    function onKeyUp2(){}
    function onKeyDown3(){actionKey3()}
    function onKeyUp3(){}
    function onKeyDown4(){}
    function onKeyUp4(){}
    function onKeyDown5(){}
    function onKeyUp5(){}
    function onKeyDown6(){}
    function onKeyUp6(){}
    function onKeyDown7(){}
    function onKeyUp7(){}
    function onKeyDown8(){}
    function onKeyUp8(){}
    function onKeyDown9(){}
    function onKeyUp9(){}
    function onKeyDown0(){}
    function onKeyUp0(){}
    function onKeyDownF12(){}
    function onKeyUpF12(){}

    function onKeyDownW(){}
    function onKeyUpW(){}
    function onKeyDownA(){}
    function onKeyUpA(){}
    function onKeyDownS(){}
    function onKeyUpS(){}
    function onKeyDownD(){}
    function onKeyUpD(){}

    function OnKeyDown(e)
    {
        if(e === null)e = window.event;
        if(e.keyIdentifier==KEYS.current.ONE.UNI||e.keyCode==KEYS.current.ONE.DECI){KEYS.current.ONE.DOWN=true;onKeyDown1();}
        if(e.keyIdentifier==KEYS.current.TWO.UNI||e.keyCode==KEYS.current.TWO.DECI){KEYS.current.TWO.DOWN=true;onKeyDown2();}
        if(e.keyIdentifier==KEYS.current.THREE.UNI||e.keyCode==KEYS.current.THREE.DECI){KEYS.current.THREE.DOWN=true;onKeyDown3();}
        if(e.keyIdentifier==KEYS.current.FOUR.UNI||e.keyCode==KEYS.current.FOUR.DECI){KEYS.current.FOUR.DOWN=true;onKeyDown4();}
        if(e.keyIdentifier==KEYS.current.FIVE.UNI||e.keyCode==KEYS.current.FIVE.DECI){KEYS.current.FIVE.DOWN=true;onKeyDown5();}
        if(e.keyIdentifier==KEYS.current.SIX.UNI||e.keyCode==KEYS.current.SIX.DECI){KEYS.current.SIX.DOWN=true;onKeyDown6();}
        if(e.keyIdentifier==KEYS.current.SEVEN.UNI||e.keyCode==KEYS.current.SEVEN.DECI){KEYS.current.SEVEN.DOWN=true;onKeyDown7();}
        if(e.keyIdentifier==KEYS.current.EIGHT.UNI||e.keyCode==KEYS.current.EIGHT.DECI){KEYS.current.EIGHT.DOWN=true;onKeyDown8();}
        if(e.keyIdentifier==KEYS.current.NINE.UNI||e.keyCode==KEYS.current.NINE.DECI){KEYS.current.NINE.DOWN=true;onKeyDown9();}
        if(e.keyIdentifier==KEYS.current.ZERO.UNI||e.keyCode==KEYS.current.ZERO.DECI){KEYS.current.ZERO.DOWN=true;onKeyDown0();}
        if(e.keyIdentifier==KEYS.current.NORTH.UNI||e.keyCode==KEYS.current.NORTH.DECI){
            KEYS.current.NORTH.DOWN = true;
            //console.log('north_true: '+KEYS.NORTH.DOWN)
            setNorth(true);
            onKeyDownW();
        }
        if(e.keyIdentifier==KEYS.current.WEST.UNI||e.keyCode==KEYS.current.WEST.DECI){
            KEYS.current.WEST.DOWN = true;
            setWest(true);
            onKeyDownA();
        }
        if(e.keyIdentifier==KEYS.current.SOUTH.UNI||e.keyCode==KEYS.current.SOUTH.DECI){
            KEYS.current.SOUTH.DOWN = true;
            setSouth(true);
            onKeyDownS();
        }
        if(e.keyIdentifier==KEYS.current.EAST.UNI||e.keyCode==KEYS.current.EAST.DECI){
            KEYS.current.EAST.DOWN = true;
            setEast(true);
            onKeyDownD();
        }
        document.querySelector('body').focus();
    }
    function OnKeyUp(e)
    {
        if(e === null)e = window.event;	
        if(e.keyIdentifier==KEYS.current.ONE.UNI||e.keyCode==KEYS.current.ONE.DECI){KEYS.current.ONE.DOWN=false;onKeyUp1();}
        if(e.keyIdentifier==KEYS.current.TWO.UNI||e.keyCode==KEYS.current.TWO.DECI){KEYS.current.TWO.DOWN=false;onKeyUp2();}
        if(e.keyIdentifier==KEYS.current.THREE.UNI||e.keyCode==KEYS.current.THREE.DECI){KEYS.current.THREE.DOWN=false;onKeyUp3();}
        if(e.keyIdentifier==KEYS.current.FOUR.UNI||e.keyCode==KEYS.current.FOUR.DECI){KEYS.current.FOUR.DOWN=false;onKeyUp4();}
        if(e.keyIdentifier==KEYS.current.FIVE.UNI||e.keyCode==KEYS.current.FIVE.DECI){KEYS.current.FIVE.DOWN=false;onKeyUp5();}
        if(e.keyIdentifier==KEYS.current.SIX.UNI||e.keyCode==KEYS.current.SIX.DECI){KEYS.current.SIX.DOWN=false;onKeyUp6();}
        if(e.keyIdentifier==KEYS.current.SEVEN.UNI||e.keyCode==KEYS.current.SEVEN.DECI){KEYS.current.SEVEN.DOWN=false;onKeyUp7();}
        if(e.keyIdentifier==KEYS.current.EIGHT.UNI||e.keyCode==KEYS.current.EIGHT.DECI){KEYS.current.EIGHT.DOWN=false;onKeyUp8();}
        if(e.keyIdentifier==KEYS.current.NINE.UNI||e.keyCode==KEYS.current.NINE.DECI){KEYS.current.NINE.DOWN=false;onKeyUp9();}
        if(e.keyIdentifier==KEYS.current.ZERO.UNI||e.keyCode==KEYS.current.ZERO.DECI){KEYS.current.ZERO.DOWN=false;onKeyUp0();}
        if(e.keyIdentifier==KEYS.current.NORTH.UNI||e.keyCode==KEYS.current.NORTH.DECI){
            KEYS.current.NORTH.DOWN = false;
            //console.log('north_false: '+KEYS.NORTH.DOWN)
            setNorth(false);
            onKeyUpW();
        }
        if(e.keyIdentifier==KEYS.current.WEST.UNI||e.keyCode==KEYS.current.WEST.DECI){
            KEYS.current.WEST.DOWN = false;
            setWest(false);
            onKeyUpA();
        }
        if(e.keyIdentifier==KEYS.current.SOUTH.UNI||e.keyCode==KEYS.current.SOUTH.DECI){
            KEYS.current.SOUTH.DOWN = false;
            setSouth(false);
            onKeyUpS();
        }
        if(e.keyIdentifier==KEYS.current.EAST.UNI||e.keyCode==KEYS.current.EAST.DECI){
            KEYS.current.EAST.DOWN = false;
            setEast(false);
            onKeyUpD();
        }
    }
    function OnClick(e, mousepos: { x: number; y: number; })
    {
        if(e === null)e = window.event;
        console.log(JSON.stringify(e)+'\n'+JSON.stringify(mousepos));
    }
    
    /**
    * * * CONTROLED ATIONS * * *
    */
    //var keynum = [[],[],()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{}];
    var keyF = ['','','','','','','','','','','','',''];
    function actionKey1(){
        let p = newProjectile(vecObjs,fireball,localPlayer,{x: mousepos.x, y: mousepos.y},1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }
    function actionKey2(){
        let p = newProjectile(vecObjs,icicle,localPlayer,{x: mousepos.x, y: mousepos.y},1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }
    function actionKey3(){
        let p = newProjectile(vecObjs,missile,localPlayer,{x: mousepos.x, y: mousepos.y},1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }

    /**
     * * * STYLES INLINE * * *
     */
    const style = {
        actions_li: {
            position: 'relative',
            //textAlign: 'center',
            //content: 'center',
            backgroundColor:'#333',
            borderRadius: '20px',
            width: '100px',
            height: '100px'
        },
        actions_li_h1: {
            position: 'absolute',
            top: '0',
            left: '0',
            color: 'blue',
            margin: '0',
            border: '0',
        },
        actions_li_img: {
            background: '#333',
        },
        div: {
            margin: '0',
            border: '0',
        },
    }
    /**
     * * * ACTIONS * * *
     */
    const actions = [
        {id: 1, name: '1', img: './assets/binary2.png'},
        {id: 2, name: '2', img: './assets/binary2.png'},
        {id: 3, name: '3', img: './assets/binary2.png'},
    ]
    /**
     * * * RENDER * * *
     */
    return <Container id={'body'}>
                <Row className={'tcenter'}>
                    <Col sm={'3'} id={"debug"} style={{position: 'relative', visibility: 'visible'}}>{Math.floor(mousepos.x)+'/'+Math.floor(mousepos.y)}<br/>{debugfeed[debugfeed.length-1]/*.map((f)=>f)*/}</Col>
                    <Col sm={'3'}><h4 className={'col-sm-6'}><b>Control the Object With "W/A/S/D". Press 1 - 3 to file.</b></h4></Col>
                    <Col sm={'3'} id={"ups"} style={{position: 'relative', visibility: 'visible'}}>{'u/s='+updates+' s='+seconds+' width='+maxX+' height='+maxY}<br/>{'N: '+north+' / E: '+east+' / S: '+south+' / W: '+west}</Col>
                </Row>
                <Row id={'actions'} style={{height: '90px'}}>
                    <Col sm={12}>
                        <Row>
                        {actions.map((action, index) => {
                            return <Col xs={4} sm={3} md={2} lg={1} key={index} style={{position: 'relative'}}>
                                        <h1 style={{zIndex: '1', position: 'absolute', color: 'white'}}>{action.name}</h1>
                                        <img src={action.img} style={{position: 'absolute', backgroundColor: 'black'}} height={'70px'} width={'70px'} />
                                    </Col>
                        })}
                        </Row>
                    </Col>
                </Row>
                <Row style={{overflow: 'auto', height: '70%', background: '#CCC'}}>
                    <Col sm={12}>
                        <div id="battlefield" style={{position: 'relative', overflow: 'clip', height: '100%', background: '#CCC'}}>
                            <Player id={'player'} img={'./assets/binary2.png'}/>
                            <div id="wall" className={"wall collide"} style={{position: 'absolute', overflow: 'hidden', width: '20px', height: '400px', top: '50px', left: '100px', background: '#333'}}>
                            </div>
                        </div>
                    </Col>
                </Row>
    </Container>
}
export function Player(props){

    return <div id={props.id} className={"player collider-obj"} style={{borderRadius: '90px', position: "absolute", left: '5px', top: '5px'}}>
            <img src={props.img} height="50px" width="50px"/>
        </div>
    
}

/**
* * * CONTEXT MENUS * * *
* require within ueEffect
*/
function NI(){
    let password = 'password';
    let prompt = window.prompt;
    if(prompt('Not Implemented: Enter "password" in the box to continue.')==password){
        window.oncontextmenu = function handleContextMenue(event) {
            return true;
        }
    }else{
        window.oncontextmenu = function handleContextMenue(event) {
            return false;
        }
    }
}
function objOffset(obj: HTMLMapElement){
    var left = 0;
    var top = 0;
    if (obj.offsetParent) {
        left += obj.getBoundingClientRect().left;
        top  += obj.getBoundingClientRect().top;
        return {
            x : left,
            y : top
        };
        //obj = obj.offsetParent;
        //console.log("@engine-100{left: "+$(obj).offset().left+", top: "+top+", obj: "+obj+"}")
    } 
    
    return {
        x : left,
        y : top
    };
}
export function getAngle(rad,vecY){
    return -rad*180/Math.PI+(vecY<0?180:0);
}
//returns a new array with no "" values
export function cleanArrayNulls(arr){
	var newArr = [];
	for(var x=0;x<arr.length;x++)
	{
		if(arr[x] !== "")
		{
			newArr.push(arr[x]);
		}
	}
	return newArr;
}