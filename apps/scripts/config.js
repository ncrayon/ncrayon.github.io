$(document).ready(function(){
	$( document ).on( 'click', '.btnTop', function () {
		var body = $("html, body");
		body.animate({scrollTop:0}, '500', 'swing', function() { 
		   
		});
	});

	$( document ).on( 'click', '#menuBtn', function () {
		var me = $(this);
		var menuPanelMe = $('.meMenu');
		var topBar = $('.topMenu');
		var wrapperMe = $('.wrapperMe');
		var estado = me.attr('data-state');

		if (estado==="plegado") {
			me.attr('data-state','desplegado');
			menuPanelMe.css({
				display: 'block',
			});
			topBar.animate({
				height: '290px',
			}, 600);
			wrapperMe.animate({
				top: '200px',
			}, 600);
		}else if (estado==="desplegado") {
			me.attr('data-state','plegado');
			menuPanelMe.css({
				display: 'none',
			});
			topBar.animate({
				height: '90px',
			}, 600);
			wrapperMe.animate({
				top: '0px',
			}, 600);
		};
	});
});