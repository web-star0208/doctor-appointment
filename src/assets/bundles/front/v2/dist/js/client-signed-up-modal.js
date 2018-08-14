(function () {

	if (window.doctori.dev) {

		console.log(
			'%cclient-signed-up-modal.js', 
			'color:orange;font-weight:bolder;'
		);
	}

	var showTheModal = Cookies.get('popupClientSignedUp');

	if (! parseInt(showTheModal)) return false;

    $('#clientSignedUp').modal('show');
	
	Cookies.remove('popupClientSignedUp');

})();