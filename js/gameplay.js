var GameStates = {
    SETUP: 0,
    WAITING_TO_START: 1,
    TURN: 2,
    WAITING:3,
    GAME_OVER: 4,
    SENDING_MOVE:5,
    REVEAL_FLAG: 6
};

var Errors =
{
    INVALID_BOARD : 0,
    INVALID_SETUP : 1,
    INVALID_MOVE : 2
}

var currentGameState = -1;

var rankTitles = ["Flag","Private","Sergeant","2nd Lieutenant","1st Lieutenant","Captain","Major","Lt. Colonel","Colonel","Brigadier General","Major General","Lieutenant General","Four-star General","Five-star General","Spy"];

var piecesLegend = "abcdefghijklmno";

var boardContent = 
"000000000/\
000000000/\
000000000/\
000000000/\
000000000/\
000000000/\
000000000/\
000000000";

var isSetupFeeding = false;

var board = {
    width: 9,
    height: 8,
    content: boardContent
};

var piecesLegend = "abcdefghijklmno";


$(document).ready(function(){
    
    
    
    GenerateBoard();
    
    $(document).on("click",".piece-box li",function(e){
//        $(this).addClass("active");
        
        switch(currentGameState)
        {
            case GameStates.SETUP:
                PlaceAndSwitch(this);
                break;
        }
    });
    
    $(document).on("click",".board td",function(e){

        switch(currentGameState)
        {
            case GameStates.SETUP:
                PlaceAndSwitch(this);
                break;

            case GameStates.TURN:
                if($(this).hasClass("owned"))
                    GetValidMoves(ConvertToTile(this));
                
//                alert();
                break;
        }
    });
    
    
    $(document).on("click",".board td.active",function(e){
        MoveSelectedPieceTo(this);
    });
    
    PrepareForSetup();
    SetDroppables();
//    $(".game-area").tooltip({
//        selector: ".board .owned, .owned.has-remaining",
////        animation:false,
////        title:"",
//        container: 'body'
//    });
    
    
});


function PrepareForSetup()
{
    var pieces = [1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];

    for(var i = 0; i < 15; i++)
    {
        $(".piece-box").append("<li class = 'owned' title = '"+rankTitles[piecesLegend.indexOf(piecesLegend[i])]+"' data-piece='"+piecesLegend[i]+"' data-count = '"+pieces[i]+"'>"+piecesLegend[i]+"("+pieces[i]+")"+"</li>");
    }   
}

function ResetPieceBox()
{
    var pieces = [1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];

    $(".piece-box li").each(function(i,e){
        $(e).attr("data-count", pieces[i]);
    });
    
    RefreshPieceBox();
}

function SetDroppables()
{

    $(".game-area .piece-box-container").draggable({
        containment: "body"
    });
    
    $(".board td, .piece-box>li").draggable({
        revert:"invalid",
        helper:"clone",
        containment: "body",
        start: function(e,ui){
            $(ui.helper).addClass("dragged");
            
            if(currentGameState == GameStates.TURN)
            {
                GetValidMoves(ConvertToTile(this));
                
//                alert($(this).attr("data-x"));
            }
            
        }
    });

    $(".board td").droppable({
        accept:".owned",
        activeClass: "droppable-active",
        hoverClass: "droppable-hover",
        drop: function(e,ui)
        {
//            $(this).html(ui.draggable.html());
            
//            $('.owned').tooltip('hide');
            ui.helper.css("box-shadow", "inset 0px 0px 4px transparent");
        
            if(currentGameState == GameStates.SETUP)
            {
                if(ui.draggable.parents(".board").length)
                {
                    if($(this).hasClass("owned"))
                    {
                        SwitchAttribs(ui.draggable, this, ["data-piece","data-original-title"],true);
                    }
                    else
                    {
                        TransferAttribs(ui.draggable,this, ["data-piece", "data-original-title"], ["0",""], true);
                        ui.draggable.removeClass("owned");
                    }
                    $(this).addClass("owned");
                    $(".droppable-active").removeClass("droppable-active");
                    ui.draggable.attr("data-count", parseInt(ui.draggable.attr("data-count")) -1);
                }
                else if(!$(this).hasClass("owned"))
                {
                    CopyAttribs(ui.draggable,this, ["data-piece", "data-original-title"], true);
                    ui.draggable.draggable("disable");

                    $(this).addClass("owned");
                    $(".droppable-active").removeClass("droppable-active");
                    ui.draggable.attr("data-count", parseInt(ui.draggable.attr("data-count")) -1);
                }
    //            ui.draggable.html(ui.draggable.attr("data-count"));

    //            ui.helper.css({"display":"none"});

                setTimeout(function(){
                    RefreshPieceBox();
                },0);
            }
         
            if(currentGameState == GameStates.TURN)
            {
                TransferAttribs(ui.draggable,this, ["data-piece", "data-original-title"], ["0",""], true);
                ui.draggable.removeClass("owned").removeClass("selected");
                $(this).addClass("owned");
                

                MovePiece(ui.draggable, this);
//                GetValidMoves(ui.draggable);
            }
            
            
        }
    });
    
    RefreshPieceBox();
}


