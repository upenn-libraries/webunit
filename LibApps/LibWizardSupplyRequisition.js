/* Adding custom classes to the Supply Requisition form:
   https://upenn.libwizard.com/forms/edit/d65bb225da90acc473e9aec1fd4c4e9f
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
  applyFieldClasses();
  $('.btn-begin').click(applyFieldClasses); //also re-run when clicking Next/Start from an intro page
} //end pageTasks()

function applyFieldClasses() {
  $('libwizard-question').each(function() {
    var idNum = $(this).find('label').attr('for');
    if (!idNum) {
      // Try getting the value from an embedded H2's ID.
      idNum = $(this).find('h2, h3, h4').attr('id');
    }
    if (idNum) {
      $(this).addClass('field-'+idNum);
    }
  });
}
