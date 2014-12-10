$(document).ready(function(){

	$('.blur').blurjs({
		overlay: 'rgba(0,0,0,0.4)',
		radius:50
	});

	$('#fullpage').fullpage({
		autoScrolling: false,
		anchors: ['about', 'skills','portfolio','contact'],
		slidesNavigation: true,
		responsive: 1000,
		afterLoad: function(anchorLink, index){
			var maxwidth = window.matchMedia('(max-width:768px)').matches
			if(anchorLink == 'about' && maxwidth==false){
				$('#header').hide();
			}else{
				$('#header').show();
			}
		}
	});

	$( document ).on( 'click', '.menuBtn', function () {
		var me = $(this);
		var menuPanelMe = $('.meMenu');
		var menuPanel = $('#header');
		var topBar = $('.topMenu');
		var wrapperMe = $('.wrapperMe');
		var estado = me.attr('data-state');

		if (estado==="plegado") {
			menuPanel.animate({
				height: '310px'
			}, 600);
			me.attr('data-state','desplegado');

			menuPanelMe.css({
				display: 'block',
			});
			topBar.animate({
				height: '250px',
			}, 600);
			wrapperMe.animate({
				top: '250px',
			}, 600);
		}else if (estado==="desplegado") {
			menuPanel.animate({
				height: '70px'
			}, 600);
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