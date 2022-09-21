(function($) {
  $(document).ready(function() {
   
    var headerblockpagesbutton = $("#headerblockpagesbutton button");
      var guideTabs = $("#s-lg-guide-tabs");
      if (width < 900 && tabNum <= 7) {
        if (typeof guideTabs.attr('aria-expanded') == "undefined"){
          $("#s-lg-guide-tabs").removeClass('headerpagecollapse');
          $("#s-lg-guide-tabs").attr('aria-expanded', 'true');
          headerblockpagesbutton.attr('aria-expanded', 'true');
          guideTabs.addClass('headerpagecollapse');
          guideTabs.addClass('in');
         headerblockpagesbutton.text(hideText);
        }
      }



 /***** Add guidepages button *****/
    var guideName = $('#s-lib-bc-guide > a').attr('title');
    var btnText = guideName + ": All pages";
    var hideText = "Hide table of contents";
    var path = window.location.pathname;
    if (path != '/') {
      // create "table of contents" button
      $('<div id="headerblockpagesbutton" class="hl-toc-button"><button type="button" class="toc-toggle btn btn-default center-block"> <span class="caret"></span></button></div>').insertBefore('.row:nth-child(2)');
	}
    
   
   
    
    var headerblockpagesbutton = $("#headerblockpagesbutton button");
    headerblockpagesbutton.text(btnText);
    headerblockpagesbutton.click(function(){
      var attrExpandTab = $("#s-lg-guide-tabs").attr("aria-expanded");
      if (attrExpandTab == "true") {
        headerblockpagesbutton.text(btnText);
      } else {
        headerblockpagesbutton.text(hideText);
      }
    });

   

    /***** BEGIN PROFILE HACK *****/
    // In profile boxes, if there is a hidden email address, add it to the Contact section.
    
    
  }); //end document.ready()
})(jQuery);