$(document).ready(function(){
	$('.blur').blurjs({
		overlay: 'rgba(0,0,0,0.4)',
		radius:50
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
				height: '280px',
			}, 600);
			wrapperMe.animate({
				top: '280px',
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
				top: '90px',
			}, 600);
		};
	});
});