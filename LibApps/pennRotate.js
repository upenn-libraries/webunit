jQuery.pennRotate = function(options) {         
  /*
  Usage: jQuery.pennRotate(options)
  Options:
   {destination: jQuery compatible selector
   jsonURL: URL to the source JSON file
   ---OR USE---
   jsonSource: inline JSON
   count:how many to show
   template: function that takes one member of  the above file and returns the desired HTML
   before: html to add before the rotation (optional)
   after: html to add after the rotation(optional)
   }
   
    */    
    var process = function(data) {
        var indexes = [];
        while(indexes.length < options.count) {
            var rand = Math.ceil(data.length *Math.random()) -1;
            if (jQuery.inArray(rand, indexes) == -1) {
                indexes.push(rand);
            }
        }
        var item, parsed;
        var ret = [];
        var dest = jQuery(options.destination); 
        dest.html(''); // empty the container first
        if (options.before) {
             ret.push(options.before);   
        }
        for (var i = 0; i < options.count; i++) {
            item = data[indexes[i]];
            parsed = options.template(item);
           ret.push(parsed);
        } 
        if (options.after) {
            ret.push(options.after);     
        }           
        dest.append(ret.join(""));
    }
    if (options.jsonSource) {
        process(options.jsonSource);
    } else {
        jQuery.getJSON(options.jsonURL, process);
    }      
}