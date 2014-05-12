(function ($, window) {
	$(document).ready(function(){
		$("a.modal-image").fluidbox({ stackIndex: 99999 });

		$('.page-anchor').on('click', function(e) {
			e.preventDefault();
			$.pjax.click(e, { container: '#next-content-container', scrollTo: false } );
		});
	});

	$(document).on('pjax:success', function(e){
		var scroll_to = Math.floor( $('#main-replacement img' ).offset().top );
		$('#primary-content' ).attr('data-' + (scroll_to - 200), 'transform: scaleX(1) scaleY(1);' );
		$('#primary-content' ).attr('data-' + (scroll_to - 25), 'transform: scaleX(.25) scaleY(.75);');
		var s = skrollr.init();

		var new_content = $('#next-content-container').html();
		$('#main-replacement').append( new_content );
		$('#next-content-container').html(' ');
		$('html, body' ).animate({
			scrollTop: scroll_to }, 1500, 'easeOutCubic', function(){
			$('#primary-content' ).remove();
			$(document).scrollTop(0);
		});
		$(window).on("popstate", function() {
			window.location.href = $(location ).attr('href');
			return false;
		});
	});
}(jQuery, window));