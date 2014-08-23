


function TieChatInputBox(sender, toID)
{
    
    
    toID = toID || "0";
    if ( event.which == 13 ) {
//        alert($(sender).val());
        
        SendMessage(-1,toID,$(sender).val(), sender);
        
    }
}


function SendMessage(fromID, toID, msg,sender)
{
    fromID = fromID || -1;
    
    if(msg.trim().length == 0)
    {
        $(sender).val("");    
        return;
    }
    
    $.post("php/connectivity.php", {method: "SendMessage", senderID: fromID, receiverID: toID, msg: msg}, function(data){
//        alert(data);
        $(sender).val("");
    });
}


function AppendMessage(chat, box)
{
    box = box || ".lobby";
//    alert(chat);
    if(chat.length >0)
    {
//        alert(JSON.stringify(chat));
        chat.forEach(function(e,i){
            var c = "player";
            
//            if(ownDetails.Username == e.Username)
//                c = "none";  
            
            var str = "<li><div class='img' style='background-image: url(images/users/"+e.Sender+".png), url(images/users/default.png)'></div><strong data-username ='"+e.Sender+"' class='"+c+"'><span class = 'name'>"+e.Username+"</span></strong><div></div>"+e.Message+"</li>";
            
            if($(box + " .chatbox").hasClass("pm"))
            {
//                alert(ownDetails.Username);
                if(ownDetails.Username == e.Username)
                    c = "outgoing";
                else
                    c = "incoming";
                
                str = '<li class="'+c+'">'+e.Message+'</li>\n';
            }
//                str = "<li class='incoming'>"+e.Message+"</li>\n";
                
//            alert(str);
            
            $(box + " .chatbox").append(str);
        });
        
        $(box + " .scroller").animate({scrollTop:$(box + " .scroller")[0].scrollHeight + "px"});
//        $("#content #chatbox").animate( {scrollTop: $("#content #chatbox")[0].scrollHeight +"px"});
    }
}