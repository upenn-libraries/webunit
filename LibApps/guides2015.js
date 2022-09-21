(function($) {
  $(document).ready(function() {
    /* Add 'Report a broken link' button to the footer.
       This button triggers a modal hidden in the footer; contains an embedded form. */
    var $reportLinkButton = $('<a href="https://upenn.libwizard.com/f/broken-link" style="color: #c7e0e4">Report a broken link</a>');
      /*.on('click', function(e) {
        e.preventDefault();
        $('#reportLinkModal').modal('show')
          .find('iframe').attr('width', '100%').attr('height', '510px');
      });*/
    var $reportLink = $('<li id="reportlink">|&#160; </li>')
      .append($reportLinkButton).appendTo($('#s-lg-guide-header-attributes'));

    /* Remove springshare's default skiplink. We have our own skiplinks in place.
     * Their skiplink is in the default templates, which we cannot change. */
    $('#s-lg-public-skiplink').remove();

    var path = window.location.pathname;
    /*------------- add class production or class homepage on body ---------------- */
    if (path == "/") {
      $('body').addClass('homepage');
    } else if(path.indexOf("admin_c.php") == -1) {
      $('body').addClass('production');
    }
    /*------------- NAV ID BAR ---------------- */
    // for help and login/account dropdown in nav-id-bar
    //$('.idbarbutton.clickableArrow').click(function() {
    $(document).on("click", ".idbarbutton.clickableArrow", function() {
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
      else if ($(e.target).closest('#clickhelpdropdown').length != 0 || $(e.target).closest('#helpDropdown').length != 0) {
        // do nothing here - for the help drop down
      }
      else {
        $("#navandidbar .subnav").css('display', 'none');
        $('#clickacctdropdown').removeClass('active');
        $('#acctDropdown').css('display', 'none');
        $('#helpDropdown').css('display', 'none');
      }
    });

    $("#s-lg-tabs-container,.nav-tabs,.nav-stacked,.s-lg-subtab-ul,a.s-lg-tab-top-link,a.s-lg-tab-drop.dropdown-toggle").on("mouseover", function () {
      $(this).parent('li').addClass('hovered');
    });

    $("#s-lg-tabs-container,.nav-tabs,.nav-stacked,.s-lg-subtab-ul,a.s-lg-tab-top-link,a.s-lg-tab-drop.dropdown-toggle").on("mouseleave", function () {
      $(this).parent('li').removeClass('hovered');
    });

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

      // If the page has the admin bar, give the body a class of "adminpage" for styling purposes.
      if ($("#s-lg-admin-command-bar").length) {
        $("body").addClass("adminpage");
      }
    }
    $(window).on('load', windowOnloadTasks); //jquery's cross-browser treatment

    /***** BEGIN LOGIN SCRIPTS *****/
    // If the #navandidbar is on this page, load the login scripts. (Otherwise don't, because login.js will crash and you'll have a bad time.)
    /*if ($("#navandidbar").length) {
      $.getScript("https://www.library.upenn.edu/scripts/login/loginStatusModule.js", function(){
        $.getScript("https://www.library.upenn.edu/scripts/login/login.js", function(){
          $.getScript("https://www.library.upenn.edu/scripts/login/json2.js", function(){
            $.getScript("https://www.library.upenn.edu/scripts/login/storage.js", function() {
              // All scripts have finished loading. Any desired callback code can go here.
            });
          });
        });
      });
    }*/
    /***** END LOGIN SCRIPTS *****/

    /*------------- RESPONSIVE CONFIGURATION ---------------- */
    function responsiveConfig() {

      var width = $(window).width();
      // get number of tabs
      var tabNum = $('#s-lg-guide-tabs .nav').children().length;
      
      if (width >= 960) { // desktop
        $('body').addClass("desktop").removeClass("tablet").removeClass("phone"); //just in case
        
        // make sure element style will not over-ride the css (li:hover)
        // otherwise we will have style="display:none"
        $('#mainlinks.menu_s li.menu ul.subnav').attr('style','');
        $('.holdmenulink').each(function() {
          if ($(this).hasClass('hover')) {
            $(this).removeClass('hover');
          }
        });

        // change tabs from stacked style to desktop style
        $('#s-lg-guide-tabs > ul').removeClass('nav-stacked');
        $('#s-lg-guide-tabs').removeClass('collapse');

        // add 'dropdown-menu' class so that when user hovers tabs with arrow, it shows the dropdown menu
        $('#s-lg-guide-tabs .dropdown ul').addClass('dropdown-menu');
        // 'list-group-item' is for stacked-style tabs only
        $('#s-lg-guide-tabs .dropdown ul li').removeClass('list-group-item');
      } //end of desktop config

      else if (width > 499) {  // 499 < width <= 876
        $('body').removeClass("desktop").addClass("tablet").removeClass("phone");

        // change tabs from desktop style to stacked style
        $('#s-lg-guide-tabs > ul').addClass('nav-stacked');
        $('#s-lg-guide-tabs').addClass('collapse');

        // tabs now don't contain dropdown-menu and become list style
        $('#s-lg-guide-tabs .dropdown ul').removeClass('dropdown-menu');
        $('#s-lg-guide-tabs .dropdown ul li').addClass('list-group-item');
      } //end of tablet config

      else {
        $('#guidesradiobutton').click();
        $('body').removeClass("desktop").addClass("tablet").addClass("phone");
        $('#navandidbar').css('background-image', 'none');

        // change tabs from desktop style to stacked style
        $('#s-lg-guide-tabs > ul').addClass('nav-stacked');
        $('#s-lg-guide-tabs').addClass('collapse');

        // tabs now don't contain dropdown-menu and become list style
        $('#s-lg-guide-tabs .dropdown ul').removeClass('dropdown-menu');
        $('#s-lg-guide-tabs .dropdown ul li').addClass('list-group-item');
      } //end of phone config
    if (width <= 995) { // desktop
        $('body').addClass("vsmalldesk"); //just in case// JavaScript Document
    }
    if (width > 995) { // desktop
    $('body').removeClass("vsmalldesk"); //just in case// JavaScript Document
    }

      /* Show submenu when hovering dropdown menu. */
      $('.tablet #s-lg-guide-tabs .dropdown').hover(function() {
        if (!$(this).hasClass('active')) {
          //$(this).children('.s-lg-subtab-ul').show();
          $(this).children('.s-lg-subtab-ul').attr('style','display: block;');
        }
      }, function () {
         if (!$(this).hasClass('active')) {
            //$(this).children('.s-lg-subtab-ul').hide();
            $(this).children('.s-lg-subtab-ul').attr('style','');
        }
      });

      var guidepagesbutton = $("#guidepagesbutton button");
      var guideTabs = $("#s-lg-guide-tabs");
      if (width < 900 && tabNum <= 7) {
        if (typeof guideTabs.attr('aria-expanded') == "undefined"){
          $("#s-lg-guide-tabs").removeClass('collapse');
          $("#s-lg-guide-tabs").attr('aria-expanded', 'true');
          guidepagesbutton.attr('aria-expanded', 'true');
          guideTabs.addClass('collapse');
          guideTabs.addClass('in');
          guidepagesbutton.text(hideText);
        }
      }

      $('#s-lg-guide-tabs .dropdown').each(function() {
        if ($('body').hasClass('tablet')) {
          if ($(this).hasClass('active')) {
            //$(this).children('.s-lg-subtab-ul').show();
            $(this).children('.s-lg-subtab-ul').attr('style','display: block;');
          }
        } else {
            //$(this).children('.s-lg-subtab-ul').hide();
            $(this).children('.s-lg-subtab-ul').attr('style','');
        }
      });

    } //end responsiveConfig()

    // Initialization of responsive configuration
    /* When you first come to the page */
    $(document).ready(responsiveConfig);

    /* When you resize your window, the timeout feature ensures responsiveConfig only gets executed at the end of a window-resize action. */
    responsiveConfig();
    $(window).resize(responsiveConfig);

    //add classes to identify & style submenu elements 
    var currentUrl = window.location.pathname + window.location.search;
    var currentSearch = $("#s-lg-guide-tabs a[href='" + currentUrl + "']");
    currentSearch.addClass('active');
    currentSearch.parent('li').addClass('active tocli');
    currentSearch.parent('li').siblings('li').addClass('tocli');
    currentNavContent = $("#s-lg-side-nav-content #s-lg-guide-tabs .nav-pills.nav-stacked li a[href='" + currentUrl + "']");
    currentNavContent.closest('ul').siblings('a').addClass('active auntatag');
    currentNavContent.closest('ul').parent('li').addClass('active bluegranny');
    $(".s-lg-subtab-ul").parent('li').addClass('ligranny');
    $(".s-lg-subtab-ul li").addClass('issub');

    $("#s-lg-tabs-container .nav-tabs.nav-stacked .s-lg-subtab-ul").on("mouseover", function () {
      $(this).parent('li').addClass('active');
    });

    // dynamically change the height of submenu
    if (!$('body').hasClass("homepage") && !$('body').hasClass('production')){
      $('.desktop #s-lg-tabs-container .nav-tabs li .s-lg-subtab-ul.dropdown-menu').each(function() {
        var num = $(this).children().size();
        $(this).css('height', num * 2.92 + 'em');
      });
    }

    /******************* MENU BAR **********************/
    // prevent the tab hrefs from redirecting the page   
    $('#mainlinks.menu_s div.holdmenulink a.menulink, #mainlinks.menu_s h3.holdmenulink a.menulink, #mainlinks3 li.dropdown-submenu a.arrowleft').click(function(e){
      e.preventDefault();
    });

    // Hover-dropdowns with "hover intent" delay, to prevent casual mouse-use from triggering the dropdown.
    $('.menubarheader').hover(function() {
        var $this = $(this);
        // flag to indicate that the mouse has not left the area
        $this.attr('mouseIn', 'true');
        setTimeout(function () {
          // if the mouse is still in the area after the delay, trigger the hover effects.
          if ($this.attr('mouseIn') == 'true') {
            $this.addClass('hover');
          }
        }, 150);
      }, function() { //on hover out
        // set the flag as the mouse has left
        $(this).attr('mouseIn', 'false');
        // remove hover effects
        $(this).removeClass('hover');
      });

    $(document).bind("touchstart click",  function(e) {
      if ($(e.target).parents('#mainlinks').length != 0 || $(e.target).parents('#menubar div.btn-group.dropdown.threeLinesMenu').length != 0 ) {
      }
      else {
        $('#mainlinks.menu_s li.menu div.holdmenulink, #mainlinks.menu_s li.menu h3.holdmenulink').removeClass('hover');
        // hide 3-bar menu by using the click function defined earlier
        if ($('#mainlinks3').is(':visible')) {
           $('nav#menubar div.btn-group a.btn').click();
        }
      }
    });

    /*************** 3 lines menu (hamburger) ******************/
     // clicking the 3-bar icon
    $('nav#menubar div.btn-group a.btn').click(function() {
      $('#mainlinks3').toggle();
      $('.sccDropdown.ownDropdownMenu').hide(); // hide all the sub-menus
    });
    
    // clicking each item on the big menu under 3-bar you will see submenu
    $('ul#mainlinks3.topnav3 li').click(
      function() {
        $('.sccDropdown.ownDropdownMenu').hide();
        var ul = $(this).find('ul.sccDropdown.ownDropdownMenu');
        ul.attr('style','display:block; left:-' + ul.outerWidth()+'px'); // show the respective submenu
      }
    );

   

    

    /*--------------Footer (for use in the phone mode) ------- */
    function attachPhoneModeListeners() {
      $('body').on('click', 'li.footergroup', function(e){
          e.stopPropagation();
          $(this).toggleClass('active');
        });
        $('body').on('click', '#footercanvasheader', function(e){
          e.stopPropagation();
          $('li.footercanvas, #footercanvasheader').toggleClass('active');
        });
        $('body').on('click', '#footertoolsheader', function(e){
          e.stopPropagation();
          $('li.footertools, #footertoolsheader').toggleClass('active');
        });
        $('body').on('click', '#footercontactheader', function(e){
          e.stopPropagation();
          $('li.footercontact, #footercontactheader').toggleClass('active');
        });
    }
    attachPhoneModeListeners();

    /***** Add guidepages button *****/
    var guideName = $('#s-lib-bc-guide > a').attr('title');
    var btnText = guideName + ": All pages";
    var hideText = "Hide table of contents";
    var path = window.location.pathname;
    if (path != '/') {
      // create "table of contents" button
      $('<div id="guidepagesbutton" class="hl-toc-button hidden-md hidden-lg"><button type="button" class="toc-toggle btn btn-default center-block" data-toggle="collapse" data-target="#s-lg-guide-tabs"> <span class="caret"></span></button></div>').insertAfter('#s-lg-guide-header');
      
      // create "filter and sort results" button
      $('<div id="filter" class="hl-toc-button hidden-md hidden-lg"><button type="button" class="toc-toggle btn btn-default center-block" data-toggle="collapse" data-target="#col1">Filter or Sort Results <span class="caret"></span></button></div>').insertAfter('#s-lib-public-header');
    }
    // move the default footer to the last
    $('body').append($('#s-lib-footer-public'));
   
    // Wrap page contents in a container div for styling.
    var urlpath = window.location.pathname;
    if ($(".kWidgetIframeContainer").length <= 0) {
      $(".wrapper--searchbar").nextUntil(".wrapper--nav-footer").wrapAll("<div class='page-contents container'></div>");
    }

    var guidepagesbutton = $("#guidepagesbutton button");
    guidepagesbutton.text(btnText);
    guidepagesbutton.click(function(){
      var attrExpanedTab = $("#s-lg-guide-tabs").attr("aria-expanded");
      if (attrExpanedTab == "true") {
        guidepagesbutton.text(btnText);
      } else {
        guidepagesbutton.text(hideText);
      }
    });

    // /***** BEGIN INNER TABS *****/
    var $currentTab = $("#s-lg-guide-tabs .nav > li.active");
    // If this is a tabbed guide (not a sidebar page), and if there are subpages and no innertabs already on the page, add innertabs:
    if ($(".s-lg-tabs-side").length <= 0 && $currentTab.find("ul").length > 0 && $(".holdinnertabs").length <= 0) {
      // Fetch innertabs stylesheet.
      $("head").append('<link rel="stylesheet" type="text/css" href="'+window.location.protocol+'//s3.amazonaws.com/libapps/sites/231/include/innertabs.css?v=2" />');
      // Set up containers
      var $guideContainer = $("#s-lg-guide-main");
      var $innerTabsContainer = $('<p class="unwantedp holdinnertabs"></p>');
      // Add parent tab to innertabs list
      var $parentLink = $currentTab.children("a:first");
      var $firstTab = $('<a class="innertab"></a>').attr("href", $parentLink.attr("href")).text($parentLink.text()).appendTo($innerTabsContainer);
      // Make innertabs out of the old dropdown links
      $("#s-lg-guide-tabs li.active.dropdown li a").each(function(index, dropdownLink) {
        var $innerTab = $(dropdownLink).clone().addClass("innertab");
        if ($(dropdownLink).parent().hasClass("active")) {
          $innerTab.addClass("active");
        }
        $innerTabsContainer.append($innerTab);
      });
      // If none of the subtabs were active, make the first ("parent") tab active.
      if ($innerTabsContainer.find(".active").length <= 0) {
        $firstTab.addClass("active");
      }
      // Add tabs to page.
      $guideContainer.prepend($innerTabsContainer);
    } //end if
    /***** END INNER TABS *****/

    /***** BEGIN PROFILE HACK *****/
    // In profile boxes, if there is a hidden email address, add it to the Contact section.
     $(".s-lib-profile-container").each( function(index, value) {
      if ($(value).find(".s-lib-profile-email").length > 0) {
        var email = $(value).find(".s-lib-profile-div.s-lib-profile-email a").attr("title");
        if (email) {
          $newEmailLink = $('<a href="mailto:'+email+'">'+email+'</a>');
          var $contactSection = $(value).find(".s-lib-profile-contact");
          if ($contactSection.find("i.fa").length > 0) {
            // If there is an icon link, add before the link.
            $newEmailLink.append("<br>");
            $contactSection.find("i.fa").first().parent().before($newEmailLink);
          } else {
            // Otherwise, just add to the end of the section.
            $contactSection.append($newEmailLink);
          }
        }
      }
    }); //end each
    /***** END PROFILE HACK *****/
    $("#s-lg-srch-cols #s-lg-srch-content #s-srch-source-0 .col-md-3.col-right").css('color', '#fff');

    /***** new search bar starts here *****/
    (function() {
        var cx = '015171683814554281596:8nln-kjivsc';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
      
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
    /***** new search bar ends here *****/

  }); //end document.ready()
})(jQuery);