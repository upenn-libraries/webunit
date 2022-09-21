/**
 * This JS fetches content from an internal guide: "Elecaqu Franklin Alerts"
 * https://guides.library.upenn.edu/elecacqu
 * https://guides.library.upenn.edu/c.php?g=830117
 */

jQuery(function($){

    function postAlert(location, message) {
        var $alert = $('<div></div>')
            .attr('id', 'franklinalert')
            .css('background-color', '#ffffcc')
            .css('margin', '1em 0 2em 0')
            .css('padding', '1em')
            .css('line-height', '1.6')
            .prepend(message)
            .prependTo(location);
    }

    // This is the location we want alerts from Guides to be posted in Franklin:
    var $container = $('.blacklight-franklin_alma.blacklight-franklin_alma-load_request #main-container, .blacklight-catalog-landing #main-container, .courserespages.homepage #homepagecontent, .bigtabs #whitearea');
    if (window.location.pathname.startsWith('\/forms')) {
      var $formcontainer = $('#main-container');
    }

    $.ajax({
        url: "https://lgapi-us.libapps.com/1.1/assets/41563273?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5",
        type: 'GET',
        dataType: 'json'
    })
    .done(function (data) {
        // Use a try-catch in case the JSON is malformed.
        try {
            var $boxHTML = $(data[0].description);
            // first() ensures that we only post one alert, even if someone wrote several of them.
            var alerttext = $boxHTML.filter("#franklinalerttext").first().html();
            var formalerttext = $boxHTML.filter("#franklinformalerttext").first().html();
            // Post the alert if it exists and is not "nbsp;" (the guides default for an empty div)
            if (alerttext && alerttext != "&nbsp;") {
                postAlert($container, alerttext);
            }
            if (formalerttext && formalerttext != "&nbsp;") {
                postAlert($formcontainer, formalerttext);
            }
        } catch (e) {
            if (typeof console != "undefined") {
                console.error("Franklin-alert: " + e);
            }
        }
    })
    .fail(function (xhr, status, error) {
        if (typeof console != "undefined") {
            console.error("Franklin-alert: HTTP-GET failure. Status: " + status + ", Error: " + error);
        }
    });

    /* ------------------------------------------------------- */
    /* The Web Unit can also post its own one-off alerts here: */

    //postAlert($container, "New alert");
    //postAlert(".some-other-location", "Another alert");

});