function MovePiece(from, to)
{
    
//    setInterval(function(){
        $(".board td").removeClass("droppable").removeClass("droppable-active");
//        $(".board td").draggable("disable");
        ResetSelectedPieces();
//    },0);
    
    from = ConvertToTile(from);
    to = ConvertToTile(to);
    
    from = {x: from.x, y: from.y};
    to = {x: to.x, y: to.y};
    
    currentGameState = GameStates.SENDING_MOVE;
    $(".game-area").removeClass().addClass("game-area").addClass("state-sending");
    
    $.post("php/arbiter.php",{method: "SendMove", from: from, to:to}, GameEventHandler);
    requestingBoard = true;
    
}

function SubmitPosition(sender)
{
    if(sender != null && $(sender).hasClass("disabled"))
        return;
    
    UpdateBoardContent();
    $.post("php/arbiter.php", {"method":"SubmitSetupPosition", "board": board.content}, function(data){

//        alert(data);
        data = JSON.parse(data);
        
        if(data.error == Errors.INVALID_SETUP)
        {
            alert("Set up invalid");
            $(sender).removeClass("active");
            board.content = data.board;
            GenerateBoard();
        }
        
        if(data.gameState == GameStates.WAITING_TO_START)
        {   
            $(".game-area").removeClass().addClass("game-area").addClass("state-waiting-to-start");
            $(".board td.ui-droppable").droppable("disable");
        }
    });
}

function AutoSubmitPartialPosition()
{
    
    UpdateBoardContent();
    $.post("php/arbiter.php", {"method":"SubmitSetupPosition", "isPartial": true, "board": board.content}, function(data){

//        $("#test-panel").html(data);
//        alert(data);
//        board.content = data.board;
//        GenerateBoard();
        
    });
}


function UpdateBoardContent()
{
    var tmpBoard = [[],[],[],[],[],[],[],[]];
    
    $(".board td").each(function(i,e){
        var tile = ConvertToTile(e);
        
        tmpBoard[tile.y][tile.x] = tile.piece;
    });
    
    board.content = [];
    
    tmpBoard.forEach(function(e,i){
        board.content[i] = e.join("");
        if(i < tmpBoard.length -1)
            board.content[i] += "/";
    });
    
    board.content = board.content.join("");;
}

function EmptyPieceBox()
{
    
    $(".piece-box>li").each(function(i,e){
        $(e).attr("data-count",0);
    });
    RefreshPieceBox();
}

function RefreshPieceBox()
{
    $(".piece-box>li").removeClass("has-remaining");
    $(".piece-box>li").each(function(i,e){
       if(parseInt($(e).attr("data-count")) > 0)
           $(e).addClass("has-remaining");
        
        $(e).html($(e).attr("data-piece") + "(" + $(e).attr("data-count") + ")")
    });
    
    $(".board td, .piece-box>li").draggable("disable");
    $(".has-remaining, .board .owned").draggable("enable");
    
    $(".board td").droppable("disable");
    
//    $(".board tr:nth-last-child(-n+3) td:not(.owned)").droppable("enable");
    $(".board tr:nth-last-child(-n+3) td").droppable("enable");
    
    if(isSetupFeeding)
    {
        $(".game-area .selected").removeClass("selected");
        $($(".piece-box li.has-remaining")[0]).addClass("selected");
        
        
    }
    
    if($(".game-area .piece-box>li.has-remaining").length == 0)
    {

       $(".game-area .controls .ready").removeClass("disabled"); 
    }
    else
       $(".game-area .controls .ready").addClass("disabled"); 
        
}

