if (window.doctori.dev) {

    console.log(
        '%cpatient-profile.js', 
        'color:orange;font-weight: bolder;'
    );
}

var $closeButton = "<button data-dismiss='alert' class='close' type='button'>×</button>";


function control_field(err) {

    var comp = 0;
    $.each(err, function(i, val) {
        if (!val) {
            $('#' + i).addClass(i + '-error input-error');
            comp++;
        }
        else {
            $('#' + i).removeClass(i + '-error input-error');
        }
    });
    return comp;
}

$(function() {

    $('.date_item').click(function(event) {
        var rdv = $(this).find('.hidden-rdv').val();
        var dataString = {'rdv': rdv, 'action': 'getrdv'}
        $.ajax({
            type: "POST",
            url: window.doctori.paths.siteEspacePatient,
            data: dataString,
            beforeSend: function()
            {
                $('.info-patient').html('');
                $('.info-patient').html('<div class="patient-loader"><span class="text-loader">'+window.doctori.validation.messages.please_wait+'...</span><span class="ajax-loader"></span></div>');
                $('.ajax-loader').html('<img src="'+window.doctori.schemeAndHttpHost+'/bundles/front/v2/dist/images/loaders/ajax-loader.gif"/>')
            },
            success: function(data)
            {

                $('.info-patient').html(data);
            }
        });
    });

    // $("#specialite_id,#civilite,#titu,#cmu,#ame").selectbox();

    $(".add_patient").click(function(event) {
        event.preventDefault();
        var dataString = {'action': "new-display"}
        $.ajax({
            type: "POST",
            url: window.doctori.paths.siteOperationAssoc,
            data: dataString,
            success: function(data)
            {
                $('#new-patient-display').html(data);
                $('#new-patient-display').show();
                $('html, body').animate({scrollTop: $(".alert-success").offset().top}, 350);
            }
        });
    });

    $(".show-detaille").click(function(event) {
        event.preventDefault();
        var despo = $(this).closest('.todolist').find('.patient-informa');
        var patient = $(this).closest('.todolist').find('.patient-rel').val();
        var dataString = {'patient': patient, 'action': "display-informa"}
        $.ajax({
            type: "POST",
            url: window.doctori.paths.siteOperationAssoc,
            data: dataString,
            success: function(data)
            {
                $(".patient-informa").each(function() {
                    $(this).hide();
                });
                despo.show();
                despo.html(data);
            }
        });
    });
});

// Suggest a Doctor From Validation
    
