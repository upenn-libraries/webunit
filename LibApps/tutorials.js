// FINAL CODE
// taking care of cases where friendly urls don't exist
(function($) {
	$(document).ready(function() {
		$('body').addClass('production');
   
        //a generalized filter for the guides
		var filter = {
			status: 1,
			sort_by: "name",
			sort_dir: "Ascending",
			guide_types: 3
		};

		var subUrl = "http://lgapi.libapps.com/1.1/guides/?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5";
		var subGuideUrl = createGuidesUrl(subUrl, filter);
		var col = "";
        
        //tutorial-specific code
        
        //the type associated with tutorials has been set to 4
		changeGuideType(filter, 4);
		var tutorialUrl = createGuidesUrl(subUrl, filter);
		
		$.getJSON(tutorialUrl, function(guides){
			var count = 0;
			var firstColumnNum = divideSubjects(guides.length);
			addUl("#s-lg-index-cols-tutorials ");
			guides.forEach(function(guide){
				count += 1;
				col = checkCol(count, firstColumnNum);
                if(guide.friendly_url)
					addGuide("#s-lg-index-cols-tutorials " + col, guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-tutorials " + col, guide.url, guide.id, guide.name);
			})
		})

        //helper functions for tutorials
        
        /*
        * createGuidesUrl(url, filter)
        * @param url
        * @param filter
        * returns newUrl, which is a string that is a concatenated version of url and parameters from the filter as defined above
        */
		function createGuidesUrl(url, filter){
			var newUrl = url;
			for(var prop in filter){
				newUrl += "&" + prop + "=" + filter[prop];
			}
			return newUrl;
		}

        /*
        * createStr(str, attribute)
        * @param str : corresponds to any tag like the anchor tag a
        * @param attribute: corresponds to various attributes that belong to various tags; 
        *                   these attributes are listed as key-value pairs in attribute
        * returns a string which is a concatenated version of a tag and its set of attributes --- as in the proper tag (the "complete" tag)
        */
		function createStr(str, attributes){
			var div = str;
			for(var prop in attributes){
				div += " " + prop +"=\"" + attributes[prop] + "\"";
			}
			return div + ">";
		}

        /*
        * divideSubjects(subjectName)
        * @param subjectName
        * returns the integer nearest to half the value of subjectName
        */
        function divideSubjects(subjectName){
			var num = (subjectName+1)/2;
			return Math.floor(num);
		}

        /*
        * checkCol(count, firstColumnNum)
        * @param count
        * @param firstColumnNum
        * returns column name (#col-1 or #col-2) after splitting content into two columns based on comparison with the parameter firstColumnNum 
        */
		function checkCol(count, firstColumnNum){
			var column = "";
			if(count <= firstColumnNum){
				column = "#col-1";
			}
			else{
				column = "#col-2";
			}
			return column;
		}

        /*
        * addUl(id)
        * @param id
        * simply appends the body corresponding to the courseguides or tutorials; 
        * tutorials in this JS file as it is there where it is being invoked
        */
		function addUl(id){
			var divOpenTag = "<div";
			var divCloseTag = "</div>";
			var divBody = {
				class: "panel-body",
				style: ""
			};
			var divList = {
				class: "s-lg-guide-list"
			};
            
		    // the complete tag for the creation of an unordered list
        	var panelBody = createStr(divOpenTag, divBody)
								+ createStr("<ul", divList)
								+ "</ul>"
								+ divCloseTag
								+ divCloseTag;
            
            // just for the case when the tab isn't for courseguides or tutorials --- just a case for general purposes
            // since this method gets invoked in only one place, this case is not of any importance
			if (id.indexOf("courseguides") == -1 && id.indexOf("tutorials") == -1){
				$("#" + id).append(panelBody);
			}

            // when the id corresponds to courseguides or tutorials, append the IDs            
			else{
				$(id + "#col-1").append(panelBody);
				$(id + "#col-2").append(panelBody);
			}
		}

        /*
        * addGuide(divId, url, guideId, title)
        * @param divId
        * @param url
        * @param guideId
        * @param title
        * 
        */
		function addGuide(divId, url, guideId, title){
			var divOpenTag = "<div";
			var divCloseTag = "</div>";
			var divLi = {
				class: "s-lg-gtitle s-lib-color-lt-grey"
			};
			var liAttr = {
				class: "bold",
				href: url
			};
			var liI = {
				class: "fa fa-info-circle s-lib-popover pad-left-sm",
				"data-ajload": "/index_process.php?action=175&amp;" + "guide_id=" + guideId + "&amp;key=key",
				"data-original-title": title + "&nbsp;",
				rel: "popover",
				title: ""
			};
			var liDiv = "<li>"
						+ createStr(divOpenTag, divLi)
						+ createStr("<a", liAttr)
						+ title
						+ "</a>"
						+ createStr("<i", liI)
						+ "</i></div></li>";
			$(divId + " ul").append(liDiv);
		}

        /*
        * changeGuideType(filter, type)
        * @param filter
        * @param type
        * The original JS file - hpcontent.js had three guide types - though this has only one(tutorials), still retaining this
        * Sets the guide_types attribute of filter to type
        */
        
		function changeGuideType(filter, type){
			filter.guide_types = type;
		}
	});
})(jQuery);