function GenerateBoard()
{
    var isBoardCreated = $(".game-area .board").hasClass("isCreated");
    
    //Resize Board
    
    tmpBoard = board.content;
    board.content = tmpBoard.split("/");
    var tmpBoardContent = "";
    var exclude = "v<>^0*#+";
    
    for(var y = 0; y < board.height; y++ )
    {
        var row = "<tr>";
        for(var x = 0; x < board.width; x++)
        {
//            board.content[y][x] = (board.content[y][x] + "").toLowerCase();
            
            var currentPiece = board.content[y][x].toLowerCase();
            
            var tooltip = rankTitles[piecesLegend.indexOf(currentPiece)];
            var tmp = board.content[y][x];
            
            
            
            var owned = "owned";
            
            var index = exclude.indexOf(tmp);
            
            if( index != -1)
            {
                if(index > 3 )
                    tmp = "";       
                owned = "";
                
                if(exclude[index] == "+")
                {
                    alert("Flag Shown");
                    tmp = "*";
                    owned = "enemy-flag";
                    currentPiece = "*";
                }
                
            }
            

            
            if(tooltip == undefined)
                tooltip = "";
            
            if(tmp == "v" || tmp == "^" || tmp == ">" || tmp == "<" || tmp == "#")
                tmp = "<div class='animated rotateIn'>"+tmp+"</div>";
            
            
            if(!isBoardCreated)
                row += "<td class = '"+owned+"' data-x = '"+x+"' data-y='"+y+"' data-piece = '"+currentPiece+"' data-color='0' title = '"+ tooltip+"'>"+tmp+"</td>";
            else{
                $tile = $(".board td[data-y='"+y+"'][data-x='"+x+"']");
            
                $tile.removeClass("owned");
                $tile.addClass(owned);
                $tile.html(tmp);
                $tile.attr("data-piece", currentPiece);
                $tile.attr("title", tooltip);
            }
            
        }

        row += "</tr>";
        tmpBoardContent += row;
    }
    
    if(!isBoardCreated)
    {   
        $(".board").html(tmpBoardContent);
        $(".board").addClass("isCreated");
        ResizeBoard();
    }
    
    
    $(".board td.ui-droppable").droppable("disable");
    
    if($(".board td.ui-draggable").length != 0)
        $(".board td.ui-draggable").draggable("disable");
    
    ResetSelectedPieces();
    
    switch(currentGameState)
    {
        case GameStates.SETUP:
            $(".board tr:nth-last-child(-n+3) td").addClass("droppable");
            break;

        case GameStates.WAITING:
            break;
            
        case GameStates.TURN:
            setTimeout(function(){
                
                $(".board td:not(.owned)").addClass("droppable");
                $(".board td.owned").draggable("enable");
            },10);
            
            break;
    }
    
    if(currentGameState == GameStates.SETUP)
        $(".game-area").addClass("setup");
    else
        $(".game-area").removeClass("setup");
}

function ResizeBoard()
{
    $boardWidth = $(".game-area .board").width();
    $pieceWidth = $boardWidth / 9;
    $pieceHeight = (6/7)*$pieceWidth;
    var style = ".game-area .board td, .game-area .piece-box>li{ \
    width: "+$pieceWidth+"px; height:"+$pieceHeight + "px; \
    background-size:"+($pieceWidth * 15)+"px "+$pieceHeight+"px, auto "+$pieceHeight+"px\
}\n";
    
    
    
    var styleLostPieces = ".game-area .column-handler>.player-stats .own .lost-pieces>li{\
    background-size: "+(30*15)+"px 30px, 100% 100%;\
}";
    
    var legend = "abcdefghijklmno";
    
    for(var i = 0; i < legend.length; i++)
    {
        style += ".owned[data-piece='"+legend[i]+"']{background-position: "+(-$pieceWidth*i)+"px 0px, 0px 0px;}\n";
//        style += ".owned[data-piece='"+legend[i]+"']{background-image: url(../images/pieces/0.png) "+(-$pieceWidth*i)+"px 0px, url(../images/tiles/0.png) 0px 0px;}\n";
        styleLostPieces += ".lost-pieces>li[data-piece='"+legend[i]+"']{background-position: -"+(30 * i)+"px 0px, 0px 0px;}" ;
    }
    
    $("style").html(style + "\n" + styleLostPieces);
    
    $(".game-area .piece-box").css({"width":($pieceWidth + 4) * 5 + "px"});
    $(".game-area .board").css({"margin-top":-$(".game-area .board").height()/2});
    $(".piece-box-container").css({"left": $(".container.gameplay").width()/2 - $(".piece-box-container").outerWidth() + "px"});
    
}

