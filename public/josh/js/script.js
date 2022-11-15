
function setImg(obj,id){
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
function viewtxt(txt)
{
	$('#txtout').attr('src',txt);
	$('#txtout').$('.doc-content').addClassName('child')
}

function clearContent()
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
}
//alert('test');
//var testfile=readTextFile("botlogin.txt")
//$('#testDiv').val(testfile);
//$('#testDiv').html('<p>'+testfile+'</p>');
function showHome(){
	clearContent();
	alert('showHome()');
	$('content').html(
		'<div class="well-sm col-sm-2 h60 grey-back o5">'+
			'<div id="nav_home"></div>'+
			'<iframe src="https://free.timeanddate.com/countdown/i51r78hq/n4200/cf12/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfff/tcfff/fs100/szw320/szh135/tatTime%20left%20Till%20I%20Leave/tac000/tptTime%20since%20Event%20started%20in/tpc000/mac000/mpc000/iso2016-02-04T12:00:00" allowTransparency="true" frameborder="0" width="178" height="69"></iframe>'+
		'</div>'+
		'<div class="well-sm col-sm-8 h60 white-back scroll">'+
			'<center class="vcenter">'+
				'<div class="w50 black-font">'+
					'<p>If you are looking at this page it means you have some affiliation with or interest in the <a href="#">Terra Forge</a> community network.'+
					'This web site contains references to all communities, mods, and projects that are part of the Terra Forge network.'+
					'</p>'+
					'<img class=img src=http://cs4.pikabu.ru/images/big_size_comm/2014-09_3/14104003664671.png ></img>'+
				'</div>'+
			'</center>'+
		'</div>'+
		'<div class="well-sm col-sm-2 h60 grey-back o5">'+
		'</div>'
		);
}
function showNav(){
	$.get("nav.html",function(html_string){
		$('#nav').html(html_string)
	},'html');
}
function showNavHome(){
	$.get("navHome.html",function(html_string){
		$('#nav_home').html(html_string)
	},'html');
}
$(function(){
	//showHome();
	//showNavHome();
	//showNav();
	console.log('showHome()');
	$('#navbar-brand').html('Zypk '+alephbeth.zain+alephbeth.yod+alephbeth.pe+alephbeth.keth+' Bridge');
})