(function($) {
$.fn.menumaker = function(options) {  
 var cssmenu = $(this), settings = $.extend({
   format: "dropdown",
   sticky: false
 }, options);
 return this.each(function() {
   $(this).find(".button").on('click', function(){
     $(this).toggleClass('menu-opened');
     var mainmenu = $(this).next('ul');
     if (mainmenu.hasClass('open')) { 
       mainmenu.slideToggle().removeClass('open');
     }
     else {
       mainmenu.slideToggle().addClass('open');
       if (settings.format === "dropdown") {
         mainmenu.find('ul').show();
       }
     }
   });
   cssmenu.find('li ul').parent().addClass('has-sub');
multiTg = function() {
     cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
     cssmenu.find('.submenu-button').on('click', function() {
       $(this).toggleClass('submenu-opened');
       if ($(this).siblings('ul').hasClass('open')) {
         $(this).siblings('ul').removeClass('open').slideToggle();
       }
       else {
         $(this).siblings('ul').addClass('open').slideToggle();
       }
     });
   };
   if (settings.format === 'multitoggle') multiTg();
   else cssmenu.addClass('dropdown');
   if (settings.sticky === true) cssmenu.css('position', 'fixed');
resizeFix = function() {
  var mediasize = 700;
     if ($( window ).width() > mediasize) {
       cssmenu.find('ul').show();
     }
     if ($(window).width() <= mediasize) {
       cssmenu.find('ul').hide().removeClass('open');
     }
   };
   resizeFix();
   return $(window).on('resize', resizeFix);
 });
  };
})(jQuery);

(function($){
$(document).ready(function(){
$("#cssmenu").menumaker({
   format: "multitoggle"
});
});
})(jQuery);

function updateTeamListDropDown() {
	console.log("entered function update user");
	
var str1;
var str2;
var jsondata;
function GetTeamSelectedForPriorityOne() {
    var x = document.getElementById("mySelect").selectedIndex;
    alert(document.getElementsByTagName("option")[x].value);
}
$(document).ready(function(){
  var url="GetTeamNames.php";
  $.getJSON(url, {})
  .done(function(data){
    jsondata=data;
      //return text = JSON.stringify(data);
        $.each(data, function (index, value) {
          var val = value;
          $('#mySelect').append('<option value='+'"'+value["name"]+'"'+'>'+val["id"]+'</option>');
        });
      });
  });
  $("#search1").on('input',function(){
      $("#mySelect2").empty();
      $("#search2").val('');
      $("#search3").val('');
    str1 ="" ;
    str1 = this.value;
    $.each(jsondata, function (index, value) {
      var val = value;
      if(val["name"]!=str1)
      $('#mySelect2').append('<option id="op1" value='+'"'+value["name"]+'"'+'>'+val["id"]+'</option>');
    });

  });
  $("#search2").on('input',function(){
      $("#mySelect3").empty();
      $("#search3").val('');
    str2 ="" ;
    str2 = this.value;
    $.each(jsondata, function (index, value) {
      var val = value;
      if(val["name"]!=str1 && val["name"]!=str2  )
      $('#mySelect3').append('<option id="op1" value='+'"'+value["name"]+'"'+'>'+val["id"]+'</option>');
    });

  });

}

function bootstrap()
{
  
}
