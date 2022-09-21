(function($) {
  $(document).ready(function() {
		var jumplistString = $('nav.jumplist').attr('id');
		var pageString = jumplistString.substring(0, jumplistString.indexOf('jumplist'));
		$('option').removeAttr('selected');
		$('option#' + pageString).attr('selected','selected');
		
 }); //end document.ready()
})(jQuery);
function listJump() {
	(function($) {
		var sel =$('#jumplistform select')[0];
		window.location = sel.options[sel.selectedIndex].value;
		return false;
	})(jQuery);
}