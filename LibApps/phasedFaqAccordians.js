const feed = [];
const sections = document.getElementsByClassName("faq-list");
for (let i = 0; i < sections.length; i++) {
	var sectionID = sections[i].getAttribute("id");
	var addCode = "<div id='wrapper-content' role='main'> <section class='section expand'> <span class='hold-expander first'> <a class='toggle expand' role='button' tabindex='0'>Expand&nbsp;all<img alt='*' class='togglearrow' loading='lazy' src='https://libapps.s3.amazonaws.com/sites/231/include/arrow_open.svg' /></a> <a class='toggle collapse' role='button' tabindex='0'>Collapse&nbsp;all<img alt='*'  class='togglearrow' loading='lazy' src='https://libapps.s3.amazonaws.com/sites/231/include/arrow_close.svg' /></a> </span> <dl class='accordion sectionlist' id=" + sectionID + "> </dl> </section> </div>";
	var questionList = sections[i].getAttribute("data-faq-list");
	var feedLink = sections[i].getAttribute("href");
	if (questionList) {
		sections[i].innerHTML = addCode;
		var listfeed = feed.push("https://faq.library.upenn.edu/1.0/faqs/" + questionList + "?iid=707");
		(function() {
			getAndSort(feed[i], sectionID, questionList, "");
		})();
	} else if (feedLink) {
		sections[i].innerHTML = addCode;
		var linkfeed = feed.push(feedLink);
		var changeOrder = sections[i].getAttribute("data-faq-order");
		if (changeOrder) {
			(function() {
				getAndSort(feed[i], sectionID, "", changeOrder);
			})();
		} else {
			(function() {
				getAndSort(feed[i], sectionID, "", "");
			})();
		}

	}
} //end section loop

function getAndSort(url, sectionID, questionList, changeOrder) {
	$.ajax({
		dataType: 'jsonp',
		url: url,
		success: json => {

			if (questionList !== "") {
				const questionArray = questionList.split(",");
				(function() {
					sortAndAdd(questionArray, json.faqs);
				})();
			} else if (changeOrder !== "") {
				const feedOrder = [];
				const changeArray = changeOrder.split(",");
				for (let l = 0; l < changeArray.length; l++) {
					var faqID = changeArray[l];
					feedOrder.push(faqID);
				}
				for (let m = 0; m < json.faqs.length; m++) {
					check = json.faqs[m].faqid + "";
					if (changeArray.indexOf(check) == -1) {
						feedOrder.push(check);
					}
				}
				(function() {
					sortAndAdd(feedOrder, json.faqs);
				})();
			} else if (questionList == "" || changeOrder == "") {
				const questionArray = questionList.split(",");
				(function() {
					sortAndAdd(questionArray, json.faqs);
				})();
			}

			function sortAndAdd(questionArray, faqs) {
				for (let j = 0; j < questionArray.length; j++) {
					check = faqs[j].faqid + "";
					faqs[j].order = questionArray.indexOf(check);
				}
				faqs.sort(function(q1, q2) {
					return q1.order - q2.order;
				});
				for (let j = 0; j < faqs.length; j++) {
					addFaq(faqs[j], j, sectionID);
				}
			}

			var needUpdated = document.getElementById("last-update");
			if (needUpdated) {
				var latestUpdated = 0;
				$(".accordion .updated-timestamp").each(function() {
					// parse string to milliseconds and compare
					var currentTime = Date.parse($(this).text().replace(/-/g, "/"));
					// Date.parse() will return NaN if it fails to parse the date.
					// It turns out this function has inconsistencies across browsers (like Safari).
					// format the date string to make this function consistency across browsers
					if (currentTime && currentTime > latestUpdated) {
						latestUpdated = currentTime;
					}
				});
				// If we failed to find the latest date, don't change the default date on the page.
				if (latestUpdated === 0) {
					return;
				}
				// console.log(latestUpdated);
				var latestUpdatedDate = new Date(latestUpdated);
				// specify date-time format
				var year = new Intl.DateTimeFormat('en', {
					year: 'numeric'
				}).format(latestUpdatedDate);
				var month = new Intl.DateTimeFormat('en', {
					month: 'short'
				}).format(latestUpdatedDate);
				var day = new Intl.DateTimeFormat('en', {
					day: 'numeric'
				}).format(latestUpdatedDate);
				var weekday = new Intl.DateTimeFormat('en', {
					weekday: 'long'
				}).format(latestUpdatedDate);
				var time = new Intl.DateTimeFormat('en', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true
				}).format(latestUpdatedDate);
				// construct date html element to display
				var latestUpdatedElement = weekday + ", " + month + " " + day + ", " + year + ", " + time;
				$("#last-update").html("<em>Last updated: " + latestUpdatedElement + "</em>");
			}

		} //end json
	}); //end ajax
	var addFaq = function(faqs, k, sectionID) {
		var question = faqs.question;
		var answer = faqs.details;
		if (answer == "") {
			answer = faqs.answer;
		}
		var faqid = faqs.faqid;
		var updated = faqs.updated;
		var dateUpdated = updated;
		var slicedDate = dateUpdated.slice(0, 10);
		var dateString = slicedDate;
		var [yyyy, dd, mm] = dateString.split("-");
		var revdate = `${dd}/${mm}/${yyyy}`;
		$("dl#" + sectionID).append("<dt id='" + faqid + "'><div class='dthead closed' tabindex='0' aria-controls='" + sectionID + "' aria-expanded='false'>" + question + "<span class='Last-updated' aria-hidden='false'><strong>" + 'Last updated: ' + "</strong>" + revdate + "</span></div></dt><dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd><dd class='updated-timestamp' aria-hidden='true'>" + updated + "</dd>");
	};
} //getAndSort

window.onload = function() {
	const element = document.createElement("script");
	element.setAttribute("type", "text/javascript");
	element.src = "//libapps.s3.amazonaws.com/sites/231/include/libappsFaqAccordians.js";
	document.body.appendChild(element);
};
