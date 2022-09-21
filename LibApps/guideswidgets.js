/* This script allows you to add the JS-portions of search widgets to multiple widgets without needing to create multiple scripts.
   For each widget, call the appropriate function -- either addFranklinWidget() or addSummonWidget() -- and give it the following details:
   -- formId: The ID of the widget's form.
   -- inputId: The ID of the widget's input box.
   -- xbrowseParams (optional): Parameters that need to be added to the URL when the user selects a browse option. Useful for adding facets to browse searches.
   -- target (optional): Says where to open search results. If you do not specify, it will use the form's target; if there is no target, it will default to "_self".
   
   Examples:

    // Plain Franklin search
    addFranklinWidget({
        formId: "#franklinsearch",
        inputId: "#franklinquery"
    });

    // Ebooks search with xbrowse params
    addFranklinWidget({
        formId: "#ebooksearch",
        inputId: "#ebooksquery",
        xbrowseParams: "&amp;filter.access_facet.val=Online&amp;filter.format_facet.val=Book",
        target: "_self"
    });

    // Summon search
    addSummonWidget({
        formId: "#summonsearch",
        inputId: "#articlesquery",
        target: "_blank"
    });
 */

function addFranklinWidget(widgetSettings) {
    jQuery(function($) {
        var target;
        if (widgetSettings.target) {
            target = widgetSettings.target;
        } else if ($(widgetSettings.formId).attr("target")) {
            target = $(widgetSettings.formId).attr("target");
        } else {
            target = "_self";
        }
        $(widgetSettings.formId).attr("target", target);
       
        $(widgetSettings.formId).submit(function() {
            var select = $(widgetSettings.formId + ' select[name="qt"]');
            var selected = select.find('option[browse-action][value=' + select.val() + ']');
            if (selected.length > 0) {
                var extraParams = '';
                var params = new Array();
                var i = 0;
                $.each(document.location.search.slice(1).split('&'), function(index) {
                   if (this.indexOf('xbrowse') !== 0 && this.indexOf('q=') !== 0 && this.indexOf('qt=') !== 0 
                       && this.indexOf('start=') !== 0 && this.indexOf('sort=') !== 0 && this.indexOf('id=') !== 0) {
                      params[i] = this;
                      i = i + 1;
                   }
                });
                if (i > 0) {
                    extraParams = '&' + params.join('&');
                }
                if (widgetSettings.xbrowseParams) {
                    extraParams += widgetSettings.xbrowseParams;
                }
                var action = selected.attr('browse-action');
                var searchURL = action + '?xbrowse='+encodeURIComponent(select.val())+'&xbrowse.term=' + encodeURIComponent($(widgetSettings.inputId).val()) + extraParams;
                window.open(searchURL, target);
                return false;
            }
        });
    }); //end jQuery
} //end addFranklinWidget

function addSummonWidget (widgetSettings) {
    jQuery(function($) {
        $(widgetSettings.formId).submit(function(event) {
            event.preventDefault();
            var searchURL = "http://upenn.summon.serialssolutions.com/search#!/search?q=" + encodeURIComponent($(widgetSettings.inputId).val());
            // Must concatenate all fvf values into one parameter.
            var fvf = "";
            $(widgetSettings.formId + " .limitOptions input:checked").each(function() {
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
            var target = widgetSettings.target;
            if (typeof target  === "undefined") {
                target = "_blank";
            }
            window.open(searchURL, target);
        });
    }); //end jQuery
} //end addSummonWidget