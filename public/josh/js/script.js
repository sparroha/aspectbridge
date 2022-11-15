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
	txtout.$('.doc-content').addClassName('child')
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
	$.get("home.html",function(html_string){
		$('content').html(html_string)
	},'html');
}
function showDocs(){
	$.get("docs.html",function(html_string){
		$('content').html(html_string)
	},'html');
}
function showNav(){
	$.get("nav.html",function(html_string){
		$('#nav').html(html_string)
        $('.navbar-brand').html('Zypk '+alephbeth.zain.uni+alephbeth.yod.uni+alephbeth.pe.uni+alephbeth.keth.uni+' Bridge');
	},'html');
}
/*function showNavHome(){
	$.get("navHome.html",function(html_string){
		$('#nav_home').html(html_string)
	},'html');
}*/
$(function(){
	showNav();
	showHome();
	//showNavHome();
	//console.log('showHome()');
	$('.navbar-brand').html('Zypk '+alephbeth.zain.uni+alephbeth.yod.uni+alephbeth.pe.uni+alephbeth.keth.uni+' Bridge');
})