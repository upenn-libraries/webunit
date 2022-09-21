jQuery(function($) {
	// default title
	//$('#sitename').text("Rooms & Events");
	$('#sitename').text("Reservation Calendar");
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('calendar') > -1) {
		$('#sitename').text("Workshops");
	} else if (currentUrl.indexOf('reserve') > -1) {
		$('#sitename').text("Reserve");
	} else if (currentUrl.indexOf('appointments') > -1) {
		$('#sitename').text("Appointments");
	}  else  {
		$('#sitename').text("Reservations & Events");
	}
	if ((currentUrl.indexOf('dentalseminar') > -1) || (currentUrl.indexOf('dentalgsr') > -1) || (currentUrl.indexOf('dental') > -1)) {
		//$('#s-lc-eq-success .btn.btn-primary').css("display","none");
		$('head').append('<style type="text/css">#s-lc-eq-success .btn.btn-primary {display:none;}</style>');
	}
});