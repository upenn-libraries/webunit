jQuery(function($){

  /*------------- NAV ID BAR ---------------- */

  // for help and login/account dropdown in nav-id-bar
  $('.idbarbutton.clickableArrow').click(function() {
    $(this).next().toggle(); // toggle the actual menu
    $(this).toggleClass('active'); // toggle the arrow and minus sign

    // click help, then hide acct; or click acct, then hide help
    $('.idbarbutton.clickableArrow').not(this).removeClass('active');
    $('.idbarbutton.clickableArrow').not(this).next().hide();
  });

  /*touchstart click hover makes sure there is no delay on a touch devide*/
  $(document).bind("touchstart click hover", function(e) {
    /*this function makes the dropdown go away if you click somewhere else but if you click the element itself, don't hide it. */
    if ($(e.target).closest('#clickacctdropdown').length != 0 || $(e.target).closest('#acctDropdown').length != 0) {
      // do nothing here because we clicked either the button or the dropdown itself      
    }
    else if ($(e.target).closest('#clickhelpdropdown').length != 0 || $(e.target).closest('#helpDropdown').length != 0){
      // do nothing here - for the help drop down
    }
    else {
      $("#idbar .subnav").css('display', 'none');
      $('#clickacctdropdown').removeClass('active');
      $('#acctDropdown').css('display', 'none');
      $('#clickhelpdropdown').removeClass('active');
      $('#helpDropdown').css('display', 'none');
    }

  });

  // move #s-la-public-header after #s-la-page-title-bar
  $('#s-la-public-header').insertAfter($('#s-la-page-title-bar'));
    
  // add classes
  var currentUrl = window.location.href;
  if (currentUrl.indexOf('business') > -1) {
    $('#sitename').addClass('grouppage').text("Business FAQ");
  } else if (currentUrl.indexOf('IPC') > -1) {
    $('#sitename').addClass('grouppage').text("IPC FAQ");

  } else if (currentUrl.indexOf('admin') > -1) {
    $('#s-la-public-header').addClass('showmenu');
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i<  ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return "";
  }

  function windowOnloadTasks() {
    // Populate the library home link
    $('#homepagelink').wrapInner('<a href="http://www.library.upenn.edu' + readCookie('hp') + '"></a>');

    // If #s-lib-public-header has a child of class "breadcrumb", give it the class "holdbreadcrumb" for styling purposes.
    $("#s-lib-public-header").has(".breadcrumb").addClass("holdbreadcrumb");
  }
  $(window).on('load', windowOnloadTasks); //jquery's cross-browser treatment

  /*------------- RESPONSIVE CONFIGURATION ---------------- */

  function responsiveConfig() {
    if ($(window).width() > 876) { // desktop
      $('body').addClass("desktop").removeClass("tablet").removeClass("phone"); //just in case
    } //end of desktop config

    else if ($(window).width() > 499) {  // 499 < width <= 876
      $('body').removeClass("desktop").addClass("tablet").removeClass("phone");
    } //end of tablet config

    else {
      $('body').removeClass("desktop").addClass("tablet").addClass("phone");
    } //end of phone config
  }

  // Initialization of responsive configuration
  /* When you first come to the page */
  responsiveConfig();

  /* When you resize your window, the timeout feature ensures responsiveConfig only gets executed at the end of a window-resize action. */
  $(window).resize(responsiveConfig);

  /*------------- SEARCH WIDGET ---------------- */
  /*prevent the page from jumping to the div when tabs on the search widget are clicked*/
  $('#franklintabs').click(function(evt) {
      evt.preventDefault();
  });

  //initially hide all searches except guides search
  $('#franklintabs a').each(function() {
    if ($(this).attr('href')!=="#mainsrch") {
      $(this).removeClass('active');
      $($(this).attr('href')).hide();
    }
  });

  //click a tab
  $('#franklintabs a.searchwidgettab').click(function() {
    $('#franklintabs a').each(function() {
      $(this).removeClass('active');
      $($(this).attr('href')).hide();
    });

    $(this).addClass('active');
    $($(this).attr('href')).show();
  });

}); //end guides2015.js