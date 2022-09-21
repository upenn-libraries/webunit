(function($) {
	$(document).ready(function() {
		$.fn.textReplace = function(target, replacement) {
						this.html(this.html().replace(target, replacement));
						return this;
					}
		$('#s-lg-guide-name').textReplace('Benjamin Rush Portal: ', '');
		$('#s-lg-guide-name').textReplace('Early Education', 'Rush\'s Life: Early Education');
		$('#s-lg-guide-name').textReplace('Studying in Europe', 'Rush\'s Life: Studying in Europe');
		$('#s-lg-guide-name').textReplace('Return to America', 'Rush\'s Life: Return to America');
		$('#s-lg-guide-name').textReplace('The Revolutionary War', 'Rush\'s Life: The Revolutionary War');
		$('#s-lg-guide-name').textReplace('Post-War Medical Career', 'Rush\'s Life: Post-War Medical Career');
		$('#s-lg-guide-name').textReplace('Rush as an Advocate for Veterinary Education', 'Rush and Penn Medicine: <br/>Advocate for Veterinary Education');
		$('#s-lg-guide-name').textReplace('Resources at Penn', 'Rush and Penn Medicine: Resources at Penn');
		$('#s-lg-guide-name').textReplace('Benjamin Rush Mythology', 'About: Benjamin Rush Mythology');
		$('<h1 id="site-title">Benjamin Rush Portal</h1>' ).insertBefore('#s-lg-guide-name');
		$( "#s-lg-box-wrapper-32761952" ).insertBefore( $( "#s-lib-bc" ) );
		
	});
})(jQuery);
