// FINAL CODE
// taking care of cases where friendly urls don't exist
(function($) {
	$(document).ready(function() {
		$('body').addClass('production');
		//var subjectUrl = "//lgapi.libapps.com/1.1/subjects?site_id=231&key=78318a98eb00f63111c1441e2268da37&guide_published=2";
		var subjectUrl = "//lgapi.libapps.com/1.1/subjects?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5&guide_published=2";
		var filter = {
			status: 1,
			sort_by: "name",
			sort_dir: "Ascending",
			guide_types: 3,
			expand: "tags"
		};
		//var subUrl = "//lgapi.libapps.com/1.1/guides/?site_id=231&key=78318a98eb00f63111c1441e2268da37";
		var subUrl = "//lgapi.libapps.com/1.1/guides/?site_id=231&key=7d4baeb3879775e65f9b2250a47a3ac5";
		var subGuideUrl = createGuidesUrl(subUrl, filter);
		var col = "";

		//for subject page
		$.getJSON(subjectUrl, function(subjects){
			var firstColumnNum = divideSubjects(subjects.length);
			var count = 0;
			subjects.forEach(function(subject){
				var subjectId = subject.id;
				var subjectName = subject.name;
				var url = subGuideUrl + "&subject_ids=" + subjectId;
				var collapse = "#collapse" + subjectId;
				count += 1;
				col = checkCol(count, firstColumnNum);
				addSuject(col, subjectId, subjectName);

				var toptag = "top-" + subjectId;
				$.getJSON(url, function(guides){
					var topguides = getTopGuides(guides, toptag);
					
					topguides.forEach(function(guide){
						if(guide.friendly_url)
							addTopGuide(collapse, guide.friendly_url, guide.id, guide.name);
						else							
							addTopGuide(collapse, guide.url, guide.id, guide.name);
						
					})

					guides.forEach(function(guide){
						if(topguides.includes(guide)) return;
						if(guide.friendly_url)
							addGuide(collapse, guide.friendly_url, guide.id, guide.name);
						else							
							addGuide(collapse, guide.url, guide.id, guide.name);
						
					})
				})
			})
		})

		//for course page
		changeGuideType(filter, 2);
		var courseUrl = createGuidesUrl(subUrl, filter);
		$.getJSON(courseUrl, function(guides){
			var count = 0;
			var firstColumnNum = divideSubjects(guides.length);
			addUl("#s-lg-index-cols-courseguides ");
			guides.forEach(function(guide){
				count += 1;
				col = checkCol(count, firstColumnNum);
				if(guide.friendly_url)
					addGuide("#s-lg-index-cols-courseguides " +col, guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-courseguides " +col,guide.url, guide.id, guide.name);
			})
		})

		//for tutorial
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

		//for service page
		var serviceFilter = {
			status: 1,
			sort_by: "name",
			sort_dir: "Ascending",
			expand: "tags"
		};
		var serviceUrl = createGuidesUrl(subUrl, serviceFilter);
		// add tag name to serviceUrl
		serviceUrl += "&tag_names=services";
		$.getJSON(serviceUrl, function(guides){
			var count = 0;
			var firstColumnNum = divideSubjects(guides.length);
			addUl("#s-lg-index-cols-serviceguides ");
			guides.forEach(function(guide){
				count += 1;
				col = checkCol(count, firstColumnNum);
				if(guide.friendly_url)
					addGuide("#s-lg-index-cols-serviceguides " +col, guide.friendly_url, guide.id, guide.name);
				else
					addGuide("#s-lg-index-cols-serviceguides " +col,guide.url, guide.id, guide.name);
			})
			// // make service guides one column for now, get rid of it later
			// $('#s-lg-index-cols-serviceguides #col-2 ul.s-lg-guide-list li').each(function() {
			// 	$(this).appendTo('#s-lg-index-cols-serviceguides #col-1 ul.s-lg-guide-list');
			// });
		})

		function createGuidesUrl(url, filter){
			var newUrl = url;
			for(var prop in filter){
				newUrl += "&" + prop + "=" + filter[prop];
			}
			return newUrl;
		}

		function createStr(str, attributes){
			var div = str;
			for(var prop in attributes){
				div += " " + prop +"=\"" + attributes[prop] + "\"";
			}
			return div + ">";
		}

		function divideSubjects(subjectName){
			var num = (subjectName+1)/2;
			return Math.floor(num);
		}

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

		function addSuject(col, id, name){
			var href = "collapse" + id;
			var linkId = "collapse" + id + "_link";
			var divOpebTag = "<div";
			var divCloseTag = "</div>";
			var divDefault = {
				class: "panel panel-default",
				id: "s-lib-panel-container-collapse" + id,
				style: ""
			}
			var idStr = "#s-lg-index-cols-subjguides " + col;
			$(idStr).append(createStr(divOpebTag, divDefault) + divCloseTag);
			idStr = "#" + divDefault.id;

			var divHeading = {
				class: "panel-heading",
				onclick: ""
			}
			var divRight = {
				class: "badge pull-right"
			}
			var divBold = {
				class: "bold"
			}
			var attr = {
				"data-parent": "#s-lg-general-accordion",
				"data-toggle": "collapse",
				href: "#" + href,
				id: linkId
			}
			var attrStr = createStr("<a", attr);
			var headingDiv = createStr(divOpebTag, divHeading)
								+ createStr(divOpebTag, divRight)
								+ attrStr + "2</a>"
								+ divCloseTag
								+ createStr(divOpebTag, divBold)
								+ attrStr + name + "</a>"
								+ divCloseTag
								+ divCloseTag;
			$(idStr).append(headingDiv);

			var divCollapse = {
				class: "panel-collapse collapse",
				id: href
			};
			$(idStr).append(createStr(divOpebTag, divCollapse) + divCloseTag);
			idStr = href;
			addUl(href);
		}

		function addUl(id){
			var divOpebTag = "<div";
			var divCloseTag = "</div>";
			var divBody = {
				class: "panel-body",
				style: ""
			};
			var divList = {
				class: "s-lg-guide-list"
			};
			var panelBody = createStr(divOpebTag, divBody)
								+ createStr("<ul", divList)
								+ "</ul>"
								+ divCloseTag
								+ divCloseTag;
			if (id.indexOf("courseguides") == -1 && id.indexOf("tutorials") == -1 && id.indexOf("serviceguides") == -1){
				$("#" + id).append(panelBody);
			}
			else{
				$(id + "#col-1").append(panelBody);
				$(id + "#col-2").append(panelBody);
			}
		}

		function addGuide(divId, url, guideId, title){
			var divOpebTag = "<div";
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
						+ createStr(divOpebTag, divLi)
						+ createStr("<a", liAttr)
						+ title
						+ "</a>"
						+ createStr("<i", liI)
						+ "</i></div></li>";
			$(divId + " ul").append(liDiv);
		}

		function addTopGuide(divId, url, guideId, title){
			var divOpebTag = "<div";
			var divCloseTag = "</div>";
			var divLi = {
				class: "s-lg-gtitle s-lib-color-lt-grey"
			};
			var liAttr = {
				class: "bold",
				style: "font-weight:bold", // only difference from addGuide
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
						+ createStr(divOpebTag, divLi)
						+ createStr("<a", liAttr)
						+ title
						+ "</a>"
						+ createStr("<i", liI)
						+ "</i></div></li>";
			$(divId + " ul").append(liDiv);
		}

		function changeGuideType(filter, type){
			filter.guide_types = type;
		}

		function getTopGuides(guides, toptag){
			var topguides = [];
			guides.forEach(function(guide){
				if (guide.tags && guide.tags.some(item => item.text === toptag)) {
					topguides.push(guide);
				}
			})
			return topguides;
		}
	});
})(jQuery);