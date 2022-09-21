
//Version 1 - Working
//The entire JS code required for the Lippincott homepage
(function($) {
	$(document).ready(function() {
		$('body').addClass('production');
   
        //a generalized filter for the guides - the initial value for the guide_types has been set to 3 (for the subject guides)
		var filter = {
			status: 1, // so that only the published guides are displayed
			sort_by: "name",
			sort_dir: "Ascending",
			guide_types: 3 // the guide_types for the subject guides
		};

        //Since the value of the parameter group_ids corresponding to the Lippincott homepage is 9803
		var subUrl = "//lgapi.libapps.com/1.1/guides?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5&group_ids=9803";
        var generalUrl = "";
        var col = 0;
        		
        //subject-guides specific code        
        changeGuideType(filter, 3);
        generalUrl = createGuidesUrl(subUrl, filter);
		$.getJSON(generalUrl, function(guides){
            var guidesLenDiv = (guides.length+1)/2;
 			guides.forEach(function(guide){
                col+=1;
                if(col <= guidesLenDiv){
	                if(guide.friendly_url)
					    addGuide("#s-lg-index-cols-subjects "+"#col-1", guide.friendly_url, guide.id, guide.name);
				    else
					    addGuide("#s-lg-index-cols-subjects "+"#col-1", guide.url, guide.id, guide.name);                    
                }
                else{
                    if(guide.friendly_url)
					    addGuide("#s-lg-index-cols-subjects "+"#col-2", guide.friendly_url, guide.id, guide.name);
				    else
					    addGuide("#s-lg-index-cols-subjects "+"#col-2", guide.url, guide.id, guide.name);                    
                }
			})
		})        

        //course-guides specific code        
        changeGuideType(filter, 2);
        generalUrl = createGuidesUrl(subUrl, filter);
		$.getJSON(generalUrl, function(guides){
 			guides.forEach(function(guide){
	            if(guide.friendly_url)
					addGuide("#s-lg-index-cols-courses", guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-courses", guide.url, guide.id, guide.name);
			})
		})

      
        //helper functions for guides
        
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
				class: "lippincottguidetitle",
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
        * The original JS file - hpcontent.js had three guide types - though this has only one(courseguidess), still retaining this
        * Sets the guide_types attribute of filter to type
        */
        
		function changeGuideType(filter, type){
			filter.guide_types = type;
		}
	});
})(jQuery);