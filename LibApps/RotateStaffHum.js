jQuery(document).ready(function() {
        $('body').addClass('production');
        var subjSpecUrl = "https://s3.amazonaws.com/libapps/sites/231/include/subjSpecAll.js";
        var col = "";
        
        //initializing subjSpecAS - a new JSON Source created specifically from humanities
        var subjSpecHum = [{
        "filename": "null", 
        "personname": "null", 
        "specialties": [
                      "null"
        ], 
        "groups":[
                "null"
        ], 
        "url": "null"
        }];
        //alert("DEBUG [19] "+subjSpecHum[0].filename + " | " +subjSpecHum[0].personname+" | " +subjSpecHum[0].url);
        $.getJSON(subjSpecUrl, function(subjSpecAll){
            var count = 0;
            //initializing max with the length of subjSpecAll
            var max = subjSpecAll.length;
            //initializing a variable i to iterate
            var i;

            //TODO: looping over subjSpecAll and filtering the groups containing "Humanities" <--- RENAME THIS
            for (i = 0; i < max; i++) {
                if (subjSpecAll[i].groups.indexOf("Humanities") != -1) {
                    subjSpecHum.push(subjSpecAll[i]);
                }
            }
            //To remove the element comprising of nulls , using splice and not delete so that indices are apt
            subjSpecAS.splice(0, 1);
            var len = subjSpecAS.length;
            var str = "";
            for (i = 0; i < len; i++) {
                str += subjSpecHum[i].personname + " | ";
            }
            //alert("DEBUG [47] " + str);
  
            jQuery.pennRotate({
                count:4,
                jsonSource:subjSpecHum,
                destination:"#people",
                template:function(item) {
                    var rand = Math.ceil(item.specialties.length *Math.random()) -1;
                    return '<div class="staffimagequad">'
                    + '<a class="imagelink" href="http://www.library.upenn.edu/people/staff/'+item.url+'">'
                    + '<img src="http://www.library.upenn.edu/images/staff/'+ item.filename +'" alt="'+item.specialties[rand]+'"' 
                    + 'title="'+item.specialties[rand]+'" /></a>'
                    + '<a class="namelink" href="http://www.library.upenn.edu/people/staff/'+item.url+'">'+ item.personname
                    +'</a></div> ';
                } 
        });
        })
});