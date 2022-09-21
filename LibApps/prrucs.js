// Created by Linghan on Jan.30,2019

(function($) {

    $(document).ready(function() {

        if($(window).width() >= 800) {
            $('#imgmap').attr('usemap','#Map');
            $('#s-lg-box-wrapper-24450688').addClass('visually-hidden');
        } else {
            $('#imgmap').removeAttr('usemap');
            $('#s-lg-box-wrapper-24450688').removeClass('visually-hidden');
        }

        // Enable / disable map links depending on window size
        $( window ).resize(function() {
            if($(window).width() < 800){
                $('#imgmap').removeAttr('usemap');
                $('#s-lg-box-wrapper-24450688').removeClass('visually-hidden');
            } else {
                $('#imgmap').attr('usemap','#Map');
                $('#s-lg-box-wrapper-24450688').addClass('visually-hidden');
            }
        });


        var areaPath = ["prrucs-Algeria", "prrucs-Bahrain", "prrucs-Egypt", "prrucs-GS-WB", 
                        "prrucs-Iran", "prrucs-Iraq", "prrucs-Israel", "prrucs-Jordan", 
                        "prrucs-Kuwait", "prrucs-Lebanon", "prrucs-Libya", "prrucs-Morocco",
                        "prrucs-Oman", "prrucs-Qatar", "prrucs-SA", "prrucs-Syria",
                        "prrucs-Tunisia", "prrucs-Turkey", "prrucs-UAE", "prrucs-Yemen"];

        var url = window.location.href;
        var segments = url.split('/');
        var path = segments[3];
        if (areaPath.indexOf(path) != -1) {
            $('body').addClass('prrucs-area');
            $('body').prepend('<div id="sidestrippop">&nbsp;</div>');
        }

    }); // end document.ready()
})(jQuery);