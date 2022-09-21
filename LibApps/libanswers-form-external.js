/**
 * See libanswers-form-internal.js for detailed notes.
 *
 * Note: This only works in IE8 and above.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */

function externalFormInit(configJSON) {
    jQuery(function($) {
        // Get the ID of the form we're communicating with.
        var formID = configJSON.formID;

        // When the LibSurveys iframe loads, it posts a message to let us know it has loaded.
        $(window).on("message onmessage", function(e) {
            var message = e.originalEvent;
            
            // If this message is from LibSurveys and indicates that the form is ready, respond with our desired message.
            if (message.origin.match(/https?:\/\/.*\.libsurveys.com|https?:\/\/.*\.libwizard.com/) && message.data == "LIBSURVEY_iframe_loaded") {
                var myiframe = document.getElementById("iframe_" + formID);
                if (myiframe && message.source == myiframe.contentWindow) {
                    var data = {
                        "LIBGUIDES_DATA" : true, // Just a distinguishing marker for the iframe to use to identify this message
                        "pageURL" : window.location.href,
                        "guideName" : $("#s-lg-guide-name").text(),
                        "guideAuthor" :  $("meta[name='DC.Creator']").attr("content")
                    };
                    /*var targetOrigin = "http://libsurveys.com";
                    if (message.origin.startsWith("https")) {
                        targetOrigin = "https://libsurveys.com";
                    }*/
                    var targetOrigin = message.origin;
                    myiframe.contentWindow.postMessage(JSON.stringify(data), targetOrigin);
                }
            }
        });
    }); //end jQuery
} //end guidesFormInit