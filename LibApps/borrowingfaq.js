//Top 20 hits in descending order
var url = "https://api2.libanswers.com/1.0/faqs?iid=707&topic_id=46263&sort=totalhits&sort_dir=desc&limit=20";
$(document).ready(function(){
    $.ajax({
        dataType: 'jsonp',
        url: url,
        success: function(json){
            //note from 3/4/20: It used to be json.data, but the structure seems to have changed...
            //for(var i = 0; i < json.data.faqs.length; i++){
            for(var i = 0; i < json.faqs.length; i++){
                var question = json.faqs[i].question;
                var answer = json.faqs[i].answer;
                //to remove whitespaces
                answer = answer.replace(/\n/g, "");
                answer = answer.replace(/\r/g,"");
                answer = answer.replace(/&nbsp;/g, "");
                //For the one particular answer that has this string at the end
                answer = answer.replace("Last modified: 2018, CC","");
                //alert(answer);
                
                $("#data").append("<dt><div class='dthead closed'>" + question + "</div></dt>");
                $("#data").append("<dd class='folded'><p>" + answer + "</p></dd>");
            }

            $("ul").addClass("vivolist");
            // $("br").remove();

            //add click events on elements
            $("div.dthead").click(function(){
                var el = $(this);
                if (el.hasClass("closed")) {
                    el.removeClass("closed")
                    el.parent().next().show("fast");
                } else {
                    el.addClass("closed");
                    el.parent().next().hide("fast");  
                }
            });
            $("a.expanded").click(function(){
                $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
                    var el = $(this);
                    if (el.hasClass("closed")) {
                        el.removeClass("closed")
                        el.parent().next().show("fast");
                    }
                });
                return false;
            });
            $("a.collapsed").click(function(){
                $(this).parent().parent().children("dl").children("dt").children("div.dthead").each(function(){
                    var el = $(this);
                    if (! el.hasClass("closed")) {
                        el.addClass("closed");
                        el.parent().next().hide("fast");  
                    }
                });
                return false;
            });
            $("a.sectionjump").click(function(){
                var el = $("dt"+this.hash+" div.dthead").eq(0);
                if (el.hasClass("closed")) {
                    el.removeClass("closed")
                    el.parent().next().show("fast");
                }
            });
        }
    });
});