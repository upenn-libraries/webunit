jQuery(function($) {
	// default title
	//$('#sitename').text("Rooms & Events");
	$('#sitename').text("Reservations & Events");
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('calendar') > -1) {
		$('#sitename').text("Workshops & Events");
		$('#pageheader').removeClass().addClass('libcal-calendar')
	} else if (currentUrl.indexOf('reserve') > -1) {
		$('#sitename').text("Reserve");
		$('#pageheader').removeClass().addClass('reserve')
	} else if (currentUrl.indexOf('appointments') > -1) {
		$('#sitename').text("Appointments");
		$('#pageheader').removeClass().addClass('libcal-appts')
	}  else  {
		$('#sitename').text("Reservations & Events");
		$('#pageheader').removeClass().addClass('libcal-all')
	}
	if ((currentUrl.indexOf('dentalseminar') > -1) || (currentUrl.indexOf('dentalgsr') > -1) || (currentUrl.indexOf('dental') > -1)) {
		//$('#s-lc-eq-success .btn.btn-primary').css("display","none");
		$('head').append('<style type="text/css">#s-lc-eq-success .btn.btn-primary {display:none;}</style>');
	}
});