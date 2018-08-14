if (window.doctori.doctor.auth.id) {

    var pusher = new Pusher('817b52b0874511b45a88', {
        cluster: 'eu',
        encrypted: true
    });

    var channel = pusher.subscribe('doc-' + window.doctori.doctor.auth.id);

    channel.bind('reserved', function(data) {

        $.notify(data.message, {
            newest_on_bottom: true,
            placement: {
                from: "bottom"
            },
            animate:{
                enter: "animated fadeInUp",
                exit: "animated fadeOutDown"
            },
            
            delay: 0,
            onShow: function() {
                new Audio(window.doctori.schemeAndHttpHost+'/bundles/front/v2/notifications/notification.mp3').play()
            }
        });
    });
}