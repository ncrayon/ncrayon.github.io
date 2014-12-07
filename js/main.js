$(document).ready(function(){
	$('.blur').blurjs({
		overlay: 'rgba(0,0,0,0.4)',
		radius:50
	});

	$( document ).on( 'click', '#menu', function () {
		var me = $(this);
		var menuPanelMe = $('.meMenu');
		var menuPanel = $('.menuBtn');
		var fotoPerfil = $('.fotoPerfil');
		var topBar = $('.topMenu');
		var wrapperMe = $('.wrapperMe');
		var estado = me.attr('data-state');

		if (estado==="plegado") {
			menuPanel.animate({
				height: '300px'
			}, 600).css({background:'rgba(0,0,0,.4)'});
			me.attr('data-state','desplegado');
			fotoPerfil.css({
				margin: '12px auto 38px auto' 
			});
			menuPanelMe.css({
				display: 'block',
			});
			topBar.animate({
				height: '230px',
			}, 600);
			wrapperMe.animate({
				top: '230px',
			}, 600);
		}else if (estado==="desplegado") {
			menuPanel.animate({
				height: '72px'
			}, 600).css({background:'none'});
			me.attr('data-state','plegado');
			fotoPerfil.css({
				margin: '-30px auto 38px auto' 
			});
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