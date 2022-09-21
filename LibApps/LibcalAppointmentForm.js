/* In the "Make an appointment" form, we're hiding unwanted elements that take up too much space
 * when signing up for an appointment with a specific person. (Do not hide in the general form
 * at libcal.library.upenn.edu/appointments.)
 *
 * Uses regex to make sure we're on one of the following pages:
 * /appointment/*
 * /appointments?*
 *
 * Uses a 100ms timeout to wait for the page contents to be loaded into the DOM.
 */
setTimeout(function() {
    var url_href = window.location.href;
    var url_match = url_href.match(/appointment(s\?|\/+)/g);
    if (url_match !== null) {
        // The embedded iframe widgets use different IDs than the appointments page in LibCal:
        if (document.getElementById("s-lc-public-pd")) {
            document.getElementById("s-lc-public-pd").style.display = "none";
        } else {
            document.getElementById("s-lc-public-appm-pd").style.display = "none";
        }
    }
}, 100);
