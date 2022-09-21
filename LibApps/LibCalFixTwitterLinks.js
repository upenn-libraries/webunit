jQuery(function($) {
  // Use Twitter Web Intent: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
  var newURL = 'https://twitter.com/intent/tweet?url=' + $('meta[property="og:url"').attr('content') +
    '&text=Check%20out:%20' + encodeURIComponent($('meta[property="og:title"').attr('content'));
  $('#s-lc-event-b-t').attr('href', newURL);
});
