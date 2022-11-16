
function viewtxt(txt)
{
	$('#txtout').attr('src',txt);
}

function showNav(){
	$()
}
function showHome(){
	$.get("home.html",function(html_string){
		$('#content').html(html_string)
	},'html')
}
function showNav(){
	$.get("nav.html",function(html_string){
		$('#nav').html(html_string)
	},'html')
}
$(function(){
	showNav();
	showHome();
})

/*function sentImg(obj,id){
	if(id==1){
		obj.src="assets/sg_logo.png";
		obj.width=obj.width/2;
		obj.height=obj.height/2;
	}
	if(id==2){
		obj.src="assets/main-bg.jpg";
		obj.width=obj.width*2;
		obj.height=obj.height*2;
	}
}
$(function(){
	try{
	$('#music').volume=0.2;
	}catch(error){}
});
var track = 1;
$('#music').onended = nextaudio;
function nextaudio(){
	console.log('try change audio from track '+track);
	if(track==1){
		$('#music').attr('src',"assets/Daft_Punk_Pentatonix.mp3");
		track = 2;
	}
	else if(track==2){
		$('#music').attr('src',"assets/WhiteWinterHymnal_Pentatonix_cover.mp3");
		track = 3;
	}
	else if(track==3){
		$('#music').attr('src',"assets/Radioactive_PTX_LindseyStirling_cover.mp3");
		track = 1;
	}
}

function readTextFile(file)
{
	var output;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
                output=allText;
            }
        }
    }
    
    rawFile.send(null);
    return output;
}
/*function clearContent()
{
	$('content').empty();
}
function loadContent(content)
{
	$('content').html(content);
}
function tryParseJSON (jsonString){
    try {
        var str = JSON.parse(jsonString);
        if (str && typeof str == "object" && str !== null) {
            return str;
        }
    }
    catch (e) {alert('Failed to parse json:\n<'+jsonString+'> \nAre you a new user?');return "";}
    return false;
}*/
//alert('test');
//var testfile=readTextFile("botlogin.txt")
//$('#testDiv').val(testfile);
//$('#testDiv').html('<p>'+testfile+'</p>');*/