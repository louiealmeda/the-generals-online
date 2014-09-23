var Notification = {
    Show: ShowNotification,
    Html: "",
    Object: null,
    Close: CloseNotification,
    IsOpen: false
}


var currentSiteState = -1;
var playerPopover = {
    object: null,
    moveToTarget: MovePlayerPopoverToTarget,
    target: null,
    hovered: false
};

var playerDetails = {};
var ownDetails = {};

var howToPlayContent = "";

$currentScreen = ".container.main";

$(document).ready(function(){
    
//    $("*").attr("tabindex", "-1");
    howToPlayContent = $(".how-to-play-container").html();
    $(".how-to-play-container").html("");
//    ShowHowToPlay();
    
    if(window.location.hash) 
    {
        switch(window.location.hash)
        {
            case "#destroy":
                Logout();
                break;
            
            case "#debug":
                $("#test-panel").css("display","block");
                break;
        }
    }
    
    
    Notification.Html = $(".notification-window").wrap("<div>").parent().html();
//    MoveScreen(-200);
    
//    alert($(".lobby .main>.header").height() );
//    alert();
//    alert($("body").outerHeight() - $(".lobby .main>.header").outerHeight());
    $(".lobby .main>*:not(.header)").css("height", $("body").outerHeight() - $(".lobby .main>.header").outerHeight() - 30 + "px")

    playerPopover.object = $(".player-popover");
    
    $(".menu li").hover(function(e){
        clearInterval(interval);
        PlaceDescToInfo($(this).attr("data-desc")); 
    });
    
    $(".menu li").click(function(e){
        
        var target = $(this).attr("data-target");
        
        $("input:not([tabindex='-1'])").attr("tabindex",-1);
        
        if(!$(target).hasClass("animating") && target != null)
        {
            ShowMenu(target);
            HideMenu($(this).parent());
        }    
    });

    
    $(".menu").mouseleave(function(e){
        clearInterval(interval);
        PlaceDescToInfo(""); 
    });
    
//    ShowMenu(".login-select");
    HideMenu(".menu");
    
    $("input").attr("tabindex", -1);
    
    
    $(".lobby").popover({
        animation: false,
        container: '.lobby',
        selector: ".player img",
//        content:"duis lorem noster duis eruditionem",
        html: true,
//        title: "despicationes probant",
        trigger: "click",
        template: '<div class="popover animated fadeInLeft" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    
    
    $(".player-popover .actions>li").tooltip();
    
    //popover
    $(".lobby").on("mousemove",".player",function(e){
        playerPopover.moveToTarget($(this));
//        playerPopover.object.css({"left":e.pageX});
    });
    
    $(".lobby").on("mouseleave",".player",function(e){

        setTimeout(function(){
            if(!playerPopover.hovered)
                playerPopover.moveToTarget(null);
            
        },10);
    });
    
    $(".player-popover").mouseenter(function(e){
        playerPopover.hovered = true;
    });
    
    $(".player-popover").mouseleave(function(e){
        playerPopover.hovered = false;
        playerPopover.moveToTarget(null);
    });
        
    
//    var timeoutObj;
//    $('.online-player').popover({
//        offset: 10,
//        trigger: 'manual',
//        html: true,
//        placement: 'right',
//        template: '<div class="popover" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
//    }).mouseenter(function(e) {
//        $(this).popover('show');
//    }).mouseleave(function(e) {
//        var ref = $(this);
//        timeoutObj = setTimeout(function(){
//            ref.popover('hide');
//        }, 50);
//    });
    
});

var lastScreenOffset = 0;
function MoveScreen(offset)
{
    if(typeof offset == "string")
    {
//        $(offset + " input").attr("disabled", "false");
//        $(offset + "~* input").attr("disabled", "true");
        offset = -100 * $(offset).index();
    }
    
    if(lastScreenOffset == offset)
        return;
    
    lastScreenOffset = offset;
    
//    alert($("body>.container").css("top") +" | "+ offset+"%");
    
    $("body>.container").animate({"top": offset+ "%"},1000);
    
}

//function MoveScreen(from, to)
//{
//    $(from).css("top","-100%");
////    alert(to);
//    $(to).css("top","0%");
//    $currentScreen = to;
//}


function ShowMenu(menu)
{
    
    $(menu).children("li").each(function(i,e){
        $(this).addClass("delay-0-" + ((i + 1) * 2) );
    });
    
    $(menu).addClass("animating").removeClass("null");
    $(menu).children("li").addClass("slideInRight").addClass("animated").removeClass("slideOutRight");
//    $(menu).children("input").attr("tabindex",0);
    
    var time = ($(menu).children("li").length + 1) * 200 + 1000 ;
//    alert(time);
    setTimeout(function(){
        RemoveAnimation("slideInRight");
        RemoveAnimation("animating");
    },time);
}

function HideMenu(menu)
{    
    
    $(menu).addClass("animating").addClass("null");
    $(menu).children("li").removeClass("slideInRight").addClass("animated").addClass("slideOutRight");
    
    
    
    setTimeout(function(){
        RemoveAnimation("animating");
    },2000);
    
}


var currentInfoContent = "";
var interval;
function PlaceDescToInfo(desc)
{
    if(desc == null)
        return;
    
    currentInfoContent = $(".info").html();
//    $(".info").html();
//    desc += "&nbsp;";
    var isConsuming = true;
    $(".info").removeClass("blinking");
    interval = setInterval(function(){
        
        if(isConsuming)
            currentInfoContent = currentInfoContent.substr(0,currentInfoContent.length -6);
        else
            currentInfoContent = desc.substr(0,currentInfoContent.length + 6);
            
        $(".info").html(currentInfoContent);
        
        if(currentInfoContent.length == 0)
            isConsuming = false;
        
        if(currentInfoContent == desc && !isConsuming)
        {   
            $(".info").addClass("blinking");
            clearInterval(interval);
        }
        
    }, 40);
    
}

function RemoveAnimation(animation)
{
    $("." + animation).removeClass(animation);
}


function GotoMainMenu(from,name)
{
    $(".main-menu #welcome-message").html("Welcome, Commander " + name + "!");
    ShowMenu(".main-menu");
    HideMenu(from);
}

function GoToLobby()
{
    MoveScreen(-100);
    
    $.post("php/connectivity.php",{method:"GoToLobby"},function(data){

    });
}

function GoToGameplay()
{
    MoveScreen(-200);
}

function UpdateOnlinePlayers(players)
{
    if( playerPopover.hovered )
    {
        return;
    }

    //    alert($(".lobby .popover").length);
    //    onerror="this.onerror=null;this.src='files/profilePictures/0.png';";


    var tmp = "";
    players.forEach(function(e,i){

        playerDetails[e.Username] = e;

        var available = "";

        if(e.CurrentMatchID == 0)
            available = "available";

        
        
        tmp += "<li class = 'player "+available+"' data-username='"+e.Username+"' >";
        tmp += '<div class = "img" style = "background-image: url(images/users/'+e.Username+'.png) , url(images/users/default.png)"></div>'; //onerror='this.onerror=null;this.src=\"images/users/default.png\";' 
        tmp += "<a class='name'>" + e.Username + "</a>";
        tmp += "<div>";
        tmp += e.Rank;
        tmp += "<span class = 'win'>["+e.Win+"]</span> ";
        tmp += "<span class = 'lose'>["+e.Lose+"]</span>";
        tmp += "</li>";
    });
    //    alert(tmp);

    $(".lobby .online-player").html(tmp);
}

function BackToLobby()
{
    $.post("php/arbiter.php",{method:"BackToLobby"},function(data){
//        alert(data);
        ownDetails = {};
    });
}

function UpdateLobby(data)
{
//    alert();
    UpdateChallenges(data.challenges);
    UpdateOnlinePlayers(data.onlinePlayers);
    
}

function UpdateChallenges(challenges)
{
    if(challenges.length == 0 || Notification.IsOpen)
        return;
    
    var btns = "<br> <div onclick = 'DeclineChallenge(\""+challenges[0]+"\");' class = 'btn gray'>Decline</div> ";
    btns += "<div onclick = 'AcceptChallenge(\""+challenges[0]+"\");' class = 'btn blue'>Accept</div>";
    
    Notification.Show("New challenge!", challenges[0] + " wants to challenge you into a match. Do you want to accept the challenge?" + btns, "blue");
    
//    alert();
//    challenges.forEach(function(e,i){
//        tmp += "<li onclick = 'AcceptChallenge(\""+e+"\");'>"+e+"</li>";
//    });
//    
//    $(".lobby .header .user-profile .challenges").html(tmp);
}

function AcceptChallenge(username)
{
//    alert(username);
    $.post("php/connectivity.php",{method:"AcceptChallenge", username: username },function(data){
//        alert(data);
        Notification.Close();
    });
}

function DeclineChallenge(username)
{
    //    alert(username);
    $.post("php/connectivity.php",{method:"DeclineChallenge", username: username },function(data){
        //        alert(data);
        Notification.Close();
    });
}


function DoActionToPlayer(action)
{
//    alert(playerPopover.target);
    var currentPlayer = playerPopover.target.attr("data-username");
    
    switch(action)
    {
        case PlayerActions.CHALLENGE:
            $.post("php/connectivity.php",{method:"ChallengePlayer", toUsername: currentPlayer },function(data){
//                alert(data);
                if(data == "Request sent")
                    Notification.Show("Request sent", "You've challenged " + currentPlayer + ". <br><div class = 'btn gray' onclick='Notification.Close()'>Ok</div>", "green");
            });
            break;
    }
}


function MovePlayerPopoverToTarget(target)
{
//    alert(JSON.stringify(ownDetails));
    
//    if(target.attr("data-username") == ownDetails.Username)
//    {
//        alert();
//        return;
//    }
    
    playerPopover.target = target;
    
    if(target != null || playerPopover.hovered)
    {   
        
//        alert($(target).wrap("<p>").parent().html());
//        alert(target.attr("data-username"));
//        playerPopover.object.css({
//            "top":playerPopover.target.offset().top - playerPopover.object.height() + "px",
//            "margin-left": -playerPopover.object.width() / 2 + "px",
//            "opacity": 1
//        });
//        
//        if(playerPopover.object.offset().left < 0)
//            playerPopover.object.css({"margin-left": "-=" + playerPopover.object.offset().left + "px"});
//        

        
        if(target.attr("data-username") == ownDetails.Username)
            return;
        
//        alert(target.children("name"));
        playerPopover.object.css({
            "top": target.offset().top + target.height() /2 + "px",
            "margin-top": -playerPopover.object.height() / 2 + "px",
            "left": target.children(".name").offset().left + target.children(".name").width() + "px" ,
            "opacity": 1,
            "visibility": "visible"
        });
        
//        alert(target.attr("data-username"));
        
        var player = playerDetails[target.attr("data-username")];
        
        
//        alert(JSON.stringify(player));
//        alert(playerPopover.object.find(".summary>.img").length);
        playerPopover.object.find(".summary>.img").css({"background-image":"url(images/users/" + player.Username + ".png) , url(images/users/default.png)"});
        playerPopover.object.find(".name").html(player.Username);
        playerPopover.object.find(".rank").html(player.Rank);
        
        var progress = player.Experience / player.ExperienceRequired * 100;
        
//        alert(progress);
        
        playerPopover.object.find(".experience .progress").css({"width": progress + "%"});
        playerPopover.object.find(".details>li:nth-child(1)").html("Win: " + player.Win);
        playerPopover.object.find(".details>li:nth-child(2)").html("Lose: " + player.Lose);
        playerPopover.object.find(".details>li:nth-child(3)").html("Streak: " + player.Streak);
        
        
        var relativeScore = player.Point - ownDetails.Point;
        
        if(relativeScore > 0)
            relativeScore = "+" +relativeScore;
        
        playerPopover.object.find(".relative-score").html( relativeScore + "" );
    }
    
    if(target == null && !playerPopover.hovered)
    {
        playerPopover.object.css({"opacity":0});
        
        setTimeout(function(){
            playerPopover.object.css({"visibility": "hidden"});
        },500);
    }
}

//t h
/*
th 
110
100
010
001

*/


//=======Signup and login======//


function LoginAsGuest()
{
    $.post("php/login-manager.php",{method:"LoginAsGuest"},function(data){
        GotoMainMenu(".login-select", data);
    });
}

function Login()
{
    var username = $(".login-form #username").val();
    var password = $(".login-form #password").val();
//    alert(username + "|" + password);
    if(password.length < 8)
        $(".login-form #password").parent().removeClass().addClass("status-warning");
    
    if(username.length < 4)
        $(".login-form #username").parent().removeClass().addClass("status-warning");
        
    if(username.length < 4 || password.length < 8)
        return;
        
    var data = {};
    data.username = username;
    data.password = password;

        
    $.post("php/login-manager.php",{method:"Login", data:data},function(retData){
        //alert("Received: '" + retData + "'");
        $(".login-form #password").parent().removeClass();
        $(".login-form #username").parent().removeClass();
        
        
        if(retData == "")
        {    
            $(".login-form #password").parent().removeClass().addClass("status-warning");
            $(".login-form #username").parent().removeClass().addClass("status-warning");
        }
        else
        {   
            //alert("logged");
            GotoMainMenu(".login-form",retData);
        }
    });
}

function Logout()
{
    $.post("php/login-manager.php",{method:"Logout"},function(data){
        MoveScreen(0);
//        ShowMenu(".login-select");
        HideMenu(".main-menu");
    });
}


function SignUp()
{
    var username = $(".signup-form #username").val();
    var email = $(".signup-form #email").val();
    var password = $(".signup-form #password").val();
    var confirmPassword = $(".signup-form #confirm-password").val();
    
//    alert(username + "|" + email + "|" + password + "|" + confirmPassword + "|")
    
    
    if(password.length >= 8)
    {
        if(password != confirmPassword)
        {
            $(".signup-form #confirm-password").parent().addClass("status-warning").removeClass("status-ok");
        }
        else
        {
            $(".signup-form #confirm-password").parent().removeClass("status-warning").addClass("status-ok");
        }
        $(".signup-form #password").parent().removeClass("status-warning").addClass("status-ok");
    }
    else
    {
        $(".signup-form #confirm-password").parent().removeClass().addClass("status-warning");
        $(".signup-form #password").parent().addClass("status-warning").removeClass("status-ok");
    }
    
    if( $(".signup-form .status-warning").length == 0)
    {
        var data = {};
        data.username = username;
        data.email = email;
        data.password = password;
        
        $.post("php/login-manager.php",{method:"Signup", data:data},function(data){
            GotoMainMenu(".signup-form",data);
        });
    }
    
    
}


function CheckAvailability(info,sender)
{
    
    var value = $(sender).val() + "";
    value = value.trim();
    
//    alert(username);
    
    if(value.length < 4)
    {
        $(sender).parent().removeClass().addClass("status-warning");
        return;
    }
    
    $(sender).parent().addClass("status-verifying");
    $.post("php/login-manager.php",{method:"Is"+info+"Available", value:value}, function(data){
        $(sender).parent().removeClass();
        
        if(data == "false")
            $(sender).parent().addClass("status-warning");
        else
            $(sender).parent().addClass("status-ok");
    });
}

function ShowHowToPlay()
{
    
    Notification.Show("How to play <div onclick = 'Notification.Close();' class = 'btn red small pull-right'>Done</div>", howToPlayContent, "blue", false, 600, 500);
}

function ToggleSwitch(sender)
{
    if($(sender).hasClass("disabled"))
        return;
    
    if($(sender).hasClass("active"))
        $(sender).removeClass("active");
    else
        $(sender).addClass("active");
    
}

function ShowNotification(title, body, addedClass,fixSize, iwidth, iheight)
{
    fixSize = fixSize || false;
    iwidth = iwidth || 200;
    
    var time = 0;
    if(Notification.IsOpen)
    {
        time = 800;
        Notification.Close();
    }
    
    
    Notification.IsOpen = true;
    
    setTimeout(function(){
        
        $(".notification-window").replaceWith(Notification.Html);
        Notification.Object = $(".notification-window");
        Notification.Object.children(".title").html(title);
        Notification.Object.children(".body").html(body);
        Notification.Object.addClass(addedClass);
        Notification.Object.css("width",iwidth + "px");

        var height = Notification.Object.children(".title").outerHeight() + Notification.Object.children(".body").outerHeight();
        
        if(iheight != null)
            height = iheight;
        
        
        var width = Notification.Object.width();

        while( height>width && !fixSize )
        {
//            var dif = (height - width) * 3;
            var dif = width += 10;
            Notification.Object.css("width", "+=" +dif+ "px");
            height = Notification.Object.children(".title").outerHeight() + Notification.Object.children(".body").outerHeight();
            width = Notification.Object.width();
//            alert(width + ", " + height);
        }

        Notification.Object.children(".body").css({"height":"100%"});
        
        Notification.Object.css({
            "transition":"0.2s height 0s, 0.2s width 0.2s",
            "width":"0px",
            "height":"0px",
            "visibility":"hidden"
        });

        setTimeout(function(){
            Notification.Object.css({
                "width": width+"px",
                "height":height + "px",
                "visibility":"visible"
            });

            Notification.Object.children().css("opacity","1");

        },500);
        
    },time);
}

function CloseNotification()
{
    Notification.IsOpen = false;
    Notification.Object.children().css({
        "opacity":"0",
        "transition":"0.5s all 0s"
    });
    
    setTimeout(function(){
        Notification.Object.css({
            "transition":"0.2s height 0.2s, 0.2s width 0s, 0s visibility 0.4s",
            "width":"0px",
            "height":"0px",
            "visibility":"hidden"
        });
        
    },500);
}