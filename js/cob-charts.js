(function($,nv){
	var long_short_data = [
		{
			key: 'Medical School graduates per 100,000 residents',
			color: '#00a5bd',
			values: [
			{
					"label" : "Online MBA" ,
					"value" : 12
				} ,
				{
					"label" : "Undergraduate" ,
					"value" : 24
				} ,
				{
					"label" : "Graduate" ,
					"value" : 5
				}

			]
		}

	];
	$(document ).ready(function(){
		var chart1_container = $('#chart1-container');
		var chart_width = chart1_container.width();

		chart1_container.append('<div class="chart full with-3d-shadow with-transitions" id="chart1">' +
			'<svg width="' + chart_width + '" height="300" viewBox="300  ' + chart_width + ' 300"></svg>' +
			'</div>');

		var chart;
		nv.addGraph(function() {
			chart = nv.models.multiBarHorizontalChart()
				.x(function(d) { return d.label })
				.y(function(d) { return d.value })
				.margin({top: 30, right: 20, bottom: 50, left: 90})
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
	});
}(jQuery,nv));