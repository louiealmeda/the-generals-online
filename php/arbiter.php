<?php

require_once("dbmanager.php");
require_once("constants.php");


/////////////////////////////////////////////
//                                         //
//                Test box                 //
//                                         //
/////////////////////////////////////////////


//////////////////////////
if(isset($_POST['method']))
    call_user_func($_POST['method']);

if(isset($_SESSION['method']))
{
    call_user_func($_SESSION['method']);
    unset($_SESSION['method']);
}

if(!isset($_SESSION["gameState"]))
    $_SESSION["gameState"] = GameState::SETUP;
/////////////////////////////////////////////
//                                         //
//       Front-End-Called functions        //
//                                         //
/////////////////////////////////////////////



////Never Used
function SetUpForNewMatch()
{
    session_start();
    $id = $_SESSION["userID"];

    $matchID = QuerySingleRow("SELECT CurrentMatchID FROM User WHERE UserID = ".$_SESSION['ID'])["CurrentMatchID"];
    
    $query = "SELECT FirstPlayerID, SecondPlayerID FROM `Match` WHERE MatchID = $matchID";
    $players = array_values(QuerySingleRow($query));

    $_SESSION["opponentID"] = json_encode($players);
    
    if($players[0] == $id)
    {   
        $_SESSION["opponentID"] = $players[1];
        $_SESSION["side"] = PlayerSide::FIRST_PLAYER;
    }
    else
    {
        $_SESSION["opponentID"] = $players[0];   
        $_SESSION["side"] = PlayerSide::SECOND_PLAYER;
    }

    $_SESSION["matchID"] = $matchID;
    $_SESSION["gameState"] = GameState::SETUP;

}

function Resign()
{
    session_start();
    ExecuteQuery("UPDATE `Match` SET WinnerID = {$_SESSION['opponentID']}, Outcome = -1 WHERE MatchID = {$_SESSION['matchID']}");
    $_SESSION["gameState"] = GameState::GAME_OVER;
    $_SESSION["won"] = -2;
//    $_SESSION[""];
}

function BackToLobby()
{
    session_start();
    print_r($_SESSION);
    
    $ret = ExecuteQuery("UPDATE User SET currentMatchID = 0 WHERE UserID = {$_SESSION['userID']}");
    
    $_SESSION["siteState"] = SiteState::LOBBY;
    $_SESSION["gameState"] = -1;
    
    unset($_SESSION["won"]);
    unset($_SESSION["matchID"]);
    unset($_SESSION["side"]);
    unset($_SESSION["opponentID"]);
    unset($_SESSION["opponent"]);
}

function GetBoard()
{
    session_start();
    
    if(!isset($_SESSION["matchID"]))
        return;
    
    global $firstPlayerPieces;
    global $secondPlayerPieces;
    global $data;
    
    $piecesToHide = $firstPlayerPieces;
    
    if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
        $piecesToHide = $secondPlayerPieces;
    
    $piecesToHide[0] = "";
    
    $ret = QuerySingleRow("SELECT Board, FirstPlayerLostPieces, SecondPlayerLostPieces FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]} ORDER BY MatchHistoryID DESC");
    
    $board = $ret["Board"];
//    echo $board;
    
    if($_SESSION["won"] == -3)
        $board = implode("+",explode($piecesToHide[1],$board));  
        
    if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
    {
        $board = RotateBoard(DigestBoard($board));
        $board = BoardToString($board);
        
        $board = implode("-",explode(">",$board));
        $board = implode(">",explode("<",$board));
        $board = implode("<",explode("-",$board));
        
        $board = implode("-",explode("^",$board));
        $board = implode("^",explode("v",$board));
        $board = implode("v",explode("-",$board));
        
        $data["lostPieces"]["own"] = strtolower($ret["FirstPlayerLostPieces"]);
        $data["lostPieces"]["enemy"] = strlen($ret["SecondPlayerLostPieces"]);
    }
    else
    {
        $data["lostPieces"]["own"] = strtolower($ret["SecondPlayerLostPieces"]);
        $data["lostPieces"]["enemy"] = strlen($ret["FirstPlayerLostPieces"]);
    }
    
    
   
    $data["board"] = HideOponents($board, $piecesToHide);
    
//    echo "You have";
}

