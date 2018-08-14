(function($) {
    var allMarkers = [];
    //var infowindow = null;

    $.fn.mapmarker = function(options) {
        var opts = $.extend({}, $.fn.mapmarker.defaults, options);

        return this.each(function() {
            // Apply plugin functionality to each element
            var map_element = this;
            addMapMarker(map_element, opts.zoom, opts.lat, opts.lng, opts.markers, opts.panTo);
        });
    };

    // Set up default values
    var defaultMarkers = {
        "markers": []
    };

    $.fn.mapmarker.defaults = {
        zoom: 8,
        scrollwheel: false,
        fullscreenControl: false,
        markers: defaultMarkers
    }

    // Main function code here (ref:google map api v3)
    function addMapMarker(map_element, zoom, lat, lng, markers, panTo) {
        //console.log($.fn.mapmarker.defaults['center']);

        //Set center of the Map
        var myOptions = {
            zoom: zoom,
            scrollwheel: false,
            fullscreenControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        if (! $(map_element).data('mapmarker')) {

            $(map_element).data('mapmarker', new google.maps.Map(map_element, myOptions));
        }
        // var map = new google.maps.Map(map_element, myOptions);
        var map = $(map_element).data('mapmarker');
        // var geocoder = new google.maps.Geocoder();
        // var infowindow = null;
        var baloon_text = "";

        // geocoder.geocode({'address': center}, function(results, status) {
        //     console.log('mapmarker : markers : ', markers);
        //     if (status == google.maps.GeocoderStatus.OK) {
        //         //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        //         map.setCenter(results[0].geometry.location);
        //     }
        //     else {
        //         console.log("Geocode was not successful for the following reason: " + status);
        //     }
        // });
        
        var LatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

        if (panTo) {

            map.panTo(LatLng);

        } else {

            map.setCenter(LatLng);
        }


        //run the marker JSON loop here
        $.each(markers.markers, function(i, the_marker) {
            console.log('the_marker : ', the_marker);
            latitude = the_marker.latitude;
            longitude = the_marker.longitude;
            icon = the_marker.icon;
            var baloon_text = the_marker.baloon_text;


            if (latitude != "" && longitude != "") {

                if (!panTo) {

                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(latitude, longitude),
                        animation: google.maps.Animation.DROP,
                        icon: icon
                    });

                    allMarkers.push(marker);
                }

                if(panTo) {
                    console.log('panTo = true, allMarkers : ', allMarkers);

                    $.each(allMarkers, function(index, marker) {

                        if(marker.position.lat() == lat && marker.position.lng() == lng) {

                            if (infowindow) {
                                infowindow.close();
                            }

                            infowindow = new google.maps.InfoWindow({
                                content: baloon_text
                            });

                            infowindow.open(map, marker);

                            // google.maps.event.trigger(marker, 'mouseover');
                            // google.maps.event.removeListener(listener);
                        }
                    });
                }

                // // Set up markers with info windows 
                // google.maps.event.addListener(marker, 'mouseover', function() {
                //     // Close all open infowindows
                //     if (infowindow) {
                //         infowindow.close();
                //     }
                //     $(map_element)
                //             .mouseleave(function() {
                //                 infowindow.close();
                //             });

                //     infowindow = new google.maps.InfoWindow({
                //         content: baloon_text
                //     });

                //     infowindow.open(map, marker);
                // });


            }
        });
    }

})(jQuery);
