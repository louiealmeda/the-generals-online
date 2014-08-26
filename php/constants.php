<?php


abstract class SiteState {
    const LOGIN = 0;
    const MAIN_MENU = 1;
    const INGAME = 2;
    const LOBBY = 3;
    const BROWSING = 4;
}

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
    const REVEAL_FLAG = 6;
}

abstract class Error
{
    const INVALID_BOARD = 0;
    const INVALID_SETUP = 1;
    const INVALID_MOVE = 2;
}

abstract class EngagementOutcome
{
    const INITIATOR_WON = 0;
    const INITIATOR_LOSE = 1;
    const DRAW = 2;
}


$firstPlayerPieces = "0abcdefghijklmno";
$secondPlayerPieces = "0ABCDEFGHIJKLMNO";
$piecesCount = [6,1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];
$data;

$data["error"] = -1;
$data["gameState"] = -1;

?>