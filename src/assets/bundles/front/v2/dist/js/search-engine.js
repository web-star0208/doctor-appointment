jQuery(document).ready(function($) {

    var searchRequest;


    var getCitySlug = function(city, callback) {

        $.ajax({
            url: window.doctori.paths.siteFrontHomepage,
            type: 'POST',
            dataType: 'json',
            data: {
                action : 'get-city-slug',
                term : city
            }
        })
        .done(function(response) {
            
            callback(response);
        });
    };

    (function () {

        $("#searchEngine").typeWatch({
            callback: function (value) { 
                search(value); 
            }
        });

        var search = function(term) {

            if(term && term.length >= 3) {

                searchRequest = $.ajax({

                    url: window.doctori.paths.siteFrontHomepage,
                    type: 'POST',
                    dataType: 'html',
                    data: {
                        term    : term,
                        action  : 'search-engine'
                    },
                    beforeSend: function() {
                        if (searchRequest) {
                            searchRequest.abort();
                        }

                        $('.input_loading').addClass('running');
                    }
                });

                searchRequest.done(function(response) {

                    $('.resulte_ajax_serch').html(response);
                    $('.resulte_ajax_serch').show();
                    select(true);
                });

                searchRequest.always(function() {

                    $('.input_loading').removeClass('running');
                });

            } else {
                
                $('.resulte_ajax_serch').html(' ');
                // select(false);
            }
        };


        var select = function(flag) {

            if (flag) {

                $('._speciality').off('click').on('click', function(event) {
                    event.preventDefault();
                    
                    var $element = $(this);
                    var speciality_id = $element.data('id');
                    var speciality_name = $element.data('name');
                    var speciality_slug = $element.data('slug');

                    $('.resulte_ajax_serch').hide();
                    $('#searchEngine').val(speciality_name);
                    $('#specialite').val(speciality_id);
                    $('#specialitySlug').val(speciality_slug);

                });

            } else {

                $('#searchEngine').val('');
                $('#specialite').val('');
                $('#specialitySlug').val('');
            }

        }

    })(); 

    $('#search').off().on('click', function(event) {
        event.preventDefault();
        var $searchButton        = $(this);
        var $specialityInput     = $('#specialite');
        var $cityInput           = $("#suggested_names");
        var $specialitySlugInput = $('#specialitySlug');
        var $searchEngine        = $('#searchEngine');
        
        var $specialityTooltip   = $('#specialityTooltip');
        var $cityTooltip         = $('#cityTooltip');
        
        var speciality           = $specialityInput.val();
        var speciality_slug      = $specialitySlugInput.val();
        var city                 = $cityInput.val();

        $cityInput.focus(function(event) {
            
            $cityTooltip.css('visibility', 'hidden');
        });

        $searchEngine.focus(function(event) {
            
            $specialityTooltip.css('visibility', 'hidden');
        });

        if(!speciality) {

            $specialityTooltip.css('visibility', 'visible');
            return false;
        }
        
        if(!city) {

            $cityTooltip.css('visibility', 'visible');
            return false;
        }

        $searchButton.addClass('disabled, running');
        
        getCitySlug(city, function(response) {

            var locale = window.doctori.locale;

            var prefix = locale == 'fr' ? 'medecin' : 'tabib';

            var href   = '/'+ locale +'/'+ prefix +'/'+ speciality_slug +'/'+ response.slug;

            // similar behavior as clicking on a link
            window.location.href = href;
        });

        return;

        $('.form_recherche').submit();
    });


    $('#localizationIcon').on('click touch', function(event) {
        event.preventDefault();

        var $icon = $(this);
        
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {

                $icon.addClass('rotation');

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                var geocoder = new google.maps.Geocoder;

                var latlng = {lat: pos.lat, lng: pos.lng};

                geocoder.geocode({'location': latlng}, function(results, status) {

                    if (status === 'OK') {

                        if (results[1]) {

                            var components = results[1].address_components;

                            for(index in components) {

                                var types = components[index].types

                                for(type in types) {

                                    if(types[type] == 'locality') {
                                        
                                        $('#suggested_names').val(components[index].short_name);
                                        $icon.removeClass('localization-icon-gray');
                                        $icon.removeClass('rotation');
                                    }
                                }
                            }

                        } else {

                            console.info('No results found');
                        }
                    } else {

                        console.error('Geocoder failed due to: ' + status);
                    }
                });

            }, function(error) {

                console.error(error);
            });

        } else {

            // Browser doesn't support Geolocation
            console.info('Browser doesn\'t support Geolocation');
        }
    });


    $('#suggested_names').on('change', function(event) {
        event.preventDefault();
        
        var $input = $(this);
        var $icon = $('#localizationIcon');

        var place = $.trim($input.val());

        if (place) {
            $icon.removeClass('localization-icon-gray');
        } else {
            $icon.addClass('localization-icon-gray');
        }
    });
});