function GameStateChanged(data)
{
    
    
    switch(data.gameState)
    {
        case GameStates.GAME_OVER:
            var color = data.won == 0 ? "red" : "green"
            data.won = data.won == 0 ? "You lose!" : "You won!";
            Notification.Show(data.won, "You captured your opponent's flag. You gained 131 points! <br><br><div class='btn gray' onclick='Notification.Close();'>View replay</div>\n<div class='btn blue' onclick='BackToLobby(); Notification.Close()'>Back to Lobby</div>", color);
            break;
            
        case GameStates.WAITING_TO_START:
            board.content = data.board;
            GenerateBoard();
            break;
            
        case GameStates.TURN:
//            alert();
//            alert(data.board);
            break;
    }
}

function UpdateFeedBack(data)
{   
    
//    alert();
//    alert(JSON.stringify(ownDetails));
//    
    $(".game-area .player-stats .opponent .rank").html(data.opponent.Rank);
    $(".game-area .player-stats .opponent .name").html(data.opponent.Username);
    $(".game-area .player-stats .opponent .img").css({"background-image":"url(images/users/" + data.opponent.Username + ".png) , url(images/users/default.png)"});

    $(".game-area .player-stats .own .rank").html(ownDetails.Rank);
    $(".game-area .player-stats .own .name").html(ownDetails.Username);
    $(".game-area .player-stats .own .img").css({"background-image":"url(images/users/" + ownDetails.Username + ".png) , url(images/users/default.png)"});
    
    
    
    switch(data.gameState)
    {
        case GameStates.SETUP:
            AutoSubmitPartialPosition();
        case GameStates.WAITING_TO_START:
            
            if(data.gameState != GameStates.SETUP)
            {
//                alert(board.content);
                board.content = data.board;
                GenerateBoard();
            }
            
            UpdateTimeLine(2*60,data.setupTime, "own");
            UpdateTimeLine(2*60,data.setupTime, "opponent");
            
            if(data.opponentReady)
                $(".game-area .player-stats .opponent").addClass("ready");
            
            if(data.selfReady)
                $(".game-area .player-stats .own").addClass("ready");

            return;
            break;
            
        case GameStates.WAITING:
            $(".game-area").removeClass().addClass("game-area");
            $(".game-area").addClass("state-waiting");
            break;
        case GameStates.TURN:
            $(".game-area").removeClass().addClass("game-area");
            $(".game-area").addClass("state-turn");
            break;
            
        case GameStates.REVEAL_FLAG:
            alert("reveal flag");
            break;
            
        
    }
    
    
    
    if(data.gameState != GameStates.SETUP)
        $(".game-area .player-stats .ready").removeClass("ready");
    
    if( data.won != null &&  data.won == -3)
    {
        $(".game-area").addClass("state-show-flag");
    }
    
    
    var pieces = "";
    
    if(data.lostPieces != null)
    {
        
        for(var i = 0; i < data.lostPieces.own.length; i++)
        {
            pieces += "<li data-piece='"+data.lostPieces.own[i]+"'></li>\n";
        }
        
        $(".game-area .own .lost-pieces").html(pieces);
    }
    
    
    data.self.time = data.self.time == null ? "00:05:00" : data.self.time;
    data.opponent.time = data.opponent.time == null ? "00:05:00" : data.opponent.time;
    
    
    if(data.self.time != null)
    {
        UpdateTimeLine(5*60,data.self.time, "own");
        UpdateTimeLine(5*60,data.opponent.time, "opponent");
    }
    
    pieces = "";
    for(var i = 0; i < data.lostPieces.enemy; i++)
    {
        pieces += "<li></li>\n";
    }   
    
    $(".game-area .opponent .lost-pieces").html(pieces);
        
}

function UpdateTimeLine(maxTime, currentTimeO, selector)
{
    currentTime = currentTimeO.split(":")[1] + ":" + currentTimeO.split(":")[2];
    
    $(".game-area .player-stats ."+selector+" .profile .time span").html(currentTime);
    currentTime = parseInt(currentTime.split(":")[0]) * 60 + parseInt(currentTime.split(":")[1]);
    $(".game-area .player-stats ."+selector+" .profile .time div").css({"width": currentTime / maxTime * 100 + "%" });
}


