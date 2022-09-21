/**
 * This script is our LIVE SCRIPT. This is the script that runs for our end-users.
 **/

// 1/29/19: Add support for Browzine:
var browzine = {
	api: "https://api.thirdiron.com/public/v1/libraries/123",
	apiKey: "1ff0d6b2-fa18-4aa3-95a2-bebe7aa6b2a8",
	journalWording: "View the Journal",
	articleWording: "View Complete Issue",
	journalBrowZineWebLinkText: "Browse Now",
	articleBrowZineWebLinkText: "Browse Now",
	articlePDFDownloadLinkEnabled: true,
	articlePDFDownloadWording: "Article PDF",
	articlePDFDownloadLinkText: "Download Now",
}; 
browzine.script = document.createElement("script");
browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/summon/browzine-summon-adapter.js";
document.head.appendChild(browzine.script);

jQuery(function($) {
	$("head").append('<link href="http://www.library.upenn.edu/styles/summon360/upennsummon.css" rel="stylesheet">');
	$("head").append('<link href="http://www.library.upenn.edu/styles/alert2014.min.css" rel="stylesheet">');

	// Put our code in a try-catch block. If we don't, when something breaks, it crashes the entire Summon UI, and all the user sees is a white screen. Yikes!
	try {

		// mainMod is a useful shorthand variable for the main Summon module.
		var mainMod = angular.module('summonApp');

		/* This section of code is used to modify Summon's templates.
		 * You can view the templates here: http://staffweb.library.upenn.edu/prototypes/josh/summon/scripts/summon_dev/resource_pages/listtemplates.html
		 * We use regular expressions to locate and replace pieces of the templates.
		 * Here is a useful tool for viewing and editing the regular expressions: http://www.regexr.com/
		 */
		mainMod.run([ '$templateCache', function (templateCache) {
			/* Add link to our in-depth LibGuide for additional help. */
			templateURL = "/assets/modals/help.html";
			newTemplate = templateCache.get(templateURL);
			newTemplate = newTemplate.replace(/(<div ng-include="links.localizedHelpTemplate"><\/div>)/, '<style>#penncusomhelplink:hover{text-decoration: none;}</style><a href="http://guides.library.upenn.edu/articlesplus" id="penncusomhelplink"><button class="btn" style="display:block;margin:0 auto;">View Detailed Help</button></a>$1');
			templateCache.put(templateURL, newTemplate);

			/* Add Franklin link to navigation bar. */
			templateURL = "/assets/links.html";
			newTemplate = templateCache.get(templateURL);
			newTemplate = newTemplate.replace(/(<\/ul>)/, '<li><a class="customColorsSiteLink" href="http://franklin.library.upenn.edu/">Return to Franklin homepage</a></li>$1');
			templateCache.put(templateURL, newTemplate);

			/* Edit the "Off Campus?" banner URL to retain the current search after logging in.
			   This changes the URL that appears on page load. After submitting new searches, the URL gets changed in the
			   $locationChangeSuccess listener further on in this script.
			   Both this template change AND the listener are necessary for the URL override to work in all cases.*/
			templateURL = "/assets/vpnBanner.html";
			newTemplate = templateCache.get(templateURL);
			newTemplate = newTemplate.replace(/({{vpnBanner\.href\(\)}})/, "https://proxy.library.upenn.edu/login?url=" + window.location.href);
			templateCache.put(templateURL, newTemplate);

			/* Add custom Alert to display important status messages to users.
			 * Uncomment this section when you want an alert to be seen. */
			/*
			var alertText = '<strong>Sat. 10/29, 1 - 7pm:</strong> Articles+ will be unavailable during scheduled maintenance. For known citations, please try <a href="http://hdl.library.upenn.edu/1017/25333">PennText Article Finder</a>.' +
			' <a href="http://guides.library.upenn.edu/nettools/proxybookmark">For instructions for off-campus login to internet search results, click here.</a>';
			templateURL = "/assets/search.html";
			newTemplate = templateCache.get(templateURL);
			newTemplate = newTemplate.replace(/(<div results-feed><\/div>)/, '<div class="alertholder"><div class="alerttext">' + alertText +'</div></div>$1');
			templateCache.put(templateURL, newTemplate);
			*/
		}]);

		/* This is a listener that runs when the URL changes. */
		mainMod.run(function($rootScope, $location) {
			$rootScope.$on('$locationChangeSuccess',function(evt, newURL, previousURL) {
				// If we're on the home page, add a class for styling. If we just left the homepage, remove the class.
				// We're on the home page when there are no search parameters (thus, no params after a ? in the URL).
				var $advancedSearchButton = $(".advanced-text").parent();
				if (newURL.split('?').length <= 1) {
					$('body').addClass('frontpage');
					$('body').removeClass('searchpage');
					
				} else {
					$('body').addClass('searchpage');
					$('body').removeClass('frontpage');
					
				}
				

				/* Update the "Off Campus?" banner URL to retain the current search after logging in.
				   This doesn't work on page load (the template takes care of that), but works on all searches submitted afterward. */
				$('.vpnBanner a').attr('href', 'https://proxy.library.upenn.edu/login?url=' + newURL);
			});
		});

		/* __configData is a global variable defined here: http://upenn.summon.serialssolutions.com/config
		 * To properly view the contents & structure of this object, copy/paste its JSON into http://jsonlint.com/
		 * or uncomment the console.dir statement below: */
		// console.dir(__configData);

		// Append "(in-text" to the "Chicago/Turbian: Author-Date" citation label.
		// We find the label with a loop because the formats can be re-arranged, so we never know where it will be in the array.
		for (var i = 0; i < __configData.citation_formats.formats.length; i++) {
			if (__configData.citation_formats.formats[i].label === "Chicago/Turabian: Author-Date") {
				__configData.citation_formats.formats[i].label = "Chicago/Turabian: Author-Date (in-text)";
			}
		}

	} catch(err) {
		console.log("Houston, we have a problem:\n"+err.message);
	}

}); //end jQuery();