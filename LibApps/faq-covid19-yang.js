/**
 * LibAnswer fetch FAQ
 * This file is hosted on LibGuides for easy access and modification
 * 
 * Author: Linghan Zheng and Zhiyu Zhou
 * Uses the LibCal API to fetch FAQ questions and display them in collapsible format.
 */


jQuery(document).ready(function($){  

  var displayUpdateTime = function() {
    var latestUpdated = 0;
    $(".accordion#about .updated-timestamp").each(function() {
      // parse string to milliseconds and compare
      var currentTime = Date.parse($(this).text().replace(/-/g, "/"));
      // Date.parse() will return NaN if it fails to parse the date.
      // It turns out this function has inconsistencies across browsers (like Safari).
      // format the date string to make this function consistency across browsers
      if (currentTime && currentTime > latestUpdated) {
        latestUpdated = currentTime;
      }
    })
    // If we failed to find the latest date, don't change the default date on the page.
    if (latestUpdated === 0) { return; }
    // console.log(latestUpdated);
    var latestUpdatedDate = new Date(latestUpdated);
    // specify date-time format
    var year        =  new Intl.DateTimeFormat('en', { year: 'numeric' }).format(latestUpdatedDate)
    var month       =  new Intl.DateTimeFormat('en', { month: 'short' }).format(latestUpdatedDate)
    var day         =  new Intl.DateTimeFormat('en', { day: 'numeric' }).format(latestUpdatedDate)
    var weekday     =  new Intl.DateTimeFormat('en', { weekday: 'long' }).format(latestUpdatedDate)
    var time        =  new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', hour12: true }).format(latestUpdatedDate)
    // construct date html element to display
    var latestUpdatedElement = weekday + ", " + month + " " + day + ", " + year + ", " + time
    $(".last-update").html("<em>Last updated: " + latestUpdatedElement +  "</em>");
  }

  var faqUrl = [];
  // change API url according to page
  if ($(".block-pennlib-faq-vitale-block").length != 0) {
    // Vitale Lab FAQ
    faqUrl.push("https://faq.library.upenn.edu/api/1.0/faqs?iid=707&topic_id=57296");
  }
  if ($(".block-pennlib-faq-covid-block").length != 0) {
    // Covid-19 FAQ
    faqUrl.push("https://faq.library.upenn.edu/api/1.0/faqs?iid=707&group_id=8446");

    /**
     * Define order of qustions here
     * Just place every question ID in the order you want in changeOrder array
     * You have to define order for each question shown on page
     */
    var changeOrder = [
      '312393',
      '325293',
      '312394',
      '312395',
      '312396',
      '312397',
      '312398',
      '312399',
      '322090',
      '322092',
      '320624',
      '322094',
      '312401',
      '312400',
      '312402',
      '326864'
    ]
    
  }

  var addFaq = function(json, i) {
    var question = json.faqs[i].question;
    // The answer can be found in two different places in the JSON. If it's not in one place, try the other.
    var answer = json.faqs[i].details;
    if (answer == "") {
      answer = json.faqs[i].answer;
    }
    var faqid = json.faqs[i].faqid;
    var updated = json.faqs[i].updated;
    
    $("#about").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
    $("#about").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
    $("#about").append("<dd class='updated-timestamp' aria-hidden='true'>" + updated + "</dd>");
  }

  faqUrl.forEach(function(url) {
    $(document).ready(function(){
      $.ajax({
        dataType: 'jsonp',
        url: url,
        success: function(json){
          // change question order
          if (changeOrder) {
            for(var i = 0; i < json.faqs.length; i++) {
              let index = changeOrder.indexOf(json.faqs[i].faqid)
              json.faqs[i].order = index;
              // console.log(json.faqs[i].order)
            }
            (json.faqs).sort(function(q1, q2) {
              return q1.order - q2.order
            })
                    }
          // render questions and answers in different categories
          for(var i = 0; i < json.faqs.length; i++) {
                        // console.log(json.faqs[i].order)
            addFaq(json, i);
          }
          //add click events on elements
          $("div.dthead").click(function(){
            var el = $(this);
            if (el.hasClass("closed")) {
              el.removeClass("closed")
              el.attr("aria-expanded", "true");
              el.parent().next().show("fast");
              el.parent().next().attr("aria-hidden", "false");
            } else {
              el.addClass("closed");
              el.attr("aria-expanded", "false");
              el.parent().next().hide("fast");
              el.parent().next().attr("aria-hidden", "true");  
            }
          });
          $("a.expand").click(function(){
            $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
              var el = $(this);
              if (el.hasClass("closed")) {
                el.removeClass("closed")
                el.attr("aria-expanded", "true");
                el.parent().next().show("fast");
                el.parent().next().attr("aria-hidden", "false");
              }
            });
            return false;
          });
          $("a.collapse").click(function(){
            $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
              var el = $(this);
              if (! el.hasClass("closed")) {
                el.addClass("closed");
                el.attr("aria-expanded", "false");
                el.parent().next().hide("fast");  
                el.parent().next().attr("aria-hidden", "true");  
              }
            });
            return false;
          });

          // keybord accissibility
          $("div.dthead").keypress(function (e) {
            var key = e.which;
            if(key == 13) {
              var el = $(this);
              if (el.hasClass("closed")) {
                el.removeClass("closed")
                el.attr("aria-expanded", "true");
                el.parent().next().show("fast");
                el.parent().next().attr("aria-hidden", "false");
              } else {
                el.addClass("closed");
                el.attr("aria-expanded", "false");
                el.parent().next().hide("fast");  
                el.parent().next().attr("aria-hidden", "true");
              }
            }
          });

          $("a.expand").keypress(function (e) {
            var key = e.which;
            if(key == 13) {
              $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
                var el = $(this);
                if (el.hasClass("closed")) {
                  el.removeClass("closed")
                  el.attr("aria-expanded", "true");
                  el.parent().next().show("fast");
                  el.parent().next().attr("aria-hidden", "false");
                }
              });
              return false;
            }
          });

          $("a.collapse").keypress(function (e) {
            var key = e.which;
            if(key == 13) {
              $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
                var el = $(this);
                if (!el.hasClass("closed")) {
                  el.addClass("closed");
                  el.attr("aria-expanded", "false");
                  el.parent().next().hide("fast");  
                  el.parent().next().attr("aria-hidden", "true");  
                }
              });
              return false;
            }
          });   
        },
        complete: function() {
          displayUpdateTime();
        }
      });
    }); // end display question
  })    
})