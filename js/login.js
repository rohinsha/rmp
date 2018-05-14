$(document).ready(function(){

			jconfirm.defaults = {
				icon: 'fa fa-warning',
				backgroundDismiss: false,
				backgroundDismissAnimation: 'glow',
				escapeKey: true,
				closeIcon:true,
				theme:'modern',
			    title: 'Are You Sure?',
			    autoClose: 'Cancel|15000',
			    animation: 'scaleX',
			    animationSpeed: 500,
			    type: 'red',
			    animationBounce: 1.5,
			}
			
	$('body').css('background','#094b7d')

	$('.sign_in').click(function(){
		$('.login').show();
		$('.forgot_password').hide();
	});
	
	$('.signup-link').click(function(){
		$('.signup').show();
		$('.login').hide();
		
    });



	$('.forgot_pass').click(function(){
		$('.forget_password').show();
		$('.login').hide();
	});

	$('.signin-link span').click(function(){
		$('.login').show();
		$('.signup').hide();
	});


	$('.update_password_btn').click(function(){
		var phone = $.trim($('.forget_pass_phone').val());
  		var email = $.trim($('.forget_pass_email').val());
  		console.log(phone,email);

		var phoneno = /^\d{10}$/;
		if(phone == '' || isNaN(phone)){
			$.alert("Please enter phone Number."); 
			return false;
  		}else if(!phone.match(phoneno)){  
			$.alert("Please enter correct phone  number."); 
			 return false;
  		}else if(email==''){
    		$.alert('Email field cant be blank');
    		return false;
  		}else if(!validateEmail(email)){
    		$.alert('Enter Valid EmailId')
    		return false;
  		}else if(phone.length !== 10){
    		$.alert('Please enter a 10 Digit Phone Number');
    		return false;
  		}
  		json = {phone:phone,email:email}
 		$(".loader").fadeIn("slow");

  		utilsHandler(json,'forgotPassword.php','POST', function(d){
   
					var result = $.parseJSON(d);
			    	if(result.status==202){
			    		$(".loader").fadeOut("slow");
			    		$.confirm({
							closeIcon: false,
							icon: 'fa fa-smile-o',
							title:'Successfully',
						    content: result.message,
						    theme:'modern',
						    opacity:1,
						    animation: 'scale',
                            type: 'blue',
						    buttons: {
						        Activate: {
						        	btnClass:'btn-green',
						            text: 'OK',
						            action: function () {
						           $('.login').show();
						           $('.forget_password').addClass('hidden');
						           $('.forget_pass_phone,.forget_pass_email').val('');
						           
						            }
						        }
						    }
						});
			    	}else if(result.status==403){
			    		$(".loader").fadeOut("slow");
			    		$.alert(result.message);
			    	}else if(result.status==401){
			    		$(".loader").fadeOut("slow");
			    		$.alert(result.message);
			    	}else if(result.status==400){
			    		$(".loader").fadeOut("slow");
			    		$.alert(result.message);
			    	}else if(result.status==406){
			    		$(".loader").fadeOut("slow");
			    		// window.location.href='index.html';
			    	}else if(result.status==500){
			    		$.alert(result.message);
			    	}else{
			    		$(".loader").fadeOut("slow");
			    		console.log(result);
			    	}
			          
   	 	});
    });
	




    function validateEmail(email) {            
		var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
			return false;
		}else{
            return true;
        }
    }
	$('.sign_in').click(function(){ 
		$('.forget_password').addClass('hidden');
		$('.login').show();

	});
	
	
	/* CHECK SESSION*/
	$.ajax({
		type: 'POST',
		url: './utils/checkSessionNull.php',
		success: function (data) {
			// console.log(data);
			if(data == true)
			{
				
			}else
			{
				$.confirm({
					closeIcon: false,
					title:'You are already Logged In.',
					columnClass: 'medium',
				    content: ' Please Logout first to login as a different user.',
				    theme:'supervan',
				    opacity:1,
				    buttons: {
				        Activate: {
				        	btnClass:'btn-green',
				            text: 'Take me to Dashboard',
				            action: function () {
				                location.href = 'dashboard.html';
				            }
				        },
				        Cancel: {
				        	btnClass:'btn-red',
				            text: 'Log Out',
				            action: function () {
				                $.ajax({
									type:'POST',
									url:'./utils/leadLogout.php',
									success:function(){
										location.href = 'index.html';
									}
								});
				            }
				        }
				    }
				});
			}
			
		}        
	});

	$(document).keypress(function(e) {
	    if(e.which == 13 && $('body .jconfirm').length==0) {
	        $('.loginbtn').click();
	    }
	});

	$('.loginbtn').click(function(){
			
		var phone = $('.login_email').val();
		var password = $('.login_pass').val();
		var phoneno = /^\d{10}$/;
		if(phone == '')
		{
			$.alert("Please enter phone Number."); 
		}  
		else if(!phone.match(phoneno))  
		{  
			$.alert("Please enter correct phone  number.");  
						
		}  
		else if( password == '') 
		{  
			$.alert("Please enter password.");  
			$('.login_pass').val('');		
		}else{
			$.ajax({
				type: 'POST',
				url: './utils/leadLogin.php',
				data: {phone:phone,password:password},
				success: function (data) {	
					console.log(data);
					data = JSON.parse(data)
					if(data == 'inspection officer')
						window.location="inspectionDashboard.html";
					else if(data == 'field officer')
						window.location="fieldVisitsDashboard.html";
					else			
						window.location="dashboard.html";
				},
				statusCode:{
					403: function() {
						$.alert('Invalid Credentials');
					},
					401: function() {
						$.alert('Unauthorized User');
					} 
				}         
			});
		}	
		
	})
})
