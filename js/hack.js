
(function($){
$(document).ready(function(){

  init();
  addJudgeView();
   $(".button-collapse").sideNav();

});
})(jQuery);

function addJudgeView()
{

  $.post("judge.txt", function(result, status) {
        alert(status);
        $.each(result, function(i, field) {
            alert(field.id);
            if(userName == field.id)
            {
              //show judging section and on the nav bar
                $( '<li><a href="#judge">Judge</a></li>' ).prependTo( "ul" );
                judge_div = $("#judge").css("display","block");
            }
        });
    },"json")
  .done(function() {
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
})
  .always(function() {

  });

}

function init() {
  if(readCookie("TescoHackUser")!= null)
  {
      userName = readCookie("TescoHackUser");
  }
  else
  {
      window.location = "login.html";
  }
}

  function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function logout() {
  eraseCookie("TescoHackUser");
  window.location = "login.html";
}

function teamsShow() {

}