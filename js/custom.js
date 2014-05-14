(function ($, nv, window) {

	var cob_skrollr;
	var bar_container = '';
	var long_short_data = [
		{
			key: 'Spring 2014',
			color: '#00a5bd',
			values: [
				{
					"label" : "Enrolled" ,
					"value" : 133
				} ,
				{
					"label" : "Graduating" ,
					"value" : 44
				}

			]
		}

	];

	function load_chart() {
		var chart;

		var chart1_container = $('#chart1-container h4');

		var chart_width = chart1_container.width() - 80;

		chart1_container.after('<div class="chart full with-3d-shadow with-transitions" id="chart1">' +
			'<svg width="' + chart_width + '" height="200" viewBox="' + chart_width + ' 300"></svg>' +
			'</div>');

		nv.addGraph(function() {
			chart = nv.models.multiBarHorizontalChart()
				.x(function(d) { return d.label })
				.y(function(d) { return d.value })
				.margin({top: 40, right: 30, bottom: 40, left: 120})
				.tooltips(true)
				.transitionDuration(250)
				.stacked(false)
				.showControls(false);

			chart.yAxis.tickFormat(d3.format(',.2f'));

			d3.select('#chart1 svg').datum(long_short_data).call(chart);

			nv.utils.windowResize(chart.update);

			chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

			return chart;
		});
	}

	$(document).ready(function(){
		// Add Fluidbox to any images designated for modals.
		$("a.modal-image").fluidbox({ stackIndex: 99999 });

		build_image();
		$('#classroom-canvas' ).on('mouseover',function(){
			image_context = 'video';
			build_image();
		});

		/**
		 * The img container holding the cook.
		 * @type {*|HTMLElement}
		 */
		var cook = $('#move-cook-left .bg-move');

		/**
		 * Where the cook image hits the top of the screen on scroll.
		 *
		 * @type {number}
		 */
		var cook_offset = Math.floor(cook.offset().top);

		/**
		 * The article container holding the headline and subhead.
		 *
		 * @type {*|HTMLElement}
		 */
		var headline = $('#article-headline');

		/**
		 * Where the headline article container hits the top of the screen on scroll.
		 *
		 * @type {number}
		 */
		var headline_offset = Math.floor(headline.offset().top);


		headline.attr('data-' + (headline_offset - 100), 'margin-top: 150px; opacity:1;' );
		headline.attr('data-' + (headline_offset + headline.height() + 100), 'margin-top: 350px; opacity:0;');

		cook.attr('data-' + (cook_offset + 15), 'transform: translate3d(100px, 0px, 0px);' );
		cook.attr('data-' + (cook_offset + cook.height()), 'transform: translate3d(0px, 0px, 0px');

		cob_skrollr = skrollr.init({forceHeight: false, smoothScrolling: true});

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


		// Add the replacement content to our replacement container and remove it from
		// the temporary placeholder node.
		main_replacement.append( next_content_container.html() );
		next_content_container.html(' ');

		load_chart();


		$('.nv-series-0' ).attr('data-463', 'opacity: 0;');
		$('.nv-series-0' ).attr('data-763', 'opacity: 1;');

		// Initialize Skrollr so that all data attributes on the page are processed.

		/**
		 * Initiate an animation that scrolls the page up to the top of the next content's
		 * main image. Skrollr handles the transform properties via CSS. Once the scroll
		 * is completed, we remove the primary content and set the scroll to the top.
		 */
		$('html, body' ).animate({ scrollTop: scroll_to }, 800, 'easeOutCubic', function(){
			primary_content.remove();
			$(document).scrollTop(0);
			$("a.modal-image" ).fluidbox({ stackIndex: 99999 });
			//main_replacement.attr('id', 'primary-content');
		});

		// Override the back button to go back to the URL stored in history.
		$(window).on("popstate", function() {
			window.location.href = $(location ).attr('href');
			return false;
		});
	});

	var frame_interval = 41.6; // 24fps
	var frame_count = 0; // maintain count of frame
	var total_frames = 221;
	var new_image;
	var image_context = 'load';

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	function build_image() {
		new_image = new Image();
		new_image.Id = "classroom-video-" + frame_count;
		new_image.Name = new_image.Id;
		new_image.onload = load_image;
		new_image.src = 'images/classroom-video/classroom-' + pad(frame_count,4) + '.jpg';
	}

	function load_image() {
		var image_canvas = document.getElementById('classroom-canvas');
		if ( image_canvas.getContext ) {
			var context = image_canvas.getContext('2d');
			context.drawImage(new_image, 0, 0, 550, 310);
			if ( 'video' == image_context && frame_count < total_frames ) {
				frame_count++;
				setTimeout("build_image()", frame_interval);
			}
		}
	}

	window.load_chart = load_chart;
	window.build_image = build_image;

}(jQuery, nv, window));