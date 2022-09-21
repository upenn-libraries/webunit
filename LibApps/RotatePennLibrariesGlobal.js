// Final code of the Penn Libraries Global specialists

jQuery(document).ready(function($) {
    $('body').addClass('production');
    var subjSpecUrl = "https://www.library.upenn.edu/rest/views/staff/subjspec?_format=json";
        
    $.getJSON(subjSpecUrl, function(data){
        jQuery.pennRotate({
            count:3,
            jsonSource:data,
            destination:"td#subjspecrotation",
            template:function(item) {
                var name = item.field_first_name+' '+item.field_last_name;
                // profile URL: retrieve from the provided HTML link
                var profileURL = 'https://www.library.upenn.edu' + item.view_user.match(/href="([^"]*)/)[1];
                // img URL: get just the path and put it on an HTTPS-friendly WWW root. (remove the pantheon domain)
                var imgURL = 'https://www.library.upenn.edu' + item.uri.match(/(?:.*)?\/\/[^/]+(.*)/)[1];
                var specialties = item.field_subject_specialty.split(',');
                var rand = Math.ceil(specialties.length * Math.random()) - 1;
                var randomSpecialty = specialties[rand];
                return '<div style="float: left; width: 31%; text-align: center;padding:0 1%">' +
				'<a href="'+profileURL+'">' +
				'<img src="'+ imgURL +'" width="100%" alt="'+randomSpecialty+'"' +
				'title="'+randomSpecialty+'" /></a>' +
				'</div>  ';
            }
        });
    });
});