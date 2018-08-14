function initCityAutocomplete() {
    
    var provideCity = parseInt(Cookies.get('provideCity'));
    
    var predictedCity = Cookies.get('predictedCity');

    var $modal = $('#provideCity');

    var hideModal = function() {
        // $modal.css('display', 'none');
        $modal.modal('hide');

        // if we provide the user with a predicted city.
        // and he choose to not give a fuck about it
        // then we should never show him this pupup again :-)
        if(predictedCity) {
            // this cookies is used by ClientService class - provideCity methode
            // to decide whether to set the cookies to show the popup city or not
            Cookies.set('showPopupCity', 0, { expires: 3650 });
        }
    };

    var showModal = function() {
        // $modal.css('display', 'block');
        $modal.modal('show');
    };

    var initAutocompleteForPupupCity = function() {

        var input = document.getElementById('cityProvided');

        var options = { types: ['(cities)'], componentRestrictions: {country: ["ma", "eh"]} };

        var autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener('place_changed', function() {

            var place = autocomplete.getPlace();

            $('#theCity').val(place.name);

        });
    };


    if(provideCity && doctori.auth.id) {

        initAutocompleteForPupupCity();

        if(predictedCity) {

            $('#cityProvided').val(predictedCity);
            $('#theCity').val(predictedCity);
        }

        showModal();
    }


    $('#cancelProvidedCity').off('click').on('click', function(event) {
        event.preventDefault();

        Cookies.set('provideCity', 0, { expires: 3650 });

        hideModal();
    });


    $('#sendProvidedCity').off('click').on('click', function(event) {
        event.preventDefault();

        var city = $.trim($('#theCity').val());
    
        if(city) {

            $.ajax({
                url: doctori.paths.sitePatientCity,
                type: 'POST',
                dataType: 'json',
                data: {
                    city   : city,
                },
            })
            .done(function(data) {

                if(! data.error) {

                    Cookies.set('provideCity', 0, { expires: 3650 });
                    hideModal();
                }
            })
            .fail(function() {
                console.error("error");
            });
        }
        
    });


    var initAutocompleteForPrimarySearch = function() {

        var input = document.getElementById('suggested_names');

        if(input) {

            var icon = document.getElementById('localizationIcon');

            var options = { types: ['(cities)'], componentRestrictions: {country: ["ma", "eh"]} };

            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {
                
                var place = autocomplete.getPlace();
                console.log('icon element : ', place);

                if(place.name) {

                    icon.classList.remove('localization-icon-gray');
                    
                } else {

                    icon.classList.add('localization-icon-gray');
                }

                input.value = place.name;

            });
        }
    };


    var initAutocompleteForPractitionerRegister = function() {

        var input = document.getElementById('practitionerCity');

        if(input) {

            var options = { types: ['(cities)'], componentRestrictions: {country: ["ma", "eh"]} };

            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {

                var cityInput = document.getElementById('city');
                var latInput = document.getElementById('lat');
                var lngInput = document.getElementById('lng');

                var place = autocomplete.getPlace();

                cityInput.value = place.name;

                if(place.geometry.location) {

                    latInput.value = place.geometry.location.lat();
                    lngInput.value = place.geometry.location.lng();
                }

                input.value = place.name;
                
            });
        }
    };


    var initAutocompleteForProfilePatient = function() {

        var input = document.getElementById('profilePatientCity');

        if(input) {

            var options = { types: ['(cities)'], componentRestrictions: {country: ["ma", "eh"]} };

            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {

                var cityInput = document.getElementById('city');

                var place = autocomplete.getPlace();

                cityInput.value = place.name;
                
            });
        }
    };


    var initAutocompleteForProfileDoctor = function() {

        var input = document.getElementById('profileDoctorCity');

        if(input) {

            var options = { types: ['(cities)'], componentRestrictions: {country: ["ma", "eh"]} };

            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {

                var cityInput = document.getElementById('city');

                var place     = autocomplete.getPlace();

                cityInput.value = place.name;

                input.value = place.name;
            });
        }
    };


    var initAutocompleteForProfilePatient = function() {

        var input = document.getElementById('profileDoctorAddress');

        if(input) {

            var options = { types: ['geocode'], componentRestrictions: {country: ["ma", "eh"]} };

            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {
                
                var place           = autocomplete.getPlace();
                
                var components      = place.address_components;

                for (i in components) {

                    var component = components[i];
                    var types = component.types;

                    for (j in types) {

                        if (types[j] == 'postal_code') {

                            var postalCodeInput   = document.getElementById('postalCode');
                            postalCodeInput.value = component.short_name;
                        }

                        if (types[j] == 'locality') {

                            var cityInput         = document.getElementById('profileDoctorCity');
                            var cityInputHidden   = document.getElementById('city');
                            cityInput.value       = component.short_name;
                            cityInputHidden.value = component.short_name;
                        }
                    }
                }


                if(place.geometry.location) {

                    var latInput   = document.getElementById('lat');
                    var lngInput   = document.getElementById('lng');

                    latInput.value = place.geometry.location.lat();
                    lngInput.value = place.geometry.location.lng();
                }


            });
        }
    };


    initAutocompleteForPrimarySearch();
    initAutocompleteForPractitionerRegister();
    initAutocompleteForProfilePatient();
    initAutocompleteForProfileDoctor();
}