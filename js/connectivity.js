var PlayerActions = {
    CHALLENGE: 0,
    MESSAGE: 1,
    ADD_AS_COMRADE: 2,
    REPORT: 3
}

var ConnectivityStatus = {
    CONNECTED: 0,
    DISCONNECTED: 1,
    RECONNECTING: 2
}

var SiteStates = {
    LOGIN : 0,
    MAIN_MENU:1,
    INGAME : 2,
    LOBBY : 3,
    BROWSING : 4
}
var requestingBoard = true;
//Heart beat
var tmp = 0;
setInterval(function(){
    $.post("php/connectivity.php", {"method":"Update", requestingBoard: requestingBoard}, GameEventHandler);
    requestingBoard = false;
},1000);


function GameEventHandler(data)
{   
    
    if(data.indexOf("You have") != -1)
        alert(data);
    
    $("#test-panel").toggleClass("active").html(data);
    
//    if(data[0] == 'h')
//        alert(data);
    
    data = JSON.parse(data);

    ///on state change
    if(currentSiteState != data.siteState)
    {
        currentSiteState = data.siteState;
    
        switch(currentSiteState)
        {
            case SiteStates.LOGIN:
//                HideMenu(".menu:not(.login-select)");
                ShowMenu(".login-select");
                break;
                
            case SiteStates.MAIN_MENU:
                if(data.username != "")
                    GotoMainMenu("",data.username);
                break;
                
            case SiteStates.LOBBY:
                GoToLobby();
                break;
            
            case SiteStates.INGAME:
                GoToGameplay();
                break;
                
                
        }
    }
    
    switch(currentSiteState)
    {
        case SiteStates.LOGIN:
            break;

        case SiteStates.MAIN_MENU:
            break;

        case SiteStates.LOBBY:
            AppendMessage(data.chat);
            if(data.ownDetails != null)
                ownDetails = data.ownDetails;
            UpdateLobby(data);
            break;
    }
    
    if(currentSiteState == SiteStates.INGAME)
    {
        AppendMessage(data.chat,".game-area");
        if(data.error != -1)
        {
            switch(data.error)
            {
                case Errors.INVALID_BOARD:
                case Errors.INVALID_MOVE:
                    board.content = data.board;
                    GenerateBoard();
                    break;

                case Errors.INVALID_SETUP:
                
                    break;
            }
        }
        /// if Gamestate changed
        if(currentGameState != data.gameState && data.gameState != -1)
        {   
            if(currentGameState == GameStates.SETUP && data.gameState != GameStates.SETUP)
            {
                EmptyPieceBox();
//                $(".game-area .piece-box-container").css({"opacity":0, "visibility":"hidden"});
                $(".game-area").removeClass().addClass("game-area").addClass("state-waiting-to-start");
            }

            currentGameState = data.gameState;
            switch(data.gameState)
            {
                case GameStates.WAITING:
                case GameStates.TURN:
                    board.content = data.board;
                    GenerateBoard();
                    $(".game-area .player-stats .ready").removeClass("ready");
                    break;
                    
                case GameStates.SETUP:
                    ResetSetup();
                    break;
            }
            
            
            
        }
        
        ownDetails.Username = data.username;
        
        
        UpdateFeedBack(data);
        
    }
}