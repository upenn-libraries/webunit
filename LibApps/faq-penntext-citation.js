/* This script is used in the main Penn Libraries faq form: https://faq.library.upenn.edu/ask
 * It embeds citation infomation into form submissions that came from PennText.
 * The citation info gets passed along through URL parameters.
 *
 * As of writing this script, the following OpenURL keys can appear in the URL params:
    rfe_dat
    rfr_id
    rft.atitle
    rft.au
    rft.aufirst
    rft.auinit
    rft.aulast
    rft.date
    rft.doi
    rft.edition
    rft.eisbn
    rft.eissn
    rft.epage
    rft.genre
    rft.isbn
    rft.issn
    rft.issue
    rft.jtitle
    rft.month
    rft.number
    rft.place
    rft.pub
    rft.publisher
    rft.pubdate
    rft.pubyear
    rft.spage
    rft.stitle
    rft.btitle
    rft.title
    rft.volume
*/

jQuery(function($){

  var $askForm = $('#s-la-askform-form_2165');
  var $formInputBox = $('#pdetails_2165');
  var urlParams = window.location.search
    .slice(1) //remove question mark
    .split('&'); //put params in array

  // Only run this code if we're on the correct form and there are URL parameters.
  if (urlParams.length && $askForm.length) {
    var finalList = "";

    for (var index in urlParams) {
      if (urlParams.hasOwnProperty(index)) {
        var param = urlParams[index].split('=');
        if (param.length === 2) {
          var key = param[0];
          //Decode the value & replace pluses with spaces:
          var value = decodeURIComponent(param[1].replace(/\+/g, ' '));

          if (value && (key.startsWith('rft') || key === 'rfe_dat' || key === 'rfr_id')) {
            finalList += key + ': ' + value + '\n';
          }
        }
      }
    }
    if (finalList.length) {
      // Add standardized text
      finalList = '\n\n*** Script-generated citation details from PennText: ***\n'+finalList;
      //console.log(finalList);

      // On form submit, append our citation information to the user's text
      $askForm.submit(function() {
        var userText = $formInputBox.val();
        $formInputBox.val(userText + finalList);
      });
      // Springshare already gave the form a submit handler, but we want ours to run first.
      // We have to reorder the submit handlers so ours goes first.
      // http://www.robeesworld.com/blog/67/changing-the-order-of-the-jquery-event-queue
      var eventList = $._data($askForm[0], 'events');
      eventList.submit.unshift(eventList.submit.pop());
    } //end if finalList
  } //end if params & form
}); //end jQuery
