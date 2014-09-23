<?php 

require_once("chat.php");
require_once("arbiter.php");



function Update()
{
    $toBeIncluded = ["won", "outcome","opponentReady","opponentID", "setupTime","opponent","rank"];
    global $data;

    session_start();
//    session_destroy();
    
    $originalGameState = $_SESSION["gameState"];
    
//    if($_SESSION["userID"] = 55)
////        unset($_SESSION)
//        $_SESSION["gameState"] = GameState::TURN;
    
    if(isset($_SESSION["isGuest"]))
    {
        
        $username = QuerySingleRow("SELECT Username FROM User WHERE Username = '{$_SESSION['username']}' && LastUpdated < DATE_SUB(NOW(),INTERVAL 120 SECOND)")["Username"];

        if($username != "")
        {   
            session_destroy();
            $_SESSION["username"] = "";
        }
    }
    
    
    if(!isset($_SESSION["username"]))
    {   
        $_SESSION["username"] = "";
    }

    if(!isset($_SESSION["siteState"]))
    {   
        $_SESSION["siteState"] = SiteState::LOGIN;
        $_SESSION["onlinePlayerCounter"] = -1;
    }
    
    
    if(isset($_SESSION["userID"]))
    {
        if($_SESSION["siteState"] != SiteState::LOGIN)
        {   
            ExecuteQuery("UPDATE User SET LastUpdated = NOW() WHERE UserID = {$_SESSION['userID']}");
        }
    
        if($_SESSION["siteState"] == SiteState::LOBBY)
        {
            CheckCommencingChallenge();
            GetAllOnlinePlayers();
            CheckPendingRequests();
            FetchReceivedMessages();
        }
        
        if($originalGameState != $_SESSION["gameState"] || $_POST["requestingBoard"] == 'true')
        {   
            GetBoard();
            $_SESSION["rank"] = QuerySingleRow("SELECT Rank.Name FROM User, Rank WHERE Rank.RankID = User.Rank AND UserID = {$_SESSION['userID']}")["Name"];
        }
        
    }
    
    
    
    if($_SESSION["siteState"] == SiteState::INGAME)
    {
    
        FetchReceivedMessages("in-game");
        switch($_SESSION["gameState"])
        {
            case GameState::WAITING_TO_START:
                CheckGameStart();
            case GameState::SETUP:
                CheckOponentsUpdate();
                GetBoard();
                $_SESSION["setupTime"] = QuerySingleRow("SELECT TIMEDIFF('00:02:00',TIMEDIFF(NOW(), TimeUpdated)) as time FROM MatchHistory WHERE MatchID = {$_SESSION['matchID']}")["time"];
                
                CheckGameAutoStarting($_SESSION["setupTime"]);
            
                break;

            case GameState::WAITING:
            case GameState::TURN:
                CheckOponentsUpdate();
                break;   
            
            case GameState::GAME_OVER:
                GetBoard();
                break;  
            
        }
        
        if($_SESSION["gameState"] == GameState::TURN)
        {
            $data["self"]["time"] = GetTimeRemaining($_SESSION["matchID"], $_SESSION["userID"], $_SESSION["opponentID"] );

            $_SESSION["opponent"]["time"] = QuerySingleRow("SELECT TimeRemaining FROM MatchHistory WHERE MatchID = {$_SESSION['matchID']} && TurnUserID = {$_SESSION['opponentID']} ORDER BY MatchHistoryID DESC LIMIT 1")["TimeRemaining"];

        }
        else if($_SESSION["gameState"] == GameState::WAITING)
        {
            $data["self"]["time"] = QuerySingleRow("SELECT TimeRemaining FROM MatchHistory WHERE MatchID = {$_SESSION['matchID']} && TurnUserID = {$_SESSION['userID']} ORDER BY MatchHistoryID DESC LIMIT 1")["TimeRemaining"];
            $_SESSION["opponent"]["time"] = GetTimeRemaining($_SESSION["matchID"], $_SESSION["opponentID"], $_SESSION["userID"] );
            
        }
        
        
        CheckLooseDueToTime($data["self"]["time"],$_SESSION["opponent"]["time"]);
        
        $data["gameState"] = $_SESSION["gameState"];

    }
    
    
    foreach($toBeIncluded as $item)
    {

        if(isset($_SESSION[$item]))
            $data[$item] = $_SESSION[$item];

    }
    
    if($_SESSION["won"] == -3)
        GetBoard();
    
    
//    $data["opponentID"] = $_SESSION["opponentID"];
//    $data["setupTime"] = $_SESSION["setupTime"];
//    $data["won"] = $_SESSION["won"];
    $data["username"] = $_SESSION["username"];
    $data["siteState"] = $_SESSION["siteState"];
//    $data["onlinePlayerCounter"] = $_SESSION["onlinePlayerCounter"];
    
//    print_r($_SESSION);
    echo json_encode($data);
    
}

