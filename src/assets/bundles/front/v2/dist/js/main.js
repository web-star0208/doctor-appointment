$(function() {
    
    //Disconect btn header
    $("#disconnect").on('click', function(event) {

        event.preventDefault();

        var dataString = {'action': 'logout'};

        $.ajax({
            type: "POST",
            url: doctori.paths.siteLoginUser,
            data: dataString,
            success: function (data) {
                window.location = doctori.paths.siteUserIdentification;
            }
        });
    });

    // TOGGLE HAMBURGER & COLLAPSE NAV
    $('.nav-toggle').on('click', function() {

        $(this).toggleClass('open');
        $('.menu-left').toggleClass('collapse');
    });
    
    $('.block_forgot').click(function (event) {

        event.preventDefault();

        var email = $('#email-forgot').val();
        var dataString = {'email': email, 'action': 'resetpatient'};

        $.ajax({
            type: "POST",
            url: doctori.paths.siteResetPass,
            data: dataString,
            success: function (data)
            {
                $('.error-forgot-patient,.success-forgot').html('').hide();
                if (data['error'] == "0") {
                    $('.success-forgot').html("Votre mot de passe a été réinitialisé. Vous allez recevoir votre nouveau mot de passe par email.<button data-dismiss='alert' class='close' type='button'>×</button>").show().click(function (e) {
                        $(this).hide("slow");
                    });
                }
                else if (data['error'] == "1") {
                    $('.error-forgot-patient').html("Erreur: L'email saisi ne correspond à aucun utilisateur.<button data-dismiss='alert' class='close' type='button'>×</button>").show().click(function (e) {
                        $(this).hide("slow");
                    });
                }
            }
        });
    });


    $('#btn-forgot-doc').click(function (event) {

        event.preventDefault();

        var email = $('#email-forgot-doc').val();

        var dataString = {'email': email, 'action': 'resetdocteur'};

        $.ajax({
            type: "POST",
            url: doctori.paths.siteResetPass,
            data: dataString,
            success: function (data) {

                if (data['error'] == "0") {
                    $('#mdf_forgot_doc .success-forgot').html("Votre mot de passe a été réinitialisé. Vous allez recevoir votre nouveau mot de passe par email.<button data-dismiss='alert' class='close' type='button'>×</button>").show().click(function (e) {
                        $(this).hide("slow");
                    });
                }
                else if (data['error'] == "1") {
                    $('#mdf_forgot_doc .alert-error').html("Erreur: L'email saisi ne correspond à aucun utilisateur.<button data-dismiss='alert' class='close' type='button'>×</button>").show().click(function (e) {
                        $(this).hide("slow");
                    });
                }
            }
        });
    });

    $('a[data-target="#mdf_forgot"]').click(function (event) {

        $('.modal-content .alert-error,.modal-content .note-success').html('').hide();
        $('#email-forgot').val('');
    });

    $('a[data-target="#mdf_forgot_doc"]').click(function (event) {

        $('.modal-content .alert-error,.modal-content .note-success').html('').hide();
        $('#email-forgot-doc').val('');
    });

    $(".sbOptions").focusout(function () {
        $(this).hide();
    });


    $(document).on('click', function (e) {
        if ($(e.target).closest(".hide_or_show_search_results_box_ville").length === 0) {

            $("#hide_or_show_search_results_box_ville").hide();
        }
    });

    function control_field(err) {
        var comp = 0;
        $.each(err, function (i, val) {
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

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        return pattern.test(emailAddress);
    }

    function isPhoneNumber(phonenumber) {
        var pattern = new RegExp(/[0-9 -()+]+$/);
        return pattern.test(phonenumber);
    }

    $('._closeOnClick').off().on('click', function(event) {
        event.preventDefault();

        $(this).slideUp('slow');
    });

});
