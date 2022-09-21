/* This is an example of how to use jQuery in custom JS in LibWizard.
 * For some reason, they have either obscured or removed jQuery in LibWizard v2.
 * So, this JS can dynamically fetch jQuery from Google's CDN before running our code.
 */

// Load jQuery if it's not already available. Then run our custom JS.
// https://stackoverflow.com/a/10113434/7560421
(function() {
    if (typeof jQuery === "undefined") {
      var script = document.createElement("SCRIPT");
      script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.1/jquery.min.js';
      script.type = 'text/javascript';
      script.onload = function() {
          var $ = window.jQuery;
          pageTasks($);
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      pageTasks(jQuery); //jQuery already exists
    }
})();

function pageTasks($) {
  // Your custom stuff goes in here...
  $(".page-title").text("Hello world! jQuery made a change. #3");
  $("button[name='submit']").click(function() {
    console.log("submit!");
    $("label[for='emailuser']").text("hello");
    setTimeout(function() {
      $("label[for='emailuser']").text("after timeout");
    }, 1000);
  });
}
