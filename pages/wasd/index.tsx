import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fireball, icicle, missile, newProjectile } from "./entity";
import { arrayMoveObj, moveClientObj, vec } from "./movement";
//engine.js + game.ts + index.html from old version
export default function WASD() {
    const [maxX , setMaxX] = useState(0);
    const [maxY , setMaxY] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [updates, setUpdates] = useState(0);
    const [localPlayer, setLocalPlayer] = useState(null);
    const [locplayerLeft, setLocplayerLeft] = useState(0);
    const [locplayerTop, setLocplayerTop] = useState(0);
    const [gamespeed, setGamespeed] = useState(1000/20);
    const [vecObjs, setVecObjs] = useState([]);
    
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
    var KEYS = {
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
    };

    /**
    * * * EVENT HANDLERS * * *
    */
    useEffect(() => {
        setEngineScreen(document.querySelector("#battlefield"))
        setLocalPlayer(document.querySelector("#player"))
    }, []);

    useEffect(() => {
        window.onkeydown = function handleKeyDown(event) {
            event = event || window.event;
            setKeyDown(event.keyIdentifier||event.keyCode);
            OnKeyDown(event);
            //console.log("@engine-67 {events:keyIdentifier = "+event.keyIdentifier+" keyCode = "+event.keyCode+"}");
        };  
        window.onkeyup = function handleKeyUp(event) {
            event = event || window.event; // IE-ism
            setKeyUp(event.keyIdentifier||event.keyCode);
            if(keyDown==keyUp)setKeyDown("");
            OnKeyUp(event);
            setKeyUp("");
        };
        window.oncontextmenu = function handleContextMenue(event) {
            NI();return false;
        };
    }, []);
    useEffect(() => {
        window.onmousemove = (event) => {
            if(enginescreen!=null){
                event = event || window.event; // IE-ism
                let offset = objOffset(enginescreen);
                setMousepos({
                    x:event.clientX-offset.x,
                    y:event.clientY-offset.y
                });
            }
        }
    }, [enginescreen]);
    useEffect(() => {
        if(enginescreen!=null){
            setMaxX(window.innerWidth-(window.innerWidth-enginescreen.clientWidth));
            setMaxY(window.innerHeight-(window.innerHeight-enginescreen.clientHeight));
        }
    }, [enginescreen]);

    /**
     * * * GAME LOOP * * *
     * game.ts
     */
    useEffect(() => {
        if(enginescreen!=null&&localPlayer!=null&&mousepos!=null&&mousepos!=undefined){
            const gameloop = setInterval(() => {
                console.log('enginescreen = '+enginescreen.id)
                console.log('localPlayer = '+localPlayer.id)
                setSeconds(new Date().getSeconds())
                let startX = (maxX)
                console.log('startX = '+startX)
                let startY = (maxY)
                console.log('startX = '+startY)
                setLocplayerLeft(startX);
                setLocplayerTop(startY);
                console.log('clientPlayer = '+localPlayer.clientLeft)
                console.log('clientPlayer = '+localPlayer.clientTop)
            },1000);
            
            const loop = setInterval(()=>{
                moveClientObj(localPlayer, 5, maxX, maxY, {
                    NORTH: north,
                    EAST: east,
                    SOUTH: south,
                    WEST: west,
                });
                setVecObjs(arrayMoveObj(vecObjs, maxX, maxY));
                debug();
            },gamespeed);
        return () => {
            clearInterval(gameloop)
            clearInterval(loop)
        }}
    }, [enginescreen, maxX, maxY]);
    
    /**
    * * * FRAME RATE * * *
    */
    useEffect(() => {
        debug()
    }, [seconds]);
    function debug(){
        var s = new Date().getSeconds();
        //updates per second
        setUpdates(updates+1);
        if(s == seconds+1||s==seconds-59){
            document.querySelector("#ups").innerHTML = ('u/s='+updates+' width='+maxX+' height='+maxY);
            setUpdates(0);
        }
        setSeconds(s);
    }
    /**
    * key move functions
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
        if(keyDown==KEYS.ONE.UNI||keyDown==KEYS.ONE.DECI){KEYS.ONE.DOWN=true;onKeyDown1();}
        if(keyDown==KEYS.TWO.UNI||keyDown==KEYS.TWO.DECI){KEYS.TWO.DOWN=true;onKeyDown2();}
        if(keyDown==KEYS.THREE.UNI||keyDown==KEYS.THREE.DECI){KEYS.THREE.DOWN=true;onKeyDown3();}
        if(keyDown==KEYS.FOUR.UNI||keyDown==KEYS.FOUR.DECI){KEYS.FOUR.DOWN=true;onKeyDown4();}
        if(keyDown==KEYS.FIVE.UNI||keyDown==KEYS.FIVE.DECI){KEYS.FIVE.DOWN=true;onKeyDown5();}
        if(keyDown==KEYS.SIX.UNI||keyDown==KEYS.SIX.DECI){KEYS.SIX.DOWN=true;onKeyDown6();}
        if(keyDown==KEYS.SEVEN.UNI||keyDown==KEYS.SEVEN.DECI){KEYS.SEVEN.DOWN=true;onKeyDown7();}
        if(keyDown==KEYS.EIGHT.UNI||keyDown==KEYS.EIGHT.DECI){KEYS.EIGHT.DOWN=true;onKeyDown8();}
        if(keyDown==KEYS.NINE.UNI||keyDown==KEYS.NINE.DECI){KEYS.NINE.DOWN=true;onKeyDown9();}
        if(keyDown==KEYS.ZERO.UNI||keyDown==KEYS.ZERO.DECI){KEYS.ZERO.DOWN=true;onKeyDown0();}
        if(keyDown==KEYS.NORTH.UNI||keyDown==KEYS.NORTH.DECI){
            KEYS.NORTH.DOWN = true;
            setNorth(true);
            onKeyDownW();
        }
        if(keyDown==KEYS.WEST.UNI||keyDown==KEYS.WEST.DECI){
            KEYS.WEST.DOWN = true;
            setWest(true);
            onKeyDownA();
        }
        if(keyDown==KEYS.SOUTH.UNI||keyDown==KEYS.SOUTH.DECI){
            KEYS.SOUTH.DOWN = true;
            setSouth(true);
            onKeyDownS();
        }
        if(keyDown==KEYS.EAST.UNI||keyDown==KEYS.EAST.DECI){
            KEYS.EAST.DOWN = true;
            setEast(true);
            onKeyDownD();
        }
        document.querySelector('body').focus();
    }
    function OnKeyUp(e)
    {
        if(e === null)e = window.event;	
        if(keyUp==KEYS.ONE.UNI||keyUp==KEYS.ONE.DECI){KEYS.ONE.DOWN=false;onKeyUp1();}
        if(keyUp==KEYS.TWO.UNI||keyUp==KEYS.TWO.DECI){KEYS.TWO.DOWN=false;onKeyUp2();}
        if(keyUp==KEYS.THREE.UNI||keyUp==KEYS.THREE.DECI){KEYS.THREE.DOWN=false;onKeyUp3();}
        if(keyUp==KEYS.FOUR.UNI||keyUp==KEYS.FOUR.DECI){KEYS.FOUR.DOWN=false;onKeyUp4();}
        if(keyUp==KEYS.FIVE.UNI||keyUp==KEYS.FIVE.DECI){KEYS.FIVE.DOWN=false;onKeyUp5();}
        if(keyUp==KEYS.SIX.UNI||keyUp==KEYS.SIX.DECI){KEYS.SIX.DOWN=false;onKeyUp6();}
        if(keyUp==KEYS.SEVEN.UNI||keyUp==KEYS.SEVEN.DECI){KEYS.SEVEN.DOWN=false;onKeyUp7();}
        if(keyUp==KEYS.EIGHT.UNI||keyUp==KEYS.EIGHT.DECI){KEYS.EIGHT.DOWN=false;onKeyUp8();}
        if(keyUp==KEYS.NINE.UNI||keyUp==KEYS.NINE.DECI){KEYS.NINE.DOWN=false;onKeyUp9();}
        if(keyUp==KEYS.ZERO.UNI||keyUp==KEYS.ZERO.DECI){KEYS.ZERO.DOWN=false;onKeyUp0();}
        if(keyUp==KEYS.NORTH.UNI||keyUp==KEYS.NORTH.DECI){
            KEYS.NORTH.DOWN = false;
            setNorth(false);
            onKeyUpW();
        }
        if(keyUp==KEYS.WEST.UNI||keyUp==KEYS.WEST.DECI){
            KEYS.WEST.DOWN = false;
            setWest(false);
            onKeyUpA();
        }
        if(keyUp==KEYS.SOUTH.UNI||keyUp==KEYS.SOUTH.DECI){
            KEYS.SOUTH.DOWN = false;
            setSouth(false);
            onKeyUpS();
        }
        if(keyUp==KEYS.EAST.UNI||keyUp==KEYS.EAST.DECI){
            KEYS.EAST.DOWN = false;
            setEast(false);
            onKeyUpD();
        }
    }
    /**
    * * * CONTROLED ATIONS * * *
    */
    //var keynum = [[],[],()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},()=>{}];
    var keyF = ['','','','','','','','','','','','',''];
    function actionKey1(){
        let p = newProjectile(vecObjs,setVecObjs,fireball,localPlayer,vec(mousepos.x,mousepos.y),1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }
    function actionKey2(){
        let p = newProjectile(vecObjs,setVecObjs,icicle,localPlayer,vec(mousepos.x,mousepos.y),1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }
    function actionKey3(){
        let p = newProjectile(vecObjs,setVecObjs,missile,localPlayer,vec(mousepos.x,mousepos.y),1000,4);
        let i = setInterval(()=> p, 200);
        setTimeout(()=> clearInterval(i), 8000);
    }


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
    const actions = [
        {id: 1, name: '1', img: './assets/binary2.png'},
        {id: 2, name: '2', img: './assets/binary2.png'},
        {id: 3, name: '3', img: './assets/binary2.png'},
    ]
    return <Container id={'body'}>
                <Row className={'tcenter'}>
                    <Col sm={'3'} id={"debug"} style={{position: 'relative', visibility: 'visible'}}>{mousepos.x+'/'+mousepos.y}</Col>
                    <Col sm={'3'}><h4 className={'col-sm-6'}><b>Control the Object With "W/A/S/D". Press 1 - 3 to file.</b></h4></Col>
                    <Col sm={'3'} id={"ups"} style={{position: 'relative', visibility: 'visible'}}>u/s= 0</Col>
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
                    <Col id="battlefield" style={{position: 'relative', overflow: 'auto', height: '70%', background: '#CCC'}}>
                        <div id="player" className={"player collider-obj"} style={{borderRadius: '90px', position: "absolute", left: `${locplayerLeft}px`, top: `${locplayerTop}px`}}>
                            <img src="./assets/binary2.png" height="50px" width="50px"/>
                        </div>
                        <div id="wall" className={"wall collide"} style={{position: 'absolute', overflow: 'hidden', width: '20px', height: '400px', top: '50px', left: '100px', background: '#333'}}>
                        </div>
                    </Col>
                </Row>
    </Container>
}

/**
* * * CONTEXT MENUS * * *
* require within ueEffect
*/
function NI(){
    if(prompt('Not Implemented')=='password'){
        window.oncontextmenu = function handleContextMenue(event) {
            return true;
        }
    }else{
        window.oncontextmenu = function handleContextMenue(event) {
            return false;
        }
    }
}
function objOffset(obj: HTMLElement){
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