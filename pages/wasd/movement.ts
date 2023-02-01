import { cleanArrayNulls } from ".";

export default function(){return null}

export function vec(x,y){
	return {x: x, y: y}
}
//aiObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
//vecObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
export function vecObj(obj,vec,speed,life,decay){
	this.obj = obj;
	this.vec = vec;
	this.speed = speed;
	this.life = life;
	this.decay = decay;
	this.target = false;
}
//returns collision target = boolean
export function vecMoveObj(obj: HTMLMapElement,vec,maxX,maxY){
	let collisionTarget = false//<<<for testing//scanForCollisionAt(obj,vec);
	//console.log(obj.style.top);
	if(collisionTarget){
		/////////why no work?/////////
		obj.style.top = (Math.max(0,Math.min(maxY-obj.clientHeight),obj.clientTop) - vec.y)+'px';
		obj.style.left = (Math.max(0,Math.min(maxX-obj.clientWidth),obj.clientLeft) - vec.x)+'px';
		return collisionTarget;
	}
	else if(!collisionTarget){
		/////////why no work?/////////
		obj.style.top = (Math.max(0,Math.min(maxY-obj.clientHeight),obj.clientTop) + vec.y)+'px';
		obj.style.left = (Math.max(0,Math.min(maxX-obj.clientWidth),obj.clientLeft) + vec.x)+'px';
		return collisionTarget;
	}
	//console.log(obj.style.top);
}
//returns objArray
export function arrayMoveObj(objArray,maxX,maxY){
	for(var x=0;x<objArray.length;x++){
		if(objArray[x].life>0||isNaN(objArray[x].life)){
			objArray[x].target = vecMoveObj(objArray[x].obj,objArray[x].vec,maxX,maxY);
			if(objArray[x].target){
				try{
					objArray[x].obj.collision(objArray[x].target);
				}catch(e){
					console.log('error: '+e);
				}
			}else{/*console.log('arrayMoveObj false');*/}
			objArray[x].life-=isNaN(objArray[x].decay)?1:objArray[x].decay;
		}else{
			objArray[x].obj.remove();
			objArray[x]="";
			objArray = cleanArrayNulls(objArray);
		}
	}
	return objArray;
}
export function moveClientObj(clientObj,speed,maxX,maxY, direction){
	return vecMoveObj(
			clientObj,
			vec((direction.WEST?-speed:0)+(direction.EAST?speed:0),
			(direction.NORTH?-speed:0)+(direction.SOUTH?speed:0)),
			maxX,
			maxY
		);
	//console.log(collisionTarget);
}
export function scanForCollisionAt(obj,vec){
	var x = obj.clientLeft+obj.clientWidth/2;
	var y = obj.clientTop+obj.clientHeight/2;
	var top,bottom,left,right,ret = false;
	document.querySelectorAll('#battlefield').forEach(function(collider){
		if(collider.getAttribute('class')!==obj.getAttribute('class')){
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
			if(objright >thisleft && objright < thisright){left=true;}else{left=false;}//colide on $(this).left;
			if(objtop < thisbottom && objtop > thistop){bottom=true;}else{bottom=false;}//colide on $(this).bottom;
			if(objbottom > thistop && objbottom < thisbottom){top=true;}else{top=false;}//colide on $(this).top;
			
			if((right||left)&&(top||bottom)){
				ret = true;//////?????what is being returned here?
			}
		}
	});
	return ret;
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