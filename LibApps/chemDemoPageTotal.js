//The entire JS code required for the Chemistry homepage
(function($) {
	$(document).ready(function() {
		$('body').addClass('production');
   
        //a generalized filter for the guides - the initial value for the guide_types has been set to 1 (for the general guides)
		var filter = {
			status: 1, // so that only the published guides are displayed
			sort_by: "name",
			sort_dir: "Ascending",
			guide_types: 1 // the guide_types for the general guides
		};

        //Since the value of the parameter group_ids corresponding to the Chemistry homepage is 9801
		var subUrl = "//lgapi.libapps.com/1.1/guides?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5&group_ids=9801";
        var generalUrl = "";
        		
        //general-guides specific code
        generalUrl = createGuidesUrl(subUrl, filter);        
        $.getJSON(generalUrl, function(guides){
 			guides.forEach(function(guide){
	            if(guide.friendly_url)
					addGuide("#s-lg-index-cols-general", guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-general", guide.url, guide.id, guide.name);
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

        //subject-guides specific code        
        changeGuideType(filter, 3);
        generalUrl = createGuidesUrl(subUrl, filter);
		$.getJSON(generalUrl, function(guides){
 			guides.forEach(function(guide){
	            if(guide.friendly_url)
					addGuide("#s-lg-index-cols-subjects", guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-subjects", guide.url, guide.id, guide.name);
			})
		})

        //browse-by-topics specific code
        //Use "expand=tags" as an additional parameter in the url in order to have the tags getting listed alongside
        var topicsUrl = "//lgapi.libapps.com/1.1/guides/?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5&expand=tags&group_ids%5b%5d=9801";
        $.getJSON(topicsUrl,function(allTopics){
            var setOfTopics=[];
            var i, j;
            var len0 = allTopics.length;
            for ( i=0;i<len0; i++){
                //Since on this particular page, only 15 of the 17 entries in allTopics have tags, we need to perform a check for the existence of the tags property in each topic
                if(allTopics[i].hasOwnProperty("tags")){
                    for(j=0; j<allTopics[i].tags.length;j++){
                        //ignore the tags 0type research guide, 0type course guide and 0type tutorial
                        if(allTopics[i].tags[j].text== "0type research guide" || allTopics[i].tags[j].text=="0type course guide" || allTopics[i].tags[j].text=="0type tutorial"){ 
                            //do nothing
                        }
                        //Add all the other tags so that the user can browse by them
                        else{
                            var str=allTopics[i].tags[j].text;
                            //Capitalizing the first letter of every topic
                            str = str.toLowerCase().replace(/^[a-z]/, function(letter) {
                                                                            return letter.toUpperCase();
                                                                         });
                            /*easy alternative to capitalizing using regex as thought by me : 
                            str = str.charAt(0).toUpperCase()+str.substr(1).toLowerCase();
                            */
                            setOfTopics.push(str);
                        }
                    }
                }
            }
            //to get the unique set of topics - we don't want any repetition in the list
            var topics = setOfTopics.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
            //sorting the list of topics
            topics.sort();        
        
            //Now that we have the array comprising of the topics, we need to do some processing...
            var len = topics.length;    
            i=0;
   
            //defining a filter for each of the subguides' listing under each topic      
		    var filter1 = {
			    status: 1,
			    sort_by: "name",
			    sort_dir: "Ascending"
            };

		    var url0 = "//guides.library.upenn.edu/srch.php?iid=1766&gid=0";
            var topicUrl = createGuidesUrl(url0,filter1);
		
            var urls=[];
            for(i=0 ; i<len ; i++){
                var tag = "&tag="+topics[i];
                var totalUrl = topicUrl + tag;
                urls.push(totalUrl);
            }
		
            for(i=0;i<len;i++){
  			    addGuide("#s-lg-index-cols-topics", urls[i], i, topics[i]);
            }    
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
				class: "chemguidetitle",
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