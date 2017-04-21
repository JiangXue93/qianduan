$(document).ready(function () {
	let $start = $('.start')
	   ,$welcome = $('.welcome')
	   ;

	$start.on("click", function () {
		$welcome.slideUp(500);
	});

	

});