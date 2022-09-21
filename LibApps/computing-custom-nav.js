$(document).ready(function() {

/***** BEGIN SIDEBAR OVERRIDES *****/

/* Make sure to include our custom CSS when embedding this JS:
<script type="text/javascript" src="//libapps.s3.amazonaws.com/sites/231/include/computing-custom-nav.js"></script>
<link rel="stylesheet" type="text/css" href="//libapps.s3.amazonaws.com/sites/231/include/computing-nav-overrides.css">
*/

/* This determines which links go before and after the current guide's navigation sidebar.
   You may rearrange the links, add/remove links, and change the labels as desired.
   The links may be to other LibGuides, and they may also be external links. ("guideID" is only needed for guides.) */
var franklinHelpMenu = {
  'Home': {
    'url': 'https://guides.library.upenn.edu/computing-services',
    'guideID' : '991387',
  },
  'Faculty, Student, Staff Computing Services': {
    'url': 'https://guides.library.upenn.edu/computing-public',
    'guideID' : '1005169',
  },
  'Libraries Staff Computing Services': {
    'url': 'https://guides.library.upenn.edu/computing-libraries-staff',
    'guideID': '1005175',
  },
  'Teaching Spaces': {
    'url': 'https://guides.library.upenn.edu/computing-teaching-spaces',
    'guideID': '1005177',
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
for (var label in franklinHelpMenu) {
  var newLink = $('<a href="'+franklinHelpMenu[label]['url']+'">'+label+'</a>')
    .addClass('helplink');
  if (after) {
    //$(guideMenu).after(newLink); //this will put all links after the current guide in reverse order
    $('#s-lg-guide-tabs').append(newLink);
  } else if (!after && (currentGuideID.startsWith(franklinHelpMenu[label]['guideID']) || franklinHelpMenu[label]['url'].match(/https:\/\/guides\.library\.upenn\.edu\/(.*)/)[1].startsWith(currentGuideID))) {
    // If this is the current page, don't insert the link since there's already a menu.
    // Put the remaining links AFTER the menu.
    after = true;
  } else {
    $(guideMenu).before(newLink);
  }
}

}); //end document.ready()