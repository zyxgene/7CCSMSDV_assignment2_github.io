// set the width and height
var width2 = 900;
var height2 = 400;

var dataset = [
    {date: "20-01", Cases: 9852, Deaths: 213, variantsCount: 11, death_div_case: 0.021619976},
    {date: "20-02", Cases: 75475, Deaths: 3758, variantsCount: 26, death_div_case: 0.049791322},
    {date: "20-03", Cases: 872184, Deaths: 39754, variantsCount: 89, death_div_case: 0.045579832},
    {date: "20-04", Cases: 2318207, Deaths: 193564, variantsCount: 68, death_div_case: 0.083497289},
    {date: "20-05", Cases: 2897606, Deaths: 161496, variantsCount: 56, death_div_case: 0.055734285},
    {date: "20-06", Cases: 4285399, Deaths: 153484, variantsCount: 51, death_div_case: 0.035815568},
    {date: "20-07", Cases: 7046451, Deaths: 185027, variantsCount: 49, death_div_case: 0.026258183},
    {date: "20-08", Cases: 8311602, Deaths: 193652, variantsCount: 40, death_div_case: 0.023298998},
    {date: "20-09", Cases: 8719888, Deaths: 168705, variantsCount: 39, death_div_case: 0.019347152},
    {date: "20-10", Cases: 12396327, Deaths: 179642, variantsCount: 34, death_div_case: 0.014491551},
    {date: "20-11", Cases: 17079515, Deaths: 277741, variantsCount: 35, death_div_case: 0.016261644},
    {date: "20-12", Cases: 19061346, Deaths: 353253, variantsCount: 45, death_div_case: 0.018532427},
    {date: "21-01", Cases: 19797619, Deaths: 432929, variantsCount: 58, death_div_case: 0.021867731},
    {date: "21-02", Cases: 11044750, Deaths: 307936, variantsCount: 63, death_div_case: 0.027880758},
    {date: "21-03", Cases: 14427288, Deaths: 281952, variantsCount: 53, death_div_case: 0.019542966},
    {date: "21-04", Cases: 22023882, Deaths: 371869, variantsCount: 46, death_div_case: 0.016884807},
    {date: "21-05", Cases: 20204254, Deaths: 385454, variantsCount: 52, death_div_case: 0.019077864},
    {date: "21-06", Cases: 11432275, Deaths: 271510, variantsCount: 34, death_div_case: 0.023749429},
    {date: "21-07", Cases: 15801544, Deaths: 269548, variantsCount: 28, death_div_case: 0.017058333},
    {date: "21-08", Cases: 19799626, Deaths: 307409, variantsCount: 52, death_div_case: 0.015526},
    {date: "21-09", Cases: 16136182, Deaths: 256837, variantsCount: 852, death_div_case: 0.015916838},
    {date: "21-10", Cases: 13355163, Deaths: 215245, variantsCount: 474, death_div_case: 0.016116988},
    {date: "21-11", Cases: 15390042, Deaths: 210874, variantsCount: 401, death_div_case: 0.013701977},
    {date: "21-12", Cases: 24696919, Deaths: 217937, variantsCount: 329, death_div_case: 0.008824461},
    {date: "22-01", Cases: 89412103, Deaths: 245587, variantsCount: 12, death_div_case: 0.002746686},
];

var margin2 = {
    top2: 10,
    bottom2: 70,
    left2: 140,
    right2: 40
};

var svg2 = d3.select('#vis2')
    .append('svg')
    .attr('width', width2*1.25)
    .attr('height', height2)
    .append('g')
    .attr('transform', 'translate(' + margin2.left2 + ',' + margin2.right2 + ')');

width2 = width2 - margin2.left2 - margin2.right2;
height2 = height2 - margin2.top2 - margin2.bottom2;

var x_scale2 = d3.scaleBand()
    .rangeRound([0, width2])
    .padding(0.1);

var y_scaleLeft = d3.scaleLinear()
    .range([height2, 0]);

var y_scaleRight = d3.scaleLinear()
    .rangeRound([height2, 0]);

var colour_scale2 = d3.scaleQuantile()
    .range(["#1b69b6", "#f729fe", "#ff0000"]);

var y_axisLeft = d3.axisLeft(y_scaleLeft);
var x_axis2 = d3.axisBottom(x_scale2);
var y_axisRight = d3.axisRight(y_scaleRight);

svg2.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height2 + ')');

svg2.append("text")
    .attr('class', 'x axis')
    .attr("text-anchor", "end")
    .attr("x", width2)
    .attr("y", height2+margin2.bottom2/2)
    .text("Date");

svg2.append('g')
    .attr('class', 'y axisLeft');

