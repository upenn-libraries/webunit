jQuery.pennRotate = function(options) {         
    /*
    Author: Leonard Grey at Penn Libraries
    Requires: jQuery
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
            var rand = Math.ceil(data.length*Math.random()) -1;
            if (jQuery.inArray(rand, indexes) == -1) {
              var noRepeat = true
              // for librarian rotation: see if random librarian picture is repeatedly picked
              if (data[rand].uri) {
                for (var i = 0; i < indexes.length; i++) {
                  item = data[indexes[i]];
                  if (data[rand].uri === item.uri) { 
                    console.log('librarian picture repeatedly picked: ' + data[rand].field_first_name)
                    noRepeat = false;
                    break;
                  }
                } 
              }
              if (noRepeat) {
                indexes.push(rand);
              }
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