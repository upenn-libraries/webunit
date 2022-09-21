(function($) {
  $(document).ready(function() {
    var url = location.pathname;
    if(url.indexOf('lippsem/lippincott-seminar') > -1) {
      $("body").attr("class","lippincott-seminar");
    }
    else if(url.indexOf('btc-classrooms/collaborative') > -1) {
      $("body").attr("class","btc-collaborative");
    }
    else {
    }
  });
})(jQuery);