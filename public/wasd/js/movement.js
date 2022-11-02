
function vec(x,y){
	this.x = x;
	this.y = y;
}
//aiObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
//vecObjs.push(new vecObj(newMovingElement(id,startx,starty),new vec(x,y),speed,life,decay))
function vecObj(obj,vec,speed,life,decay){
	this.obj = obj;
	this.vec = vec;
	this.speed = speed;
	this.life = life;
	this.decay = decay;
	this.target = false;
}
//returns collision target
function vecMoveObj(obj,vec){
	//console.log((parseFloat(obj.css('left'))+parseFloat(obj.css('width'))/2)+','+(parseFloat(obj.css('top'))+parseFloat(obj.css('height'))/2));
	collisionTarget = scanForCollisionAt(obj,vec);
	/*console.log(collisionTarget);*/
	if(collisionTarget!==false){
		obj.css('top',Math.max(0,Math.min(maxY-parseInt(obj.css('height')),parseFloat(obj.css('top')) - vec.y*1)) + 'px');
		obj.css('left',Math.max(0,Math.min(maxX-parseInt(obj.css('width')),parseFloat(obj.css('left')) - vec.x*1)) + 'px');
		return collisionTarget;
	}
	else if(collisionTarget===false){
		obj.css('top',Math.max(0,Math.min(maxY-parseInt(obj.css('height')),parseFloat(obj.css('top')) + vec.y)) + 'px');
		obj.css('left',Math.max(0,Math.min(maxX-parseInt(obj.css('width')),parseFloat(obj.css('left')) + vec.x)) + 'px');
		//console.log('1 ' +collisionTarget);
		return collisionTarget;
	}
}
//returns objArray
function arrayMoveObj(objArray){
	for(var x=0;x<objArray.length;x++){
		if(objArray[x].life>0||isNaN(objArray[x].life)){
			objArray[x].target = vecMoveObj(objArray[x].obj,objArray[x].vec);
			if(objArray[x].target){
				try{
					//console.log('2 '+objArray[x].target);
					objArray[x].obj.collision(objArray[x].target);
				}catch(e){
					//console.log('error: '+e);
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
function moveClientObj(clientObj,speed){
	collisionTarget = vecMoveObj(clientObj,new vec(
		0+(DIRECTION.WEST?-speed:0)+(DIRECTION.EAST?speed:0),
		0+(DIRECTION.NORTH?-speed:0)+(DIRECTION.SOUTH?speed:0)
	));
	//console.log(collisionTarget);
}
function scanForCollisionAt(obj,vec){
	console.log('vec.x='+vec.x+' && vec.y='+vec.y);
	//var x = parseFloat(obj.css('left'))+parseFloat(obj.css('width'))/2;
	//var y = parseFloat(obj.css('top'))+parseFloat(obj.css('height'))/2;
	var top,bottom,left,right,ret = false;
	EngineScrean.find('.collide').each(function(){
		/*console.log('x:'+x+';y:'+y+
			';collide-x:'+parseFloat($(this).css('left'))+'&'+(parseFloat($(this).css('left'))+parseFloat($(this).css('width')))+
			';collide-y:'+parseFloat($(this).css('top'))+'&'+(parseFloat($(this).css('top'))+parseFloat($(this).css('height'))));*/
		if($(this).attr('class')!==obj.attr('class')){
			var objleft = parseFloat(obj.css('left'));
			var objright = parseFloat(obj.css('left'))+parseFloat(obj.css('width'));
			var objtop = parseFloat(obj.css('top'));
			var objbottom = parseFloat(obj.css('top'))+parseFloat(obj.css('height'));
			var thisleft = parseFloat($(this).css('left'));
			var thisright = parseFloat($(this).css('left'))+parseFloat($(this).css('width'));
			var thistop = parseFloat($(this).css('top'));
			var thisbottom = parseFloat($(this).css('top'))+parseFloat($(this).css('height'));
			
			var xaligned = (objleft < thisright && thisright < objright)||(objleft < thisleft && thisleft < objright);
			var yaligned = (objtop < thistop && thistop < objbottom)||(objtop < thisbottom && thisbottom < objbottom);
			
			//console.log('x:'+xaligned+';y:'+yaligned);
			if(objleft < thisright && objleft > thisleft){right=true;}else{right=false;}//colide on $(this).right;
			if(objright >thisleft && objright < thisright){left=true;}else{left=false;}//colide on $(this).left;
			if(objtop < thisbottom && objtop > thistop){bottom=true;}else{bottom=false;}//colide on $(this).bottom;
			if(objbottom > thistop && objbottom < thisbottom){top=true;}else{top=false;}//colide on $(this).top;
			/*if(((right && vec.x < 0||left && vec.x > 0)&&(top||bottom)&&yaligned)||((right||left)&&xaligned&&(top && vec.y > 0||bottom && vec.y < 0))){
				//console.log($(this));
				ret = $(this);
			}*/
			if((right||left)&&(top||bottom)){
				//console.log($(this));
				ret = $(this);
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