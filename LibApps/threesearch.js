(function($) {
    $(document).ready(function() {
      
      // Toggle radio button active class
      $('#block-sitewidesearchbar #radiobluebuttons .holdradio').click(function() {
        $(this).addClass('active');
        $('#block-sitewidesearchbar .holdradio').not(this).removeClass('active');
      });

      $('#block-sitewidesearchbar #radiobluebuttons input[type="radio"]').click(function() {
        $('#block-sitewidesearchbar .searchform').each(function() {
          $(this).removeClass('active');
        });
        $('#block-sitewidesearchbar #'+$(this).val()).addClass('active');
        $('#block-sitewidesearchbar #'+$(this).val()).children('input[type="text"]').focus();
      });

      // Allow for text shadowing across the three input forms for the three different kinds of searches
      var $inputForms = $('#block-sitewidesearchbar #cataloginput, #block-sitewidesearchbar #guidesinput, #block-sitewidesearchbar #googleinput');
      $inputForms.each(function() {
        $(this).change(function() {
          var newText = $(this).val();
          // Remove google search's watermark
          $('#block-sitewidesearchbar #googleinput').css('background-image', 'url()');
          $inputForms.each(function() {
            $(this).val(newText);
          });
        });
      });
        
    });
})(jQuery);
