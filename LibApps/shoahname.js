(function($) {
	$(document).ready(function() {
		$.fn.textReplace = function(target, replacement) {
						this.html(this.html().replace(target, replacement));
						return this;
					}
		$('h1').textReplace('Guides', 'USC Shoah Foundation Institute Visual History Archive');
	});
})(jQuery);
