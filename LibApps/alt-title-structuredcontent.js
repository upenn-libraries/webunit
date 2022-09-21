(function($) {
	$(document).ready(function() {
		$.fn.textReplace = function(target, replacement) {
						this.html(this.html().replace(target, replacement));
						return this;
					}
		$('#s-lg-guide-name').textReplace('Accessible Code', 'Accessible Code: Structured Content');
	});
})(jQuery);