function CheckCommencingChallenge()
{
    session_start();
    
    $matchID = QuerySingleRow("SELECT CurrentMatchID FROM `User` WHERE UserID = {$_SESSION['userID']}")["CurrentMatchID"];
    
    if($matchID != 0)
    {
        CancelAllChallenges();
        $ret = QuerySingleRow("SELECT FirstPlayerID, SecondPlayerID FROM `Match` WHERE MatchID = $matchID");
        $firstPlayer = $ret["FirstPlayerID"];
        $secondPlayer = $ret["SecondPlayerID"];
        $opponentID = 0;
        
        if($firstPlayer == $_SESSION["userID"])
        {   
            $opponentID = $secondPlayer;
            $_SESSION["side"] = PlayerSide::FIRST_PLAYER;
        }
        else
        {
            $opponentID = $firstPlayer;
            $_SESSION["side"] = PlayerSide::SECOND_PLAYER;
        }

//        $_SESSION["matchID"] = $matchID;
//        $_SESSION["siteState"] = SiteState::INGAME;
//        $_SESSION["gameState"] = GameState::SETUP;
        
        InitializeMatch($opponentID, $matchID);
    }
}

function AcceptChallenge()
{
    session_start();
    global $link;
    CancelExpiredChallenges();
    
    $initiatorID = "SELECT UserID FROM User WHERE Username = '{$_POST['username']}'";
    $query = "SELECT * FROM Challenge WHERE InitiatorID = ($initiatorID) && RecipientID = {$_SESSION['userID']} && Action = 0";
    
    $ret = QuerySingleRow($query);
    
    if(rand(0,1) == 0)
    {
        $firstPlayer = $ret["InitiatorID"];
        $secondPlayer = $ret["RecipientID"];
        $_SESSION["side"] = PlayerSide::SECOND_PLAYER;
    }
    else
    {
        $secondPlayer = $ret["InitiatorID"];
        $firstPlayer = $ret["RecipientID"];
        $_SESSION["side"] = PlayerSide::FIRST_PLAYER;
    }
    
    $query = "INSERT INTO `Match`(`FirstPlayerID`,`SecondPlayerID`,`Turn`) VALUES($firstPlayer,$secondPlayer,-1)";
    ExecuteQuery($query);
    
    $matchID = mysqli_insert_id($link);
    
//    $matchID = QuerySingleRow("SELECT MatchID FROM `Match` WHERE FirstPlayerID = $firstPlayer && SecondPlayerID = $secondPlayer && Turn = -1")["MatchID"];
    
    ExecuteQuery("UPDATE User SET CurrentMatchID = $matchID WHERE UserID = $firstPlayer OR UserID = $secondPlayer");
    
    ExecuteQuery("UPDATE Challenge SET Action = 1 WHERE ChallengeID = {$ret['ChallengeID']}");
    
    ExecuteQuery("INSERT INTO MatchHistory(`MatchID`,`TimeUpdated`) VALUES($matchID, NOW())");
    
    CancelAllChallenges();
    
    
//    $_SESSION["opponentID"] = $ret["InitiatorID"];
//    $_SESSION["matchID"] = $matchID;
//    $_SESSION["siteState"] = SiteState::INGAME;
//    $_SESSION["gameState"] = GameState::SETUP;
    InitializeMatch($ret["InitiatorID"], $matchID);
}