function SendMove()
{
    session_start();
    
    if($_SESSION["gameState"] != GameState::TURN)
    {
        $data["error"] = ERROR::INVALID_MOVE;
        GetBoard();
        echo json_encode($data);
        return;
    }
    global $firstPlayerPieces;
    global $secondPlayerPieces;
    global $data;

    $ownPieces = $firstPlayerPieces;
    $goal = 7;
    if($_SESSION["side"] == PlayerSide::SECOND_PLAYER)
    {   
        $ownPieces = $secondPlayerPieces;
        $goal = 0;
    }
    
    
    $board = QuerySingleRow("SELECT Board FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]} ORDER BY MatchHistoryID DESC")["Board"];
    
    
    $board = implode("0", explode("v", $board));
    $board = implode("0", explode(">", $board));
    $board = implode("0", explode("^", $board));
    $board = implode("0", explode("<", $board));
    $board = implode("0", explode("#", $board));
    
    $board = DigestBoard($board);
    
    $fromTile = $_POST["from"];
    $toTile = $_POST["to"];
    
    $fromTile["x"] = intval($fromTile["x"]);
    $fromTile["y"] = intval($fromTile["y"]);
    
    $toTile["x"] = intval($toTile["x"]);
    $toTile["y"] = intval($toTile["y"]);


    if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
    {
        $toTile["y"] = 8 - $toTile["y"] -1;
        $toTile["x"] = 9 - $toTile["x"] -1;
        
        $fromTile["y"] = 8 - $fromTile["y"] -1;
        $fromTile["x"] = 9 - $fromTile["x"] -1;

        
    }
    
    
    $fromValue = $board[$fromTile["y"]][$fromTile["x"]];
    $toValue = $board[$toTile["y"]][$toTile["x"]];
    
    
    $isOwned = strpos($ownPieces, $fromValue) != FALSE && $fromValue != "0";
    
//    echo $ownPieces;
//    echo "|" . $fromValue;
//    echo "|" . $toValue;
//    
    $isValidToTile = strpos($ownPieces, $toValue) == FALSE || $toValue != "0";
    
//    echo $ownPieces;
//    echo "|" . $toValue;
    
    
    //is a valid tile to move
    if($isValidToTile && $isOwned && $fromValue != "0")
    {
        $validTiles = [];
        
        $validTiles[0]["x"] = $fromTile['x'];
        $validTiles[0]["y"] = $fromTile['y'] -1;
        $validTiles[1]["x"] = $fromTile['x'] +1;
        $validTiles[1]["y"] = $fromTile['y'];
        $validTiles[2]["x"] = $fromTile['x'];
        $validTiles[2]["y"] = $fromTile['y'] +1;
        $validTiles[3]["x"] = $fromTile['x'] - 1;
        $validTiles[3]["y"] = $fromTile['y'];
        
        $isValidMove = false;
        foreach($validTiles as $tile)
        {   
            if($tile["x"] == $toTile["x"] && $tile["y"] == $toTile["y"])
                $isValidMove = true;
        }
        
    }
    
//    echo $isValidToTile ? "isValidToTile|" : "";
//    echo $isOwned ? "isOwned|" : "";
//    echo $fromValue == "0" ? "fromValue = 0|" : "";
//    echo $isValidMove ? "isValidMove|" : "";
    
    if(!$isValidToTile || !$isOwned || $fromValue == "0" || !$isValidMove)
    {
        $data["gameState"] = GameState::TURN;
        $data["error"] = ERROR::INVALID_MOVE;
        GetBoard();
        echo json_encode($data);
        return;
    }
    //if move is valid
    
    $isEngaged = strpos($ownPieces, $toValue) === FALSE;
    
//    echo $ownPieces . "|" . $toValue;
    
    $pieceReference = $secondPlayerPieces;
    $defender = strtoupper($toValue);
    $offender = strtoupper($fromValue);
    
    $defender = strpos($pieceReference, $defender);
    $offender = strpos($pieceReference, $offender);
    
    $moveDirection = "v";
    
    if($fromTile["x"] > $toTile["x"])
        $moveDirection = "<";
    if($fromTile["x"] < $toTile["x"])
        $moveDirection = ">";
    if($fromTile["y"] > $toTile["y"])
        $moveDirection = "^";
    
    $res;
    $data["engagementOutcome"] = -1;
    
    $oLost = ""; //offender lost piece
    $dLost = ""; //defender lost piece
    
    if($isEngaged)
    {
        if($defender == $offender)//if similar pieces
        {
            if($offender == 1)//if flag to flag, initiator wins
                $res = EngagementOutcome::INITIATOR_WON;
            else
                $res = EngagementOutcome::DRAW;
        }
        else
        {
            
            if($offender > $defender)
                $res = EngagementOutcome::INITIATOR_WON;
            else
                $res = EngagementOutcome::INITIATOR_LOSE;
            
            //if spy to private
            if($offender == 2 && $defender == 15)
                $res = EngagementOutcome::INITIATOR_WON;
            else if($offender == 15 && $defender == 2)
                $res = EngagementOutcome::INITIATOR_LOSE;
            
            
        }
        
        switch($res)
        {
            case EngagementOutcome::INITIATOR_WON:
                $board[$toTile["y"]][$toTile["x"]] = $fromValue;
                $board[$fromTile["y"]][$fromTile["x"]] = $moveDirection;//"0";
            
                $dLost = $toValue;
                break;
            
            case EngagementOutcome::INITIATOR_LOSE:
                $board[$fromTile["y"]][$fromTile["x"]] = $moveDirection;//"0";
                $oLost = $fromValue;
                break;
            
            case EngagementOutcome::DRAW:
                $board[$fromTile["y"]][$fromTile["x"]] = $moveDirection;//"0";
                $board[$toTile["y"]][$toTile["x"]] = "#";//"0";
            
                $dLost = $toValue;
                $oLost = $fromValue;
                break;
        }
        
        //if offender's flag is dead
        if($offender == 1 && $res == EngagementOutcome::INITIATOR_LOSE) //loose
        {
            $data["wonDetected"] = 0;
            $_SESSION["gameState"] = GameState::GAME_OVER;
            $_SESSION["won"] = 0;
            ExecuteQuery("UPDATE `Match` SET Outcome = 1, WinnerID = {$_SESSION['opponentID']} WHERE MatchID = {$_SESSION['matchID']}");
        }
        
        //if defender's flag is dead
        if($defender == 1 && $res == EngagementOutcome::INITIATOR_WON) //win
        {
//            $data["wonDetected"] = 1;
            $_SESSION["gameState"] = GameState::GAME_OVER;
            $_SESSION["won"] = 1;
//            
            ExecuteQuery("UPDATE `Match` SET Outcome = 1, WinnerID = {$_SESSION['userID']} WHERE MatchID = {$_SESSION['matchID']}");
        }

        
        $data["engagementOutcome"] = $res;
    }
    else
    {   
        //Move reqularly
        $board[$fromTile["y"]][$fromTile["x"]] = $moveDirection;//"0";
        $board[$toTile["y"]][$toTile["x"]] = $fromValue;
        

//        $_SESSION["won"] = $toTile["y"] . "to" .$goal;
        
        if( isset($_SESSION["won"]) && $_SESSION["won"] == -3)
        {
            $_SESSION["won"] = 0;
            $_SESSION["gameState"] = GameState::GAME_OVER;
            ExecuteQuery("UPDATE `Match` SET Outcome = 2, WinnerID = {$_SESSION['opponentID']} WHERE MatchID = {$_SESSION['matchID']}");
            
        }
        else if($offender == 1 && $toTile["y"] == $goal)
        {
            $_SESSION["won"] = -2;   
//            $_SESSION["gameState"] = GameState::REVEAL_FLAG;
            ExecuteQuery("UPDATE `Match` SET Outcome = -2, WinnerID = {$_SESSION['userID']} WHERE MatchID = {$_SESSION['matchID']}");
        }
    }
    
//    echo json_encode($board);
    
    $board = BoardToString($board);
    ///Insert scoring here
//    echo "INSERT INTO MatchHistory(MatchID, Board) VALUES(".$_SESSION["matchID"].",$board)";
    
    $lostPieces = QuerySingleRow("SELECT FirstPlayerLostPieces as First, SecondPlayerLostPieces as Second FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]} ORDER BY MatchHistoryID DESC LIMIT 1");
    
    if($isEngaged)
    {


        if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
        {
            $lostPieces["First"] .= $oLost; 
            $lostPieces["Second"] .= $dLost; 
        }
        else
        {
            $lostPieces["First"] .= $dLost; 
            $lostPieces["Second"] .= $oLost; 
        }
    
        
    }
    
    $timeRemaining = QuerySingleRow("(SELECT TimeRemaining FROM MatchHistory WHERE MatchID = {$_SESSION['matchID']} && TurnUserID = {$_SESSION['userID']}) ORDER BY MatchHistoryID DESC LIMIT 1")["TimeRemaining"];
    
    
    $timeStarted = QuerySingleRow("SELECT TimeUpdated FROM MatchHistory WHERE MatchID = {$_SESSION['matchID']} && TurnUserID = {$_SESSION['opponentID']} ORDER BY MatchHistoryID DESC LIMIT 1")["TimeUpdated"];
    
    if($timeRemaining == null)
    {
        $timeRemaining = "00:05:00";
    }

    if($timeStarted == null)
        $timeStarted = QuerySingleRow("SELECT TimeUpdated FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]} LIMIT 1")["TimeUpdated"];

    
//    $new = $timeRemaining - (NOW() - $timeStarted);
//    echo $timeStarted . "===============";
//    echo "SELECT TimeUpdated FROM MatchHistory WHERE MatchHistoryID = {$_SESSION["matchID"]} LIMIT 1";
    $query = "INSERT INTO 
    MatchHistory(MatchID, Board, FirstPlayerLostPieces, SecondPlayerLostPieces, TimeUpdated, TurnUserID, TimeRemaining) 
    VALUES(".$_SESSION["matchID"].",'$board','{$lostPieces['First']}', '{$lostPieces['Second']}', NOW(), {$_SESSION['userID']}, 
    TIMEDIFF('$timeRemaining', TIMEDIFF(NOW(), '$timeStarted'))
    )";
    
    ExecuteQuery($query);
    
    $turn = $_SESSION["side"] == PlayerSide::FIRST_PLAYER ? PlayerSide::SECOND_PLAYER : PlayerSide::FIRST_PLAYER;
    
    ExecuteQuery("UPDATE `Match` SET Turn = $turn WHERE MatchID = {$_SESSION['matchID']}");
    
    if($_SESSION["gameState"] == GameState::TURN)
        $_SESSION["gameState"] = GameState::WAITING;
    
    
    GetBoard();
    
    echo json_encode($data);
}

