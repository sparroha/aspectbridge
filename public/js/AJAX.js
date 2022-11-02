/*function AJAX(){
	$.ajax({
		//async: true,
		beforeSend: function(xhr){},
		//cache: true,
		complete: function(xhr,status){},
		//contentType:"application/x-www-form-urlencoded",
		data:'',
		dataFilter: function(data,type){},
		//dataType:'json',
		error: function(xhr,status,error){},
		//global: true,
		//ifModified: false,
		//jsonp: '',
		//jsonpCallback: '',
		//password '',
		//processData: true,
		//scriptCharset: '',
		success: function(result,status,xhr){},
		timeout: 5000,
		//traditional: true,
		type: 'GET',
		//username: '',
		url: 'scripts/chat.php',
		//xhr: function(){}
	});
}*/
function AJAX(URI,METHOD,ARGS,FBeforeSend,FSuccess,FError,FComplete){
	$.ajax({
		url: URI,
		type: METHOD,
		data: ARGS,
		beforeSend: FBeforeSend,
		success: FSuccess,
		error: FError,
		complete: FComplete
	});
}
function AJAX(url,method,data,success,error){
	AJAX(url,method,data,function(xhr){},success,error,function(xhr,status){});
}
function AJAX(url,method,data){
	AJAX(url,method,data,function(xhr){},function(xhr,status,result){},function(xhr,status,error){},function(xhr,status){});
}
function AJAX(url,method){
	AJAX(url,method,null,function(xhr){},function(xhr,status,result){},function(xhr,status,error){},function(xhr,status){});
}
function AJAX(url){
	AJAX(url,'POST',null,function(xhr){},function(xhr,status,result){},function(xhr,status,error){},function(xhr,status){});
}
var url = "script.php";
var data = {key1:"val",key2:"val"};
var beforeSend = function(xhr){};
var success = function(xhr,status,result){};
var error = function(xhr,status,error){};
var complete = function(xhr,status){};
//AJAX(url,data,'POST',beforeSend,success,error,complete);
