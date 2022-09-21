function showGroupStudies() {
    $("#seegroupstudies").addClass("active");
    $("#seegroupstudies a").addClass("active");
    $("#seeseminars").removeClass("active");
    $("#seeseminars a").removeClass("active");

    $("#s-lc-box-2350-container").css("display","block");
    $("#s-lc-box-2352-container").css("display","block");
    $("#s-lc-box-28929-container").css("display","none");
    $("#s-lc-box-28930-container").css("display","none");
    $("#s-lc-box-2351-container").css("display","none");
    $("#s-lc-box-50807-container").css("display","none");
}

function showSeminars() {
    $("#seegroupstudies").removeClass("active");
    $("#seegroupstudies a").removeClass("active");
    $("#seeseminars").addClass("active");
    $("#seeseminars a").addClass("active");

    $("#s-lc-box-2350-container").css("display","none");
    $("#s-lc-box-2352-container").css("display","none");
    $("#s-lc-box-28929-container").css("display","block");
    $("#s-lc-box-28930-container").css("display","block");
    $("#s-lc-box-2351-container").css("display","block");
    $("#s-lc-box-50807-container").css("display","block");
}

liburl = window.location.href;
if (liburl.includes("book=seminars")) {
    setTimeout(function() {
        showSeminars();
        var hash = location.hash;
        document.getElementById(hash).scrollIntoView();
    }, 10);
}