(function () {

    var countryData = $.fn.intlTelInput.getCountryData();
    var hashCountryDataTranslation = {"af":"Afghanistan (‫افغانستان‬‎)","al":"Albanie (Shqipëri)","dz":"Algérie (‫الجزائر‬‎)","as":"Samoa américaines (American Samoa)","ad":"Andorre (Andorra)","ao":"Angola","ai":"Anguilla","ag":"Antigua-et-Barbuda (Antigua and Barbuda)","ar":"Argentine (Argentina)","am":"Arménie (Հայաստան)","aw":"Aruba","au":"Australie (Australia)","at":"Autriche (Österreich)","az":"Azerbaïdjan (Azərbaycan)","bs":"Bahamas","bh":"Bahreïn (‫البحرين‬‎)","bd":"Bangladesh (বাংলাদেশ)","bb":"Barbade (Barbados)","by":"Biélorussie (Беларусь)","be":"Belgique (België)","bz":"Belize","bj":"Bénin","bm":"Bermudes (Bermuda)","bt":"Bhoutan (འབྲུག)","bo":"Bolivie (Bolivia)","ba":"Bosnie-Herzégovine (Босна и Херцеговина)","bw":"Botswana","br":"Brésil (Brasil)","io":"Territoire britannique de l’océan Indien (British Indian Ocean Territory)","vg":"Îles Vierges britanniques (British Virgin Islands)","bn":"Brunei","bg":"Bulgarie (България)","bf":"Burkina Faso","bi":"Burundi (Uburundi)","kh":"Cambodge (កម្ពុជា)","cm":"Cameroun","ca":"Canada","cv":"Cap-Vert (Kabu Verdi)","bq":"Bonaire, Saint-Eustache et Saba (Caribbean Netherlands)","ky":"Îles Caïmans (Cay Islands)","cf":"République centrafricaine","td":"Tchad","cl":"Chili (Chile)","cn":"Chine (中国)","co":"Colombie (Colombia)","km":"Comores (‫جزر القمر‬‎)","cd":"République démocratique du Congo (Jamhuri ya Kidemokrasia ya Kongo)","cg":"République du Congo / (Congo) (Congo-Brazzaville)","ck":"Îles Cook (Cook Islands)","cr":"Costa Rica","ci":"Côte d’Ivoire","hr":"Croatie (Hrvatska)","cu":"Cuba","cw":"Curaçao","cy":"Chypre (Κύπρος)","cz":"République tchèque (Česká republika)","dk":"Danemark (Danmark)","dj":"Djibouti","dm":"Dominique (Dominica)","do":"République dominicaine (República Dominicana)","ec":"Équateur (Ecuador)","eg":"Égypte (‫مصر‬‎)","sv":"Salvador (El Salvador)","gq":"Guinée équatoriale (Guinea Ecuatorial)","er":"Érythrée (Eritrea)","ee":"Estonie (Eesti)","et":"Éthiopie (Ethiopia)","fk":"Îles Malouines (Islas Malvinas)","fo":"Îles Féroé (Føroyar)","fj":"Fidji (Fiji)","fi":"Finlande (Suomi)","fr":"France","gf":"Guyane (Guyane française)","pf":"Polynésie française","ga":"Gabon","gm":"Gambie (Gambia)","ge":"Géorgie (საქართველო)","de":"Allemagne (Deutschland)","gh":"Ghana (Gaana)","gi":"Gibraltar","gr":"Grèce (Ελλάδα)","gl":"Groenland (Kalaallit Nunaat)","gd":"Grenade (Grenada)","gp":"Guadeloupe","gu":"Guam","gt":"Guatemala","gn":"Guinée","gw":"Guinée-Bissau (República da Guiné-Bissau)","gy":"Guyana","ht":"Haïti (Haiti)","hn":"Honduras","hk":"Hong Kong (香港)","hu":"Hongrie (Magyarország)","is":"Islande (Ísland)","in":"Inde (भारत)","id":"Indonésie (Indonesia)","ir":"Iran (‫ایران‬‎)","iq":"Irak (‫العراق‬‎)","ie":"Irlande (Ireland)","il":"Israël (‫ישראל‬‎)","it":"Italie (Italia)","jm":"Jamaïque (Jamaica)","jp":"Japon (日本)","jo":"Jordanie (‫الأردن‬‎)","kz":"Kazakhstan (Казахстан)","ke":"Kenya","ki":"Kiribati","kw":"Koweït (‫الكويت‬‎)","kg":"Kirghizistan (Кыргызстан)","la":"Laos (ລາວ)","lv":"Lettonie (Latvija)","lb":"Liban (‫لبنان‬‎)","ls":"Lesotho","lr":"Liberia","ly":"Libye (‫ليبيا‬‎)","li":"Liechtenstein","lt":"Lituanie (Lietuva)","lu":"Luxembourg","mo":"Macao (澳門)","mk":"Macédoine (Македонија)","mg":"Madagascar (Madagasikara)","mw":"Malawi","my":"Malaisie (Malaysia)","mv":"Maldives","ml":"Mali","mt":"Malte (Malta)","mh":"Marshall (Marshall Islands)","mq":"Martinique","mr":"Mauritanie (‫موريتانيا‬‎)","mu":"Maurice (Moris)","mx":"Mexique (México)","fm":"Micronésie (Micronesia)","md":"Moldavie (Republica Moldova)","mc":"Monaco","mn":"Mongolie (Монгол)","me":"Monténégro (Crna Gora)","ms":"Montserrat","ma":"Maroc (‫المغرب‬‎)","mz":"Mozambique (Moçambique)","mm":"Birmanie (မြန်မာ)","na":"Namibie (Namibië)","nr":"Nauru","np":"Népal (नेपाल)","nl":"Pays-Bas (Nederland)","nc":"Nouvelle-Calédonie","nz":"Nouvelle-Zélande (New Zealand)","ni":"Nicaragua","ne":"Niger (Nijar)","ng":"Nigeria","nu":"Niue","nf":"Île Norfolk (Norfolk Island)","kp":"Corée du Nord (조선 민주주의 인민 공화국)","mp":"Îles Mariannes du Nord (Northern Mariana Islands)","no":"Norvège (Norge)","om":"Oman (‫عُمان‬‎)","pk":"Pakistan (‫پاکستان‬‎)","pw":"Palaos (Palau)","ps":"Autorité palestinienne (‫فلسطين‬‎)","pa":"Panama (Panamá)","pg":"Papouasie-Nouvelle-Guinée (Papua New Guinea)","py":"Paraguay","pe":"Pérou (Perú)","ph":"Philippines","pl":"Pologne (Polska)","pt":"Portugal","pr":"Porto Rico (Puerto Rico)","qa":"Qatar (‫قطر‬‎)","re":"La Réunion","ro":"Roumanie (România)","ru":"Russie (Россия)","rw":"Rwanda","bl":"Saint-Barthélemy","sh":"Sainte-Hélène, Ascension et Tristan da Cunha (Saint Helena)","kn":"Saint-Christophe-et-Niévès (Saint Kitts and Nevis)","lc":"Sainte-Lucie (Saint Lucia)","mf":"Saint-Martin (Antilles françaises) (partie française))","pm":"Saint-Pierre-et-Miquelon","vc":"Saint-Vincent-et-les-Grenadines (Saint Vincent and the Grenadines)","ws":"Samoa","sm":"Saint-Marin (San Marino)","st":"Sao Tomé-et-Principe (São Tomé e Príncipe)","sa":"Arabie saoudite (‫المملكة العربية السعودية‬‎)","sn":"Sénégal","rs":"Serbie (Србија)","sc":"Seychelles","sl":"Sierra Leone","sg":"Singapour (Singapore)","sx":"Saint-Martin (Sint Maarten)","sk":"Slovaquie (Slovensko)","si":"Slovénie (Slovenija)","sb":"Salomon (Solomon Islands)","so":"Somalie (Soomaaliya)","za":"Afrique du Sud (South Africa)","kr":"Corée du Sud (대한민국)","ss":"Soudan du Sud (‫جنوب السودان‬‎)","es":"Espagne (España)","lk":"Sri Lanka (ශ්‍රී ලංකාව)","sd":"Soudan (‫السودان‬‎)","sr":"Suriname","sz":"Swaziland","se":"Suède (Sverige)","ch":"Suisse (Schweiz)","sy":"Syrie (‫سوريا‬‎)","tw":"Taïwan / (République de Chine (Taïwan)) (台灣)","tj":"Tadjikistan (Tajikistan)","tz":"Tanzanie (Tanzania)","th":"Thaïlande (ไทย)","tl":"Timor oriental (Timor-Leste)","tg":"Togo","tk":"Tokelau","to":"Tonga","tt":"Trinité-et-Tobago (Trinidad and Tobago)","tn":"Tunisie (‫تونس‬‎)","tr":"Turquie (Türkiye)","tm":"Turkménistan (Turkmenistan)","tc":"Îles Turques-et-Caïques (Turks and Caicos Islands)","tv":"Tuvalu","vi":"Îles Vierges des États-Unis (U.S. Virgin Islands)","ug":"Ouganda (Uganda)","ua":"Ukraine (Україна)","ae":"Émirats arabes unis (‫الإمارات العربية المتحدة‬‎)","gb":"Royaume-Uni (United Kingdom)","us":"États-Unis (United States)","uy":"Uruguay","uz":"Ouzbékistan (Oʻzbekiston)","vu":"Vanuatu","va":"État de la Cité du Vatican (Città del Vaticano)","ve":"Venezuela","vn":"Viêt Nam (Việt Nam)","wf":"Wallis-et-Futuna (Wallis and Futuna)","ye":"Yémen (‫اليمن‬‎)","zm":"Zambie (Zambia)","zw":"Zimbabwe"};
    $.each(countryData, function(i, country) {
      country.name = hashCountryDataTranslation[country.iso2];
    });

    $("#docMobile").intlTelInput({
        utilsScript: window.doctori.schemeAndHttpHost+"/bundles/front/v2/dist/vendor/intl-tel-input/utils.js",
        formatOnDisplay: false,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        }
    });


    var isPhoneValid = function(phonenumber) {

        return $("#docMobile").intlTelInput("isValidNumber");
        // var pattern = new RegExp(/^0\d{9}$/);
        // return pattern.test(phonenumber);
    };


    var validateForm = function() {

        var $firstname  = $('#docFirstname');
        var $lastname   = $('#docLastname');
        var $mobile     = $('#docMobile');
        var $address    = $('#docAddress');
        var $postalCode = $('#docPostalCode'); // in the matter of fact this represent the doctor city
        
        var $alert      = $('#suggestDoctorErrors');
        
        
        var firstname   = $firstname.val();
        var lastname    = $lastname.val();
        var mobile      = $mobile.val();
        var address     = $address.val();
        // var postalCode  = parseInt($postalCode.val()); // the postal code is an integer
        var postalCode  = $postalCode.val(); // in the matter of fact this represent the doctor city

        var errors = [];


        if(! lastname) {
            errors.push(window.doctori.validation.fields.lastname.required);
            $lastname.addClass('input-error');
        } else {
            $lastname.removeClass('input-error');
        }


        if(! firstname) {
            errors.push(window.doctori.validation.fields.firstname.required);
            $firstname.addClass('input-error');
        } else {
            $firstname.removeClass('input-error');
        }


        // if(! mobile) {
        //     errors.push('Le champ N° de téléphone mobile est obligatoire');
        //     $mobile.addClass('input-error');
        // } else {
        //     $mobile.removeClass('input-error');
        // }


        if(mobile) {
            
            if(! isPhoneValid(mobile)) {
                errors.push(window.doctori.validation.fields.mobile.invalid);
                $mobile.addClass('input-error');
            } else {
                $mobile.removeClass('input-error');
                $mobile.val($("#docMobile").intlTelInput("getNumber"));
            }
        }


        // if(! address) {
        //     errors.push('Le champ Adresse est obligatoire');
        //     $address.addClass('input-error');
        // } else {
        //     $address.removeClass('input-error');
        // }


        if(! postalCode) {
            errors.push(window.doctori.validation.fields.city.required);
            $postalCode.addClass('input-error');
        } else {
            $postalCode.removeClass('input-error');
        }

        if(errors.length) {

            $alert.removeClass('success').addClass('note-success').html(' ');

            errors.forEach( function(element, index) {
                $alert.append('<p>'+element+'</p>');
            });

            $alert.prepend($closeButton).show();

            $('html,body').animate({
                scrollTop: $('#suggestDoctorErrors').offset().top - 100
            }, 500);

        } else {

            $alert.hide();
            submitSuggestedDoctor(firstname, lastname, $("#docMobile").intlTelInput("getNumber"), address, postalCode);
        }


    };


    var submitSuggestedDoctor = function(firstname, lastname, mobile, address, postalCode) {

        $.ajax({
            url: window.doctori.paths.siteEditAssoc,
            type: 'POST',
            data: {
                'nom'   : lastname, 
                'prenom': firstname, 
                'cp'    : postalCode, 
                'mobile': mobile, 
                'adr'   : address, 
                'action': 'suggdoc'
            },
            beforeSend: function() {
                $('#submitSuggestedDoctor_laptop').css('opacity', '0.5').addClass('disabled');
                $('#submitSuggestedDoctor_phone').css('opacity', '0.5').addClass('disabled');
            }
        })
        .done(function(response) {

            $('#suggestDoctorForm')[0].reset();
            $('#suggestDoctorErrors')
                .removeClass('note-success')
                .addClass('success')
                .html(window.doctori.validation.messages.request_saved+$closeButton).show();

            $('html,body').animate({
                scrollTop: $('#suggestDoctorErrors').offset().top - 100
            }, 500);

        })
        .always(function() {
            $('#submitSuggestedDoctor_laptop').css('opacity', '1').removeClass('disabled');
            $('#submitSuggestedDoctor_phone').css('opacity', '1').removeClass('disabled');
        });
        
    };


    $('.alert-bug').click(function () {
        // $(this).hide(1000);
        $(this).addClass('bug_hidden');
    });


    $('#submitSuggestedDoctor_laptop').off().on('click', function(event) {
        console.log(event);
        $('#suggestDoctorForm .alert-bug').removeClass('bug_hidden');
        event.preventDefault();
        validateForm();
    });

    $('#submitSuggestedDoctor_phone').off().on('click', function(event) {
        console.log(event);
        $('#suggestDoctorForm .alert-bug').removeClass('bug_hidden');
        event.preventDefault();
        validateForm();
    });
})();

