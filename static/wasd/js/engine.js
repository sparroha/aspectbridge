
//Engine Valiables
EngineScreen = null
//console.log($(EngineScreen))
var maxX;
var maxY;
var objOldZIndex = 0;
var keyDown;
var keyUp;
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
var DIRECTION = {
	NORTH: false,
	EAST: false,
	SOUTH: false,
	WEST: false,
}
var MOUSEPOS = {
	x: 0,
	y: 0,
}

/**
* * * EVENT HANDLERS * * *
*/
$(function(){
	window.onkeydown = function handleKeyDown(event) {
        event = event || window.event;
		keyDown = event.keyIdentifier||event.keyCode;
		OnKeyDown(event);
		//console.log("@engine-67 {events:keyIdentifier = "+event.keyIdentifier+" keyCode = "+event.keyCode+"}");
    };
	window.onkeyup = function handleKeyUp(event) {
		event = event || window.event; // IE-ism
		keyUp = event.keyIdentifier||event.keyCode;
        if(keyDown==keyUp)keyDown = "";
		OnKeyUp(event);
		keyUp="";
    };
    window.oncontextmenu = function handleContextMenue(event) {
    	return false;
    };
});
$(function(){
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        MOUSEPOS.x = event.clientX-objOffset(EngineScreen).x;
        MOUSEPOS.y = event.clientY-objOffset(EngineScreen).y;
		//console.log(MOUSEPOS.x+"|"+MOUSEPOS.y)
    }
});
function setMaxXY(){
	maxX = window.innerWidth-(window.innerWidth-$("#battlefield").width());
	maxY = window.innerHeight-(window.innerHeight-$("#battlefield").height());
	return { width: maxX, height: maxY}
	//console.log("@engine-93{ $('#battlefield').width()): "+$("#battlefield").width()+", $('#battlefield').height()): "+$("#battlefield").height()+"}");
}
function objOffset(obj){
    var left = 0;
	var top = 0;
    while (obj.offsetParent) {
        left += $(obj).offset().left;
        top  += $(obj).offset().top;
        obj = obj.offsetParent;
		//console.log("@engine-100{left: "+$(obj).offset().left+", top: "+top+", obj: "+obj+"}")
    } 
    
    return {
        x : left,
        y : top
    };
}
function getAngle(rad,vecY){
	return -rad*180/Math.PI+(vecY<0?180:0);
}
/**
* key move functions
*/
function onKeyDown1(){}
function onKeyUp1(){}
function onKeyDown2(){}
function onKeyUp2(){}
function onKeyDown3(){}
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
		DIRECTION.NORTH = true;
		onKeyDownW();
	}
	if(keyDown==KEYS.WEST.UNI||keyDown==KEYS.WEST.DECI){
		KEYS.WEST.DOWN = true;
		DIRECTION.WEST = true;
		onKeyDownA();
	}
	if(keyDown==KEYS.SOUTH.UNI||keyDown==KEYS.SOUTH.DECI){
		KEYS.SOUTH.DOWN = true;
		DIRECTION.SOUTH = true;
		onKeyDownS();
	}
	if(keyDown==KEYS.EAST.UNI||keyDown==KEYS.EAST.DECI){
		KEYS.EAST.DOWN = true;
		DIRECTION.EAST = true;
		onKeyDownD();
	}
	$('body').focus();
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
		DIRECTION.NORTH = false;
		onKeyUpW();
	}
	if(keyUp==KEYS.WEST.UNI||keyUp==KEYS.WEST.DECI){
		KEYS.WEST.DOWN = false;
		DIRECTION.WEST = false;
		onKeyUpA();
	}
	if(keyUp==KEYS.SOUTH.UNI||keyUp==KEYS.SOUTH.DECI){
		KEYS.SOUTH.DOWN = false;
		DIRECTION.SOUTH = false;
		onKeyUpS();
	}
	if(keyUp==KEYS.EAST.UNI||keyUp==KEYS.EAST.DECI){
		KEYS.EAST.DOWN = false;
		DIRECTION.EAST = false;
		onKeyUpD();
	}
}