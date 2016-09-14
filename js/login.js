
/////////////////////////////////login

function login_me() {
	name = document.querySelector("#name").value;
	pass = document.querySelector("#email").value;
	var found=0;
	alert(name);
	//alert(pass);
	$.post("login.txt", function(result, status) {
        alert(status);
        $.each(result, function(i, field) {
            alert(field.id);
						if(name == field.id)
						{
							found=1;
							if(md5(pass) == field.pass) {
							     alert("Welcome");
									eraseCookie("TescoHackUser");
									createCookie("TescoHackUser",name,1);
									updateUser(name);
									window.location = "reborn.html";
									return false;
								}
							else {
										alert("Invalid Login Details");
										return false;
									}
						}
				});
	if(found!=1){
       		 requestInformSignIn(name, pass);
        }
						/*else
						{
							alert("Invalid Login Details");
										
						}*/
						//console.log(field.id);
    },"json").done(function() {
  }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
}).always(function() {
  });
}
  
  /////////////////cookie
  
  function createCookie(name,value,days) {
	console.log("inside create cookie");
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

//////////////////update user in db

function updateUser(name) {
	console.log("entered function update user");
	$.post( "UserRegistered.php", { TPX:name , name: "NO NAME SPECIFIED" })
	.done(function( data ) {
    console.log( data );
  });
}
  

  ///////////////////////////////////////////tesco login

function requestInformSignIn(user, pwd) {
    var requestData = {
        "UserName": user,
        "Password": pwd,
        "Domain": "global.tesco.org",
        "Client": "inform.api.hsc",
        "ClientSecret": "8wheg67fgdvs54wg365d",
        "DevicePlatform": "api",
        "DeviceName": "API Access",
        "DevicePlatformVersion": "1.0",
        "AppVersion": "1.0",
        "DeviceID": "12345678-1234-1234-1234-123456789012"
    };

    $.ajax({
    method: "POST",
    url: "https://labs.ocset.net/auth/token",
    json: true,
    headers: {
            "content-type": "application/json",
        },
    data: JSON.stringify(requestData),
    success: function( data, textStatus, jQxhr ){
        console.log("top-gun");
        console.log( JSON.stringify( data ) );
        alert("Welcome");
        createCookie("TescoHackUser",name,1);
        updateUser(name);
        window.location = "reborn.html";
    },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log("man-down");
        console.log( errorThrown );
        alert("Invalid Login details");
    }
});

}
/*
    request({
        url: 'https://labs.ocset.net/auth/token',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function(err, res, body) {
        if (err) {
            cb(err)
        } else {
            if (res.statusCode == 200) {
                cb(null, {
                    statusCode: res.statusCode,
                    body: body
                })
            } else {
                cb(null, {
                    statusCode: res.statusCode,
                    body: body
                })
            }
        }
    })
*/



/*	$.ajax({
      url: 'ajax-login.php',
      type: 'post',
      data: {'action': 'follow', 'userid': '11239528343'},
      success: function(data, status) {
        if(data == "ok") {

        }
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    });

    
}
*/
//code from Kunal

/*
app.post('/signIn', function(req, res, next) {
    signIn(req, function(err, r) {
        if (err) return next(JSON.stringify(err));
        res.jsonp(r)
    })
})

function signIn(req, cb) {
    var domain = req.body.d
    var user = req.body.u
    var pwd = req.body.p

    if (user == 'abcd' && pwd == 'abcd') {
        req.session.user_id = user
        cb(null, {
            msg: '',
            authorized: true
        })
        return
    }

    var allowedUsers = JSON.parse(fs.readFileSync('users'))
    if (_.keys(allowedUsers).indexOf(user) != -1) {
        requestInformSignIn(user, pwd, domain, function(err, res) {
            if (err) {
                cb(err)
                return
            }
            if (res.statusCode == 200) {
                req.session.user_id = user
                cb(null, {
                    msg: '',
                    authorized: true
                })
            } else {
                cb(null, {
                    msg: 'Login failed!',
                    authorized: false,
                    more: res.body
                })
            }
        })
    } else {
        cb(null, {
            msg: 'You are not authorized to view this page!',
            authorized: false
        })
    }

}

function requestInformSignIn(user, pwd, domain, cb) {
    var requestData = {
        "UserName": user,
        "Password": pwd,
        "Domain": domain,
        "Client": "inform.api.hsc",
        "ClientSecret": "abcd",
        "DevicePlatform": "api",
        "DeviceName": "API Access",
        "DevicePlatformVersion": "1.0",
        "AppVersion": "1.0",
        "DeviceID": "12345678"
    }

    request({
        url: 'https://labs.ocset.net/auth/token',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function(err, res, body) {
        if (err) {
            cb(err)
        } else {
            if (res.statusCode == 200) {
                cb(null, {
                    statusCode: res.statusCode,
                    body: body
                })
            } else {
                cb(null, {
                    statusCode: res.statusCode,
                    body: body
                })
            }
        }
    })
}


*/

