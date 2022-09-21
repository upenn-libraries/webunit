(function($) {
	$(document).ready(function() {
		$.fn.textReplace = function(target, replacement) {
						this.html(this.html().replace(target, replacement));
						return this;
					}
		$('.header-wrapper h1').textReplace('Guides', 'Research &#38; Teaching');
	});
})(jQuery);