function newObj(x, y, width, height){

}

function saveLocal(content, fileName, contentType) {

    //custom
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

    //template
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    document.body.removeChild(a);
}

$jsonData=$POST['DATA'];
$username=$POST['username'];
saveJSON($username,$jsonData,"");
function saveJSON(file,data,namespace=""){
    let path = DATA + "/";
    if(namespace != ""){
        path = path + namespace + "/";
        path = preg_replace('#/+#','/',path);
        if(!is_dir($path)) mkdir($path);
    }

    data = json.stringify(data);
    write = fopen(path . $file, 'w') or die("can't open file ".$path.$file);
    fwrite(write, $data);
    fclose(write);
    echo 'alert("atempted file save for '.$username.'")';
}
//saveLocal(jsonData, 'save.json', 'text/json');

function loadLocal(username)//boolean
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