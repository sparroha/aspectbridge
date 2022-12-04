
//import $ from "jquery"
//console.log('screan start = '+objOffset(EngineScrean.parent()).x+" x "+objOffset(EngineScrean.parent()).y);
var clientPlayer;
var gamespeed = 1;
var updates;
var seconds;
var aiObjs = [];
var vecObjs = [];
var collisionList = [];
/**
* * * INITIATE GAME SETTINGS * * *
*
$(function(){
	seconds = new Date().getSeconds();
	clientPlayer = $("#player");
	setMaxHeightWidth();
	clientPlayer.css('left',maxX/2+"px");
	clientPlayer.css('top',maxY/2+"px");
	gamespeed = 1;
	$('html').attr('oncontextmenu','NI();');
});
/**
* * * PRIMARY GAME LOOP * * *
*
$(function(){setInterval(game, gamespeed);});
function game(){
	setMaxHeightWidth();
	$("#debug").html(MOUSEPOS.x + " x " +MOUSEPOS.y);
	moveClientObj(clientPlayer,5);
	//handleAI();
	vecObjs=arrayMoveObj(vecObjs);
	debug();
}
/**
* * * FRAME RATE * * *
*
function debug(){
	var d = new Date();
	var s = d.getSeconds();
	//updates per second
	updates++;
	if(s == seconds+1||s==seconds-59){
		$("#ups").html('u/s='+updates+' width='+maxX+' height='+maxY);
		updates=0;
	}
	seconds = s;
}
/**
* * * CONTEXT MENUS * * *
*
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
/**
* * * OBJECTS * * *
*
function aiObj(obj,vec,speed,life,decay){
	this.obj = obj;
	this.vec = vec;
	this.speed = speed;
	this.life = life;
	this.decay = decay;
	this.target = false;
}
//vecObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))

//returns a new array with no "" values
function cleanArrayNulls(arr){
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
/**
* * * CONTROLED ATIONS * * *
*/
onKeyDown1=actionKey1;
onKeyUp1=cancelKey1;
onKeyDown2=actionKey2;
onKeyUp2=cancelKey2;
onKeyDown3=actionKey3;
onKeyUp3=cancelKey3;
onKeyDown4=actionKey4;
onKeyUp4=cancelKey4;
onKeyDown5=actionKey5;
onKeyUp5=cancelKey5;
onKeyDown6=actionKey6;
onKeyUp6=cancelKey6;
var keynum = ['','','','','','','','','','',''];
var keyF = ['','','','','','','','','','','','',''];
function cancelKey1(){
	clearInterval(keynum[1]);
	keynum[1]='';
}
function actionKey1(){
	if(keynum[1]===''){
		newProjectile(fireball,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,6);
		keynum[1] = setInterval(function(){newProjectile(fireball,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,3);},100);
	}
}
function cancelKey2(){
	clearInterval(keynum[2]);
	keynum[2]='';
}
function actionKey2(){
	if(keynum[2]===''){
		newProjectile(icicle,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,6);
		keynum[2] = setInterval(function(){newProjectile(icicle,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,3);},100);
	}
}
function cancelKey3(){
	clearInterval(keynum[3]);
	keynum[3]='';
}
function actionKey3(){
	if(keynum[3]===''){
		newProjectile(missile,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,6);
		keynum[3] = setInterval(function(){newProjectile(missile,clientPlayer,new vec(MOUSEPOS.x,MOUSEPOS.y),1000,3);},100);
	}
}
function cancelKey4(){
	clearInterval(keynum[4]);
	keynum[4]='';
}
function actionKey4(){
	if(keynum[4]===''){
		keynum[4] = '';
	}
}
function cancelKey5(){
	clearInterval(keynum[5]);
	keynum[5]='';
}
function actionKey5(){
	if(keynum[5]===''){
		keynum[5] = '';
	}
}
function cancelKey6(){
	clearInterval(keynum[6]);
	keynum[6]='';
}
function actionKey6(){
	if(keynum[6]===''){
		keynum[6] = '';
	}
}

