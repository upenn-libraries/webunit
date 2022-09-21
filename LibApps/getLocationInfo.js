jQuery(document).ready(function($) {

    $('.lib-id').each(function(index) {
        var libid = $(this).html();
        var locUrl = "https://www.library.upenn.edu/rest/views/locations?_format=json&lid=" + libid;

        $.getJSON(locUrl, function(data) {
            jQuery.pennRotate({
                count:1,
                jsonSource:data,
                destination:'.lib-id:eq(' + index + ') + .lib-location',
                template:function(item) {
                    var name = item.name;
                    var address = item.field_street_address;
                    var city = item.field_city_state_zip;
                    var phone = item.field_library_phone_number;
                    var email = item.field_library_electronic_contact;
                    var form = item.field_library_econtact_form_url;
                    var map = item.field_campus_map_url;
                    var floor = item.field_floor_plans_url;
                    var hourSnippet = item.field_today_s_hours_snippet;

                    // Parse hourSnippet to get span class
                    var libhoursClass = '';
                    if (hourSnippet != '') {
                        var start = hourSnippet.indexOf('libhours-');
                        var end = hourSnippet.indexOf('&quot', start);
                        libhoursClass = hourSnippet.substr(start, end-start);
                    }


                    info = '';
                    // Map
                    if (map != '') {
                        info = info + '<div class="campus-map">' + map + '</div>';
                    }

                    // Address
                    if (address != '') {
                        info = info + '<div class="address">' + address + '</div>';
                    }

                    // City
                    if (city != '') {
                        info = info + '<div class="city">' + city + '</div>';
                    }

                    // Contact
                    if (phone != '') {
                        if (email != '') {
                            if (form != '') {
                                info = info + '<div class="contact">' + phone + '&nbsp;|&nbsp;' + email + '&nbsp;|&nbsp;' + form + '</div>';
                            }
                            else {
                                info = info + '<div class="contact">' + phone + '&nbsp;|&nbsp;' + email  + '</div>';
                            }

                        }
                        else {
                            if (form != '') {
                                info = info + '<div class="contact">' + phone + '&nbsp;|&nbsp;' + form + '</div>';
                            }
                            else {
                                info = info + '<div class="contact">' + phone  + '</div>';
                            }
                        }
                    }
                    else if (email != '') {
                        if (form != '') {
                            info = info + '<div class="contact">' + email + '&nbsp;|&nbsp;' + form +'</div>';
                        }
                        else {
                            info = info + '<div class="contact">' + email + '</div>';
                        }
                    }
                    else if (form != '') {
                        info = info + '<div class="contact">' + form + '</div>';
                    }

                    // Floor Plan
                    if (floor != '') {
                        info = info + '<div class="floor-plan">' + floor + '</div>';
                    }

                    // Libhours
                    if (libhoursClass !='') {
                        info = info + '<div style="margin-left: -.4rem" class="hours"><span class="' + libhoursClass + '">&nbsp;</span></div>';
                    }

                    return info;
                }
            });
        }); 
    });
    
});