// Personal Data Form Validation

(function () {

    var countryData = $.fn.intlTelInput.getCountryData();
    var hashCountryDataTranslation = {"af":"Afghanistan (‫افغانستان‬‎)","al":"Albanie (Shqipëri)","dz":"Algérie (‫الجزائر‬‎)","as":"Samoa américaines (American Samoa)","ad":"Andorre (Andorra)","ao":"Angola","ai":"Anguilla","ag":"Antigua-et-Barbuda (Antigua and Barbuda)","ar":"Argentine (Argentina)","am":"Arménie (Հայաստան)","aw":"Aruba","au":"Australie (Australia)","at":"Autriche (Österreich)","az":"Azerbaïdjan (Azərbaycan)","bs":"Bahamas","bh":"Bahreïn (‫البحرين‬‎)","bd":"Bangladesh (বাংলাদেশ)","bb":"Barbade (Barbados)","by":"Biélorussie (Беларусь)","be":"Belgique (België)","bz":"Belize","bj":"Bénin","bm":"Bermudes (Bermuda)","bt":"Bhoutan (འབྲུག)","bo":"Bolivie (Bolivia)","ba":"Bosnie-Herzégovine (Босна и Херцеговина)","bw":"Botswana","br":"Brésil (Brasil)","io":"Territoire britannique de l’océan Indien (British Indian Ocean Territory)","vg":"Îles Vierges britanniques (British Virgin Islands)","bn":"Brunei","bg":"Bulgarie (България)","bf":"Burkina Faso","bi":"Burundi (Uburundi)","kh":"Cambodge (កម្ពុជា)","cm":"Cameroun","ca":"Canada","cv":"Cap-Vert (Kabu Verdi)","bq":"Bonaire, Saint-Eustache et Saba (Caribbean Netherlands)","ky":"Îles Caïmans (Cay Islands)","cf":"République centrafricaine","td":"Tchad","cl":"Chili (Chile)","cn":"Chine (中国)","co":"Colombie (Colombia)","km":"Comores (‫جزر القمر‬‎)","cd":"République démocratique du Congo (Jamhuri ya Kidemokrasia ya Kongo)","cg":"République du Congo / (Congo) (Congo-Brazzaville)","ck":"Îles Cook (Cook Islands)","cr":"Costa Rica","ci":"Côte d’Ivoire","hr":"Croatie (Hrvatska)","cu":"Cuba","cw":"Curaçao","cy":"Chypre (Κύπρος)","cz":"République tchèque (Česká republika)","dk":"Danemark (Danmark)","dj":"Djibouti","dm":"Dominique (Dominica)","do":"République dominicaine (República Dominicana)","ec":"Équateur (Ecuador)","eg":"Égypte (‫مصر‬‎)","sv":"Salvador (El Salvador)","gq":"Guinée équatoriale (Guinea Ecuatorial)","er":"Érythrée (Eritrea)","ee":"Estonie (Eesti)","et":"Éthiopie (Ethiopia)","fk":"Îles Malouines (Islas Malvinas)","fo":"Îles Féroé (Føroyar)","fj":"Fidji (Fiji)","fi":"Finlande (Suomi)","fr":"France","gf":"Guyane (Guyane française)","pf":"Polynésie française","ga":"Gabon","gm":"Gambie (Gambia)","ge":"Géorgie (საქართველო)","de":"Allemagne (Deutschland)","gh":"Ghana (Gaana)","gi":"Gibraltar","gr":"Grèce (Ελλάδα)","gl":"Groenland (Kalaallit Nunaat)","gd":"Grenade (Grenada)","gp":"Guadeloupe","gu":"Guam","gt":"Guatemala","gn":"Guinée","gw":"Guinée-Bissau (República da Guiné-Bissau)","gy":"Guyana","ht":"Haïti (Haiti)","hn":"Honduras","hk":"Hong Kong (香港)","hu":"Hongrie (Magyarország)","is":"Islande (Ísland)","in":"Inde (भारत)","id":"Indonésie (Indonesia)","ir":"Iran (‫ایران‬‎)","iq":"Irak (‫العراق‬‎)","ie":"Irlande (Ireland)","il":"Israël (‫ישראל‬‎)","it":"Italie (Italia)","jm":"Jamaïque (Jamaica)","jp":"Japon (日本)","jo":"Jordanie (‫الأردن‬‎)","kz":"Kazakhstan (Казахстан)","ke":"Kenya","ki":"Kiribati","kw":"Koweït (‫الكويت‬‎)","kg":"Kirghizistan (Кыргызстан)","la":"Laos (ລາວ)","lv":"Lettonie (Latvija)","lb":"Liban (‫لبنان‬‎)","ls":"Lesotho","lr":"Liberia","ly":"Libye (‫ليبيا‬‎)","li":"Liechtenstein","lt":"Lituanie (Lietuva)","lu":"Luxembourg","mo":"Macao (澳門)","mk":"Macédoine (Македонија)","mg":"Madagascar (Madagasikara)","mw":"Malawi","my":"Malaisie (Malaysia)","mv":"Maldives","ml":"Mali","mt":"Malte (Malta)","mh":"Marshall (Marshall Islands)","mq":"Martinique","mr":"Mauritanie (‫موريتانيا‬‎)","mu":"Maurice (Moris)","mx":"Mexique (México)","fm":"Micronésie (Micronesia)","md":"Moldavie (Republica Moldova)","mc":"Monaco","mn":"Mongolie (Монгол)","me":"Monténégro (Crna Gora)","ms":"Montserrat","ma":"Maroc (‫المغرب‬‎)","mz":"Mozambique (Moçambique)","mm":"Birmanie (မြန်မာ)","na":"Namibie (Namibië)","nr":"Nauru","np":"Népal (नेपाल)","nl":"Pays-Bas (Nederland)","nc":"Nouvelle-Calédonie","nz":"Nouvelle-Zélande (New Zealand)","ni":"Nicaragua","ne":"Niger (Nijar)","ng":"Nigeria","nu":"Niue","nf":"Île Norfolk (Norfolk Island)","kp":"Corée du Nord (조선 민주주의 인민 공화국)","mp":"Îles Mariannes du Nord (Northern Mariana Islands)","no":"Norvège (Norge)","om":"Oman (‫عُمان‬‎)","pk":"Pakistan (‫پاکستان‬‎)","pw":"Palaos (Palau)","ps":"Autorité palestinienne (‫فلسطين‬‎)","pa":"Panama (Panamá)","pg":"Papouasie-Nouvelle-Guinée (Papua New Guinea)","py":"Paraguay","pe":"Pérou (Perú)","ph":"Philippines","pl":"Pologne (Polska)","pt":"Portugal","pr":"Porto Rico (Puerto Rico)","qa":"Qatar (‫قطر‬‎)","re":"La Réunion","ro":"Roumanie (România)","ru":"Russie (Россия)","rw":"Rwanda","bl":"Saint-Barthélemy","sh":"Sainte-Hélène, Ascension et Tristan da Cunha (Saint Helena)","kn":"Saint-Christophe-et-Niévès (Saint Kitts and Nevis)","lc":"Sainte-Lucie (Saint Lucia)","mf":"Saint-Martin (Antilles françaises) (partie française))","pm":"Saint-Pierre-et-Miquelon","vc":"Saint-Vincent-et-les-Grenadines (Saint Vincent and the Grenadines)","ws":"Samoa","sm":"Saint-Marin (San Marino)","st":"Sao Tomé-et-Principe (São Tomé e Príncipe)","sa":"Arabie saoudite (‫المملكة العربية السعودية‬‎)","sn":"Sénégal","rs":"Serbie (Србија)","sc":"Seychelles","sl":"Sierra Leone","sg":"Singapour (Singapore)","sx":"Saint-Martin (Sint Maarten)","sk":"Slovaquie (Slovensko)","si":"Slovénie (Slovenija)","sb":"Salomon (Solomon Islands)","so":"Somalie (Soomaaliya)","za":"Afrique du Sud (South Africa)","kr":"Corée du Sud (대한민국)","ss":"Soudan du Sud (‫جنوب السودان‬‎)","es":"Espagne (España)","lk":"Sri Lanka (ශ්‍රී ලංකාව)","sd":"Soudan (‫السودان‬‎)","sr":"Suriname","sz":"Swaziland","se":"Suède (Sverige)","ch":"Suisse (Schweiz)","sy":"Syrie (‫سوريا‬‎)","tw":"Taïwan / (République de Chine (Taïwan)) (台灣)","tj":"Tadjikistan (Tajikistan)","tz":"Tanzanie (Tanzania)","th":"Thaïlande (ไทย)","tl":"Timor oriental (Timor-Leste)","tg":"Togo","tk":"Tokelau","to":"Tonga","tt":"Trinité-et-Tobago (Trinidad and Tobago)","tn":"Tunisie (‫تونس‬‎)","tr":"Turquie (Türkiye)","tm":"Turkménistan (Turkmenistan)","tc":"Îles Turques-et-Caïques (Turks and Caicos Islands)","tv":"Tuvalu","vi":"Îles Vierges des États-Unis (U.S. Virgin Islands)","ug":"Ouganda (Uganda)","ua":"Ukraine (Україна)","ae":"Émirats arabes unis (‫الإمارات العربية المتحدة‬‎)","gb":"Royaume-Uni (United Kingdom)","us":"États-Unis (United States)","uy":"Uruguay","uz":"Ouzbékistan (Oʻzbekiston)","vu":"Vanuatu","va":"État de la Cité du Vatican (Città del Vaticano)","ve":"Venezuela","vn":"Viêt Nam (Việt Nam)","wf":"Wallis-et-Futuna (Wallis and Futuna)","ye":"Yémen (‫اليمن‬‎)","zm":"Zambie (Zambia)","zw":"Zimbabwe"};
    $.each(countryData, function(i, country) {
      country.name = hashCountryDataTranslation[country.iso2];
    });

    $("#mobile").intlTelInput({
        utilsScript: window.doctori.schemeAndHttpHost+"/bundles/front/v2/dist/vendor/intl-tel-input/utils.js",
        formatOnDisplay: false,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        }
    });

    $("#mobileDoc").intlTelInput({
        utilsScript: window.doctori.schemeAndHttpHost+"/bundles/front/v2/dist/vendor/intl-tel-input/utils.js",
        formatOnDisplay: false,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        }
    });

    $("#officePhone").intlTelInput({
        utilsScript: window.doctori.schemeAndHttpHost+"/bundles/front/v2/dist/vendor/intl-tel-input/utils.js",
        formatOnDisplay: false,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        }
    });

    $("#homePhone").intlTelInput({
        utilsScript: window.doctori.schemeAndHttpHost+"/bundles/front/v2/dist/vendor/intl-tel-input/utils.js",
        formatOnDisplay: false,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        }
    });


    var isPhoneValid = function(input) {

        return $("#"+input).intlTelInput("isValidNumber");
        // var pattern = new RegExp(/^0\d{9}$/);
        // return pattern.test(phonenumber);
    };


    var isDateValid = function(date) {

        var bits = date.split('/');
        var d    = new Date(bits[2], bits[1] - 1, bits[0]);

        return d && (d.getMonth() + 1) == bits[1];
    }

    var submitPersonalDataForm = function(personalData, doctorData) {

        var $alert = $('#personalDataForm').find('#personalDataAlert');

        $.ajax({
            url: window.doctori.paths.siteEspacePatient,
            type: 'POST',
            data: {

                mobile          : personalData.mobile,
                firstname       : personalData.firstname,
                lastname        : personalData.lastname,
                postalCode      : personalData.postalCode,
                city            : personalData.city,
                homePhone       : personalData.homePhone,
                officePhone     : personalData.officePhone,
                day             : personalData.day,
                month           : personalData.month,
                year            : personalData.year,
                sex             : personalData.sex,

                firstnameDoc    : doctorData.firstnameDoc,
                lastnameDoc     : doctorData.lastnameDoc,
                addressDoc      : doctorData.addressDoc,
                cityDoc         : doctorData.cityDoc,
                postalCodeDoc   : doctorData.postalCodeDoc,
                mobileDoc       : doctorData.mobileDoc,

                action          : 'update-profile'
            },
            beforeSend: function() {
                $('#submitPersonalDataForm').addClass('disabled');
            }
        })
        .done(function(response) {
            
            if(response.updated) {

                $alert
                    .removeClass('note-success')
                    .addClass('success')
                    .html(window.doctori.validation.messages.request_saved+$closeButton)
                    .show();
            }
        })
        .always(function() {

            $('html,body').animate({
                scrollTop: $alert.offset().top - 100
            }, 500);
            $('#submitPersonalDataForm').removeClass('disabled');
        });
        
    };


    var validateForm = function() {

        var $form          = $('#personalDataForm');
        
        var $mobile        = $form.find('#mobile');
        var $firstname     = $form.find('#firstname');
        var $lastname      = $form.find('#lastname');
        var $postalCode    = $form.find('#postalCode');
        var $city          = $form.find('#city');
        var $homePhone     = $form.find('#homePhone');
        var $officePhone   = $form.find('#officePhone');
        var $day           = $form.find('#day');
        var $month         = $form.find('#month');
        var $year          = $form.find('#year');
        var $sexe          = $form.find('input[name="sexe"]:checked');
        
        var mobile         = $mobile.val();
        var firstname      = $firstname.val();
        var lastname       = $lastname.val();
        var postalCode     = $postalCode.val();
        var city           = $city.val();
        var homePhone      = $homePhone.val();
        var officePhone    = $officePhone.val();
        var day            = parseInt($day.val());
        var month          = parseInt($month.val());
        var year           = parseInt($year.val());
        var sex            = $sexe.val();

        var $firstnameDoc  = $form.find('#firstnameDoc');
        var $lastnameDoc   = $form.find('#lastnameDoc');
        var $addressDoc    = $form.find('#addressDoc');
        var $cityDoc       = $form.find('#cityDoc');
        var $postalCodeDoc = $form.find('#postalCodeDoc');
        var $mobileDoc     = $form.find('#mobileDoc');
        
        var firstnameDoc   = $firstnameDoc.val();
        var lastnameDoc    = $lastnameDoc.val();
        var addressDoc     = $addressDoc.val();
        var cityDoc        = $cityDoc.val();
        var postalCodeDoc  = $postalCodeDoc.val();
        var mobileDoc      = $mobileDoc.val();

        var $alert         = $form.find('#personalDataAlert');

        var errors = [];


        // validate client personal data
        
        if(! mobile) {
            errors.push(window.doctori.validation.fields.mobile.required);
            $mobile.addClass('input-error');
        } else {
            $mobile.removeClass('input-error');
        }

        if(mobile) {
            
            if(! isPhoneValid('mobile')) {
                errors.push(window.doctori.validation.fields.mobile.invalid);
                $mobile.addClass('input-error');
            } else {
                $mobile.removeClass('input-error');
                $mobile.val($("#mobile").intlTelInput("getNumber"));
            }
        }

        if(! firstname) {
            errors.push(window.doctori.validation.fields.firstname.required);
            $firstname.addClass('input-error');
        } else {
            $firstname.removeClass('input-error');
        }

        if(! lastname) {
            errors.push(window.doctori.validation.fields.lastname.required);
            $lastname.addClass('input-error');
        } else {
            $lastname.removeClass('input-error');
        }

        if(! city) {
            errors.push(window.doctori.validation.fields.city.required);
            $city.addClass('input-error');
        } else {
            $city.removeClass('input-error');
        }

        if(homePhone) {
            
            if(! isPhoneValid('homePhone')) {
                errors.push(window.doctori.validation.fields.phone.invalid);
                $homePhone.addClass('input-error');
            } else {
                $homePhone.removeClass('input-error');
                $homePhone.val($("#homePhone").intlTelInput("getNumber"));
            }
        } 

        if(officePhone) {
            
            if(! isPhoneValid('officePhone')) {
                errors.push(window.doctori.validation.fields.office.invalid);
                $officePhone.addClass('input-error');
            } else {
                $officePhone.removeClass('input-error');
                $officePhone.val($("#officePhone").intlTelInput("getNumber"));
            }
        } 

        if(!day || !month || !year) {

            errors.push(window.doctori.validation.fields.birthday.required);
        }

        if(! day) {
            $('.birth_day .bootstrap-select').addClass('input-error');
        } else {
            $('.birth_day .bootstrap-select').removeClass('input-error');
        }

        if(! month) {
            $('.birth_month .bootstrap-select').addClass('input-error');
        } else {
            $('.birth_month .bootstrap-select').removeClass('input-error');
        }

        if(! year) {
            $('.birth_year .bootstrap-select').addClass('input-error');
        } else {
            $('.birth_year .bootstrap-select').removeClass('input-error');
        }

        if(day && month && year) {

            var date = day+'/'+month+'/'+year;

            if(! isDateValid(date)) {

                errors.push(window.doctori.validation.fields.birthday.invalid);
                $('.birth_day .bootstrap-select').addClass('input-error');
                $('.birth_month .bootstrap-select').addClass('input-error');
            } else {
                
                $('.birth_day .bootstrap-select').removeClass('input-error');
                $('.birth_month .bootstrap-select').removeClass('input-error');
            }
        }


        // validate client's doctor data
        
        if(mobileDoc) {
            
            if(! isPhoneValid('mobileDoc')) {
                errors.push(window.doctori.validation.fields.mobile.required);
                $mobileDoc.addClass('input-error');
            } else {
                $mobileDoc.removeClass('input-error');
                $mobileDoc.val($("#mobileDoc").intlTelInput("getNumber"));
            }
        } 


        if(errors.length) {

            $alert.removeClass('success').addClass('note-success').html(' ');

            errors.forEach( function(element, index) {
                $alert.append('<p>'+element+'</p>');
            });

            $alert.prepend($closeButton).show();

            $('html,body').animate({
                scrollTop: $alert.offset().top - 100
            }, 500);

        } else {

            $alert.hide();

            var personalData = {

                mobile      : $("#mobile").intlTelInput("getNumber"),
                firstname   : firstname,
                lastname    : lastname,
                postalCode  : postalCode,
                city        : city,
                homePhone   : $("#homePhone").intlTelInput("getNumber"),
                officePhone : $("#officePhone").intlTelInput("getNumber"),
                day         : day,
                month       : month,
                year        : year,
                sex         : sex
            };

            var doctorData = {

                firstnameDoc    : firstnameDoc,
                lastnameDoc     : lastnameDoc,
                addressDoc      : addressDoc,
                cityDoc         : cityDoc,
                postalCodeDoc   : postalCodeDoc,
                mobileDoc       : $("#mobileDoc").intlTelInput("getNumber")
            };
            
            submitPersonalDataForm(personalData, doctorData);
        }
    };


    $('.alert-bug').click(function () {
        // $(this).hide(1000);
        $(this).addClass('bug_hidden');
    });


    $('#submitPersonalDataForm').off().on('click', function(event) {

        $('.alert-bug').removeClass('bug_hidden');
        event.preventDefault();
        validateForm();
    });

})();


