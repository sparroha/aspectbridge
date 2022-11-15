<?php
$jsonData=$POST['DATA'];
$username=$POST['username'];
saveJSON($username,$jsonData,"");
function saveJSON($file,$data,$namespace=""){
            $path = DATA . "/";
            if($namespace != ""){
                $path = $path . $namespace . "/";
                $path = preg_replace('#/+#','/',$path);
                if(!is_dir($path)) mkdir($path);
            }

            $data = "<?php/*|" . json_encode($data) . "|*/?>";
            $write = fopen($path . $file, 'w') or die("can't open file ".$path.$file);
            fwrite($write, $data);
            fclose($write);
        }
        echo 'alert("atempted file save for '.$username.'")';
?>