function GetTimeRemaining($matchID, $selfID, $opponentID )
{
    $timeRemaining = QuerySingleRow("(SELECT TimeRemaining FROM MatchHistory WHERE MatchID = $matchID && TurnUserID = $selfID) ORDER BY MatchHistoryID DESC LIMIT 1")["TimeRemaining"];


    $timeStarted = QuerySingleRow("SELECT TimeUpdated FROM MatchHistory WHERE MatchID = $matchID && TurnUserID = $opponentID ORDER BY MatchHistoryID DESC LIMIT 1")["TimeUpdated"];

    if($timeRemaining == null)
    {
        $timeRemaining = "00:05:00";
    }

    if($timeStarted == null)
        $timeStarted = QuerySingleRow("SELECT TimeUpdated FROM MatchHistory WHERE MatchID = $matchID LIMIT 1")["TimeUpdated"];

    
    return QuerySingleRow("SELECT TIMEDIFF('$timeRemaining', TIMEDIFF(NOW(), '$timeStarted')) as time FROM MatchHistory")["time"];
}


function CheckLooseDueToTime($own, $opponent)
{
    session_start();
    
    if( count(explode("0", $own)) == 7 || count(explode("-", $own)) == 2)
    {
        $_SESSION["won"] = 0;
        $_SESSION["gameState"] = GameState::GAME_OVER;
        ExecuteQuery("UPDATE `Match` SET Outcome = 3, WinnerID = {$_SESSION['opponentID']} WHERE MatchID = {$_SESSION['matchID']}");
//        echo "Loosing: You have " . $own . "|" . $opponent;
    }
    
    if( count(explode("0", $opponent)) == 7 || count(explode("-", $opponent)) == 2)
    {
        $_SESSION["won"] = 1;
        $_SESSION["gameState"] = GameState::GAME_OVER;
        ExecuteQuery("UPDATE `Match` SET Outcome = 3, WinnerID = {$_SESSION['userID']} WHERE MatchID = {$_SESSION['matchID']}");
//        echo "Winning: You have " . $own . "|" . $opponent;
    }
    
}

