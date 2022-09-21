(function($) {
	function responsiveSize(){
		if ($('body').hasClass('phone')){
			btn = $('button.toc-toggle.btn-default');
			btn.text("VHA: All pages");
		}
		else{
			btn = $('button.toc-toggle.btn-default');
			btn.text("USC Shoah Foundation Institute's Visual History Archive: All pages");
		}

		url = window.location.href;
		if (url.indexOf('vha/searching') > -1 || url.indexOf('vha/vhasearchtips') > -1 ||
			url.indexOf('vha/searchthepenncache') > -1 || url.indexOf('vha/viewvideosnotinthepenncache')){
			if(window.innerWidth < 1010){
				$('body').addClass('subtabs');
			}
			else{
				$('body').removeClass('subtabs');
			}
		}

	}

    $(document).ready(responsiveSize);
	$(window).resize(responsiveSize);
})(jQuery);