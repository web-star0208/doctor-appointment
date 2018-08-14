(function () {

	var userData = Cookies.get('recoverPassword');

    if (! userData) return false;

    var data = JSON.parse(userData);

    var $modal        = $('#recoverPasswordModal');
    var $sendButton   = $modal.find('._sendRecoverPassword');
    var $cancelButton = $modal.find('._closeModal');
    var $alert        = $modal.find('._alertWrapper');
    var $closeButton  = " <button data-dismiss='alert' class='close' type='button'>×</button>";

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

	$modal.modal('show');
	
	Cookies.remove('recoverPassword');



    var validateForm = function() {

        var $password     = $modal.find('#password_recovery');
        var $confirmation = $modal.find('#confirmation_recovery');
        
        var password      = $password.val();
        var confirmation  = $confirmation.val();
        
        var errors        = [];


        if(! password) {
            errors.push(window.doctori.validation.fields.password.required);
            $password.addClass('input-error');
        } else {
            $password.removeClass('input-error');
        }


        if(password) {

            if(! isPasswordValid(password)) {
                errors.push(window.doctori.validation.fields.password.short);
                $password.addClass('input-error');
            } else {
                $password.removeClass('input-error');
            }
        }


        if(! confirmation) {
            errors.push(window.doctori.validation.fields.password_confirmation.required);
            $confirmation.addClass('input-error');
        } else {
            $confirmation.removeClass('input-error');
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

            $alert.prepend("<button data-dismiss='alert' class='close' type='button'>×</button>").show();

            $modal.animate({
                scrollTop: 0
            }, 1000);

        } else {

            $alert.hide();
            submitPassword(password);
        }
    };


    var submitPassword = function(password) {

        $.ajax({
            url: window.doctori.paths.siteResetPassword,
            type: 'POST',
            dataType: 'json',
            data: {
                'id'        : data.id, 
                'email'     : data.email, 
                'password'  : password, 
                'type'      : data.type
            },
            beforeSend: function() {
                $sendButton.css('opacity', '0.5').addClass('disabled');
            }
        })
        .done(function(response) {

            if(response.reseted) {

                $sendButton.css('opacity', '0.5').addClass('disabled');
                $modal.find('form')[0].reset();

                $alert.removeClass('note-success').addClass('success').html(window.doctori.validation.messages.password_reseted+$closeButton).show();

                $modal.animate({
                    scrollTop: 0
                }, 1000);

                setTimeout(function() {

                    $modal.modal('hide');

                }, 5000);

            } else {

                $sendButton.css('opacity', '1').removeClass('disabled');
            }
        })
        .fail(function(error) {
            $sendButton.css('opacity', '1').removeClass('disabled');
        });
    };

    var isPasswordValid = function(password) {

        return password.length > 5;
    };

    var isPasswordsMatches = function(password, confirmation) {

        return password == confirmation;
    };

})();