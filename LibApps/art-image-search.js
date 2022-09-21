// We add setTimeout() to make it works, but don't know why.
setTimeout(function(){

$("#finearts-img-search").submit(function(e) {
    //alert("here");
    e.preventDefault();
    var keyword = $(this).find('.q').val();
    var newurl = "https://proxy.library.upenn.edu/login?url=http://library.artstor.org/#/search/";
    if (keyword) {
      //keyword = numberEncode(keyword);
      //var newurl = "http://www.sscommons.org/openlibrary/#3|search|6|All20Collections3A20"+keyword+"|Filtered20Search|||type3D3626kw3D"+keyword+"26id3Dall";
      newurl += keyword+";page=1;size=24;";
    }
    window.location.href = newurl;
  });

// helper function for shared shelf search
function numberEncode(x) {
  // x = encodeURI(x);
    var y = "";
    for (var i = 0; i < x.length; i++) {
      if (x[i] >= '0' && x[i] <= '9') {
        y += "3"+x[i];
      }
      else {
        y += escape(x[i]).replace('%', '');
      }
  }

  return y;
}

}, 250);