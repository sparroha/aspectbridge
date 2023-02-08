import { cleanArrayNulls } from ".";

export default function(){return null}

export type vec = {
	x: number,
	y: number
}
//aiObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
//vecObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
export type vecObj = {
	obj: {id: string, className: string, style: {}, img: string, width: string},
	vec: vec,
	speed: number,
	life: number,
	decay: number,
	target: vec,
}
//returns collision target = boolean
export function vecMoveObj(obj: HTMLMapElement,vec: vec, maxX: number,maxY: number){
	if(!obj) return null;
	let collisionTarget = scanForCollisionAt(obj,vec);
    //console.log('move'+obj.style.top);
	if(collisionTarget!=null){
		obj.style.top = 0+'px'
		/////////why no work?/////////
		let newTop = Math.max(0,Math.min(maxY - obj.clientHeight, parseInt(obj.style.top) - vec.y));
		let newLeft = Math.max(0,Math.min(maxX - obj.clientWidth, parseInt(obj.style.left) - vec.x));
		//console.log('top: '+Math.min(maxY - obj.clientHeight, obj.clientTop - vec.y)+' left: '+newLeft)
		//setTop(newTop);
		obj.style.top = newTop+'px'
		//setLeft(newLeft);
		obj.style.left = newLeft+'px'
		return collisionTarget;
	}
	else if(!collisionTarget){
		/////////why no work?/////////
		let newTop = Math.max(0,Math.min(maxY - obj.clientHeight, parseInt(obj.style.top) + vec.y));
		//console.log('obj.clientHeight: '+obj.clientHeight+'\nobj.clientTop: '+obj.clientTop)
		let newLeft = Math.max(0,Math.min(maxX - obj.clientWidth, parseInt(obj.style.left) + vec.x));
		//console.log('maxY - obj.clientHeight: '+(maxY - obj.clientHeight)+'/\nobj.clientTop + vec.y:'+ (obj.clientTop + vec.y)+'/\nobj.clientTop: '+obj.clientTop+'\nVec: '+JSON.stringify(vec))
		//setTop(newTop);
		obj.style.top = newTop+'px'
		//setLeft(newLeft);
		obj.style.left = newLeft+'px'
		return collisionTarget;
	}
	//console.log(obj.style.top);
}
//returns objArray
export function arrayMoveObj(objArray: vecObj[], maxX: number, maxY: number): vecObj[]{
	for(var x=0;x<objArray.length;x++){
		if(objArray[x].life>0||isNaN(objArray[x].life)){
			let targetEl: boolean = vecMoveObj(document.querySelector(objArray[x].obj.id),objArray[x].vec,maxX,maxY);
			//broken//objArray[x].target = {x: targetEl.clientLeft+targetEl.clientWidth/2, y: targetEl.clientTop+targetEl.clientHeight/2}
			/*if(objArray[x].target){
				try{
					objArray[x].obj.collision(objArray[x].target);
				}catch(e){
					console.log('error: '+e);
				}
			}else{console.log('arrayMoveObj false');}*/
			objArray[x].life-=isNaN(objArray[x].decay)?1:objArray[x].decay;
		}else{
			//objArray[x].remove();
			objArray[x]=null;
			objArray = cleanArrayNulls(objArray);
		}
	}
	return objArray;
}
export function moveClientObj(clientObj: HTMLMapElement,speed: number,maxX: number,maxY: number, direction: { NORTH: any; EAST: any; SOUTH: any; WEST: any; }){
	//console.log('direction: '+JSON.stringify(direction))
	let {NORTH, SOUTH, EAST, WEST} = direction
	return vecMoveObj(
			clientObj,
			{x: (WEST?-speed:0)+(EAST?speed:0),
			y: (NORTH?-speed:0)+(SOUTH?speed:0)},
			maxX,
			maxY
		);
	//console.log(collisionTarget);
}
export function scanForCollisionAt(obj: HTMLMapElement,vec: vec){
	//console.log('scanForCollision');
	var x = obj.clientLeft+obj.clientWidth/2;
	var y = obj.clientTop+obj.clientHeight/2;
	var top: boolean,bottom: boolean,left: boolean,right: boolean = false;
	document.querySelectorAll('#battlefield').forEach(function(collider){
		if(collider===obj) return null
		if(collider.classList!==obj.classList){
			var objleft = obj.clientLeft;
			var objright = obj.clientLeft+obj.clientWidth;
			var objtop = obj.clientTop;
			var objbottom = obj.clientTop+obj.clientHeight;
			var thisleft = collider.clientLeft;
			var thisright = collider.clientLeft+collider.clientWidth;
			var thistop = collider.clientTop;
			var thisbottom = collider.clientTop+collider.clientHeight;
			
			var xaligned = (objleft < thisright && thisright < objright)||(objleft < thisleft && thisleft < objright);
			var yaligned = (objtop < thistop && thistop < objbottom)||(objtop < thisbottom && thisbottom < objbottom);
			
			if(objleft < thisright && objleft > thisleft){right=true;}else{right=false;}//colide on $(this).right;
			if(objright > thisleft && objright < thisright){left=true;}else{left=false;}//colide on $(this).left;
			if(objtop < thisbottom && objtop > thistop){bottom=true;}else{bottom=false;}//colide on $(this).bottom;
			if(objbottom > thistop && objbottom < thisbottom){top=true;}else{top=false;}//colide on $(this).top;
			
			if((right||left)&&(top||bottom)){
				//Not Working Right
				//console.log('collision: '+ right +'|'+ left +'|'+ top +'|'+ bottom);
				return collider
			}
		}
	});
	return null;
}

/*function handleAI(){
	var cleanObjs = false;
	var maxVecX,maxVecY;
	for(var x=0;x<aiObjs.length;x++){
		maxVecX = maxX-parseFloat(aiObjs[x].obj.css('width'));
		maxVecY = maxY-parseFloat(aiObjs[x].obj.css('height'));
		//object move
		if(aiObjs[x].life>0||isNaN(aiObjs[x].life)){
			aiObjs[x].obj.css('left',Math.max(0,Math.min(maxVecX,(f(aiObjs[x].obj.css('left')) + aiObjs[x].vec.x))));
			aiObjs[x].obj.css('top',Math.max(0,Math.min(maxVecY,(f(aiObjs[x].obj.css('top')) + aiObjs[x].vec.y))));
			//reduce life
			aiObjs[x].life-=isNaN(aiObjs[x].decay)?1:aiObjs[x].decay;
		}else{
			aiObjs[x].obj.remove();
			aiObjs[x]="";
			cleanObjs = true;
		}
	}
	if(cleanObjs){
		aiObjs = cleanArrayNulls(aiObjs);
		cleanObjs = false;
	}
}*/