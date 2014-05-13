(function ($, window) {

	$(document).ready(function(){
		// Add Fluidbox to any images designated for modals.
		$("a.modal-image").fluidbox({ stackIndex: 99999 });

		var main_replacement = $('#main-replacement header');

		var cook = $('#move-cook-left');
		var cook_offset = Math.floor(cook.offset().top);

		// -477
		var scroll_start = main_replacement.offset().top - jQuery(window ).height();
		var scroll_mid = scroll_start + 150;

		cook.attr('data-' + (cook_offset + 15), 'background-position: 0px 0px;' );
		cook.attr('data-' + (cook_offset + cook.height()), 'background-position: -105px 0px;');

		main_replacement.attr('data-' + scroll_start, 'background-position: 35% 0%;');
		main_replacement.attr('data-' + scroll_mid, 'background-position: 17.5% 17.5%;');
		main_replacement.attr('data-bottom', 'background-position: 0% 35%;');
		skrollr.init({forceHeight: false, smoothScrolling: true});
		// Load new page content into the next-content-container via PJAX
		$('.page-anchor').on('click', function(e) {
			e.preventDefault();
			$.pjax.click(e, { container: '#next-content-container', scrollTo: false } );
		});
	});

	$(document).on('pjax:success', function(e){
		/**
		 * The container for the primary piece of content on the page.
		 *
		 * @type {*|HTMLElement}
		 */
		var primary_content = $('#primary-content');

		/**
		 * The container which will initially hold the content to be loaded
		 * on the page after "navigation".
		 *
		 * @type {*|HTMLElement}
		 */
		var next_content_container = $('#next-content-container');

		/**
		 * The main element that acts as the anchor for replacement content to
		 * be pulled in and scrolled up.
		 *
		 * @type {*|HTMLElement}
		 */
		var main_replacement = $('#main-replacement');

		/**
		 * The top of the replacement content's image. We use this to determine
		 * where the page should be scrolled to initially.
		 *
		 * @type {number}
		 */
		var scroll_to = Math.floor( main_replacement.offset().top );

		// Add some Skrollr data attributes to initiate CSS transformations on scroll.
		primary_content.attr('data-' + (scroll_to - 200), 'transform: scaleX(1) scaleY(1);' );
		primary_content.attr('data-' + (scroll_to - 25), 'transform: scaleX(.25) scaleY(.75);');

		// Initialize Skrollr so that all data attributes on the page are processed.
		skrollr.init();

		// Add the replacement content to our replacement container and remove it from
		// the temporary placeholder node.
		main_replacement.append( next_content_container.html() );
		next_content_container.html(' ');

		/**
		 * Initiate an animation that scrolls the page up to the top of the next content's
		 * main image. Skrollr handles the transform properties via CSS. Once the scroll
		 * is completed, we remove the primary content and set the scroll to the top.
		 */
		$('html, body' ).animate({ scrollTop: scroll_to }, 800, 'easeOutCubic', function(){
			primary_content.remove();
			$(document).scrollTop(0);
			$("a.modal-image" ).fluidbox({ stackIndex: 99999 });
			main_replacement.attr('id', 'primary-content');
		});

		// Override the back button to go back to the URL stored in history.
		$(window).on("popstate", function() {
			window.location.href = $(location ).attr('href');
			return false;
		});
	});
}(jQuery, window));

