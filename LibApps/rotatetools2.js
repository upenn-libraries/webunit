var tools = [   
     {
        "filename": "stylus.png", 
        "toolname": "Find software tutorials",
        "url": "http://guides.library.upenn.edu/hometabs/tutorials/"
    },
    {
        "filename": "eye.png", 
        "toolname": "Find images",
        "url": "http://guides.library.upenn.edu/images"
    },
    {
        "filename": "dots.png", 
        "toolname": "Print: posters, 3D",
        "url": "http://guides.library.upenn.edu/posterprinting"
    }, 
    {
        "filename": "camera.png", 
        "toolname": "Borrow equipment",
        "url": "http://guides.library.upenn.edu/equipment"
    },
    {
        "filename": "footprint.png", 
        "toolname": "Manage citations",
        "url": "http://guides.library.upenn.edu/citationmgmt"
    },
    {
        "filename": "scan.png", 
        "toolname": "Scan, print, copy",
        "url": "http://guides.library.upenn.edu/scanprintcopy"
    },
    {
        "filename": "place.png", 
        "toolname": "Reserve a room",
        "url": "http://libcal.library.upenn.edu/"
    },
    {
        "filename": "omeka.png", 
        "toolname": "Make an Omeka site",
        "url": "http://guides.library.upenn.edu/omeka"
    },
    {
        "filename": "book.png", 
        "toolname": "Renew books",
        "url": "http://www.library.upenn.edu/borrowing/selfrenewal.html"
    },
    {
        "filename": "data.png", 
        "toolname": "Work with data",
        "url": "http://guides.library.upenn.edu/data"
    }

];


jQuery(document).ready(function() {
    jQuery.pennRotate({count:4,
                   jsonSource:tools,
                   destination:"#toolsLinks",
                   template:function(item) {                    
                    return '<div class="toolimagequad">'
                    + '<a class="imagelink" href="'+ item.url +'">'
                    +'<img src="https://s3.amazonaws.com/libapps/customers/220/images/' + item.filename + '" alt="' + item.toolname +  '" /></a>' 
                    + '<a class="namelink" href="'+ item.url +'">' + item.toolname
                    +'</a></div>  ';
                    
                } });
});

//url filename toolname