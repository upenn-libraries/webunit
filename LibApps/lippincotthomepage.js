jQuery.noConflict();
jQuery(function($){

  /*-------------Nav ID Bar---------------- */

  // for help and login/account dropdown in nav-id-bar
  $('.idbarbutton.clickableArrow').click(function() {
    $(this).next().toggle(); // toggle the actual menu
    $(this).toggleClass('active'); // toggle the arrow and minus sign

    // click help, then hide acct; or click acct, then hide help
    $('.idbarbutton.clickableArrow').not(this).removeClass('active');
    $('.idbarbutton.clickableArrow').not(this).next().hide();
  });

  // for the workshops button in #multiplelinks
  $('.wkshopsbutton').click(function() {
    $('#workshops').toggleClass('active');
  });

  /*touchstart click hover makes sure there is no delay on a touch devide*/
  $(document).bind("touchstart click hover", function(e) {
    /*this function makes dropdowns go away if you click somewhere else but if you click the element itself, don't hide it. */
    if ($(e.target).closest('#clickacctdropdown').length !== 0 || $(e.target).closest('#acctDropdown').length !== 0) {
      // do nothing here because we clicked either the button or the dropdown itself      
    }
    else if ($(e.target).closest('#clickhelpdropdown').length !== 0 || $(e.target).closest('#helpDropdown').length !== 0) {
      // do nothing here - for the help drop down
    }
    else if ($(e.target).closest('.wkshopsapiholder').length !== 0 || $(e.target).closest('.wkshopsbutton').length !== 0) {
      // do nothing here - for the workshops button
    }
    else {
      $('#clickacctdropdown').removeClass('active');
      $('#acctDropdown').hide();
      $('#clickhelpdropdown').removeClass('active');
      $('#helpDropdown').hide();
      $('#workshops').removeClass('active');
    }
  });

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i<  ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
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


  /*-------------Workshops Dropdown---------------- */
  // Run Springshare's script, and when it's done, reformat the dates in the generated list.
  var workshopScriptURL = "https://api3.libcal.com/api_events.php?iid=335&m=week&cid=659&c=&d=&l=10&simple=ul_date&context=object&format=js";
  var monthAbbr = {
    "January" : "Jan", "February" : "Feb", "March" : "Mar", "April" : "Apr", "May" : "May", "June" : "Jun",
    "July" : "Jul", "August" : "Aug", "September" : "Sep", "October" : "Oct", "November" : "Nov", "December" : "Dec"
  };
  $.getScript(workshopScriptURL, function() {
    if ($('#workshops .s-lc-ea-date').length <= 0) {
      $('.wkshopsapiholder').append('<ul><li>No Lippincott workshops this week.</br><a href="http://libcal.library.upenn.edu/calendar/lippincott">See full calendar..</a></li></ul>');
    } 
    else {
      $("#workshops .s-lc-ea-date").each(function() {
        var date = $(this).text();
        date = date.replace(/([^]*?- [^]*?) (\w*), ([^,]*) (\d+),.+/, function(match, p1, p2, p3, p4) {
          return monthAbbr[p3] + " " + p4 + ", " + p1;  // MMM DD, TIME
        });
        $(this).text(date);
      });
    }
  });


  /*-------------Responsive Configuration---------------- */
  var image = $('#navandidbar').css('background-image');
  function responsiveConfig() {
    $('div.btn-group.dropdown.threeLinesMenu').hide();
    $('#mainlinks').show();
    
    if ($(window).width() > 975) { // desktop
      $('body').addClass("desktop").removeClass("tablet").removeClass("phone"); //just in case
      $('div.btn-group.dropdown.threeLinesMenu').hide();
      $('#mainlinks').show();
      $('#footer').hide();
      $('.phoneonly').hide();
      $('#chat').show();
      $('#midimage, #faculty').attr('class', 'col-md-4');
      
      // make sure element style will not over-ride the css (li:hover)
      // otherwise we will have style="display:none"
      $('#mainlinks.menu_s li.menu ul.subnav').attr('style',''); 
      $('.holdmenulink').each(function(){
        if($(this).hasClass('hover')){
          $(this).removeClass('hover');   
        }
      }); 
    } //end of desktop config

    else if ($(window).width() > 499) { // tablet
      $('body').removeClass("desktop").addClass("tablet").removeClass("phone");
      $('body').removeClass("nobg").addClass("yesbg");
      $('div.btn-group.dropdown.threeLinesMenu').show(); // show the 3-bar icon
      $('#mainlinks3').hide(); // hide menu under the 3-bar
      $('#mainlinks').hide(); 
      $('#footer').hide();
      $('.phoneonly').hide();
      $('#navandidbar').css('background-image', image);
      $('#chat').hide();
      $('#midimage, #faculty').attr('class', 'col-md-6');
    } //end of tablet config

    else { // phone: note that body takes on both tablet and phone classes for this config
      $('#guidesradiobutton').click();
      $('body').removeClass("desktop").addClass("tablet").addClass("phone");
      $('#navandidbar').css('background-image', 'none');
      $('#footer').show();
      $('.phoneonly').show();
    } //end of phone config
  }

  // Initialization of responsive configuration when user first comes to page
  responsiveConfig();

  /* When you resize your window, the timeout feature ensures responsiveConfig only gets executed at the end of a window-resize action. */
  $(window).resize(responsiveConfig);


  /*--------------Menu Bar------------------*/
  // prevent the hrefs from redirecting the page
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
    }, function() { // on hover out
      // set the flag as the mouse has left
      $(this).attr('mouseIn', 'false');
      // remove hover effects
      $(this).removeClass('hover');
    });

  $(document).bind("touchstart click",  function(e){
      if($(e.target).parents('#mainlinks').length !== 0 || $(e.target).parents('#menubar div.btn-group.dropdown.threeLinesMenu').length !== 0 ){
      }
      else{
        $('#mainlinks.menu_s li.menu div.holdmenulink, #mainlinks.menu_s li.menu h3.holdmenulink').removeClass('hover');
        // hide 3-bar menu by using the click function defined earlier
        if($('#mainlinks3').is(':visible')){
           $('nav#menubar div.btn-group a.btn').click();
        }     
      }   
    });


  /*-------------3 Lines Menu (Hamburger)--------------*/
   // clicking the 3-bar icon
  $('nav#menubar div.btn-group a.btn').click(function(){
    $('#mainlinks3').toggle();
    $('.sccDropdown.ownDropdownMenu').hide(); // hide all the sub-menus
  });
  
  // clicking each item on the big menu under 3-bar you will see submenu
  $('ul#mainlinks3.topnav3 li').click(    
    function(){
      $('.sccDropdown.ownDropdownMenu').hide(); 
      var ul = $(this).find('ul.sccDropdown.ownDropdownMenu');
          ul.attr('style','display:block; left:-' + ul.outerWidth()+'px'); // show the respective submenu
    }   
  );


  /*-----------------Lippincott's Blog Feed-------------*/
  pennFeedReader.getFeed('#moreposts', 'http://lippincottlibrary.wordpress.com/feed/',
    {
        limit: 2,
        layoutTemplate: '<div class="feed-container">{entries}</div>',
        entryTemplate: '<div class="channelitem"><div class="itemtitle"><a target="_new" href="{url}">{title}</a></div></div>',
        outputMode: 'json_xml'
    },
    function callback() {
      // no  callback necessary
    });
}); // end JQuery