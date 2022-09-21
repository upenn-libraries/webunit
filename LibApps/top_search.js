(function($) {
  // Top Google Custom Search box. Appears when search button is clicked, and disappear when
  // the button is clicked again.

  // 0.5 second timeout in order to wait for #toggle-search to be loaded
  setTimeout(function() {
    $("#toggle-search").click(function(e) {
      e.preventDefault();
      if ($("#headerbg").hasClass("with-top-search-bar")) {
        // collaps search bar
        $("#headerbg").removeClass("with-top-search-bar");
        $("#topNavSearchBar").animate({top: "-4.7rem"}, "fast", "swing");
        $("#block-departmentalhomepagetitle").removeClass("with-header-search-bar");
      }
      else {
        //show search bar
        $("#headerbg").addClass("with-top-search-bar");
        $("#topNavSearchBar").animate({top: "0rem"}, "fast", "swing");
        $("#block-departmentalhomepagetitle").addClass("with-header-search-bar");

      }
    });
  }, 500);
})(jQuery);
