/* Homepage Feedback Form
 * https://faq.library.upenn.edu/feedback
 *
 * This JS collects information about the referring page and
 * appends it to the user's written submission.
 */

jQuery(function($) {
  // Customize these variables depending on your specific LibAnswers widget.
  var userInputBox = "#val4_44183";
  var formID = "#s-la-askform-form_44183";

  // Briefly wait before executing this code. For some reason, this page needs time to build the form.
  setTimeout(function() {
    // Callback after LibAnswers script runs.
    // Add our submit handler that captures relevant data (such as the openURL) and adds it to the form before it gets submitted.
    var $libAnswersForm = $(formID);
    //$libAnswersForm.unbind("submit"); //debug: remove Springshare's form submit handler
    $libAnswersForm.submit(function(e) {
      //e.preventDefault(); //debug: prevent page reload on submit
      // Append this data to the user's written submission.
      var inputVal = $(userInputBox).val();
      if (!inputVal) {
        $(userInputBox).val(document.referrer ? document.referrer : "Not Available");
      }
    });
    // Springshare already gave the form a submit handler, but we want ours to run first.
    // We have to reorder the submit handlers so ours goes first.
    // http://www.robeesworld.com/blog/67/changing-the-order-of-the-jquery-event-queue
    var eventList = $._data($libAnswersForm[0], 'events');
    eventList.submit.unshift(eventList.submit.pop());

  }, 500); //end timeout

}); //end jquery