// Validate Confidential Data Form

(function () {

    var isPasswordsMatches = function(password, confirmation) {

        return password == confirmation;
    };

    var isPasswordValid = function(password) {

        return password.length > 5;
    };

    var submitConfidentialData = function(confidentialData) {

        var $alert = $('#confidentialDataForm').find('#confidentialDataAlert');

        $.ajax({
            url: window.doctori.paths.siteEspacePatient,
            type: 'POST',
            data: {

                // current_password    : confidentialData.current_password,
                password            : confidentialData.password,
                confirmation        : confidentialData.confirmation,

                action              : 'update-password'
            },
            beforeSend: function() {
                $('#submitConfidentialData').addClass('disabled');
            }
        })
        .done(function(response) {

            if(response.updated) {

                $alert
                    .removeClass('note-success')
                    .addClass('success')
                    .html(window.doctori.validation.messages.request_saved+$closeButton)
                    .show();

            } else {

                $alert
                    .removeClass('success')
                    .addClass('note-success')
                    .html(window.doctori.validation.fields.current_password.invalid+$closeButton)
                    .show();
            }
        })
        .always(function() {

            $('#confidentialDataForm')[0].reset();

            $('html,body').animate({
                scrollTop: $alert.offset().top - 100
            }, 500);

            $('#submitConfidentialData').removeClass('disabled');
        });
        
    };


    var validateForm = function() {

        var $form             = $('#confidentialDataForm');
        
        // var $current_password = $form.find('#current_password');
        var $password         = $form.find('#password');
        var $confirmation     = $form.find('#confirmation');
        
        // var current_password  = $current_password.val();
        var password          = $password.val();
        var confirmation      = $confirmation.val();
        
        var $alert            = $form.find('#confidentialDataAlert');

        var errors = [];

        
        // if(! current_password) {
        //     errors.push('Le champ Mot de passe actuel est obligatoire');
        //     $current_password.addClass('input-error');
        // } else {
        //     $current_password.removeClass('input-error');
        // }


        if(! password) {
            errors.push(window.doctori.validation.fields.new_password.required);
            $password.addClass('input-error');
        } else {
            $password.removeClass('input-error');
        }


        if(! confirmation) {
            errors.push(window.doctori.validation.fields.password_confirmation.required);
            $confirmation.addClass('input-error');
        } else {
            $confirmation.removeClass('input-error');
        }


        // if(current_password) {

        //     if(! isPasswordValid(current_password)) {
        //         errors.push('Le Mot de passe actuel est trés court');
        //         $current_password.addClass('input-error');
        //     } else {
        //         $current_password.removeClass('input-error');
        //     }
        // }

        if(password) {

            if(! isPasswordValid(password)) {
                errors.push(window.doctori.validation.fields.new_password.short);
                $password.addClass('input-error');
            } else {
                $password.removeClass('input-error');
            }
        }

        if(confirmation) {

            if(! isPasswordValid(confirmation)) {
                errors.push(window.doctori.validation.fields.password_confirmation.short);
                $confirmation.addClass('input-error');
            } else {
                $confirmation.removeClass('input-error');
            }
        }

        if(password && confirmation) {

            if(! isPasswordsMatches(password, confirmation)) {
                errors.push(window.doctori.validation.fields.password.different);
                $confirmation.addClass('input-error');
            } else {
                $confirmation.removeClass('input-error');
            }
        }


        if(errors.length) {

            $alert.removeClass('success').addClass('note-success').html(' ');

            errors.forEach( function(element, index) {
                $alert.append('<p>'+element+'</p>');
            });

            $alert.prepend($closeButton).show();

            $('html,body').animate({
                scrollTop: $alert.offset().top - 100
            }, 500);

        } else {

            $alert.hide();

            var confidentialData = {

                // current_password     : current_password,
                password            : password,
                confirmation        : confirmation
            };

            submitConfidentialData(confidentialData);
        }
    };


    $('.alert-bug').click(function () {
        // $(this).hide(1000);
        $(this).addClass('bug_hidden');
    });


    $('#submitConfidentialData').off().on('click', function(event) {

        $('.alert-bug').removeClass('bug_hidden');
        event.preventDefault();
        validateForm();
    });
})();


