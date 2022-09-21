/**
 * This JS is for use in LibWizard forms embedded in LibGuides.
 * It can detect information about the page that the form is embedded in,
 * and dumps that info into hidden form fields. That information gets
 * submitted with the form and shows up in the emails sent to staff.
 *
 * There is a corresponding "libanswers-form-external.js" that is also required.
 * 
 * Note: This only works in IE8 and above.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 *
 * INSTRUCTIONS:
 *   https://guides.library.upenn.edu/c.php?g=500518&p=3541070
 * In your LibWizard form, create your hidden fields, and then create a hidden text area.
 * Paste this code (modified as necessary) into the text area:

    <p>Custom code is here:</p>
    <script>
    jQuery(function($) {
        $.getScript("//s3.amazonaws.com/libapps/sites/231/include/libanswers-form-internal.js", function() {
            internalFormInit({
                "pageUrlFieldID" : "xxxxxx",
                "guideNameFieldID" : "xxxxxx",
                "guideAuthorFieldID" : "xxxxxx"
            });
        });
    });
    </script>

 * Where the form is being embedded in guides, include this JS:

    <script>
    jQuery(function($) {
        $.getScript("//s3.amazonaws.com/libapps/sites/231/include/libanswers-form-external.js", function() {
            externalFormInit( {"formID" : "xxxxxxxxxxxx"} );
        });
    });
    </script>

 */

/* internalFormInit tracks current page (aka "referrer"), guide name, and guide author. */
function internalFormInit(configJSON) {
    jQuery(function($) {
        // Get the appropriate IDs for the fields we're filling in.
        var pageUrlFieldID = configJSON.pageUrlFieldID;
        var guideNameFieldID = configJSON.guideNameFieldID;
        var guideAuthorFieldID = configJSON.guideAuthorFieldID;

        // Send the LibGuides parent frame a message to let it know the form is loaded and ready for communication.
        window.parent.postMessage("LIBSURVEY_iframe_loaded", "*");

        // Handle incoming messages from LibGuides parent frame
        $(window).on("message onmessage", function(e) {
            var message = e.originalEvent;
            // Make sure the message is the one we sent from LibGuides. (Security measure to prevent XSS attacks.)
            if ( message.origin.match(/https?:\/\/upenn\.libapps\.com|https?:\/\/guides\.library\.upenn\.edu/) ) {
                // Use a try-catch to parse the data, because if the data isn't JSON, an error will be thrown.
                try {
                    var data = JSON.parse(message.data);
                    // If this JSON contains our distinguishing marker, it's the one we want.
                    if (data.LIBGUIDES_DATA) {
                        $("#fld-" + pageUrlFieldID).val(data.pageURL);
                        $("#fld-" + guideNameFieldID).val(data.guideName);
                        $("#fld-" + guideAuthorFieldID).val(data.guideAuthor);
                    }
                } catch(err) {
                    // This message wasn't our JSON, so ignore it and move on.
                }
            }
        });
    }); //end jQuery
} //end internalFormInit