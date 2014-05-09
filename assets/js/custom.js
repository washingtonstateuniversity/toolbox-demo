(function ($) {
	$(document).ready(function(){
		$("a.modal-image").fluidbox({ stackIndex: 99999 });

		$('.page-anchor').on('click', function(e) {
			e.preventDefault();
			$.pjax.click(e, { container: '#next-content-container', scrollTo: false } );
		});
	});

	$(document).on('pjax:success', function(e){
		var new_content = $('#next-content-container').html();
		$('#main-replacement').append( new_content );
		$('#next-content-container').html(' ');
	});
}(jQuery));