/**
 * @file
 * A JavaScript file for the FAQ block.
 * Uses the LibCal API to fetch FAQ questions.
 * This is adapted from Vivo FAQ (at /vivo/faq).
 */

var url = "https://faq.library.upenn.edu/api/1.0/faqs?iid=707&group_id=8958";
/**
 * Define order of qustions here
 * Just place every question ID in the order you want in changeOrder array
 * You have to define order for each question shown on page
 */
var changeOrder = [
    '324853',
    '324856',
    '324858',
    '324860',
    '324861',
    '324862',
    '324864',
    '324866',
    '324870',
    '324872',
    '324878',
    '324881',
    '324884',
    '324885',
    '324889'
]

$(document).ready(() => {
    $.ajax({
        dataType: 'jsonp',
        url: url,
        success: json => {
            if(changeOrder) {
                for(var i = 0; i < json.faqs.length; i++) {
                    var index = changeOrder.indexOf(json.faqs[i].faqid);
                    json.faqs[i].order = index;
                    console.log(index);
                }
                (json.faqs).sort(function(q1, q2) {
                    return q1.order - q2.order;
                })
            }
            //render questions  and answers in different categories
            //note from 3/4/20: It used to be json.data, but the structure seems to have changed...
            //json.data.faqs.forEach(faq => {
            json.faqs.forEach(faq => {
                var category = faq.keywords[0].id;
                var question = faq.question;
                // The answer can be found in two different places in the JSON. If it's not in one place, try the other.
                var answer = faq.details;
                if (!answer) {
                    answer = faq.answer;
                }
                var faqid = faq.faqid;
                if(category == "387527"){ // Overview
                    $("#overviewFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#overviewFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "387532"){ // Permissions
                    $("#permissionsFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#permissionsFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "387542"){ // Plagiarism
                    $("#plagiarismFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#plagiarismFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "387543"){ // Teaching
                    $("#teachingFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#teachingFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
                else if(category == "387559"){ // Publishing
                    $("#publishingFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                    $("#publishingFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
                }
            });

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