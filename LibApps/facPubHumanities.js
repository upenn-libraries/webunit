//Version 2 -- using Ivan's code
jQuery.pennSeeAll = function(options) {
    var process = function(data) {
        var indexes = [];
        var item, parsed;
        var ret = [];
        var dest = jQuery(options.destination);
        if (options.before) {
             ret.push(options.before);
        }
        for (var i = options.startindex; i < options.startindex+options.count; i++) {
            item = data[i];
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
//Shreya's method 
//var facpubUrl =  "https://s3.amazonaws.com/libapps/sites/231/include/facpublist.js";
//$.getJSON(facpubUrl, function(facpub){
    
$.ajax({
			url: "//guides.library.upenn.edu/c.php?g=493478",
			type: 'GET',
			cache: false,
			dataType: 'html',
			timeout: 2000
		})
.then( function(data) { 
    // This callback happens if the ajax call is successful.
	// Use a try-catch in case the JSON is malformed.
	try {
	    var facpub = $.parseJSON($(data).find("#facpub").html());
        jQuery.pennSeeAll({
                jsonSource:facpub,
                destination:".new.inline-block.left ",
                startindex: 0,
                count: Math.ceil(facpub.length/2),
                template:function(item){
                    var gb1tag=""
                    var gb2tag="";
                    var author1tag="";
                    var author2tag="";
                    var author3tag="";
                    var imagetag="";

                    //Check Image
                    //+'" src="//www.library.upenn.edu/images/facpub/libguides/'+item['image']+'"
                    if(item['image'].length>5 && item['image'].substring(0,4)=="https"){
                        imagetag =item['image'];
                    }
                    else{
                        imagetag='//www.library.upenn.edu/images/facpub/libguides/'+item['image'];
                    }

                    if((typeof item['gbtext'] != "undefined") && (typeof item['gbtext2'] != "undefined") &&
                       item['gbtext'] != "" && item['gbtext2'] != ""){
                        var gb1text = item['gbtext'];

                        if( gb1text.length>9 && gb1text.substring(5,8)!="see"){
                            item['gbtext'] = gb1text.substring(0,5)+"see "+gb1text.substring(5);
                        }
                        if(gb1text.substring(gb1text.length-5, gb1text.length)=='&#93;'){
                            item['gbtext']=item['gbtext'].substring(0,item['gbtext'].length-5);
                        }

                        var gb2text = item['gbtext2'];
                        if(gb2text.substring(0,5)=='&#91;'){
                            item['gbtext2']= gb2text.substring(5);

                            if(gb2text.substring(5, 13)=='also in '){
                                item['gbtext2']= gb2text.substring(13);
                            }
                        }
                    }
                
                  //For gb1 tag logic
                  if (typeof item['gbtext'] === "undefined"){
                    item['gbtext']="";
                  }
                  else{
                       var gb1text = item['gbtext'];
                       if( gb1text.length>9 && gb1text.substring(5,8)!="see"){
                        item['gbtext'] = gb1text.substring(0,5)+"see "+gb1text.substring(5);
                       }
                  }
                  if (typeof item['gburl'] === "undefined"){
                    item['gburl']="";
                    gb1tag = item['gbtext'];
                  }
                  else{
                    gb1tag='<a class="gb" target="_blank" href="' +item['gburl']+'">'+item['gbtext']+'</a>';
                  }

                  //For gb2 tag logic
                  if (typeof item['gbtext2'] === "undefined"){
                    item['gbtext2']="";
                    item['gband']="";
                  }
                  else{
                    if(item['gbtext2'] == ""){
                        item['gband']="";
                    }
                    else{
                        item['gband']=" and "
                    }
                  }
                  if (typeof item['gburl2'] === "undefined"){
                    item['gburl2']="";
                    gb2tag = item['gbtext2'];
                  }
                  else{
                   gb2tag='<a class="gb" target="_blank" href="' +item['gburl2']+'">'+item['gbtext2']+'</a>';
                  }



                //For author tag logic
                if (typeof item['author1'] === "undefined"){
                    item['author1'] = "";
                }
                
                if (typeof item['author1url'] === "undefined"){
                    item['author1url'] = "";
                }
                
                if (typeof item['author2'] === "undefined"){
                    item['author2'] = "";
                }
                
                if (typeof item['author2url'] === "undefined"){
                    item['author2url'] = "";
                }
                
                if (typeof item['author3'] === "undefined"){
                    item['author3'] = "";
                }
                
                if (typeof item['author3url'] === "undefined"){
                   item['author3url'] = "";
                }

                if ( item['author1url'] == ""){
                    author1tag = '<b>'+item['author1']+'</b>';
                }
                else{
                    author1tag='<b><a target="_blank" href="' +item['author1url'] +'">'+item['author1']+'</a></b>';
                }
                
                if ( item['author2url'] == ""){
                    author2tag = '<b>'+item['author2']+'</b>';
                }
                else{
                    author2tag='<b><a target="_blank" href="' +item['author2url'] +'">'+item['author2']+'</a></b>';
                }

                if ( item['author3url'] == ""){
                    author3tag = '<b>'+item['author3']+'</b>';
                }
                else{
                     author3tag='<b><a target="_blank" href="' +item['author3url'] +'">'+item['author3']+'</a></b>';
                }

                return '<div class="unit">'
                        +'<div class="holdpubimage">'
                        +'<a target="_blank" href="'+item['bookurl']+'">'
                        +'<img alt="Cover image: '+item['booktitle']
                        +'" src="'+imagetag
                        +'" /></a>'
                        +'</div>'
                        +'<div class="holdpubinfo">'
                        +'<cite>'
                        +'<a target="_blank" href="'+item['bookurl']+'">'+item['booktitle']+'</a>'
                        +'</cite>. '+item['articletitle']
                        +'<div class="author">'
                        +author1tag
                        +item['andauthor2']
                        +author2tag
                        +item['andauthor3']
                        +author3tag
                        +'</div>'
                        +'<div class="pubdate">'+item['pubdate']+'</div>'
                        +'<div class="whereelse">'
                        +gb1tag
                        +item['gband']
                        +gb2tag
                        +'</div>'
                        +'</div>'
                        +'</div>';
                 }
        });
 
 
         jQuery.pennSeeAll({
                jsonSource:facpub,
                destination:".new.inline-block.right ",
                startindex: Math.ceil(facpub.length/2),
                count: facpub.length - Math.ceil(facpub.length/2),
                template:function(item){
                    var gb1tag=""
                    var gb2tag="";
                    var author1tag="";
                    var author2tag="";
                    var author3tag="";
                    var imagetag="";

                    //Check Image
                    //+'" src="http://www.library.upenn.edu/images/facpub/libguides/'+item['image']+'"
                    if(item['image'].length>5 && item['image'].substring(0,4)=="https"){
                        imagetag =item['image'];
                    }
                    else{
                        imagetag='//www.library.upenn.edu/images/facpub/libguides/'+item['image'];
                    }

                    if((typeof item['gbtext'] != "undefined") && (typeof item['gbtext2'] != "undefined") &&
                       item['gbtext'] != "" && item['gbtext2'] != ""){
                        var gb1text = item['gbtext'];

                        if( gb1text.length>9 && gb1text.substring(5,8)!="see"){
                            item['gbtext'] = gb1text.substring(0,5)+"see "+gb1text.substring(5);
                        }
                        if(gb1text.substring(gb1text.length-5, gb1text.length)=='&#93;'){
                            item['gbtext']=item['gbtext'].substring(0,item['gbtext'].length-5);
                        }

                        var gb2text = item['gbtext2'];
                        if(gb2text.substring(0,5)=='&#91;'){
                            item['gbtext2']= gb2text.substring(5);

                            if(gb2text.substring(5, 13)=='also in '){
                                item['gbtext2']= gb2text.substring(13);
                            }
                        }
                    }
                
                  //For gb1 tag logic
                  if (typeof item['gbtext'] === "undefined"){
                    item['gbtext']="";
                  }
                  else{
                       var gb1text = item['gbtext'];
                       if( gb1text.length>9 && gb1text.substring(5,8)!="see"){
                        item['gbtext'] = gb1text.substring(0,5)+"see "+gb1text.substring(5);
                       }
                  }
                  if (typeof item['gburl'] === "undefined"){
                    item['gburl']="";
                    gb1tag = item['gbtext'];
                  }
                  else{
                    gb1tag='<a class="gb" target="_blank" href="' +item['gburl']+'">'+item['gbtext']+'</a>';
                  }

                  //For gb2 tag logic
                  if (typeof item['gbtext2'] === "undefined"){
                    item['gbtext2']="";
                    item['gband']="";
                  }
                  else{
                    if(item['gbtext2'] == ""){
                        item['gband']="";
                    }
                    else{
                        item['gband']=" and "
                    }
                  }
                  if (typeof item['gburl2'] === "undefined"){
                    item['gburl2']="";
                    gb2tag = item['gbtext2'];
                  }
                  else{
                   gb2tag='<a class="gb" target="_blank" href="' +item['gburl2']+'">'+item['gbtext2']+'</a>';
                  }



                //For author tag logic
                if (typeof item['author1'] === "undefined"){
                    item['author1'] = "";
                }
                
                if (typeof item['author1url'] === "undefined"){
                    item['author1url'] = "";
                }
                
                if (typeof item['author2'] === "undefined"){
                    item['author2'] = "";
                }
                
                if (typeof item['author2url'] === "undefined"){
                    item['author2url'] = "";
                }
                
                if (typeof item['author3'] === "undefined"){
                    item['author3'] = "";
                }
                
                if (typeof item['author3url'] === "undefined"){
                   item['author3url'] = "";
                }

                if ( item['author1url'] == ""){
                    author1tag = '<b>'+item['author1']+'</b>';
                }
                else{
                    author1tag='<b><a target="_blank" href="' +item['author1url'] +'">'+item['author1']+'</a></b>';
                }
                
                if ( item['author2url'] == ""){
                    author2tag = '<b>'+item['author2']+'</b>';
                }
                else{
                    author2tag='<b><a target="_blank" href="' +item['author2url'] +'">'+item['author2']+'</a></b>';
                }

                if ( item['author3url'] == ""){
                    author3tag = '<b>'+item['author3']+'</b>';
                }
                else{
                     author3tag='<b><a target="_blank" href="' +item['author3url'] +'">'+item['author3']+'</a></b>';
                }

                return '<div class="unit">'
                        +'<div class="holdpubimage">'
                        +'<a target="_blank" href="'+item['bookurl']+'">'
                        +'<img alt="Cover image: '+item['booktitle']
                        +'" src="'+imagetag
                        +'" /></a>'
                        +'</div>'
                        +'<div class="holdpubinfo">'
                        +'<cite>'
                        +'<a target="_blank" href="'+item['bookurl']+'">'+item['booktitle']+'</a>'
                        +'</cite>. '+item['articletitle']
                        +'<div class="author">'
                        +author1tag
                        +item['andauthor2']
                        +author2tag
                        +item['andauthor3']
                        +author3tag
                        +'</div>'
                        +'<div class="pubdate">'+item['pubdate']+'</div>'
                        +'<div class="whereelse">'
                        +gb1tag
                        +item['gband']
                        +gb2tag
                        +'</div>'
                        +'</div>'
                        +'</div>';
                }
        });
    //alert($(data).find("#facpub").html());
	//console.dir(embeddedjson);
    } catch (e) {
	    if (typeof console != "undefined") {
		    console.error("EmbeddedJSON Error: " + e);
			}
	}
},

function(xhr, status, error) { // This callback happens if the ajax call fails.
    if (typeof console != "undefined") {
	    if (status === "timeout") {
		    console.error("EmbeddedJSON Error: TIMEOUT.");
		} 
        else {
			console.error("EmbeddedJSON: HTTP-GET failure. Status: " + status + ", Error: " + error);
		}
	}
});