jQuery(document).ready(function($) {

$('.edit_additional_information').click(function() {
  console.log('test');
    $('.additional_information').toggleClass("show_hide_additional_information");
});


$('.filter_box .title-gereen').click(function() {
    $('.filter_box').toggleClass("show_filter");
});

$('.motif_fitrage .label_radio').click(function() {
    $('.filter_box').removeClass("show_filter");
    $('html,body').animate({ scrollTop: 150 }, 'slow');
});


// When the user scrolls down 20px from the top of the document, show the button

if ($("#myBtn")[0]){
    window.onscroll = function() {scrollFunction()};
}


$('.tabs_block .menu_tabs').click(function() {
    $('#tabs-espace').toggleClass( "show_left_menu" );
});


$('.sections-docteur a').click(function() {
    $('#tabs-espace').toggleClass( "show_left_menu" );
    $('html,body').animate({ scrollTop: 0 }, 'slow');
});

 
  var hi = 0;
  $(".section_body_search.left_profil_detail ").each(function(){
    var h = $(this).height();
    if(h > hi){
       hi = h;
    }    
  });
  //highest now contains the div with the highest so lets highlight it
    $(".sectionB .left_profil_detail ").css('height',''+hi+'px');
 


$('.photos_doc #myModal').click(function() {
    // $('#myModal').modal('hide');
    closeModal();
});



$(".photos_doc .modal .modal-content").click(function(event) {
    event.stopPropagation();
});

  $('#basics li').click(function(){
    $('#basics li').removeClass('content-visible');

    $(this).addClass('content-visible');
   
  });




  $(document).on('click','.content_displayer',function(){
      $('.demo_scroll').hide(800); 
  });
  setTimeout(function(){ $('.demo_scroll').hide(800); }, 5000);

 
 // $('.item_result').click(function(){
  
 // });
  
  $('.show_hidde_menu').click(function(){
    $('.show_hidde_menu').toggleClass('open');
    $('.menu-left').toggleClass('collapse');     
  });
    


  $height_description = $(".description_doc p").height();
  if( $height_description> 270 ){
    $('.description_doc .show_more_text').show();
  }else{
    $('.description_doc .show_more_text').hide();
  }

  // input tag fied height
  
  $(".fstElement").click(function(){  
    if ($(".fstControls").find(".fstChoiceItem").length >= 2){ 
      $('.fstElement').css('height','auto');
    }else{
      $('.fstElement').css('height','46px');
    }
  });


	$(window).scroll(function() {
	   $('.header_search .tool').css('visibility','hidden');


     
     var numItems = $('.item_result').length;
     if(numItems==1){
      $('.header_date').removeClass('is_stuck'); 
      $('.header_date').addClass('no_is_stuck'); 
      $(".header_date").css({"position": "relative !important", "bottom": "auto !important"});
     }

 
     

	});

  // $('.modal').modal({backdrop: 'static', keyboard: false});

  //show_more_text description docteur
  $(".show_more_text").click(function(){    
    $('.description_doc').css('height','auto');
    $('.description_doc').css('padding-bottom','45px');
    $('.show_more_text').text('voir moins');
    $('.show_more_text').css('display','none');
  });

  // $(".show_number").click(function(){
  //   $('.show_number').css('display','none');
  //   $('.number').css('display','block');
  // });
	
    $("#owl-demo").owlCarousel({
          autoPlay: 30000, //Set AutoPlay to 3 seconds
          items : 7,
          autoWidth:true,       
          itemsDesktop : [1199,5],
          itemsDesktopSmall : [980,4],
          itemsTablet: [768,3],
          itemsTabletSmall: [768,3],
          itemsMobile : [479,2]

      });



    $(document).on('click', function(event) {

        $body = $('body');
        $target = $(event.target);

        var resetCookies = function() {

            Cookies.set('provideCity', 0, { expires: 3650 });
            // if we provide the user with a predicted city.
            // and he choose to not give a fuck about it
            // then we should never show him this pupup again :-)
            if(Cookies.get('predictedCity')) {
                // this cookies is used by ClientService class - provideCity methode
                // to decide whether to set the cookies to show the popup city or not
                Cookies.set('showPopupCity', 0, { expires: 3650 });
            }
        };
        
        // check if we have an open modal in the page
        if($body.hasClass('modal-open')) {

            // check IF => the user clicked outside the modal.
            
            if( $target.hasClass('modal') && $target.hasClass('in') ) {

                // hide the modal
                $(".modal.in").modal("hide"); 
                // the remove the black background
                $('.modal-backdrop').remove();
                // if the opened modal happen to be the user city modale,
                // we delete the cookies so it's puped up again
                if ($target.hasClass('_userCityModal')) {
                    console.log('clicked outsite the modal');
                    resetCookies();
                }
            }
        }

        // check IF => the user clicked the close icon on the user city modal.
        if($target.hasClass('_userCityModal')) {
          
            resetCookies();
        }
    });





    // calc height of map

    if($("body").width()>=720){
      setTimeout(function(){ 
        if ($(".section_profil_detail")[0]){
          var h = $(".section_profil_detail .left_profil_detail").height();
          h = h + 33;
          $(".section_profil_detail .right_profil_detail .map_box").height(h);
        }
       }, 800);
    }

});





function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {

    var i;
    var slides      = document.getElementsByClassName("mySlides");
    var dots        = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");

    if (n > slides.length) {

        slideIndex = 1;
    }
    if (n < 1) {

        slideIndex = slides.length ;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1] ? slides[slideIndex-1].style.display = "block" : '' ;
    dots[slideIndex-1] ? dots[slideIndex-1].className += " active" : '';
    captionText ? captionText.innerHTML = dots[slideIndex-1].alt : '';
}




 
function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  $('html,body').animate({ scrollTop: 0 }, 'slow');
  return false;
}

function formatDoctorType(type) {

    var title = (window.doctori.locale == 'fr') ? 'Dr.' : 'دكتور';
    var prefix   = (type == 'doctor') ? title : '';

    return prefix; 
}

function localComma() {

    return (window.doctori.locale == 'fr') ? ', ' : '، ';
}