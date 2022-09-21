(function($) {
	$(document).ready(function() {
		var currentUrl = window.location.href;
		if (currentUrl.indexOfindexOf('vp-dlc-seats' || 'stacks-browse') > -1) {
			$('#s-lc-eq-navform').addClass("displaynone");
		} else  {
		}
	});
})(jQuery);