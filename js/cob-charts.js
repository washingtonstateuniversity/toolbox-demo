(function($,nv){
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
		var chart1_container = $('#chart1-container h4');
		var chart_width = chart1_container.width() - 100;

		chart1_container.after('<div class="chart full with-3d-shadow with-transitions" id="chart1">' +
			'<svg width="' + chart_width + '" height="200" viewBox="' + chart_width + ' 300"></svg>' +
			'</div>');

		var chart;
		nv.addGraph(function() {
			chart = nv.models.multiBarHorizontalChart()
				.x(function(d) { return d.label })
				.y(function(d) { return d.value })
				.margin({top: 40, right: 30, bottom: 40, left: 120})
//.showValues(true)
				.tooltips(true)
//.barColor(d3.scale.category20().range())
				.transitionDuration(250)
				.stacked(false)
				.showControls(false);

			chart.yAxis
				.tickFormat(d3.format(',.2f'));

			d3.select('#chart1 svg')
				.datum(long_short_data)
				.call(chart);

			nv.utils.windowResize(chart.update);

			chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

			return chart;
		});
	}
	window.load_chart = load_chart;
}(jQuery,nv));
