jQuery(function($) {
	// switch between 3 functionalities
	$('input[type="radio"]').click(function(){    
    	$('.franklinset').hide();    
    	$('#'+$(this).val()).show();
  	});
	
	// Add text input shadowing, so searches in the same group preserve the user's text input
    // Catalog Group
    var $catalogGroup = $('#franklinquery, #msquery, #articlesquery');
    $catalogGroup.each(function() {
      $(this).change(function() {
        var newText = $(this).val();
        $catalogGroup.each(function() {
          $(this).val(newText);
        });
      });
    });
	
	// search form for catalog functionality
	$("#franklinThreeSearch").submit(function() {
        var select = $('#franklinThreeSearch select[name="qt"]');
        var selected = select.find('option[browse-action][value=' + select.val() + ']');
        if (selected.length > 0) {
             var extraParams = '';
             var params = new Array();
             var i = 0;
             $.each(document.location.search.slice(1).split('&'), function(index) {
               if (this.indexOf('xbrowse') !== 0 && this.indexOf('q=') !== 0 && this.indexOf('qt=') !== 0 
                   && this.indexOf('start=') !== 0 && this.indexOf('sort=') !== 0 && this.indexOf('id=') !== 0) {
                 params[i] = this;
                 i = i + 1;
               }
             });
             if (i > 0) {
                extraParams = '&' + params.join('&');
             }
             var action = selected.attr('browse-action');
             var url = action + '?xbrowse='+encodeURIComponent(select.val())+'&xbrowse.term=' + encodeURIComponent($('#franklinquery').val()) + extraParams;
			 window.open(url);
			 return false;
        }
    });
	
	// search form for Articles+ functionality
	$(".summonform").submit(function(event) {
        event.preventDefault();
        var searchURL = "http://upenn.summon.serialssolutions.com/search#!/search?q=" + encodeURIComponent($("#articlesquery").val());
        // Must concatenate all fvf values into one parameter.
        var fvf = "";
        $(".summonform .limitOptions input:checked").each(function() {
            if (this.name === "fvf") {
                if (fvf !== "") {
                    fvf += "|";
                }
                fvf += this.value;
            } else {
                searchURL += "&" + this.name + "=" + this.value;
            }
        });
        if (fvf !== "") {
            searchURL += "&fvf=" + fvf;
        }
        window.open(searchURL, '_blank');
    });
});