function ConvertToTile(o)
{
    var tile = {};
    
    tile.x = parseInt($(o).attr("data-x"));
    tile.y = parseInt($(o).attr("data-y"));
    tile.piece = $(o).attr("data-piece");
    return tile;
}

function PlaceAndSwitch(tile)
{   
    
    if($(".game-area .board td.selected").length != 0)
        $(".game-area").addClass("has-selected");
    else
        $(".game-area").removeClass("has-selected");

    
    var CurrentTile = {
        isExisting: true,
        parent: $(tile).parents(".board").length != 0 ? "board" : "piece-box",
        tile: $(tile)
    };
                 
    var SelectedTile = {
        isExisting: $(".game-area .selected").length != 0,
        parent: $(".game-area .selected").parents(".board").length != 0 ? "board" : "piece-box",
        tile: $(".game-area .selected")
    };
    
    if( !SelectedTile.isExisting && CurrentTile.tile.hasClass("ui-draggable-disabled"))
        return;
    

    if(CurrentTile.parent == "piece-box" && SelectedTile.parent == "piece-box" ||
       SelectedTile.parent == "board" && CurrentTile.isExisting && CurrentTile.parent == "piece-box")
    {
        CurrentTile.tile.addClass("selected");
        SelectedTile.tile.removeClass("selected");
        
        
        
        if(CurrentTile.tile.hasClass("selected"))
            $(".board td:not(.ui-droppable-disabled)").addClass("droppable-active");
        else
            $(".board td:not(.ui-droppable-disabled)").removeClass("droppable-active");
            
        return; 
    }
    
    
    //if a piece is already selected
    if($(".game-area .selected").length > 0 && !$(tile).hasClass("selected") && !$(tile).hasClass("ui-droppable-disabled"))
    {       

        if( SelectedTile.isExisting && SelectedTile.parent == "board")
        {
            $selected = $(".game-area .selected");
            if( !$(tile).hasClass("owned")) // if clicked on an empty tile
            {
                $(tile).addClass("owned");
                TransferAttribs($selected,tile, ["data-piece","data-original-title"], ["0",""], true);

                $selected.draggable("disable");
                $(tile).draggable("enable");

                $selected.removeClass("owned");
            }
            else
            {
                //switch position
                SwitchAttribs(tile, $selected, ["data-piece","data-original-title"],true);
            }
            $(".board td.droppable-active").removeClass("droppable-active");
            $selected.removeClass("selected");
        }
        else
        {
            if(CurrentTile.parent == "board" && CurrentTile.tile.hasClass("owned"))
            {
                CurrentTile.tile.addClass("selected");
                SelectedTile.tile.removeClass("selected");   
            }
            else
            {
                CopyAttribs(SelectedTile.tile,CurrentTile.tile, ["data-piece","data-original-title"], true);
                SelectedTile.tile.draggable("disable");

                $(CurrentTile.tile).addClass("owned");
                $(".droppable-active").removeClass("droppable-active");
                SelectedTile.tile.attr("data-count", parseInt(SelectedTile.tile.attr("data-count")) -1);
                
                if(SelectedTile.tile.attr("data-count") == 0)
                    $(SelectedTile.tile).removeClass("selected");
                
            }
        }
        
        $(".game-area").removeClass("has-selected");
        RefreshPieceBox();
        
        return;
    }
    
    if($(tile).hasClass("owned") )
    {
        //if the piece clicked is the selected piece, cancel selection
        if($(tile).hasClass("selected"))
        {
            $(".board td.droppable-active").removeClass("droppable-active");
            $(tile).removeClass("selected");
        }
        else//if not, select
        {   
            $(".board td:not(.ui-droppable-disabled)").addClass("droppable-active");
            $(tile).addClass("selected");
        }
    }
    
    
    if($(".game-area .board td.selected").length != 0)
        $(".game-area").addClass("has-selected");
    else
        $(".game-area").removeClass("has-selected");
        
    
}

function MoveSelectedPieceTo(tile)
{
    $selected = $(".board td.selected").removeClass("selected");
    
    MovePiece($selected, tile);
    
//    $(tile).attr("data-owned", $selected.attr("data-owned"));
    $(tile).addClass("owned");
    $(tile).attr("data-piece", $selected.attr("data-piece"));
    $(tile).html($selected.html());
    
//    $selected.attr("data-owned","0").attr("data-piece","0").html("");
    $selected.removeClass("owned").attr("data-piece","0").html("");
    
    
    
    ResetSelectedPieces();
}

