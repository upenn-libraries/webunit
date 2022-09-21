jQuery(function($) {
  /*------------- SEARCH WIDGET ---------------- */
  var searchTabMap = {
    'catalogtab'    : {"url":"/searchfranklinset.html",  "name":"catalog"},
    'adb'           : {"url":"/searcharticlesset.html", "name":"articles"},
    'wbs'           : {"url":"/searchguidesset.html", "name":"guides"},
    'lbryInfo'      : {"url":"/searchlibraryinfoset.html", "name":"library info"}
  };


  /* Prevent the page from jumping to the div when tabs on the search widget are clicked */
    $('.tabsearchwidgetContainer_tablist').click(function(evt) {
        evt.preventDefault();
    });


    /* If you click a radio button the correct search box is slipped in and the other searchboxes are hidden */
  $('input[type="radio"]').click(function(){   
    $('.tabsearchwidgetContainer_tabpane').hide();    
    $('#'+$(this).val()).show();
  });


  // Click a tab
  $('div.tabsearchwidgetContainer_tablist a.searchwidgettab').click(function(){
    
    // Make all tabs inactive
    $('.tabsearchwidgetContainer_tablist a').each(function(){
      $(this).removeClass('active');
      $($(this).attr('href')).hide();
    });

    // Make clicked tab active, show its search pane and hide all others
    $('.tabsearchwidgetContainer_tabpane').hide();
    $(this).addClass('active');
    $($(this).attr('href')).show();

    // Default is to click the first radio button  
    var $allButtons = $($(this).attr('href')).find('input[type="radio"]').filter(function(){
      return $(this).is(':visible');
    });
    if ($allButtons.length > 0) {
      $allButtons.first().click();
    } else {
      $('#Guides').show();
    }
  });


    /*      
        Add text input shadowing, so searches in the same group preserve the user's text input
        Referenced IDs belong to the input elements of each radio button in the given tab:
        E.g. div.franklinset > form.tabform > div.floatleft > input
    */
    // Catalog Group (Franklin Tab)
    var $catalogGroup = $('#franklinquery, #ejournalquery, #ebookquery, #msquery, #articlesquery, #videoquery');
    $catalogGroup.each(function() {
      $(this).change(function() {
        var newText = $(this).val();
        $catalogGroup.each(function() {
          $(this).val(newText);
        });
      });
    });


    // Database Group (Business Databases Tab)
    var $databaseGroup = $('#databasequery, #ebscoquery');
    $databaseGroup.each(function() {
      $(this).change(function() {
        var newText = $(this).val();
        $databaseGroup.each(function() {
          $(this).val(newText);
        });
      });
    });


    // Guides Group
    // If radio buttons are later added to guides group, shadowing can be enabled by adding IDs here
    var $guidesGroup = $('#GuidesSearch');
    $guidesGroup.each(function() {
      $(this).change(function() {
        var newText = $(this).val();
        $guidesGroup.each(function() {
          $(this).val(newText);
        });
      });
    });


    // FindIt/Library Info Group
    var $findItGroup = $('#FinditSearch, #googleSrch');
    $findItGroup.each(function() {
      $(this).change(function() {
        var newText = $(this).val();
        $findItGroup.each(function() {
          $(this).val(newText);
        });
        $('#googleSrch').css('background', 'rgb(255, 255, 255)') ; // Remove Google custom search watermark
      });
    });


    /*  
        Define search behavior for form submissions only where the form takes options (a dropdown menu)
        AND the selected option changes the way results are browsed (adds an 'xbrowse' term to the query URL):
        #franklinsearch, #ejournalsearch, #ebooksearch, #databasesearchform, #videosearch are the only forms that take options
        Title Browse, Author Browse, Subject Heading (Library of Congress), and Call Number Browse are the only options that change browsing
    */
    var switchArray = ['franklinsearch', 'ejournalsearch', 'ebooksearch', 'databasesearchform', 'videosearch']; 

    $('#franklinsearch, #ejournalsearch, #ebooksearch, #databasesearchform, #videosearch').submit(function(){
        var id = $(this).attr('id');
        var select = $('#' + id + ' select[name="qt"]');                
        var selected = select.find('option[browse-action][value=' + select.val() + ']');   
        if (selected.length > 0) {
            /* may not be necessary for home-page starts here
                we are grabbing the addtional parameters in the url and attaching them to the search
                but it is unlikely that our current url will have those params
            */
            var extraParams = '';
            var params = [];
            var i = 0;
            $.each(document.location.search.slice(1).split('&'), function(index) {
                if (this.indexOf('xbrowse') !== 0 && this.indexOf('q=') !== 0 && this.indexOf('qt=') !== 0 &&
                    this.indexOf('start=') !== 0 && this.indexOf('sort=') !== 0 && this.indexOf('id=') !== 0) {
                    params[i] = this;
                    i = i + 1;
                }
            });
            if (i > 0) {
                extraParams = '&' + params.join('&');
            }
            /* may not be necessary for home-page ends here*/
            var action = selected.attr('browse-action');

            var query = '';
            var lastPiece = '';
            switch(switchArray.indexOf(id)) {
                case 0:
                    query = $('#franklinquery').val();                        
                    break;

                case 1:
                    query = $('#ejournalquery').val();
                    lastPiece = 'filter.access_facet.val=Online&filter.format_facet.val=Journal%2FPeriodical';
                    break;

                case 2:
                    query = $('#ebookquery').val();
                    lastPiece = 'filter.access_facet.val=Online&filter.format_facet.val=Book';                    
                    break;

                case 3:
                    query = $('#databasequery').val();
                    lastPiece = 'filter.format_facet.val=Database/Website';              
                    break;
                case 4:
                    query = $('#videoquery').val();
                    lastPiece = 'filter.format_facet.val=Video'; 
            }
            var url = action + '?xbrowse='+encodeURIComponent(select.val())+'&xbrowse.term=' + encodeURIComponent(query) + extraParams + lastPiece;
            window.open(url);
            return false;
        }
    });


  // Search form functionality for Articles+ form (under Franklin tab)
    $(".summonform").submit(function(event) {
        // Prevent any default onclick behavior. Do everything here instead.
        event.preventDefault();
        var searchURL = "http://upenn.summon.serialssolutions.com/search#!/search?q=" + encodeURIComponent($("#articlesquery").val());
        // Must concatenate all fvf values into one parameter.
        var fvf = "";
        $(".summonform .limitOptions input:checked").each(function() {
            if (this.name === "fvf") {
                if (fvf !== "") {
                    fvf += "|";
                }
                fvf += this.value;
            } else {
                searchURL += "&" + this.name + "=" + this.value;
            }
        });
        if (fvf !== "") {
            searchURL += "&fvf=" + fvf;
        } 
        window.open(searchURL, '_blank');
    });


    if (window.location.hash) {
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 1);
    }


    // click the first tab by default
    var hash = window.location.hash;
    if (hash === '#databases') {
        $('#adb').click();
    } else if (hash === '#LibraryInfo') {
        $('#lbryInfo').click();
    } else if (hash === '#catalogs') {
        $('#catalogstab').click();
    } else if (hash === '#guidesfaq') {
        $('#wbs').click();
    } else {
        $('#adb').click();
    }
});

function openPennTextWin(URL) {
    LibrariesWindow=window.open(URL,"librarieswindow","toolbar=no,width=900,height=900,status=no,scrollbars=yes,resizable=yes,menubar=no,alwaysRaised=yes,accessKey=1");
}