//0: nothing yet, 1: Won by capture, 2: Won by Goal, -1: Won by resign; -2 Show Flag
function CheckOponentsUpdate()
{
    session_start();
    $ret = QuerySingleRow("SELECT Turn, Outcome, WinnerID FROM `Match` WHERE MatchID = {$_SESSION['matchID']}");
    
    if( $ret["Turn"] == $_SESSION["side"] && $_SESSION["gameState"] == GameState::WAITING)
    {
        $_SESSION["gameState"] = GameState::TURN;
        GetBoard();
    }


    if($ret["Outcome"] != 0)
    {
        switch($ret["Outcome"])
        {
            case 1:
            case 2: 
            case -1:
            case 3:
                if($ret["WinnerID"] == $_SESSION["userID"])
                {
                    $_SESSION["won"] = 1;
                }
                else
                {   
                    $_SESSION["won"] = 0;
                }

            $_SESSION["gameState"] = GameState::GAME_OVER;
            break;

            case -2:
                $_SESSION["won"] = -3;
            break;
        }

    }
}

function CheckGameStart()
{
    session_start();
    
    
    global $data;
    
    $ret = QuerySingleRow("SELECT FirstPlayerPoint as a, SecondPlayerPoint as b FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]}");
    
    if($ret["a"] == 0 && $ret["b"] == 0)
    {
        if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
            $_SESSION["gameState"] = GameState::TURN;
        else
            $_SESSION["gameState"] = GameState::WAITING;
        
        unset($_SESSION["opponentReady"]);
        unset($_SESSION["selfReady"]);
        unset($_SESSION["setupTime"]);
        ExecuteQuery("UPDATE MatchHistory SET TimeUpdated = NOW()");
    }
    else
    {
        if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
        {
            if($ret["b"] == 0)
                $_SESSION["opponentReady"] = 1;
        }
        else
        {
            if($ret["a"] == 0)
                $_SESSION["opponentReady"] = 1;
        }
    }
    
    
    
}

