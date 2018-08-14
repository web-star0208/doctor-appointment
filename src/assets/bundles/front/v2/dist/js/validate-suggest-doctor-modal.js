(function () {

		var showTheModal = Cookies.get('suggestDoctor');

		if (! parseInt(showTheModal)) return false;

        var $modal        = $('#suggestDoctorModal');
        var $sendButton   = $modal.find('._sendSuggestedDoctor');
        var $cancelButton = $modal.find('._closeModal');
        var $alert        = $modal.find('._alertWrapper');

		$alert.on('click', function(event) {
			event.preventDefault();
			
		    $(this).addClass('bug_hidden');
		});

		$sendButton.off().on('click', function(event) {
		    event.preventDefault();
			
		    $alert.removeClass('bug_hidden');
		    validateForm();
		});

		$cancelButton.on('click', function(event) {
			event.preventDefault();
			
			$modal.modal('hide');
		});

        var countryData = $.fn.intlTelInput.getCountryData();
        var hashCountryDataTranslation = {"af":"Afghanistan (‫افغانستان‬‎)","al":"Albanie (Shqipëri)","dz":"Algérie (‫الجزائر‬‎)","as":"Samoa américaines (American Samoa)","ad":"Andorre (Andorra)","ao":"Angola","ai":"Anguilla","ag":"Antigua-et-Barbuda (Antigua and Barbuda)","ar":"Argentine (Argentina)","am":"Arménie (Հայաստան)","aw":"Aruba","au":"Australie (Australia)","at":"Autriche (Österreich)","az":"Azerbaïdjan (Azərbaycan)","bs":"Bahamas","bh":"Bahreïn (‫البحرين‬‎)","bd":"Bangladesh (বাংলাদেশ)","bb":"Barbade (Barbados)","by":"Biélorussie (Беларусь)","be":"Belgique (België)","bz":"Belize","bj":"Bénin","bm":"Bermudes (Bermuda)","bt":"Bhoutan (འབྲུག)","bo":"Bolivie (Bolivia)","ba":"Bosnie-Herzégovine (Босна и Херцеговина)","bw":"Botswana","br":"Brésil (Brasil)","io":"Territoire britannique de l’océan Indien (British Indian Ocean Territory)","vg":"Îles Vierges britanniques (British Virgin Islands)","bn":"Brunei","bg":"Bulgarie (България)","bf":"Burkina Faso","bi":"Burundi (Uburundi)","kh":"Cambodge (កម្ពុជា)","cm":"Cameroun","ca":"Canada","cv":"Cap-Vert (Kabu Verdi)","bq":"Bonaire, Saint-Eustache et Saba (Caribbean Netherlands)","ky":"Îles Caïmans (Cay Islands)","cf":"République centrafricaine","td":"Tchad","cl":"Chili (Chile)","cn":"Chine (中国)","co":"Colombie (Colombia)","km":"Comores (‫جزر القمر‬‎)","cd":"République démocratique du Congo (Jamhuri ya Kidemokrasia ya Kongo)","cg":"République du Congo / (Congo) (Congo-Brazzaville)","ck":"Îles Cook (Cook Islands)","cr":"Costa Rica","ci":"Côte d’Ivoire","hr":"Croatie (Hrvatska)","cu":"Cuba","cw":"Curaçao","cy":"Chypre (Κύπρος)","cz":"République tchèque (Česká republika)","dk":"Danemark (Danmark)","dj":"Djibouti","dm":"Dominique (Dominica)","do":"République dominicaine (República Dominicana)","ec":"Équateur (Ecuador)","eg":"Égypte (‫مصر‬‎)","sv":"Salvador (El Salvador)","gq":"Guinée équatoriale (Guinea Ecuatorial)","er":"Érythrée (Eritrea)","ee":"Estonie (Eesti)","et":"Éthiopie (Ethiopia)","fk":"Îles Malouines (Islas Malvinas)","fo":"Îles Féroé (Føroyar)","fj":"Fidji (Fiji)","fi":"Finlande (Suomi)","fr":"France","gf":"Guyane (Guyane française)","pf":"Polynésie française","ga":"Gabon","gm":"Gambie (Gambia)","ge":"Géorgie (საქართველო)","de":"Allemagne (Deutschland)","gh":"Ghana (Gaana)","gi":"Gibraltar","gr":"Grèce (Ελλάδα)","gl":"Groenland (Kalaallit Nunaat)","gd":"Grenade (Grenada)","gp":"Guadeloupe","gu":"Guam","gt":"Guatemala","gn":"Guinée","gw":"Guinée-Bissau (República da Guiné-Bissau)","gy":"Guyana","ht":"Haïti (Haiti)","hn":"Honduras","hk":"Hong Kong (香港)","hu":"Hongrie (Magyarország)","is":"Islande (Ísland)","in":"Inde (भारत)","id":"Indonésie (Indonesia)","ir":"Iran (‫ایران‬‎)","iq":"Irak (‫العراق‬‎)","ie":"Irlande (Ireland)","il":"Israël (‫ישראל‬‎)","it":"Italie (Italia)","jm":"Jamaïque (Jamaica)","jp":"Japon (日本)","jo":"Jordanie (‫الأردن‬‎)","kz":"Kazakhstan (Казахстан)","ke":"Kenya","ki":"Kiribati","kw":"Koweït (‫الكويت‬‎)","kg":"Kirghizistan (Кыргызстан)","la":"Laos (ລາວ)","lv":"Lettonie (Latvija)","lb":"Liban (‫لبنان‬‎)","ls":"Lesotho","lr":"Liberia","ly":"Libye (‫ليبيا‬‎)","li":"Liechtenstein","lt":"Lituanie (Lietuva)","lu":"Luxembourg","mo":"Macao (澳門)","mk":"Macédoine (Македонија)","mg":"Madagascar (Madagasikara)","mw":"Malawi","my":"Malaisie (Malaysia)","mv":"Maldives","ml":"Mali","mt":"Malte (Malta)","mh":"Marshall (Marshall Islands)","mq":"Martinique","mr":"Mauritanie (‫موريتانيا‬‎)","mu":"Maurice (Moris)","mx":"Mexique (México)","fm":"Micronésie (Micronesia)","md":"Moldavie (Republica Moldova)","mc":"Monaco","mn":"Mongolie (Монгол)","me":"Monténégro (Crna Gora)","ms":"Montserrat","ma":"Maroc (‫المغرب‬‎)","mz":"Mozambique (Moçambique)","mm":"Birmanie (မြန်မာ)","na":"Namibie (Namibië)","nr":"Nauru","np":"Népal (नेपाल)","nl":"Pays-Bas (Nederland)","nc":"Nouvelle-Calédonie","nz":"Nouvelle-Zélande (New Zealand)","ni":"Nicaragua","ne":"Niger (Nijar)","ng":"Nigeria","nu":"Niue","nf":"Île Norfolk (Norfolk Island)","kp":"Corée du Nord (조선 민주주의 인민 공화국)","mp":"Îles Mariannes du Nord (Northern Mariana Islands)","no":"Norvège (Norge)","om":"Oman (‫عُمان‬‎)","pk":"Pakistan (‫پاکستان‬‎)","pw":"Palaos (Palau)","ps":"Autorité palestinienne (‫فلسطين‬‎)","pa":"Panama (Panamá)","pg":"Papouasie-Nouvelle-Guinée (Papua New Guinea)","py":"Paraguay","pe":"Pérou (Perú)","ph":"Philippines","pl":"Pologne (Polska)","pt":"Portugal","pr":"Porto Rico (Puerto Rico)","qa":"Qatar (‫قطر‬‎)","re":"La Réunion","ro":"Roumanie (România)","ru":"Russie (Россия)","rw":"Rwanda","bl":"Saint-Barthélemy","sh":"Sainte-Hélène, Ascension et Tristan da Cunha (Saint Helena)","kn":"Saint-Christophe-et-Niévès (Saint Kitts and Nevis)","lc":"Sainte-Lucie (Saint Lucia)","mf":"Saint-Martin (Antilles françaises) (partie française))","pm":"Saint-Pierre-et-Miquelon","vc":"Saint-Vincent-et-les-Grenadines (Saint Vincent and the Grenadines)","ws":"Samoa","sm":"Saint-Marin (San Marino)","st":"Sao Tomé-et-Principe (São Tomé e Príncipe)","sa":"Arabie saoudite (‫المملكة العربية السعودية‬‎)","sn":"Sénégal","rs":"Serbie (Србија)","sc":"Seychelles","sl":"Sierra Leone","sg":"Singapour (Singapore)","sx":"Saint-Martin (Sint Maarten)","sk":"Slovaquie (Slovensko)","si":"Slovénie (Slovenija)","sb":"Salomon (Solomon Islands)","so":"Somalie (Soomaaliya)","za":"Afrique du Sud (South Africa)","kr":"Corée du Sud (대한민국)","ss":"Soudan du Sud (‫جنوب السودان‬‎)","es":"Espagne (España)","lk":"Sri Lanka (ශ්‍රී ලංකාව)","sd":"Soudan (‫السودان‬‎)","sr":"Suriname","sz":"Swaziland","se":"Suède (Sverige)","ch":"Suisse (Schweiz)","sy":"Syrie (‫سوريا‬‎)","tw":"Taïwan / (République de Chine (Taïwan)) (台灣)","tj":"Tadjikistan (Tajikistan)","tz":"Tanzanie (Tanzania)","th":"Thaïlande (ไทย)","tl":"Timor oriental (Timor-Leste)","tg":"Togo","tk":"Tokelau","to":"Tonga","tt":"Trinité-et-Tobago (Trinidad and Tobago)","tn":"Tunisie (‫تونس‬‎)","tr":"Turquie (Türkiye)","tm":"Turkménistan (Turkmenistan)","tc":"Îles Turques-et-Caïques (Turks and Caicos Islands)","tv":"Tuvalu","vi":"Îles Vierges des États-Unis (U.S. Virgin Islands)","ug":"Ouganda (Uganda)","ua":"Ukraine (Україна)","ae":"Émirats arabes unis (‫الإمارات العربية المتحدة‬‎)","gb":"Royaume-Uni (United Kingdom)","us":"États-Unis (United States)","uy":"Uruguay","uz":"Ouzbékistan (Oʻzbekiston)","vu":"Vanuatu","va":"État de la Cité du Vatican (Città del Vaticano)","ve":"Venezuela","vn":"Viêt Nam (Việt Nam)","wf":"Wallis-et-Futuna (Wallis and Futuna)","ye":"Yémen (‫اليمن‬‎)","zm":"Zambie (Zambia)","zw":"Zimbabwe"};
        $.each(countryData, function(i, country) {
          country.name = hashCountryDataTranslation[country.iso2];
        });

        // init phone input
        $modal.find('#suggested_mobile').intlTelInput({
            utilsScript: window.doctori.schemeAndHttpHost+'/bundles/front/v2/dist/vendor/intl-tel-input/utils.js',
            formatOnDisplay: false,
            initialCountry: "auto",
            geoIpLookup: function(callback) {
              $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
              });
            }
        });

		$modal.modal('show');
		
		Cookies.remove('suggestDoctor');


        var isPhoneValid = function($input) {

            return $input.intlTelInput("isValidNumber");
            // var pattern = new RegExp(/^0\d{9}$/);
            // return pattern.test(phonenumber);
        };


        var validateForm = function() {

            var $firstname  = $modal.find('#suggested_firstname');
            var $lastname   = $modal.find('#suggested_lastname');
            var $mobile     = $modal.find('#suggested_mobile');
            var $address    = $modal.find('#suggested_address');
            var $postalCode = $modal.find('#suggested_postalCode');
            
            
            var firstname   = $firstname.val();
            var lastname    = $lastname.val();
            var mobile      = $mobile.val();
            var address     = $address.val();
            var postalCode  = parseInt($postalCode.val());

            var errors = [];


            if(! lastname) {
                errors.push('Le champ Nom est obligatoire');
                $lastname.addClass('input-error');
            } else {
                $lastname.removeClass('input-error');
            }


            if(! firstname) {
                errors.push('Le champ Prénom est obligatoire');
                $firstname.addClass('input-error');
            } else {
                $firstname.removeClass('input-error');
            }


            if(! mobile) {
                errors.push('Le champ N° de téléphone mobile est obligatoire');
                $mobile.addClass('input-error');
            } else {
                $mobile.removeClass('input-error');
            }


            if(mobile) {
                
                if(! isPhoneValid($mobile)) {
                    errors.push('Le champ N° de téléphone mobile est invalide');
                    $mobile.addClass('input-error');
                } else {
                    $mobile.removeClass('input-error');
                    $mobile.val($mobile.intlTelInput("getNumber"));
                }
            }


            if(! address) {
                errors.push('Le champ Adresse est obligatoire');
                $address.addClass('input-error');
            } else {
                $address.removeClass('input-error');
            }


            if(! postalCode) {
                errors.push('Le champ Code postal est obligatoire');
                $postalCode.addClass('input-error');
            } else {
                $postalCode.removeClass('input-error');
            }


            console.log('errors : ', errors);

            if(errors.length) {

                $alert.removeClass('success').addClass('note-success').html(' ');

                errors.forEach( function(element, index) {
                    $alert.append('<p>'+element+'</p>');
                });

                $alert.prepend("<button data-dismiss='alert' class='close' type='button'>×</button>").show();

                $modal.animate({
                    scrollTop: 0
                }, 1000);

            } else {

                $alert.hide();
                submitSuggestedDoctor(firstname, lastname, $mobile.intlTelInput("getNumber"), address, postalCode);
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
                    $sendButton.css('opacity', '0.5').addClass('disabled');
                }
            })
            .done(function(response) {

                $modal.find('form')[0].reset();
                $alert
                    .removeClass('note-success')
                    .addClass('success')
                    .html("Votre demande a été enregistrée. <button data-dismiss='alert' class='close' type='button'>×</button>").show();

                $modal.animate({
                    scrollTop: 0
                }, 1000);

            })
            .fail(function(error) {
                $sendButton.css('opacity', '1').removeClass('disabled');
            });
        };

    })();