// Cancel an appointment

(function () {
    
    $('.cancel_appointment').on('click', function(event) {
        event.preventDefault();
        
        $cancelButton = $(this);

        if(confirm(window.doctori.validation.messages.appointment.cancel_it)) {

            var $container  = $cancelButton.closest('.comming_rdv_pr_box');
            var calendar_id = $cancelButton.data('id');
            var doctor_id   = $cancelButton.data('doctor');
            var client_id   = $cancelButton.data('client');

            $container.addClass('removed-item')

                .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {

                    $(this).remove();

                    cancelAppointment({
                        id: calendar_id,
                        doctor_id: doctor_id,
                        client_id: client_id
                    });
            });
        }
    });


    function cancelAppointment(data) {
        
        $.ajax({

            url         : window.doctori.paths.sitePatientRdvCancel,
            type        : 'POST',
            dataType    : 'json',
            data        : data
        })
        .done(function(response) {

            if (! response.canceled) {

                $alert = $('#cancelAppointmentAlert');

                $alert
                    .removeClass('success, bug_hidden')
                    .addClass('note-success')
                    .html(window.doctori.validation.messages.appointment.delete_error);

                $alert.prepend($closeButton).show();

                $('html,body').animate({
                    scrollTop: $alert.offset().top - 100
                }, 500);

            } else {

                removeFromAppointmentHistory(data);
            }
        });
    }


    function removeFromAppointmentHistory(data) {

        var $appointmentElement = $('#sectionB [data-id=' + data.id + ']');
        
        $appointmentElement.addClass('removed-item')

            .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {

                $(this).remove();
        });
    }


})();