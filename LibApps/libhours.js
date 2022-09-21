/* LibCal "Today's Hours" Utilities
   Requires: jQuery
   Author: Ivan Goldsmith at Penn Libraries
   Description: This script fetches our library hours from LibCal, and inserts them into the HTML in any tags that use the "libhours-" classes.
   https://github.com/upenn-libraries/LibCal-Tools
   
   To insert hours into your page:
   First, include the minified version of this script in the page. Make sure to also include jQuery if it is not there already.
   Then you may do any of the following:
   -- For the hours chart, place a tag with the class "libhours-chart" into your page. For example: <div class="libhours-chart"></div>
   -- For an individual library's hours, insert a tag (div, span, p, whatever you want) with the class "libhours-" + the appropriate class ending for your library.
      For example, Annenberg Library's hours can be inserted with: <div class="libhours-annenberg"></div>
      The full list of class name endings can be found below; the list is called "libData".
      Please do not give these tags any other classes; the script will get confused. If you add additional classes for styling, please add the classes to a wrapper/parent div.
       
      Note: If you put text or other contents into the libhours tags, the hours will be appended to the end of the contents. For example,
      <div class="libhours-dental">Dental Library </div> will result in the following output on your page: "Dental Library Hours, Dec. 10: 8am - 12am"

      Also note that when the tags get filled by this script, the class names will be changed to libhours-LIBNAME-filled. (So, "libhours-dental-filled", etc.)
      This prevents the tags from getting filled multiple times if the script gets run more than once for some reason, such as if the script gets inserted more than
      once due to being brought in by templates or boxes on sites like LibGuides.
*/

