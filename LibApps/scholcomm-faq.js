/**
 * @file
 * A JavaScript file for the FAQ block.
 * Uses the LibCal API to fetch FAQ questions.
 * This is adapted from Vivo FAQ (at /vivo/faq).
 */

var url = "https://api2.libanswers.com/1.0/faqs?iid=707&group_id=4976&limit=50";
$(document).ready(function(){
    $.ajax({
        dataType: 'jsonp',
        url: url,
        success: function(json){
            //render questions  and answers in different categories
            //note from 3/4/20: It used to be json.data, but the structure seems to have changed...
            //for(var i = 0; i < json.data.faqs.length; i++){
            for(var i = 0; i < json.faqs.length; i++){
                var category = json.faqs[i].keywords[0].id;
                var question = json.faqs[i].question;
                // The answer can be found in two different places in the JSON. If it's not in one place, try the other.
                var answer = json.faqs[i].details;
                if (answer == "") {
                    answer = json.faqs[i].answer;
                }
                var faqid = json.faqs[i].faqid;
                if(category == "291152"){ // Beprexit
                    $("#beprexitFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#beprexitFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "291150"){ // Using ScholarlyCommons
                    $("#usingFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#usingFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "291153"){ // Submitting to ScholarlyCommons
                    $("#submittingFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#submittingFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
            }

            // $("br").remove();

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
                        if (! el.hasClass("closed")) {
                            el.addClass("closed");
                            el.attr("aria-expanded", "false");
                            el.parent().next().hide("fast");  
                            el.parent().next().attr("aria-hidden", "true");  
                        }
                    });
                    return false;
                }
            });   
}
    });
}); // end display question