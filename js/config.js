$(document).ready(function(){

	$('.blur').blurjs({
		overlay: 'rgba(0,0,0,0.4)',
		radius:50
	});

	$('#fullpage').fullpage({
		autoScrolling: false,
		anchors: ['about', 'skills','portfolio','contact'],
		slidesNavigation: true,
		loopHorizontal: true,
		autoScrolling: false,
		responsive: 1000,
		afterLoad: function(anchorLink, index){
			var maxwidth = window.matchMedia('(max-width:1000px)').matches
			if(anchorLink == 'about' && maxwidth==false){
				$('#header').hide();
			}else{
				$('#header').show();
			}

			var btnAbout = $('#aboutMenu');
			var btnSkills = $('#skillsMenu');
			var btnPortfolio = $('#portfolioMenu');
			var btnContact = $('#contactMenu');
			
			if (anchorLink == 'about') {
				btnAbout.addClass('active');
				btnSkills.removeClass('active');
				btnPortfolio.removeClass('active');
				btnContact.removeClass('active');
			}else if (anchorLink == 'skills') {
				btnSkills.addClass('active');
				btnPortfolio.removeClass('active');
				btnContact.removeClass('active');
				btnAbout.removeClass('active');
			}else if (anchorLink == 'portfolio') {
				btnPortfolio.addClass('active');
				btnSkills.removeClass('active');
				btnContact.removeClass('active');	
				btnAbout.removeClass('active');			
			}else if (anchorLink == 'contact') {
				btnContact.addClass('active');
				btnSkills.removeClass('active');	
				btnPortfolio.removeClass('active');	
				btnAbout.removeClass('active');		
			};
		}
	});

	window.setInterval(function () {
		$.fn.fullpage.moveSlideRight();
	},8000);

	$( document ).on( 'click', '.menuBtn', function () {
		var me = $(this);
		var menuPanel = $('#header');
		var estado = me.attr('data-state');

		if (estado==="plegado") {
			menuPanel.animate({
				height: '310px'
			}, 600);
			me.attr('data-state','desplegado');
		}else if (estado==="desplegado") {
			menuPanel.animate({
				height: '70px'
			}, 600);
			me.attr('data-state','plegado');
		};
	});
});