jQuery(function($){
$( document ).ready(function() {

    var deptheads = ["noel", "kiron", "dmcknigh"];
    // The number of times we will have to call the feed reader: once for each department head, then once for all other staff
    var iter = deptheads.length + 1;

    // Get both department heads and regular staff using the pennFeedReader
    (function getAllStaff() {
        for (var i = 0; i < iter; i++) {
            callFeedReader(i);
        }
    })();


    // Wrap the pennFeedReader for easier use in a loop
    function callFeedReader(i, filter) {
        // The first call to the pennFeedReader should be for the staff, since this returns the most entries
        var id = (i !== 0) ? '#deptheads' : '#stafflist';
        var feedURL = '';
        if (i !== 0) {
            feedURL = 'http://dla.library.upenn.edu/dla/staff/feeds/search.rss?q='+ deptheads.shift();
        }
        else {
            feedURL = 'http://dla.library.upenn.edu/dla/staff/feeds/search.rss?rows=50&fq=division%3A%22Kislak%20Center%20for%20Special%20Collections%2C%20Rare%20Books%20and%20Manuscripts%22';
        }
        pennFeedReader.getFeed(id, feedURL,
            {
                layoutTemplate: '<div class="feed-container">{entries}</div>',
                entryTemplate: '<div class="channelitem"><div class="itemtitle"><a target="_new" href="{url}">{title}</a></div> <div class="itemdesc">{body}</div></div>',
                outputMode: 'json_xml',
                limit: 100
            },
            function callback(){
                filterStaff();
            }
        ); 
    } //end callFeedReader()


    // Stuff to do after feeds have been retrieved, such as adding images.
    function filterStaff() {
        $('.channelitem').each(function( index ){
            var emailAddr = $(this).find('div.itemdesc').find('div:last a').attr('href');
            if( typeof emailAddr != 'undefined' ){
                var imageUrl = '';
                var pennkey = '';
                if( emailAddr.split('@').length>0 ){
                    pennkey = emailAddr.split('@')[0].split(':')[1];
                    imageUrl = 'http://www.library.upenn.edu/images/staff/'+pennkey+'125.jpg';
                }

                // If you find an entry for a part time staff member, hide it
                if ( (pennkey == 'raynaa') || (pennkey == 'evarela') ){
                    $(this).hide();
                    return; //skip to next entry
                }
                // If you find a staff entry that's already in the deptheads list, or otherwise needs to be hidden, hide it.
                if( $(this).parents('#deptheads').length <= 0) {
                    if( (pennkey == 'wgnoel') || (pennkey == 'dmcknigh') || (pennkey == 'kiron') || (pennkey == 'yidsong') || (pennkey == 'warnera') ){
                        $(this).hide();
                        return; //skip to next entry
                    }
                }
                $(this).css('background-image', 'url(' + imageUrl + ')');
            }
        });
    } //end filterStaff()


}); //end document.ready
}); //end jQuery