function DeclineChallenge()
{
    session_start();
    
    $username = "(SELECT UserID FROM User WHERE Username = '{$_POST['username']}')";
    
    ExecuteQuery("UPDATE Challenge SET Action = -1 WHERE RecipientID = {$_SESSION['userID']} && InitiatorID = $username && Action = 0");
}


function InitializeMatch($opponentID, $matchID)
{
    session_start();
    $_SESSION["opponentID"] = $opponentID;
    $_SESSION["matchID"] = $matchID;
    $_SESSION["siteState"] = SiteState::INGAME;
    $_SESSION["gameState"] = GameState::SETUP;
    
    $_SESSION["opponent"] = QuerySingleRow("SELECT User.Username, Rank.Name as Rank FROM User, Rank WHERE User.Rank = Rank.RankID AND UserID = $opponentID");
}


function CheckPendingRequests()
{
    session_start();
    global $data;
    
    CancelExpiredChallenges();
    $query = "SELECT Username FROM Challenge, User WHERE RecipientID = {$_SESSION['userID']} && Action = 0 && InitiatorID = UserID";
//    $query = "SELECT ";
//    echo $query;
    
//    print_r($ret);
    $data["challenges"] = SQLArrayToIndexedArray(ExecuteQuery($query));
}

function CancelExpiredChallenges()
{
    $subQuery = "SELECT UserID FROM User WHERE LastUpdated < DATE_SUB(NOW(),INTERVAL 10 SECOND)";
    $ret = ExecuteQuery("UPDATE Challenge SET Action = -2 WHERE Action = 0 && RecipientID = {$_SESSION['userID']} && InitiatorID IN ($subQuery)");
}

function CancelAllChallenges()
{
    ExecuteQuery("UPDATE Challenge SET Action = -1 WHERE RecipientID = {$_SESSION['userID']} && Action = 0");
    ExecuteQuery("UPDATE Challenge SET Action = -2 WHERE InitiatorID = {$_SESSION['userID']} && Action = 0");
}


function GetAllOnlinePlayers()
{
    global $data;
    session_start();
    
    if( ++$_SESSION["onlinePlayerCounter"] % 5 == 0)
        $_SESSION["onlinePlayerCounter"] = 0;
    
    if($_SESSION["onlinePlayerCounter"] != 0)
    {
        $data["onlinePlayers"] = "";
        return;
    }
    
    $query = "SELECT Username, Win, Lose, r.Name as Rank, CurrentMatchID, Point, Streak, Experience, r.ExperienceRequired FROM User, Rank as r";
    
    $ret = SQLArrayToArray(ExecuteQuery($query . " WHERE r.RankID = User.Rank && LastUpdated > DATE_SUB(NOW(),INTERVAL 5 SECOND) && Username != '{$_SESSION['username']}'"));
    
    $data["onlinePlayers"] = $ret;
    
    $ret = SQLArrayToArray(ExecuteQuery($query . " WHERE Username = '{$_SESSION['username']}'"));
    $data["ownDetails"] = $ret[0];

    
}

function ChallengePlayer()
{
    session_start();
    
    ExecuteQuery("UPDATE Challenge SET Action = -2 WHERE InitiatorID = {$_SESSION['userID']}");
    
    
    $_POST['toUsername'] = mysql_real_escape_string($_POST['toUsername']);
    
    $subQuery = "SELECT UserID FROM User WHERE Username = '{$_POST['toUsername']}'";
    $query = "INSERT INTO Challenge(`InitiatorID`, `RecipientID`) VALUES({$_SESSION['userID']},($subQuery))";
    ExecuteQuery($query);
    
    
    echo "Request sent";
    
}


function GoToLobby()
{
    session_start();
    $_SESSION["siteState"] = SiteState::LOBBY;
}

?>