function SubmitSetupPosition($isPartial = false)
{
    session_start();
    global $data;
    if($_SESSION["gameState"] != GameState::SETUP)
        return;
    
    $isPartial = isset($_POST['isPartial']);
    
    
    $_POST["board"] = DigestBoard($_POST["board"]);
    
    
    $pieces = [6,1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];
    $piecesRef = $pieces;
    
    global $firstPlayerPieces;
    global $secondPlayerPieces;
    
    if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
        $piecesLegend = $firstPlayerPieces;
    
    else
        $piecesLegend = $secondPlayerPieces;
    
    
    
//    $data = [];
//    $data["error"] = -1;
//    $data["gameState"] = -1;
    

    $startIndex = 0;
    
    if(!CheckBoardValidity($_POST["board"]))
    {
        $data["error"] = Error::INVALID_BOARD . "";
        die(json_encode($data));
    }

    $blocks = $_POST["board"];
    
    
    if(GetPlayerSide() == PlayerSide::SECOND_PLAYER) 
    {
        $startIndex = 5;
        $blocks = ConvertPiecesToSecondPlayer($blocks);
//        $_POST["board"] = RotateBoard($_POST["board"]);
    }
    
    
    $height = count($blocks);
    $width = count($blocks[0]);
    
    
    //count every pieces
    for($y = 5; $y < 8; $y++)
    {
        for($x = 0; $x < $width; $x++)
        {
            $pieces[strpos($piecesLegend,$blocks[$y][$x])]--;
        }
    }
    
    //check if all pieces are placed with exact number
    $i = 0;
    foreach($pieces as $piece)
    {
        if( (!$isPartial && $piece != 0) || ($isPartial && ($piece < 0 && $i != 0) ) )
        {
            $data["error"] = Error::INVALID_SETUP . "";
            $data["pieces"] = array_slice($piecesRef,1);
            $data["test"] = $pieces;
            die(json_encode($data));
        }
        $i++;
    }
    
    if(GetPlayerSide() == PlayerSide::FIRST_PLAYER) 
    {
        $blocks = RotateBoard($blocks);
    }
//    echo json_encode($blocks);
//    print_r($_POST["board"]);
    $query = "SELECT Board FROM MatchHistory WHERE MatchID = {$_SESSION["matchID"]}";
    $board = QuerySingleRow($query)["Board"];
    
    $board = explode("/", $board);

    foreach($board as &$line)
        $line = str_split($line);
    
//    echo json_encode($blocks);
//    echo $_SESSION["side"] . "====";
    
//        echo json_encode($blocks);
    //    echo json_encode($board);
    
//    echo "".($startIndex +1) . " to " . ($startIndex + 3);
    
    for($y = $startIndex; $y < $startIndex + 3; $y++)
    {
        for($x = 0; $x < $width; $x++)
        {
            $board[$y][$x] = $blocks[$y][$x];
        }
    }
    
    $board = BoardToString($board);
    
    $field = "FirstPlayerPoint";
    
    if($_SESSION["side"] == PlayerSide::SECOND_PLAYER)
        $field = "SecondPlayerPoint";
    
    $score = "0";
    
    if($isPartial)
        $score = "-1";
    
    ExecuteQuery("UPDATE MatchHistory SET Board = '$board', $field = $score WHERE MatchID = {$_SESSION["matchID"]}");
    
//    echo "Partial: " . $score;
    
    if(!$isPartial)
    {
        $_SESSION["gameState"] = GameState::WAITING_TO_START;
        $data["gameState"] = GameState::WAITING_TO_START . "";
        $data["selfReady"] = 1;
    }
    
    
    
    
    GetBoard();
    
    echo(json_encode($data));
}



