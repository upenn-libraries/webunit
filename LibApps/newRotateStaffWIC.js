jQuery(document).ready(function($) {
    $('body').addClass('production');
    var subjSpecUrl = "https://old.library.upenn.edu/rest/views/staff?_format=json&library=162";

    $.getJSON(subjSpecUrl, function(data) {
        jQuery.pennRotate({
            count:4,
            jsonSource:data,
            destination:"#people",
            template:function(item) {
                if (!item.uri) return;
                var name = item.field_first_name+' '+item.field_last_name;
                // profile URL: retrieve from the provided HTML link
                var profileURL = 'https://old.library.upenn.edu' + item.view_user.match(/href="([^"]*)/)[1];
                // img URL: get just the path and put it on an HTTPS-friendly WWW root. (remove the pantheon domain)
                var imgURL = 'https://old.library.upenn.edu' + item.uri.match(/(?:.*)?\/\/[^/]+(.*)/)[1];
                return '<div class="staffimagequad">' +
                '<a class="imagelink" href="'+profileURL+'">' +
                '<img src="'+ imgURL +'" alt="" title="'+name+'" />' +
                name +
                '</a></div> ';
            }
        });
    });
});