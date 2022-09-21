var queryLink = (function($) {
	return {
		setKeyword: function (id, inputId, keyword) {
			$('#s-la-widget-' + id).submit(function() {
				var input = $('#'+inputId).val();
				window.location = "http://upenn.libanswers.com/search/?q=" + encodeURIComponent(input) + "&keywords=" + keyword;
				return false;
			});
		}
	};
})(jQuery);
