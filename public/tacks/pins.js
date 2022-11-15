function drag(e) {
    e.dataTransfer.setData("Text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    e.target.appendChild(document.getElementById(data));
}

//var noteMap = [""];
var userpass;
var noteEditobj;
var saveElements = true;
var loadElements = false;

//initNotes();

/**
* note management functions
*/
function initNotes()
{/***/
	var x =getNoteCount()
	for(var i=0;i<x;i++)
	{
		addNote('#555',loadElements);
	}
	elementsSaveLoad(loadElements);//load from memory
	console.log("load notes from memory");
}
function getNoteCount()
{
	var obj = tryParseJSON (localStorage.getItem(userpass));
	console.log("init: "+localStorage.getItem(userpass)+" / obj= "+obj);
	var x = (obj==="")?0:obj.noteMap.length;
	console.log("note count = "+x);
	return x;
}
function editNote(obj,doEdit)
{/***/
	var input1,input2;
	if(doEdit===true)
	{
		noteEditobj=obj;
		input1 = document.getElementById("in1");
		input2 = document.getElementById("in2");
		noteEditId = obj.id.slice(-1);
		input1.value = obj.getElementsByTagName('h2')[0].innerHTML;
		input2.value = obj.getElementsByTagName('p')[0].innerHTML;
		document.getElementById("pins-outer").style.visibility="hidden";
		document.getElementById("pins-editor").style.visibility="visible";
	}
	else
	{
		input1 = document.getElementById("in1");
		input2 = document.getElementById("in2");
		var header = noteEditobj.getElementsByTagName("h2")[0];
		var para = noteEditobj.getElementsByTagName("p")[0];
		header.innerHTML=input1.value;
		para.innerHTML=input2.value;
		document.getElementById("pins-outer").style.visibility="visible";
		document.getElementById("pins-editor").style.visibility="hidden";
		elementsSaveLoad(saveElements);
	}
}
function elementsSaveLoad(save)//boolean
{/***/
	console.log(userpass);
	var x = document.getElementById("bulletin").getElementsByTagName("li");
	var noteMapJSON = [""];
	var noteMapJSONString = "";
	var obj = tryParseJSON (localStorage.getItem(userpass));
	if(save==saveElements)//save
	{
		noteMapJSONString='{"noteMap":[';//custom stringify
		for(var i=0;i<x.length;i++)//custom stringify
		{
			var aNote = x[i].getElementsByTagName('a')[0];
			var header = aNote.getElementsByTagName('h2')[0];
			var para = aNote.getElementsByTagName('p')[0];
			var top = x[i].style.top;
			var left = x[i].style.left;
			var background = x[i].style.background;
			//noteMap[i]={noteID:i,title:header.innerHTML,content:para.innerHTML}
			noteMapJSON[i]=
			'{"noteID":'+i+
			',"title":"'+header.innerHTML+
			'","content":"'+para.innerHTML+
			'","top":"'+top+
			'","left":"'+left+
			'","background":"'+background+
			'"}';
			noteMapJSONString = noteMapJSONString.concat((i==0?'':","),noteMapJSON[i]);
		}
		noteMapJSONString = noteMapJSONString.concat(']}');//custom stringify
		localStorage.setItem(userpass,noteMapJSONString);
		//AJAX(NiftyNotesAlpha.html, noteMapJSONString, callback);
		/**console.log("save: "+localStorage.noteMap+" / obj= "+obj);*/
	}
	else//load
	{
		/**console.log("load: "+localStorage.noteMap+" / obj= "+obj);*/
		if(obj!="")
			for(var i=0;i<x.length;i++)
			{
				var aNote = x[i].getElementsByTagName('a')[0];
				var header = aNote.getElementsByTagName('h2')[0];
				var para = aNote.getElementsByTagName('p')[0];
				console.log(obj.noteMap[i].title);
				console.log(obj.noteMap[i].content);
				header.innerHTML=obj.noteMap[i].title;
				para.innerHTML=obj.noteMap[i].content;
				x[i].style.top=obj.noteMap[i].top;
				x[i].style.left=obj.noteMap[i].left;
				x[i].style.background=obj.noteMap[i].background;
			}
	}
}

/*function callback()
{
	alert("Sent");
}*/

/*function login()
{
	authentication();//TODO: AJAX call
	//loadXMLDoc("NotANewTextDocument.txt");
}*/
function login()
{
	userpass = document.getElementById("username").value+document.getElementById("password").value;
	console.log("userpass= "+userpass);
	initNotes();
	console.log("authentication");
	document.getElementById("pins-login").style.visibility="hidden";
	document.getElementById("pins-outer").style.visibility="visible";
}

function delNoteLatest()
{/***/
	var x = document.getElementById("bulletin").getElementsByTagName("li");
	var elem = x[x.length-1];
	elem.parentNode.removeChild(elem);
}
function delNoteObj(obj)
{
	obj.parentNode.removeChild(obj);
}
function addNote(color,save)
{/***/
	var newlist=document.createElement("li");
	newlist.innerHTML="click to move";
	var listdrag = document.createAttribute("class");
	listdrag.nodeValue="drag";
	newlist.attributes.setNamedItem(listdrag);
	var alink=document.createElement("a");
	var linkhref = document.createAttribute("href");
	linkhref.nodeValue="#";
	alink.attributes.setNamedItem(linkhref);
	var linkhclick = document.createAttribute("onclick");
	linkhclick.nodeValue="editNote(this,true);";
	alink.attributes.setNamedItem(linkhclick);
	var header=document.createElement("h2");
	var paragraph=document.createElement("p");
	document.getElementById("bulletin").appendChild(newlist);
	newlist.appendChild(alink);
	alink.appendChild(header);
	alink.appendChild(paragraph);
	header.innerHTML="New Note";
	paragraph.innerHTML="content";
	
	
	var x = document.getElementById("bulletin").getElementsByTagName("li");//get z for overlap
	var randx = Math.floor(Math.random()*100);
	var randy = Math.floor(Math.random()*100);
	//newlist.style.top=(randx+30)+"px";
	//newlist.style.left=randy+"px";
	newlist.style.top=120+"px";
	newlist.style.left=120+"px";
	newlist.style.background=color;
	newlist.style.zIndex=x.length;//set overlap
	
	if(save)elementsSaveLoad(saveElements);
}
function tryParseJSON (jsonString){
    try {
        var str = JSON.parse(jsonString);
        if (str && typeof str == "object" && str !== null) {
            return str;
        }
    }
    catch (e) {return "";}

    return false;
};

/**
* drag and drop functions
*/
// this is simply a shortcut for the eyes and fingers
function $(id)
{
	return document.querySelector(id);
}
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
	if (e == null) 
		e = window.event; 
	
	// IE uses srcElement, others use target
	var target = e.target != null ? e.target : e.srcElement;
	
	_debug.innerHTML = target.className == 'drag' 
		? 'draggable element clicked' 
		: 'NON-draggable element clicked';

	// for IE, left click == 1
	// for Firefox, left click == 0
	if ((e.button == 1 && window.event != null || 
		e.button == 0) && 
		target.className == 'drag')
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
	return n == null || isNaN(n) ? 0 : n;
}
function OnMouseMove(e)
{
	if (e == null) 
		var e = window.event; 

	// this is the actual "drag code"
	_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	
	_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';	
}
function OnMouseUp(e)
{
	if (_dragElement != null)
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
		elementsSaveLoad(saveElements);
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
}