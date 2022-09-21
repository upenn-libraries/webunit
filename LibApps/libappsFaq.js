/**
 * @file
 * Originally by: Linghan Zheng and Zhiyu Zhou
 * Modified by Dana Berkwoitz
 * Uses the LibCal API to fetch FAQ questions and display them in collapsible format.
 */

// URL for UI https://faq.library.upenn.edu/admin/faqbrowse?m=list&faqid=&fulltext=&note=&status=-1&gid%5B%5D=-1&created%5B0%5D=&created%5B1%5D=&owner=-1&kid=436944
//Pull Parameters out of this link for url below

 var url = "https://faq.library.upenn.edu/1.0/faqs?iid=707&gid=9813&keyword_id=423124";

 $(document).ready(() => {
     $.ajax({
         dataType: 'jsonp',
         url: url,
         success: json => {
             //render questions  and answers in different categories
             //note from 3/4/20: It used to be json.data, but the structure seems to have changed...
             //json.data.faqs.forEach(faq => {
             json.faqs.forEach(faq => {

                 var question = faq.question;
                 // The answer can be found in two different places in the JSON. If it's not in one place, try the other.
                 var answer = faq.details;
                 if (!answer) {
                     answer = faq.answer;
                 }
                 var faqid = faq.faqid;
                    // Append questions
                     $("#endnoteFaq").append("<dt><div class='dthead closed' tabindex='0' aria-controls='" + faqid + "' aria-expanded='false'>" + question + "</div></dt>");
                     $("#endnoteFaq").append("<dd class='folded' id='" + faqid + "' aria-hidden='true'><p>" + answer + "</p></dd>");
             });
           }
       });
   }); // end display question
