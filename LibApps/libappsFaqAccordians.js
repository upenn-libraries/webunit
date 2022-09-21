/**
 * @file
 * Originally by: Linghan Zheng and Zhiyu Zhou
 * Modified by Dana Berkwoitz
 * Creates click functionality for collapsible FAQs.
 */

$(document).ready(() => {
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

// keybord accessibility
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
});
