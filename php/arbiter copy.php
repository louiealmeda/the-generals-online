<?php

require_once("dbmanager.php");


abstract class PlayerSide
{
    const FIRST_PLAYER = 0;
    const SECOND_PLAYER = 1;
}

abstract class GameState
{
    const SETUP = 0;
    const WAITING_TO_START = 1;
    const TURN = 2;
    const WAITING = 3;
    const GAME_OVER = 4;
    const SENDING_MOVE = 5;

}

abstract class Error
{
    const INVALID_BOARD = 0;
    const INVALID_SETUP = 1;
    const INVALID_MOVE = 2;
}

$firstPlayerPieces = "0abcdefghijklmno";
$secondPlayerPieces = "0ABCDEFGHIJKLMNO";

/////////////////////////////////////////////
//                                         //
//                Test box                 //
//                                         //
/////////////////////////////////////////////
//session_start();
//$_SESSION["side"] = PlayerSide::SECOND_PLAYER;

function SetTmpID()
{
    session_start();
    $_SESSION["UserID"] = $_POST["ID"];
    
    $id = $_POST["ID"];
    
    $matchID = QuerySingleRow("Select CurrentMatchID FROM User WHERE UserID = ".$_POST['ID'])["CurrentMatchID"];
    $query = "SELECT FirstPlayerID, SecondPlayerID FROM `Match` WHERE MatchID = $matchID";
    $players = array_values(QuerySingleRow($query));
    
    if($players[0] == $id)
        $_SESSION["side"] = PlayerSide::FIRST_PLAYER;
    else
        $_SESSION["side"] = PlayerSide::SECOND_PLAYER;
    
    $_SESSION["MatchID"] = $matchID;
    
    echo "You are the {$_SESSION["side"]} player";
}



//////////////////////////
if(isset($_POST['method']))
    call_user_func($_POST['method']);

if(isset($_SESSION["gameState"]))
    $_SESSION["gameState"] = GameState::SETUP;
/////////////////////////////////////////////
//                                         //
//       Front-End-Called functions        //
//                                         //
/////////////////////////////////////////////

function SubmitSetupPosition()
{
    
    session_start();
    if($_SESSION["gameState"] != GameState::SETUP)
        return;
    
    
    $pieces = [6,1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];
    $piecesRef = $pieces;
    
    global $firstPlayerPieces;
    global $secondPlayerPieces;
    
    
    if($_SESSION["side"] == PlayerSide::FIRST_PLAYER)
        $piecesLegend = $firstPlayerPieces;
    else
        $piecesLegend = $secondPlayerPieces;
        
    
    $data = [];
    $data["error"] = -1;
    $data["gameState"] = -1;
    

    $startIndex = 5;
    
    
    if(!CheckBoardValidity($_POST["board"]))
    {
        $data["error"] = Error::INVALID_BOARD . "";
        die(json_encode($data));
    }
    
//    echo json_encode($_POST["board"]);
    if(GetPlayerSide() == PlayerSide::SECOND_PLAYER) 
    {
        $startIndex = 0;
        $_POST["board"] = ConvertPiecesToSecondPlayer($_POST["board"]);
//        $_POST["board"] = RotateBoard($_POST["board"]);
    }
    
    
    $blocks = $_POST["board"];
    $height = count($blocks);
    $width = strlen($blocks[0]);
    
//    echo json_encode($_POST["board"]);
    
    
    for($y = 5; $y < 8; $y++)
    {
        for($x = 0; $x < $width; $x++)
        {
            $pieces[strpos($piecesLegend,$blocks[$y][$x])]--;
        }
    }
    
//    
//    echo $piecesLegend;
//    echo json_encode($pieces);
    
    
    foreach($pieces as $piece)
    {
        if($piece != 0)
        {
            $data["error"] = Error::INVALID_SETUP . "";
            $data["pieces"] = array_slice($piecesRef,1);
            die(json_encode($data));
        }
    }
    
//    echo "Here";
    
    
    
    if(GetPlayerSide() == PlayerSide::FIRST_PLAYER) 
    {
        $blocks["board"] = RotateBoard($blocks);
    }
    print_r($_POST["board"]);
    
    $query = "SELECT Board FROM MatchHistory WHERE MatchID = {$_SESSION["MatchID"]}";
    $board = QuerySingleRow($query)["Board"];
    
    $board = explode("/", $board);


    foreach($board as &$line)
        $line = str_split($line);
    
    
    
    
    echo json_encode($blocks);
//    echo $_SESSION["side"] . "====";
    
    
//    
    for($y = $startIndex; $y < $startIndex + 3; $y++)
    {
        for($x = 0; $x < $width; $x++)
        {
            $board[$y][$x] = $blocks[$y][$x];
        }
    }
    
//    echo json_encode($board);
    echo json_encode($board);
    
    foreach($board as &$line)
        $line = implode("",$line);
    
    $board = implode("/",$board);
//    echo $board;
    
    ExecuteQuery("UPDATE MatchHistory SET Board = '$board' WHERE MatchID = {$_SESSION["MatchID"]}");
    
    
    $data["gameState"] = GameState::WAITING_TO_START . "";
    
    echo(json_encode($data));
}






/////////////////////////////////////////////
//                                         //
//            Utility functions            //
//                                         //
/////////////////////////////////////////////

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
        
        for($x = 0; $x < strlen($board[0]); $x++)
        {
            $board[$y] = strtoupper($board[$y]);
        }
    }
    
    return $board;
}

function DigestBoard($board)
{
    $board = explode("/",$board);
    foreach($board as &$line)
        $line = str_split($line);
}

function RotateBoard($board)
{
    $blocks = $board;
    $newBlocks = [];
    
    foreach($board as $line)
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
    
    $board = explode("/",$board);
    
    
    if(count($board) != 8)
        return false;
    
    foreach($board as $line)
    {
        $line = str_split($line);
        
//        echo count($line) .",";
        
        if(count($line) != 9)
            return false;
    }
    
//    echo "=====";
    $_POST["board"] = $board;
    
    return true;
}

?>