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
            {   
                ownDetails = data.ownDetails;
//                {"Username":"Guest_0002E","Win":"0","Lose":"0","Rank":"Private","CurrentMatchID":"0","Point":"0","Streak":"0","Experience":"0","ExperienceRequired":"300"}
//                alert(JSON.stringify(ownDetails));
                $(".user-profile .profile .summary .name").html(ownDetails.Username);
                $(".user-profile .profile .summary .img").css({"background-image": "url(images/users/"+ownDetails.Username+".png), url(images/users/default.png)"});
                $(".user-profile .profile .summary .rank").html(ownDetails.Rank);
                $(".user-profile .profile .summary .details").html("Win: " + ownDetails.Win + " Lose: " + ownDetails.Lose + " Streak: " + ownDetails.Streak);
                $(".user-profile .profile .summary .progress").css({"width": ownDetails.Experience / ownDetails.ExperienceRequired * 100 + "%"});
//                .user-profile .profile .summary .rank
//                .user-profile .profile .summary .progress
//                .user-profile .profile .summary .details
//                .user-profile .profile .summary .img
            }
            
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
//                    alert();
//                    alert(data.board);
                    board.content = data.board;
                    GenerateBoard();
                    $(".game-area .player-stats .ready").removeClass("ready");
                    break;
                    
                case GameStates.SETUP:
                    ResetSetup();
                    break;
            }
            
            GameStateChanged(data);
            
        }
        
        ownDetails.Username = data.username;
        ownDetails.Rank = data.rank;
        
        
        UpdateFeedBack(data);
        
    }
}