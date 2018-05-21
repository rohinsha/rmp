$(document).ready(function(){
	$(".linkto-forget-password a").click(function(event){
		event.preventDefault();
		$(".forgot-password-block").show();
		$(".login-block").hide();
	});

	$(".linkto-signin a").click(function(event){
		event.preventDefault();
		$(".login-block").show();
		$(".forgot-password-block").hide();
	});

	$(".signup-link a").click(function(){
		event.preventDefault();
		$(".signup-block").show();
		$(".before-signup-block").hide();

	});
});