svg2.append("text")
    .attr("class", "y axisLeft")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", - (margin2.left2 + margin2.right2)*0.5)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total count/Case Fatality Rate");

svg2.append('g')
    .attr('class', 'y axisRight')
    .attr('transform', 'translate('+ width2 +',0)');

svg2.append("text")
    .attr("class", "y axisRight")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", width2*1.06)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Number of sub-types in one major clade");

var months = dataset.map(function(d) {
    return d.date;
});

x_scale2.domain(months);

var max_value3 = d3.max(dataset, function(d) {
    return +d.variantsCount;
});
y_scaleRight.domain([0, max_value3*1.1]);

function update(index) {

    var t2 = d3.transition()
        .duration(2000);

    if (index == "1") {

        var max_value2 = d3.max(dataset, function (d) {
            return +d.Cases;
        });

        y_scaleLeft.domain([0, max_value2 * 1.1]);
        colour_scale2.domain([0, max_value2]);

        var bars2 = svg2.selectAll('.bar2')
            .data(dataset)

        bars2
            .exit()
            .remove();

        var new_bars2 = bars2
            .enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', function (d) {
                return x_scale2(d.date);
            })
            .attr('width', x_scale2.bandwidth())
            .attr('y', height2)
            .attr('height', 0)

        new_bars2.merge(bars2)
            .transition(t2)
            .attr('y', function (d) {
                return y_scaleLeft(+d.Cases);
            })
            .attr('height', function (d) {
                return height2 - y_scaleLeft(+d.Cases)
            })
            .attr('fill', function (d) {
                return colour_scale2(+d.Cases);
            })
    }

    if (index == "2") {

        var max_value2 = d3.max(dataset, function (d) {
            return +d.Deaths;
        });

        y_scaleLeft.domain([0, max_value2 * 1.1]);
        colour_scale2.domain([0, max_value2]);

        var bars2 = svg2.selectAll('.bar2')
            .data(dataset)

        bars2
            .exit()
            .remove();

        var new_bars2 = bars2
            .enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', function (d) {
                return x_scale2(d.date);
            })
            .attr('width', x_scale2.bandwidth())
            .attr('y', height2)
            .attr('height', 0)

        new_bars2.merge(bars2)
            .transition(t2)
            .attr('y', function (d) {
                return y_scaleLeft(+d.Deaths);
            })
            .attr('height', function (d) {
                return height2 - y_scaleLeft(+d.Deaths)
            })
            .attr('fill', function (d) {
                return colour_scale2(+d.Deaths);
            })
    }

    if (index == "3") {

        var max_value2 = d3.max(dataset, function (d) {
            return +d.death_div_case;
        });

        y_scaleLeft.domain([0, max_value2 * 1.1]);
        colour_scale2.domain([0, max_value2]);

        var bars2 = svg2.selectAll('.bar2')
            .data(dataset)

        bars2
            .exit()
            .remove();

        var new_bars2 = bars2
            .enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', function (d) {
                return x_scale2(d.date);
            })
            .attr('width', x_scale2.bandwidth())
            .attr('y', height2)
            .attr('height', 0)

        new_bars2.merge(bars2)
            .transition(t2)
            .attr('y', function (d) {
                return y_scaleLeft(+d.death_div_case);
            })
            .attr('height', function (d) {
                return height2 - y_scaleLeft(+d.death_div_case)
            })
            .attr('fill', function (d) {
                return colour_scale2(+d.death_div_case);
            })
    }

    var valueline = d3.line()
        .x(function (d) {
            return x_scale2(d.date) + 10;
        })
        .y(function (d) {
            return y_scaleRight(d.variantsCount);
        });

    svg2.append("path")
        .data([dataset])
        .attr("class", "line")
        .style("stroke", "black")
        .attr("d", valueline);

    svg2.select(".x.axis")
        .call(x_axis2);

    svg2.select(".y.axisLeft")
        .transition(t2)
        .call(y_axisLeft);

    svg2.select(".y.axisRight")
        .call(y_axisRight);
}

update("1");

var keys = ["Variants Count"]

var lineLegend = svg2.selectAll(".lineLegend").data(keys)
    .enter().append("g")
    .attr("class","lineLegend")
    .attr("transform", function (d,i) {
        return "translate(" + width*1.25 + "," + (i*20)+")";
    });

lineLegend.append("text").text(function (d) {return d;})
    .attr("transform", "translate(26,9)"); //align texts with boxes

lineLegend.append("rect")
    .attr("fill", "black")
    .attr("width", 20).attr("height", 10);

var downList = d3.select('#dropdown');
downList.on('change', function() {
    update(this.value);
});
