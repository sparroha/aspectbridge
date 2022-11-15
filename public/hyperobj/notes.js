var username = '';
username='John';
function onLoad(username){
    loadNotes(username);
    saveNotes(username);
}
onLoad(username);
function newNote(username)
{
	var id = 1;
	var noteData = '{id='+id+',username='+username+',title="new",message="new note"}';
	var div = document.getElementById("noteObject");
	var note = document.importNode(div, true);
	note.style.visibility='visible';
	var frame = note.getElementsByTagName("IFRAME")[0]
	frame.src='http://aspectbridge.com';
	var text = note.getElementsByTagName("TEXT")[0]
    document.body.appendChild(note);
}
/*template save local file
var a = document.createElement("a");
var file = new Blob([content], {type: contentType});
a.href = URL.createObjectURL(file);
a.download = fileName;
a.click();
document.body.removeChild(a);*/
function saveNotes(username)
{/***/
	console.log('saving notes');
	var eles=document.getElementsByClassName('drag');
	var json = '{"notes":[';
	for(var i=0;i<eles.length;i++)
	{
		json = json+'{"id":"'+eles[i].id+'", "left":"'+eles[i].style.left+'", "top":"'+eles[i].style.top+'", "username":"'+username+'", "title":"title1", "text":"'+eles[i].getElementsByTagName('TEXTAREA')[0].value+'"}';
		if(i<eles.length-1)
			json = json+',';
	}
	json=json+']}';
	console.log(json);
	$.post(
		'save.php',
		json,
		function(responseTxt, statusTxt, xhr){
			if(statusTxt == "success")
		    {
		    }
		    if(statusTxt == "error")
		    {
		        alert("Error: " + xhr.status + ": " + xhr.statusText);
		    }
		}
	);
}
function loadNotes(username)//boolean
{/***/
	console.log('loading notes');
	$.post(
	'saves.json',
	{username:username,password:"",saveload:"load"},
	function(responseTxt, statusTxt, xhr){
		var obj;
	    if(statusTxt == "success")
	    {
	        alert("External content loaded successfully!");
	        alert(responseTxt);
	        obj=tryParseJSON (responseTxt);
	        alert('new obj='+obj);
	        if(obj!=="")
	        {
				for(var i=0;i<obj.notes.length;i++)
				{
					if(obj.notes[i].username==username)
					{
						//alert(obj.notes[i].username);
						//alert(obj.notes[i].text);
						var noteData = '{id='+i+',username='+username+',title='+obj.notes[i].title+',message='+obj.notes[i].text+'}';
						var div = document.getElementById("noteObject");
						var note = document.importNode(div, true);
						note.id=i;
						note.style.visibility='visible';
						note.style.left=obj.notes[i].left;
						note.style.top=obj.notes[i].top;
						var text = note.getElementsByTagName("TEXTAREA")[0]
						text.value=obj.notes[i].text;
					    document.body.appendChild(note);
					}
				}
	        }
	    }
	    if(statusTxt == "error")
	    {
	        alert("Error: " + xhr.status + ": " + xhr.statusText);
	    }
	});
}
function tryParseJSON (jsonString){
    try {
        var str = JSON.parse(jsonString);
        if (str && typeof str == "object" && str !== null) {
            return str;
        }
    }
    catch (e) {alert('failed json parse');return "";}

    return false;
}
document.body.onbeforeunload=saveNotes(username);
document.body.onunload=saveNotes(username);