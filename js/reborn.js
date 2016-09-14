(function($){
$(document).ready(function(){

$(".button-collapse").sideNav();
$('.collapsible').collapsible({      accordion : false   });
init();
addJudgeView();
addTeamsList();

});
})(jQuery);

function scrollTo(atag, aid){
	var aTag = $('#'+aid);
	$('html,body').animate({scrollTop: aTag.offset().top-80},'slow');
}

function addJudgeView()
{
  $.post("judge.txt", function(result, status) {
		alert(status);
		$.each(result, function(i, field) {
			alert(field.id);
			if(userName == field.id)
			{
			  //show judging section and on the nav bar
				$("#judge").css("display","block");
				$("#judge_link").css("display","block");
				$("#judge_link1").css("display","block");
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

function addTeamsList() {
	$.get( "ListAllTeams.php", function( data ) {
		listTeam = '<h1>Teams List</h1><ul class="collapsible popout" data-collapsible="accordion">';
    $.each(data, function(i, dataValue) {
    	for(var key in dataValue)
    	{
    		var hackName = '';
    		var hackIdea = '';
    		if(!key.localeCompare("name"))
    		{
    			hackName = dataValue[key];
    			listTeam += '<li><div class="collapsible-header">'+hackName+'</div>';
    		}
    		if(!key.localeCompare("idea"))
    		{
    			hackIdea = dataValue[key];	
    			listTeam += '<div class="collapsible-body"><p>'+hackIdea+'</p></div></li>';
    		}
    		console.log(hackIdea + '' + hackName);
    		
    	}
      
    });
    listTeam += '</ul>';
    console.log(listTeam);
    $('#team_display').html(listTeam);
    $('.collapsible').collapsible({      accordion : false   });
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
	  $("#logo").click(function() {		  scrollTo('div','top');	  });
		$("#judge_link").click(function() {		  scrollTo('div','judge');	  });
	  $("#peer_link").click(function() {		  scrollTo('div','peer');	  });
	  $("#rule_link").click(function() {		  scrollTo('div','rule');	  });
	  $("#team_link").click(function() {		  scrollTo('div','team');	  });
	  $("#judge_link1").click(function() {		  scrollTo('div','judge');	  });
	  $("#peer_link1").click(function() {		  scrollTo('div','peer');	  });
	  $("#rule_link1").click(function() {		  scrollTo('div','rule');	  });
	  $("#team_link1").click(function() {		  scrollTo('div','team');	  });
	  $("#judge_link1").css("display","none");
	  $("#judge_link").css("display","none");
	  $("#judge").css("display","none");
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


/////////////////////////////JUDGE 

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
