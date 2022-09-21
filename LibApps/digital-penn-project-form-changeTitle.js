(function($) {
	$(document).ready(function() {
		$.fn.textReplace = function(target, replacement) {
						this.html(this.html().replace(target, replacement));
						return this;
					}
		$('#s-lg-guide-name').textReplace('Digital Penn Project Form: Home', 'Digital Penn Project Form');
	});
})(jQuery);