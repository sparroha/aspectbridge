function drag(e) {
    e.dataTransfer.setData("Text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    e.target.appendChild(document.getElementById(data));
}

/**
* drag and drop functions
*/
var _startX = 0;			// mouse starting positions
var _startY = 0;
var _offsetX = 0;			// current element offset
var _offsetY = 0;
var _dragElement;			// needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;			// we temporarily increase the z-index during drag
var _debug = $('debug');	// makes life easier

InitDragDrop();
function InitDragDrop()
{
	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
}
function OnMouseDown(e)
{
	// IE is retarded and doesn't pass the event object
	if (e === null) 
		e = window.event; 
	
	// IE uses srcElement, others use target
	var target = e.target !== null ? e.target : e.srcElement;
	
	_debug.innerHTML = target.className == 'drag' 
		? 'draggable element clicked' 
		: 'NON-draggable element clicked';

	// for IE, left click == 1
	// for Firefox, left click == 0
	if ((e.button === 1 && window.event !== null || e.button === 0) && target.className == 'drag')
	{
		// grab the mouse position
		_startX = e.clientX;
		_startY = e.clientY;
		
		// grab the clicked element's position
		_offsetX = ExtractNumber(target.style.left);
		_offsetY = ExtractNumber(target.style.top);
		
		// bring the clicked element to the front while it is being dragged
		_oldZIndex = target.style.zIndex;
		_oldZIndex++;
		target.style.zIndex = 10000;
		
		// we need to access the element in OnMouseMove
		_dragElement = target;

		// tell our code to start moving the element with the mouse
		document.onmousemove = OnMouseMove;
		
		// cancel out any text selections
		document.body.focus();
		
		// prevent text selection in IE
		document.onselectstart = function () { return false; };
		// prevent IE from trying to drag an image
		target.ondragstart = function() { return false; };
		
		// prevent text selection (except IE)
		return false;
	}
}
function ExtractNumber(value)
{
	var n = parseInt(value);
	return n === null || isNaN(n) ? 0 : n;
}
function OnMouseMove(e)
{
	if (e === null) 
	e=window.event;
	// this is the actual "drag code"
	_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	
	_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';	
}
function OnMouseUp(e)
{
	if (_dragElement !== null)
	{
		_dragElement.style.zIndex = _oldZIndex;

		// we're done with these events until the next OnMouseDown
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;

		//delete object if over trash
		tryTrash(_dragElement);
		// this is how we know we're not dragging
		_dragElement = null;
		_debug.innerHTML = 'mouse up';
		
		//save elements after a move
		/**
		 * 
		 * elementsSaveLoad(saveElements);*/
	}
}
function tryTrash(obj)//check to see if note is dropped on the trash can onMouseUp
{
	var trash = document.getElementById("trash");
	var trashMinLeft = trash.offsetLeft;
	var trashMaxLeft = trash.offsetLeft+trash.offsetWidth;
	var trashMinTop = trash.offsetTop;
	var trashMaxTop = trash.offsetTop+trash.offsetHeight;
	console.log(obj.offsetLeft+obj.offsetWidth/2);console.log(trashMinLeft);console.log(trashMaxLeft);
	console.log("");
	console.log(obj.offsetTop+obj.offsetHeight/2);console.log(trashMinTop);console.log(trashMaxTop);
	console.log("");console.log("");
	console.log("");console.log("");
	if((obj.offsetLeft+obj.offsetWidth/2)>trashMinLeft&&
	(obj.offsetLeft+obj.offsetWidth/2)<trashMaxLeft&&
	(obj.offsetTop+obj.offsetHeight/2)>trashMinTop&&
	(obj.offsetTop+obj.offsetHeight/2)<trashMaxTop)
	{
		delNoteObj(obj);
		collectStrays();
	}
}
function collectStrays()
{
	console.log("collecting strays");
	var x = document.getElementById("bulletin").getElementsByTagName("li");
	for(var i=0;i<x.length;i++)
	{
		console.log(i+" "+x[i].style.top);
		console.log(i+" "+x[i].style.left);
		if(x[i].style.top.slice(0,x[i].style.top.indexOf("px"))<30)x[i].style.top="30px";
		if(x[i].style.left.slice(0,x[i].style.left.indexOf("px"))<10)x[i].style.left="10px";
		console.log(i+" "+x[i].style.top);
		console.log(i+" "+x[i].style.left);
	}
}
/*
function loadXMLDoc(url)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function saveXMLDoc(url,stringType,stringInfo)//type=text/json
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader(stringType,stringInfo);
	xmlhttp.send();
}*/