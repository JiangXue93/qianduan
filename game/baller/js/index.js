$(document).ready(function () {
	var $start = $('.start')
	   ,$welcome = $('.welcome')
	   ;

	$start.on("click", function () {
		$welcome.slideUp(500);
	});

	

});