// set the width and height
var width = 800;
var height = 400;

var dates = ['2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05',
    '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11',
    '2020-12', '2021-01', '2021-02', '2021-03', '2021-04', '2021-05',
    '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11',
    '2021-12', '2022-01'];

var margin = {
    top: 10,
    bottom: 70,
    left: 140,
    right: 20
};

var svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

var x_scale = d3.scaleLinear()
    .range([0, width]);

var y_scale = d3.scaleBand()
    .rangeRound([0, height])
    .padding(0.1);

var colour_scale = d3.scaleQuantile()
    .range(["#1b69b6", "#f729fe", "#ff0000"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append("text")
    .attr('class', 'x axis')
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height+margin.bottom/2)
    .text("Number of sub-types in one major clade");

svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate('+ -width*0.01 + ',0)');

svg.append("text")
    .attr("class", "y axis")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", - (margin.left + margin.right)*0.6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Types of variants (major clades)");

function draw(date) {

    var csv_data = data[date];

    var t = d3.transition()
        .duration(2000);

    var variant = csv_data.map(function(d) {
        return d.variant;
    });
    y_scale.domain(variant);

    var max_value = d3.max(csv_data, function(d) {
        return +d.cases;
    });

    x_scale.domain([0, max_value*1.1]);
    colour_scale.domain([0, max_value]);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) {
            return y_scale(d.variant);
        })
        .attr('height', y_scale.bandwidth())
        .attr('x', 0)
        .attr('width', 0);

    new_bars.merge(bars)
        .transition(t)
        .attr('x', function(d) {
            return 0;
        })
        .attr('width', function(d) {
            return x_scale(+d.cases);
        })
        .attr('fill', function(d) {
            return colour_scale(+d.cases);
        })

    svg.select('.x.axis')
        .transition(t)
        .call(x_axis);

    svg.select('.y.axis')
        .call(y_axis);

}

d3.queue()
    .defer(d3.csv, 'assets/2019-12.csv')
    .defer(d3.csv, 'assets/2020-01.csv')
    .defer(d3.csv, 'assets/2020-02.csv')
    .defer(d3.csv, 'assets/2020-03.csv')
    .defer(d3.csv, 'assets/2020-04.csv')
    .defer(d3.csv, 'assets/2020-05.csv')
    .defer(d3.csv, 'assets/2020-06.csv')
    .defer(d3.csv, 'assets/2020-07.csv')
    .defer(d3.csv, 'assets/2020-08.csv')
    .defer(d3.csv, 'assets/2020-09.csv')
    .defer(d3.csv, 'assets/2020-10.csv')
    .defer(d3.csv, 'assets/2020-11.csv')
    .defer(d3.csv, 'assets/2020-12.csv')
    .defer(d3.csv, 'assets/2021-01.csv')
    .defer(d3.csv, 'assets/2021-02.csv')
    .defer(d3.csv, 'assets/2021-03.csv')
    .defer(d3.csv, 'assets/2021-04.csv')
    .defer(d3.csv, 'assets/2021-05.csv')
    .defer(d3.csv, 'assets/2021-06.csv')
    .defer(d3.csv, 'assets/2021-07.csv')
    .defer(d3.csv, 'assets/2021-08.csv')
    .defer(d3.csv, 'assets/2021-09.csv')
    .defer(d3.csv, 'assets/2021-10.csv')
    .defer(d3.csv, 'assets/2021-11.csv')
    .defer(d3.csv, 'assets/2021-12.csv')
    .defer(d3.csv, 'assets/2022-01.csv')
    .await(function(error, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14,
                        d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26) {
        data['1'] = d1;
        data['2'] = d2;
        data['3'] = d3;
        data['4'] = d4;
        data['5'] = d5;
        data['6'] = d6;
        data['7'] = d7;
        data['8'] = d8;
        data['9'] = d9;
        data['10'] = d10;
        data['11'] = d11;
        data['12'] = d12;
        data['13'] = d13;
        data['14'] = d14;
        data['15'] = d15;
        data['16'] = d16;
        data['17'] = d17;
        data['18'] = d18;
        data['19'] = d19;
        data['20'] = d20;
        data['21'] = d21;
        data['22'] = d22;
        data['23'] = d23;
        data['24'] = d24;
        data['25'] = d25;
        data['26'] = d26;
        draw('25');
    });

var slider = d3.select('#time_val');
slider.on('change', function() {
    draw(this.value);
});