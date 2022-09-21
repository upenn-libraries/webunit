jQuery(function($){

	setTimeout(function(){ // We need setTimeour because other script need some time to add the list first
		$("#s-lg-widget-1532606483049").find('li').slice(0, 17).appendTo("#tutorials-left");
		$("#s-lg-widget-1532606483049").find('li').appendTo("#tutorials-right"); // don't use slice because we need all rest
		$("#s-lg-widget-1532606483049 .s-lg-widget-list-more-results").appendTo(".col-2");

		$("#s-lg-widget-1532606483049").remove();
	}, 200);

})