(function($) {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function() {
            $(this).find(".button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
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
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
                var mediasize = 700;
                if ($(window).width() > mediasize) {
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

(function($) {
    $(document).ready(function() {

      init_js();

        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);

function init_js() {
    alert('hi there');
}

function searchTeamListDropDown() {
	console.log("entered function update user");
	
var str1;
var str2;
var jsondata;
$(document).ready(function(){
  var url="GetTeamNames.php";
  $.getJSON(url, {})
  .done(function(data){
    jsondata=data;
      //return text = JSON.stringify(data);
        $.each(data, function (index, value) {
          var val = value;
          $('#Teams').append('<option value='+'"'+value["name"]+'"'+'>'+val["id"]+'</option>');
        });
      });
  });
/*  $("#search-hack").on('input',function(){
     
    str1 ="" ;
    str1 = this.value;
console.log("entered function update team name user");
	$.post( "GetTeamInfo.php", { TeamName:str1 },"json")
	.done(function( data ) {
   // console.log( data );
	 $.each(data, function (index, value) {
		console.log(value['name']);
		console.log(value['idea']);
		$('#team-name').append(value['name']);
	  $('#hack').append(value['idea']);
		});
    });
   });*/

}
function updateTeamInfo(){
	console.log("entered function on submit");
	var val = document.getElementById('search-hack').value;
	console.log(val);
	$.post("GetTeamInfo.php", { TeamName: val },function(data){
		console.log("inside dine");
		var obj= $.parseJSON(data);
				//return text = JSON.stringify(data);
					$.each(obj, function (index, value) {
						console.log(value['name']);
					console.log(value['idea']);
					$('#team-name').append(value['name']);
				 	 $('#hack').append(value['idea']);
				});
		    });

	/*$.post( "GetTeamInfo.php", { TeamName:val },"json")
	.done(function( data ) {
    console.log( data );
	 $.each(data, function (index, value) {
		console.log(value['name']);
		console.log(value['idea']);
		});*/
	 /*$('#team-name').append(data[0]['name']);
	  $('#hack').append(data[0]['idea']);*/
	/*$.post( "GetTeamInfo.php", { TeamName:val },"json").done(function( data ) {
		console.log("inside .done");
		console.log(data);
	 $.each(data, function (index, value) {
		console.log(value['name']);
		console.log(value['idea']);
	  $('#team-name').append(value['name']);
	  $('#hack').append(value['idea']);
	});
	});*/
}
function UpdateScore(){
	console.log("inside update score function");
	var innovation = document.querySelector('#innovation_score').value;
	var buinessVal = document.querySelector('#business_value_score').value;
	var userExp = document.querySelector('#user_experience_score').value;
	var functionality = document.querySelector('#functionality_score').value;
	var comment = document.querySelector('#notes').value;
	console.log(innovation);
	console.log(buinessVal);
	console.log(userExp);
	console.log(functionality);
	console.log(comment);
}


function innovationUpdate(vol) {
  document.querySelector('#innovation_score').value = vol;
  //console.log( document.querySelector('#innovation_score').value);
}

function businessValueUpdate(vol) {
  document.querySelector('#business_value_score').value = vol;
  //console.log( document.querySelector('#business_value_score').value);
}

function userExperienceUpdate(vol) {
  document.querySelector('#user_experience_score').value = vol;
 // console.log( document.querySelector('#user_experience_score').value);
}

function functionalityUpdate(vol) {
  document.querySelector('#functionality_score').value = vol;
  //console.log( document.querySelector('#functionality_score').value);
}
