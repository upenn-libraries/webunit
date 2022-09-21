//Version 2: Using Ivan's code
jQuery(function($) {
  
  $.ajax({
			//url: "http://upenn.beta.libguides.com/c.php?g=493478",
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
            
            //Shreya's method
            //var facpubUrl =  "https://gist.githubusercontent.com/anonymous/6cb0c5c5d851edf37497dccaaae69068/raw/975144ea45832a7480bc7b0330134a19745ceea8/facpublist.js";
            //$.getJSON(facpubUrl, function(facpub){

        jQuery.pennRotate({
	        jsonSource:facpub,
	        destination:"td#facpubrotation2",
            count:6,
            template:function(item){
			    var gb1tag=""
			    var gb2tag="";
			    var author1tag="";
			    var author2tag="";
			    var author3tag="";
			    var imagetag="";
			
			    //Check Image
			    //+'" src="http://www.library.upenn.edu/images/facpub/libguides/'+item['image']+'"
			   
				    imagetag =item['image'];
			    
			    
			
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
			
    			return '<div class="bookcell"><div class="holdbookcover"><a target="_blank" href="'
	    				+item['bookurl']
		    			+'"><img alt="Cover image: '
			    		+item['booktitle']
				    	+'" src="'
			            +imagetag
			            +'" height="124px" /></a></div>'
					    +'<div class="holdcaption">'
						+author1tag
						+item['andauthor2']
						+author2tag
						+item['andauthor3']
						+author3tag+': '
			            +item['articletitle']+item['articlein']
			            +'<cite>'
					    +'<a target="_blank" href="'+item['bookurl']+'">'+item['booktitle']+'</a>'
			            +'</cite>. '
			            +item['pubdate'] 
			            +'. '
			            +gb1tag +item['gband'] +gb2tag
			            +'</div></div>';
                }
            });


            // myFunction(embeddedjson);
            //alert($(data).find("#facpub").html());
			//console.dir(embeddedjson);
        } catch (e) {
            if (typeof console != "undefined") {
		        console.error("EmbeddedJSON Error: " + e);
		    }
	    }
    },

    function(xhr, status, error) { 
        // This callback happens if the ajax call fails.
        if (typeof console != "undefined") {
            if (status === "timeout") {
                console.error("EmbeddedJSON Error: TIMEOUT.");
		    } else {
			    console.error("EmbeddedJSON: HTTP-GET failure. Status: " + status + ", Error: " + error);
		    }
	    }
    });
}); //end jquery