function TransferAttribs(from, to, attr, defaultValue, withHtml)
{
    withHtml = withHtml || false;

    attr.forEach(function(e,i){
        
        var tmp = e;
        if(e == "data-original-title")
            tmp = "title";
        
        $(to).attr(tmp,$(from).attr(e));
        $(from).attr(e,defaultValue[i]);
    });

    if(withHtml)
    {
        $(to).html($(from).html());
        $(from).html("&nbsp;");
    }
    
}

function CopyAttribs(from, to, attr, withHtml)
{
    
    withHtml = withHtml || false;
    
    attr.forEach(function(e,i){
        var tmp = e;
        if(e == "data-original-title")
            tmp = "title";
        
        $(to).attr(tmp,$(from).attr(e));
    });
    
    if(withHtml)
        $(to).html($(from).html());
}

function SwitchAttribs(e1,e2,attr,withHtml)
{
    withHtml = withHtml || false;
    attr.forEach(function(e,i){
//        
//        var tmpE = e;
//        if(e == "data-original-title")
//            tmp = "title";
        
        var tmp = $(e1).attr(e);
        $(e1).attr(e,$(e2).attr(e));
        $(e2).attr(e,tmp);
    });
    
    if(withHtml)
    {
        var tmp = $(e1).html();
        
        $(e1).html($(e2).html());
        $(e2).html(tmp);
    }
}

function ResetSelectedPieces()
{
    $(".board td").removeClass("active");
    $(".board td").removeClass("selected");
    
    if($(".board td.ui-droppable:not(.ui-droppable-disabled)").length != 0)
        $(".board td.ui-droppable:not(.ui-droppable-disabled)").droppable("disable");
}

function GetValidMoves(tile)
{
    if($(".board td[data-x='"+tile.x+"'][data-y='"+tile.y+"']").hasClass("selected"))
    {
        ResetSelectedPieces(); 
        return;
    }

    var validTiles = [
        {x:tile.x    , y: tile.y - 1},
        {x:tile.x + 1, y: tile.y    },
        {x:tile.x    , y: tile.y + 1},
        {x:tile.x - 1, y: tile.y    }
    ];
    
    
    ResetSelectedPieces();
    

    $(".board td.owned[data-x='"+tile.x+"'][data-y='"+tile.y+"']").addClass("selected");
    
    validTiles.forEach(function(e,i){
        
//        if($(".board td[data-x='"+e.x+"'][data-y='"+e.y+"']").attr("data-owned") != 1)
            $(".board td[data-x='"+e.x+"'][data-y='"+e.y+"']:not(.owned)").addClass("active").droppable("enable");
        
    });
    
}
function ResetSetup(sender)
{
    if(sender != null && $(".board td.owned").length == 0)
        return;
        
    board.content = "000000000/000000000/000000000/000000000/000000000/000000000/000000000/000000000";
    GenerateBoard();
    ResetPieceBox();
    $(".game-area").removeClass().addClass("game-area").addClass("setup");
}

function ToggleAutoFeed(){
    isSetupFeeding = !isSetupFeeding;
    
    if(isSetupFeeding)
    {
        RefreshPieceBox();
    }
    else
    {
        $(".piece-box .selected").removeClass("selected");
    }
}

function RandomizeSetup()
{
    ResetSetup();
    
    $(".game-area .piece-box li").attr("data-count",0);
    RefreshPieceBox();
    
    var pieces = [1,6,1,1,1,1,1,1,1,1,1,1,1,1,2];
    var count = 0;
    var lastLine =3;
    var length = $(".game-area .board tr:nth-last-child(-n+3) td").length;
    $(".game-area .board tr:nth-last-child(-n+3) td").each(function(i,e){
        
        if(count == 21)
            return;
        
        var next;
        do{
            next = Math.round(Math.random() * 100) % pieces.length;
        }while(pieces[next] == 0);
        

        if(i > 17 && lastLine + i < length)
        {
            if(Math.round(Math.random() * 100 % 4) != 0)
            {
                return;
            }
            
            lastLine--;
        }
        
        count++;
        pieces[next]--;

        
        $(e).addClass("owned");
        $(e).attr("data-piece", piecesLegend[next]);
        $(e).draggable("enable");
    });
    

}
