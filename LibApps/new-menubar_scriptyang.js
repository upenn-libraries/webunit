(function($) {
    
    $(".main-nav > .main-nav__item > h3 > a").focus(function() {
        $(".expand_button").prop("checked", false);
    });

    /**
    *Handle window resizes. If the window width > 960 pixels, the mobile menu should always be hidden.
    **/
    $(window).resize(function() {
        var width = window.innerWidth;
        if (width >= 960) {
            $('#mobile-nav-toggle').prop("checked", false);
        } else {
          // Do nothing if the window is resized to be in mobile view. #mobile-button handles toggling.
        }
    });

})(jQuery);