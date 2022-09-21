/***** Google Tag Manager *****/
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WT939T');

/***** End Google Tag Manager *****/

$(document).ready(function() {

function windowOnloadTasks() {
  // If the page has the admin bar, give the body a class of "adminpage" for styling purposes.
  if ($("#s-lg-admin-command-bar").length) {
    $("body").addClass("adminpage");
  }
}
$(window).on('load', windowOnloadTasks); //jquery's cross-browser treatment



/***** BEGIN SIDEBAR OVERRIDES *****/
$("#s-lg-tabs-container,.nav-tabs,.nav-stacked,.s-lg-subtab-ul,a.s-lg-tab-top-link,a.s-lg-tab-drop.dropdown-toggle").on("mouseover", function () {
  $(this).parent('li').addClass('hovered');
});
$("#s-lg-tabs-container,.nav-tabs,.nav-stacked,.s-lg-subtab-ul,a.s-lg-tab-top-link,a.s-lg-tab-drop.dropdown-toggle").on("mouseleave", function () {
  $(this).parent('li').removeClass('hovered');
});

/* This determines which links go before and after the current guide's navigation sidebar.
   You may rearrange the links, add/remove links, and change the labels as desired.
   The links may be to other LibGuides, and they may also be external links. ("guideID" is only needed for guides.) */
var altMenu = {
  'About ALT': {
    'url': 'https://guides.library.upenn.edu/about-alt',
    'guideID' : '1219206',
  },
  'Accessibility Resources': {
    'url': 'https://guides.library.upenn.edu/alt-resources',
    'guideID': '1219208',
  },
  'Accessible Code for Content Providers': {
    'url': 'https://guides.library.upenn.edu/alt-code',
    'guideID': '1219209',
  },
};

// Get the current Guide ID. First check if it's in the page URL, and if not, check the metadata.
// If all else fails, use the page path as the guide ID (for some guides, IDs don't show up in
// the metadata, so we can try a top-level path comparison instead.)
var currentGuideID = "";
var splitURL = window.location.href.split('g=');
if (splitURL.length > 1) {
  currentGuideID = splitURL[1];
} else {
  splitURL = $("meta[name='DC.Identifier']").attr('content').split('g=');
  if (splitURL.length > 1) {
    currentGuideID = splitURL[1];
  } else {
    currentGuideID = window.location.pathname.split('/')[1];
  }
}

var guideMenu = $('#s-lg-guide-tabs > ul');
var after = false;
for (var label in altMenu) {
  var newLink = $('<a href="'+altMenu[label]['url']+'">'+label+'</a>')
    .addClass('helplink');
  if (after) {
    //$(guideMenu).after(newLink); //this will put all links after the current guide in reverse order
    $('#s-lg-guide-tabs').append(newLink);
  } else if (!after && (currentGuideID.startsWith(altMenu[label]['guideID']) || altMenu[label]['url'].match(/https:\/\/guides\.library\.upenn\.edu\/(.*)/)[1].startsWith(currentGuideID))) {
    // If this is the current page, don't insert the link since there's already a menu.
    // Put the remaining links AFTER the menu.
    after = true;
  } else {
    $(guideMenu).before(newLink);
  }
}


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
    $('body').removeClass("desktop").addClass("tablet").addClass("phone");

    // change tabs from desktop style to stacked style
    $('#s-lg-guide-tabs > ul').addClass('nav-stacked');
    $('#s-lg-guide-tabs').addClass('collapse');

    // tabs now don't contain dropdown-menu and become list style
    $('#s-lg-guide-tabs .dropdown ul').removeClass('dropdown-menu');
    $('#s-lg-guide-tabs .dropdown ul li').addClass('list-group-item');
  } //end of phone config

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
$(window).resize(responsiveConfig);

//add classes to identify & style submenu elements 
var currentUrl = window.location.pathname + window.location.search;
var currentSearch = $("#s-lg-guide-tabs a[href='" + currentUrl + "']");
currentSearch.addClass('active');
currentSearch.parent('li').addClass('active tocli');
currentSearch.parent('li').siblings('li').addClass('tocli');
currentNavContent = $("#s-lg-side-nav-content #s-lg-guide-tabs .nav-pills.nav-stacked .nav-pills.nav-stacked li a[href='" + currentUrl + "']");
currentNavContent.closest('ul').siblings('a').addClass('active auntatag');
currentNavContent.closest('ul').parent('li').addClass('active bluegranny');
$(".s-lg-subtab-ul").parent('li').addClass('ligranny');
$(".s-lg-subtab-ul li").addClass('issub');

$("#s-lg-tabs-container .nav-tabs.nav-stacked .s-lg-subtab-ul").on("mouseover", function () {
  $(this).parent('li').addClass('active');
});

/***** END SIDEBAR OVERRIDES *****/

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

}); //end document.ready()