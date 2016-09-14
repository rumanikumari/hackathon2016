(function($){
$(document).ready(function(){

$(".button-collapse").sideNav();
$('.collapsible').collapsible({      accordion : false   });
init();
addJudgeView();
searchTeamListDropDown();
updateTeamListDropDown();

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
				judge_div = $("#judge").css("display","block");
				return false;
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
	console.log("inside readcookie");
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

/*function searchTeamListDropDown() {
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
}*/

function searchTeamListDropDown() {
	console.log("entered function update user");
	
var str1;
var str2;
var jsondata;
//$(document).ready(function(){
  var url="GetTeamNames.php";
  $.getJSON(url, {})
  .done(function(data){
    jsondata=data;
	console.log(data);
      //return text = JSON.stringify(data);
        $.each(data, function (index, value) {
          var val = value;
          $('#Teams').append('<option value='+'"'+value["name"]+'"'+'>'+val["id"]+'</option>');
        });
      });
  //});
}

/*function updateTeamInfo(){
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
*/

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
	var businessVal = document.querySelector('#business_value_score').value;
	var userExp = document.querySelector('#user_experience_score').value;
	var functionality = document.querySelector('#functionality_score').value;
	var comment = document.querySelector('#notes').value;
	console.log(innovation);
	console.log(businessVal);
	console.log(userExp);
	console.log(functionality);
	console.log(comment);
	judgeId=readCookie("TescoHackUser");
	console.log("judgeId");
	console.log(judgeId);
	teamName = document.getElementById('search-hack').value;
	console.log(teamName);
	$.post( "UpdateScore.php", { JudgeId:judgeId , TeamName: teamName , Innovation: innovation , BValue: businessVal , UserExp: userExp, Functionality: functionality , comments: comment})
	.done(function( data ) {
   	 console.log( data );
 	 });	
}


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
		  $("#submit3").click(function(){
			     var teamName1 = document.getElementById('search1').value;
	     		     var teamName2 = document.getElementById('search2').value;
			     var teamName3 = document.getElementById('search3').value;
			     console.log(teamName1);
			     console.log(teamName2);
			     console.log(teamName3);

			     var UserId=readCookie("TescoHackUser");
				console.log("userId");
				console.log(UserId);
				$.post( "voted.php", { TeamOne:teamName1 , TeamTwo: teamName2, TeamThree: teamName3, userId: UserId})
				.done(function( data ) {
			   	 console.log( data );
			 	 });				     

		  });
			

}


/*function UpdateScore(){
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
*/


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
