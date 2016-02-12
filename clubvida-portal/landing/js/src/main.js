$(document).ready(function($) {
	$(".rslides").responsiveSlides({
	 	nav: true,
	 	prevText: "",
	 	nextText: "" 
	});

	var i=0;
	$( document ).on( 'click', '.btn-menu', function () {
		i+=1;
		var status = i%2;
		var menu = $('#menu-main');
		if (status) {
			menu.show()
		}else{
			menu.hide()
		}
	});

	/* config modal */
    $( document ).on( 'click', '.close', function () {
    	$('.modal').fadeOut();
    });

    $( document ).on( 'click', '.view-modal', function () {
    	var modal = $(this).attr('data-ref');
        $(modal).fadeIn();
    });

    $(window).scroll(function(){
    	var topBar = $('#topBar');
    	var playerBar = $('#player');
    	if ($(this).scrollTop() >= 400) {
			topBar.addClass('bar-white');
			playerBar.addClass('player-mini');
    	}else{
    		topBar.removeClass('bar-white');
    		playerBar.removeClass('player-mini');
    	}  
    })  
});
