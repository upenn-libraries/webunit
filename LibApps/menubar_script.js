(function($) {
    $(".main-nav > .main-nav__item > h3 > a").focus(function() {
        $(".expand_button").prop("checked", false);
    });
})(jQuery);