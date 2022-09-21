/* Adding custom classes to this Consultation/Instruction form:
 * - edit: https://upenn.libwizard.com/forms/edit/80482e7c12bf24ad1bc736d4e98dd971
 * - live: https://upenn.libwizard.com/f/New-Consultation-Instruction-Form-Revised
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
  var $form = $('#main-content > form');
  var $selectBox = $('#2957867,#3154979'); // Consultation/Instruction dropdown.
  $selectBox.change(function() {
    $form.removeClass('page-consultation page-instruction');
    switch ($selectBox.val()) {
      case 'Consultation':
        $form.addClass('page-consultation');
        break;
      case 'Instruction':
        $form.addClass('page-instruction');
        break;
    }
    
    // Use a short delay when adding classes to fields (Springshare's JS needs time to add the elements to the DOM.)
    setTimeout(applyFieldClasses, 250);

    // Apply class logic to all dropdowns. Needs a timer because it's embedded with logic.
    setTimeout(function() {
      var $allSelectBoxes = $('.lwz-select');
      $allSelectBoxes.change(function() {
        setTimeout(applyFieldClasses, 250);
      });
    }, 250);
  });
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
