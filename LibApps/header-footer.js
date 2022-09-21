<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WT939T');
</script>
<!-- End Google Tag Manager -->


<script>
$(document).ready(function() {
/***** BEGIN LOGIN SCRIPTS *****/
// If the #navandidbar is on this page, load the login scripts. (Otherwise don't, because login.js will crash and you'll have a bad time.)
if ($("#navandidbar").length) {
  $.getScript("https://www.library.upenn.edu/scripts/login/loginStatusModule.js", function(){
    $.getScript("https://www.library.upenn.edu/scripts/login/login.js", function(){
      $.getScript("https://www.library.upenn.edu/scripts/login/json2.js", function(){
        $.getScript("https://www.library.upenn.edu/scripts/login/storage.js", function() {
          // All scripts have finished loading. Any desired callback code can go here.
          console.log("here");
        });
      });
    });
  });
}
/***** END LOGIN SCRIPTS *****/
});
</script>