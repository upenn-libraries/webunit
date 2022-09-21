// make service guides currently an one-column page
(function($) {
	$(document).ready(function() {
		$('#s-lg-index-cols-serviceguides #col-2 ul.s-lg-guide-list li').each(function() {
			console.log($(this));
			$(this).appendTo('#s-lg-index-cols-serviceguides #col-1 ul.s-lg-guide-list');
		});
	});
})(jQuery);