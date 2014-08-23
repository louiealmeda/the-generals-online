<?php 

//require_once("connectivity.php");

$smileyLegend = [
    "'^_^",
    "O.O",
    "(ninja)",
    "(uhoh)",
    "(shout)",
    "(duh)",
    ">D",
    "-.-",
    ":D",
    "(bomb)",
    ">.>",
    "T_T",
    "x_x",
    "B:",
    ":*",
    ":)"
    ];
    
function SendMessage()
{
    session_start();
    echo "sending....";
    
    ////Recheck this
    if(strlen($_POST["msg"]) > 255)
        $_POST["msg"] = substr($_POST["msg"],0,255);
    
    if(strlen(trim($_POST["msg"])) == 0)
        return;
    
    $_POST["msg"] = implode("&lt;",explode("<",$_POST["msg"]));
    $_POST["msg"] = implode("&gt;",explode(">",$_POST["msg"]));
    
    
    
    $_POST["msg"] = convertSmileys($_POST["msg"]);
    
    if($_POST["receiverID"] == -1)
        $_POST["receiverID"] = $_SESSION["opponentID"];
    
    $_POST["receiverID"] = mysql_real_escape_string($_POST["receiverID"]);
    $_POST["msg"] = mysql_real_escape_string($_POST["msg"]);
    
    $sender = "";
    
    if($_POST["senderID"] != -1)
        $sender = mysql_real_escape_string($_POST["senderID"]);
    else
        $sender = $_SESSION["userID"];
    
    ExecuteQuery("INSERT INTO Chat(`SenderID`, `ReceiverID`, `Message`,`Time`) VALUES({$_SESSION["userID"]},{$_POST["receiverID"]}, '{$_POST["msg"]}', NOW())");
    
    echo "sent!";
}

function FetchReceivedMessages($place)
{
    session_start();
    
    if(!isset($_SESSION["lastReceivedMessage"]) || $_SESSION["lastReceivedMessage"] == null)
    {
        $_SESSION["lastReceivedMessage"] = QuerySingleRow("SELECT ChatID FROM Chat ORDER BY ChatID DESC LIMIT 1")["ChatID"];
    }
    
    $filter = "UserID = SenderID AND ChatID > {$_SESSION["lastReceivedMessage"]} AND (ReceiverID = 0 OR ReceiverID = {$_SESSION["userID"]} OR SenderID = {$_SESSION["userID"]})";
    if($place == "in-game")
    {
        $filter = "UserID = SenderID AND ChatID > {$_SESSION["lastReceivedMessage"]} 
        AND (ReceiverID = {$_SESSION['opponentID']} && SenderID = {$_SESSION['userID']} OR ReceiverID = {$_SESSION["userID"]} && SenderID = {$_SESSION['opponentID']})";
    }
    
    $ret = ExecuteQuery("SELECT ChatID, ReceiverID, Username, Message FROM Chat, User WHERE $filter");
    
    $ret = SQLArrayToArray($ret);
    
    $_SESSION["chat"] = $ret;
    global $data;
    
    $data["chat"] = $_SESSION["chat"];
    if(count($ret) > 0)
        $_SESSION["lastReceivedMessage"] = $ret[count($ret)-1]["ChatID"];
    
//    $data["lastReceivedMessage"] = $_SESSION["lastReceivedMessage"];
}




function ConvertSmileys($msg)
{
    global $smileyLegend;
    for($i = 0; $i < count($smileyLegend); $i++)
    {
        $msg = implode("<span class ='emoticon-$i'></span>", explode($smileyLegend[$i], $msg));
    }
    
    return $msg;
}



?>