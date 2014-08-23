<?php 

require_once("dbmanager.php");
require_once("constants.php");

if(isset($_POST['method']))
    call_user_func($_POST['method']);

//echo "working";



function Logout()
{
    session_start();
    session_destroy();
}

function Login()
{
    session_start();
    $data = $_POST["data"];
    
    $data['username'] = mysql_real_escape_string($data['username']);
    $data['password'] = mysql_real_escape_string($data['password']);
    
    $query = "SELECT Username, UserID FROM User WHERE Username = '{$data['username']}' AND Password = '{$data['password']}'";
//    echo $query;
    $ret = QuerySingleRow($query);
    
    $username = $ret["Username"];
    $userID = $ret["UserID"];
    
//    print_r($ret);
    
    if($username == "")
        return;
    
    $_SESSION["username"] = $username;
    $_SESSION["userID"] = $userID;
    $_SESSION["siteState"] = SiteState::MAIN_MENU;
    
    echo $username;
//    echo $_SESSION["siteState"];
}

function Signup()
{
//    print_r($_POST);
    
    $data = $_POST["data"];
    
    $data['username'] = mysql_real_escape_string($data['username']);
    $data['password'] = mysql_real_escape_string($data['password']);
    $data['email'] = mysql_real_escape_string($data['email']);
    
    ///Backend validate first
    $username = QuerySingleRow("SELECT Username FROM User WHERE Username = '{$data['username']}'")["Username"];
    $email = QuerySingleRow("SELECT Email FROM User WHERE Email = '{$data['email']}'")["Email"];
    
    if($username != "" || $email != "")
        die("Email or Username already in use.");
    
    ExecuteQuery("INSERT INTO User(`Username`, `Password`, `Email`,`LastUpdated`) VALUES('{$data['username']}','{$data['password']}','{$data['email']}',NOW())");
    
    Login();
}

function LoginAsGuest()
{
    session_start();
    $data = [];
    
    $validChars = "0123456789ABCDEFGHIJ01248KLMNOPQRSTUVWXYZ0123456789";
    $specialChars = "?[].,*&^%#@ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789=/[].,!@#$%^&*()+|`abcdefghijklmnopqrstuvwxy";
    
//    base_convert(int,from,to);
    
    
    do{
        
        $count = intval(QuerySingleRow("SELECT COUNT(*) as c FROM User WHERE IsGuest = 1")["c"]);
        $data["username"] = "Guest_" . strtoupper(str_pad(base_convert(++$count,10,36),5,"0", STR_PAD_LEFT));
        $data["password"] = GenerateCode($specialChars, 30);
    }while(QuerySingleRow("SELECT COUNT(*) as c FROM User WHERE Username = '{$data["username"]}'")["c"] != 0);
    
    
    ExecuteQuery("INSERT INTO User(`Username`, `Password`,`IsGuest`,`LastUpdated`) VALUES('{$data['username']}','{$data['password']}',1,NOW())");
    
    $_SESSION["isGuest"] = 1;
    
    $_POST["data"] = $data;
    
    Login();
}


function IsUsernameAvailable()
{
    
    $_POST["value"] = mysql_real_escape_string($_POST["value"]);
    
    $username = QuerySingleRow("SELECT Username FROM User WHERE Username = '{$_POST['value']}'")["Username"];
    
    if($username != "")
        echo "false";
    else
        echo "true";
}

function IsEmailAvailable()
{
    $_POST["value"] = mysql_real_escape_string($_POST["value"]);
    $email = QuerySingleRow("SELECT Email FROM User WHERE Email = '{$_POST['value']}'")["Email"];

    if($email != "")
        echo "false";
    else
        echo "true";
}

function GenerateCode($source, $length)
{
    $ret = "";
    $sourceLength = strlen($source);
    for($i = 0; $i < $length; $i++)
    {
        $ret .= $source[(rand() * 100) % $sourceLength];
    }
    
    return $ret;
}

?>