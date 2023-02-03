import { vec, vecObj } from "./movement";

export default function(){return null}
//newProjectile(fireball(),$('caster'),new vec(target.x,target.y))
export function newProjectile(vecObjs: vecObj[], entity,caster,target,maxlife,size?,speed?){
	maxlife = maxlife||200;
	speed = speed||5;
	//let vecObjs //placeholder
	//let vecObj = (entity,vec,speed,life,decay)=>{} //placeholder
	let spread = 1+size/5;
	var startX = parseFloat(caster.css('left'))+parseFloat(caster.css('width'))/2;
	var startY = parseFloat(caster.css('top'))+parseFloat(caster.css('height'))/2;
	if(target.x<startX){startX=startX-parseFloat(caster.css('width'))*spread;}
	else if(target.x>startX){startX=startX+parseFloat(caster.css('width'))*spread;}
	if(target.y<startY){startY = startY-parseFloat(caster.css('height'))*spread;}
	else if(target.y>startY){startY = startY+parseFloat(caster.css('height'))*spread;}
	var vec: vec = {x: target.x-startX, y: target.y-startY};
	var distance = Math.sqrt(Math.pow(vec.x,2)+Math.pow(vec.y,2));//vector magnatude
	var slope = vec.y/vec.x;//rise over run
	var slope2 = vec.x/vec.y;//run over rise
	var radians = Math.atan(slope);
	var angle = getAngle(radians,vec.y);//actually gets spin up or down//rather right or left
	var time = distance/speed;
	var life = Math.min(maxlife,distance);//not sure on this
	var stepX = vec.x/time;
	var stepY = vec.y/time;
	var decay = Math.sqrt(Math.pow(stepX,2)+Math.pow(stepY,2));
	//remaining life = life - decay
	vecObjs.push({ obj: entity(caster.attr('id'),startX,startY,size||1,angle), vec: vec, speed: size||1, life: life, decay: decay, target: target});
	//setVecObjs(vecObjs);
}
export function missile(id,startx,starty,size,angle,screen)
{
	this.collision = function(target){
		console.log("missile_"+(id!==""?id:"")+" impacting target:"+target.attr('id'));
		alert('THIS IS WHAT IT"S LIKE WHEN WORLDS COLLIDE!');
	};
	var width=20*size;
	var height=20*size;
	angle=angle+90;// rotates spin left/right to spin up/down
	var img = './../assets/binary2.png'
	var newObj=$("<div class='projectile'><img src="+img+" width=100% /></div>");
	newObj.attr('id',"missile_"+(id!==""?id:""));
	newObj.css('position',"absolute");
	newObj.css('transform',"rotate("+angle+"deg)");
	newObj.css('width',width+"px");
	newObj.css('height',height+"px");
	newObj.css('background',"transparent");
	newObj.css('zindex',100);
	screen.append(newObj);
	
	newObj.css('left',(startx-width/2)+"px");
	newObj.css('top',(starty-height/2)+"px");
	return newObj;
}
export function fireball(id,startx,starty,size,angle,screen){
	this.collision = function(target){};
	var width=20*size;
	var height=20*size;
	angle=angle;
	var img = './../assets/binary2.png';
	var newObj=$("<div class='projectile'><img src="+img+" width=100% /></div>");
	newObj.attr('id',"fireball_"+(id!==""?id:""));
	newObj.css('position',"absolute");
	newObj.css('transform',"rotate("+angle+"deg)");
	newObj.css('width',width+"px");
	newObj.css('height',height+"px");
	newObj.css('background',"transparent");
	newObj.css('zindex',100);
	screen.append(newObj);
	
	newObj.css('left',(startx-width/2)+"px");
	newObj.css('top',(starty-height/2)+"px");
	return newObj;
}
export function icicle(id,startx,starty,size,angle,screen){
	this.collision = function(target){};
	var width=20*size;
	var height=20*size;
	angle=angle+45;
	var img = './../assets/binary2.png';
	var newObj=$("<div class='projectile'><img src="+img+" width=100% /></div>");
	newObj.attr('id',"icicle_"+(id!==""?id:""));
	newObj.css('position',"absolute");
	newObj.css('transform',"rotate("+angle+"deg)");
	newObj.css('width',width+"px");
	newObj.css('height',height+"px");
	newObj.css('background',"transparent");
	newObj.css('zindex',100);
	screen.append(newObj);
	
	newObj.css('left',(startx-width/2)+"px");
	newObj.css('top',(starty-height/2)+"px");
	return newObj;
}

export function getAngle(rad,vecY){
	return -rad*180/Math.PI+(vecY<0?180:0); //y>0=spin up, y<0=spin down
}