/////////////////////////////////////////////
//                                         //
//            Utility functions            //
//                                         //
/////////////////////////////////////////////

function BoardToString($board)
{
    foreach($board as &$line)
        $line = implode("",$line);

    $board = implode("/",$board);
    
    return $board;
}

function HideOponents($board, $pieces)
{
//    foreach($pieces as $p)
//    {
//        $board = implode("*",explode($p,$board));
//    }
    for($i = 0; $i < strlen($board); $i++)
    {
        if( strpos($pieces, $board[$i]) > -1 )
            $board[$i] = "*";
    }
    
    
    return $board;
}

function GetPlayerSide()
{
    session_start();
    return $_SESSION["side"];
}

function ConvertPiecesToSecondPlayer($board)
{
    
//    $blocks = [];
    for($y = 0; $y < count($board); $y++)
    {
        
        for($x = 0; $x < count($board[0]); $x++)
        {
            $board[$y][$x] = strtoupper($board[$y][$x]);
        }
    }
    
    return $board;
}

function DigestBoard($board)
{
    $board = explode("/",$board);
    foreach($board as &$line)
        $line = str_split($line);
    
    return $board;
}

function RotateBoard($blocks)
{
//    $blocks = $board;
    $newBlocks = [];
    
    foreach($blocks as $line)
    {
//        $blocks[count($blocks)] = str_split($line);
        $newBlocks[count($newBlocks)] = [0,0,0,0,0,0,0,0,0];
    }
    
//    echo count($blocks) . ", " . count($blocks[0]) ."\n";
    
    $height = count($blocks);
    $width = count($blocks[0]);
    
    for($y = 0; $y < $height; $y++)
    {
        for($x = 0; $x < $width; $x++)
        {
            $newBlocks[$height - $y -1][$width - $x -1] = $blocks[$y][$x];
        }
    }
    
    return $newBlocks;
    
}

function CheckBoardValidity($board)
{
    
//    $board = explode("/",$board);
    
    
    if(count($board) != 8)
        return false;
    
    foreach($board as $line)
    {
//        $line = str_split($line);
        
//        echo count($line) .",";
        
        if(count($line) != 9)
            return false;
    }
    
//    echo "=====";
    $_POST["board"] = $board;
    
    return true;
}

?>