jQuery(document).ready(function($){

	/** Put your iid (Institution ID) here. **/
	var iid = 335; //Penn Libraries
	
	/** This object contains all possible class name endings, and corresponding library information: libIDs, calendar URLs, and (optional) alternate names for hours chart.
		Each library also has a "jsonData" property added to it when we retrieve the data from LibCal.
		Biddle Law has a non-numeric libID because it is not in LibCal at all; we are adding it in manually. You can see we insert its "jsonData" property by hand.
		MAINTENANCE NOTES: If a library is deleted and re-added in LibCal, you will need to update its libID in this list.
		Please keep this list in alphabetical order; the order of this list determines the order of the libraries in the homepage chart! Reorder at your stylistic discretion. **/
	var libData = {
		"annenberg" : {"libID": 306, "calURL": "https://www.library.upenn.edu/about/hours/annenberg"},
		"bll" : {"libID": "BLL", "calURL": "https://www.law.upenn.edu/library/", "jsonData": {name:"Biddle Law Library", hours:"", url:"https://www.law.upenn.edu/bll/"}},
		"biomed" : {"libID": 305, "calURL": "https://www.library.upenn.edu/about/hours/biomed"},
		"chemistry" : {"libID": 412, "calURL": "https://www.library.upenn.edu/about/hours/chemistry"},
		"dental" : {"libID": 425, "calURL": "https://www.library.upenn.edu/about/hours/dental", "altName": "Dental Library"},
		"edcom" : {"libID": 168, "calURL": "https://www.library.upenn.edu/about/hours/edcom"},
		"finearts" : {"libID": 427, "calURL": "https://www.library.upenn.edu/about/hours/finearts", "altName": "Fine Arts Library"},
		"imgcoll" : {"libID": 643, "calURL": "https://www.library.upenn.edu/about/hours/fineartsimage"},
		"kislak" : {"libID": 429, "calURL": "https://www.library.upenn.edu/about/hours/kislak"},
		"rbm" : {"libID": 455, "calURL": "https://www.library.upenn.edu/about/hours/reading", "altName": "Kislak Center Reading Room"},
		"goldstein": {"libID": 683, "calURL": "https://www.library.upenn.edu/about/hours/gallery"},
		"furness": {"libID": 684, "calURL": "https://www.library.upenn.edu/about/hours/furness"},
		"lcajs" : {"libID": 431, "calURL": "https://www.library.upenn.edu/about/hours/lcajs"},
		"libra" : {"libID": 430, "calURL": "https://www.library.upenn.edu/about/hours/libra"},
		"lippincott" : {"libID": 433, "calURL": "https://www.library.upenn.edu/about/hours/lippincott"},
		"mpa" : {"libID": 434, "calURL": "https://www.library.upenn.edu/about/hours/mpa"},
		"museum" : {"libID": 435, "calURL": "https://www.library.upenn.edu/about/hours/museum"},
		"music" : {"libID" : 436, "calURL": "https://www.library.upenn.edu/about/hours/music"},
		"ormandy" : {"libID": 453, "calURL": "https://www.library.upenn.edu/about/hours/ormandy"},
		"pennhosp" : {"libID": 410, "calURL": "https://www.library.upenn.edu/about/hours/pennhosp"},
		"vp" : {"libID": 437, "calURL": "https://www.library.upenn.edu/about/hours/vp"},
		"vpusc" : {"libID": 457, "calURL": "https://www.library.upenn.edu/about/hours/vpusc", "altName": "Van Pelt Undergrad. Study Center"},
		"vpcafe" : {"libID": 685, "calURL": "https://www.library.upenn.edu/about/hours/cafe"},
		"vpill" : {"libID": 650, "calURL": "https://www.library.upenn.edu/about/hours/vpill"},
		"vpref" : {"libID": 686, "calURL": "https://www.library.upenn.edu/about/hours/vpref"},
		"vetc" : {"libID": 438, "calURL": "https://www.library.upenn.edu/about/hours/vetc", "altName": "Veterinary Library - Campus"},
		"vetnbc" : {"libID": 456, "calURL": "https://www.library.upenn.edu/about/hours/vetnbc", "altName": "Veterinary Library - NBC"},
		"wic" : {"libID": 166, "calURL": "https://www.library.upenn.edu/about/hours/wic"},
		"vitale" : {"libID": 167, "calURL": "https://www.library.upenn.edu/about/hours/medialab"},
		"chat" : {"libID": 692, "calURL": "https://www.library.upenn.edu/about/hours/chat-libraries"},
		"chat-lip" : {"libID": 700, "calURL": "https://www.library.upenn.edu/about/hours/chat-lippincott"}
	};
	
	/** These are the libIDs of all libraries whose hours will be shown in the homepage hours chart; feel free to add and remove libraries as needed. **/
	var chartLibraries = [306, "BLL", 305, 412, 425, 168, 427, 429, 431, 430, 433, 434, 435, 453, 455, 437, 457, 438, 456, 166];

	/** Retrieve & store alternate library hours in the case of a "special day" that requires temporary alternate hours. (Snow day, etc.)
		This will only work when run from the Nebraska server, due to limitations imposed on Cross-Origin Resource Sharing. **/
	var specialDayPromise;
	if (window.location.hostname === "www.library.upenn.edu") {
		specialDayPromise = $.ajax({
			url: "/access/specialhours/specialdaysettings.html",
			type: 'GET',
			cache: false,
			dataType: 'html',
			timeout: 2000
		})
			.then( function(data) { // This callback happens if the ajax call is successful.
				return $.Deferred(function(newPromise){
					// Use a try-catch in case the JSON is malformed.
					try {
						var specialdayjson = $.parseJSON($(data).find("#specialdayjson").html());

						// If it's a special day, save all new hours so we can override the ones from LibCal.
						if (specialdayjson.featureEnabled) {
							$.each(specialdayjson.specialHours, function(library, specialDay) {
								if (specialDay.enabled) {
									libData[library]["specialHours"] = ": " + specialDay.specialHours;
								}
							});
						}
					} catch (e) {
						if (typeof console != "undefined") {
							console.error("SpecialDayJSON Error: " + e);
						}
					}

					newPromise.resolve();
				});
			},
			function(xhr, status, error) { // This callback happens if the ajax call fails.
				if (typeof console != "undefined") {
					if (status === "timeout") {
						console.error("SpecialDayJSON: TIMEOUT.");
					} else {
						// Commenting out so as to not flood consoles on servers other than Nebraska, because this call WILL fail due to its cross-origin request being blocked. Uncomment for debugging.
						//console.error("SpecialDayJSON: HTTP-GET failure. Status: " + status + ", Error: " + error);
					}
				}
			});
	} else {
		// If not on Nebraska, just ignore the special day hours. The line below returns a resolved promise.
		specialDayPromise = $.Deferred(function(newPromise){ newPromise.resolve(); });
	}

	/** Retrieve & store the library information from LibCal, then begin inserting data into the page. **/
	$.ajax({
		url: "https://api3.libcal.com/api_hours_today.php?iid="+iid+"&lid=0&format=json",
		type: 'GET',
		cache: false,
		dataType: 'jsonp'
	})
		.done( function (data) {
			$.each(data.locations, function(i, location) {
				var hours = ": " + location.rendered;
				var data = {lid:location.lid, name:location.name, hours:hours, url:location.url};
				try {
					getLibraryByID(location.lid).jsonData = data;
				} catch (e) {
					// Uncomment to see the libraries in LibCal that are not in our libData list.
					// console.error("Unknown library in JSON data! " + e + ", name: " + location.name);
				}
			});

			// Wait until the "special day" ajax call either succeeds or fails.
			$.when(specialDayPromise).always( function() {
				// Start filling the page with hours.
				insertHours();
			});
		})
		.fail( function (xhr, status, error) {
			if (typeof console != "undefined") {
				console.error("LibCalJSON: HTTP-GET failure. Status: " + status + ", Error: " + error);
			}
		});
		
	/** This function finds all HTML elements with libhours-* classes, and inserts the proper hours/HTML. **/
	function insertHours() {
		var date = todaysDate();
		$("[class^='libhours-']").each(function(i, item) {
			var libname = $(this).attr("class").split("-")[1];
			var text;
			if (libname == "chart") {
				// Display a temporary "loading" indicator while the chart gets built.
				$('<div class="libhours-loading">Hours table loading; please wait...</div>').insertBefore($(this));
				// Insert the initial HTML to be filled in with the full hours chart.
				text = '<div id="homepagehours"><ul class="homeul left"></ul></div>';
				$(this).replaceWith(text);
				insertChart();
				// Remove "loading" indicator now that the chart has been inserted.
				$(".libhours-loading").remove();
			} else if ($(this).attr("class").split("-")[2]) {
				// This div has already been filled, so skip over it.
				return;
			} else {
				if (libname in libData) {
					var library = libData[libname];
					// If it's a "special day" and there are temporary alternate hours, use them. Otherwise, use the hours passed to us from LibCal.
					var hoursString = library.jsonData.hours;
					if (library["specialHours"]) {
						hoursString = library["specialHours"];
					}
					text = '<a href="'+ library.calURL +'">Hours</a>, ' + date + hoursString;
				} else {
					text = "ERROR: Unknown library name '"+libname+"'.";
					if (typeof console != "undefined") {
						console.error(text);
					}
				}
				$(this).append(text);
				// Change the class to mark that this div has been filled.
				$(this).removeClass("libhours-"+libname).addClass("libhours-"+libname+"-filled");
			}
		});
	}
	
	/** This function builds, inserts, and styles the hours chart (for the main homepage and any other pages that need it). **/
	function insertChart() {
		//Hide the div containing this section until we are finished populating it, so people don't see a weird, half-loaded list.
		$("#homepagehours").hide();
	
		// Dynamically build the <ul> of library information, and add into the page.
		for (var key in libData) {
			library = libData[key];
			// Only add libraries specified in the chartLibraries array.
			if ($.inArray(library.libID, chartLibraries) < 0) {
				continue;
			}
			// If we have specified an alternative library name to display, use it. Otherwise, use the name passed to us from LibCal.
			var displayName = library.jsonData.name;
			if (library.hasOwnProperty("altName")) {
				displayName = library.altName;
			}
			// If it's a "special day" and there are temporary alternate hours, use them. Otherwise, use the hours passed to us from LibCal.
			var hoursString = library.jsonData.hours;
			if (library.hasOwnProperty("specialHours")) {
				hoursString = library.specialHours;
			}
			
			var li = $('<li></li>');
			var libName = $('<a></a>')
				.text(displayName)
				.attr('href', library.jsonData.url)
				.appendTo(li);
			li.append('<span class="libhours-vertical-bar">&#160;|&#160;</span>');
			var libHours = $('<a></a>')
				.text("hours")
				.addClass("hours")
				.attr('href', library.calURL)
				.appendTo(li);
			li.append(hoursString);
			$('ul.left').append(li);
		}

		// Run the function that makes columns and styles <ul>s and <li>s.
		formatChart();

		// When everything is finished, unhide the container div.
		$("#homepagehours").show();
	}
	
	/** This function gets a library from the libData list, given its libID. **/
	function getLibraryByID(lid) {
		for (var key in libData) {
			var lib = libData[key];
			if (lib.libID === lid) {
				return lib;
			}
		}
		throw "Couldn't find library with libID: " + lid;
	}
	
	/** This function returns a string containing today's date in MMM DD format. **/
	function todaysDate() {
		var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		var today = new Date();
		return months[today.getMonth()] + " " + today.getDate();
	}

	/** This function splits the hours chart into 2 columns (left and right). **/
	function formatChart() {
		var itemNum = $('#homepagehours ul.homeul.left li').length;
		var parity = itemNum % 2;
		var firstHalfSize = Math.floor(itemNum/2) + parity;

		if (firstHalfSize > 0) {
			var firstHalf = '';
			$('#homepagehours ul.homeul.left li').slice(0, firstHalfSize).each(function() {
				firstHalf = firstHalf + $(this)[0].outerHTML;
			});
			
			var secondHalf = '';

			$('#homepagehours ul.homeul.left li').slice(firstHalfSize).each(function() {
				secondHalf = secondHalf + $(this)[0].outerHTML;
			});
			
			var finalHtml = '<ul class="homeul left">' + firstHalf + '</ul><ul class="homeul right">' + secondHalf + '<li class="morehoursinfo"><a href="https://www.library.upenn.edu/locations/">more info...</a></li></ul>';
			$('#homepagehours ul.homeul.left').replaceWith(finalHtml);

			$('#homepagehours ul.homeul.left li:nth-child(odd), #homepagehours ul.homeul.right li:nth-child(odd)').addClass('even'); // :odd uses zero-indexing
			$('#homepagehours ul.homeul.left li:nth-child(even), #homepagehours ul.homeul.right li:nth-child(even)').addClass('odd');
		}
	}
}); //end jQuery