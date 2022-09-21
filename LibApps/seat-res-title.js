jQuery(function($) {
	
	$('#s-lg-guide-name').text("Seat Reservations");
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('policies') > -1) {
		$('#s-lg-guide-name').text("Seat Reservations: Policy and Procedures");
	} else if (currentUrl.indexOf('introduction') > -1) {
		$('#s-lg-guide-name').text("Seat Reservations");
	} else  {
		$('#s-lg-guide-name').text("Seat Reservations");
	}
});
//title of guide