/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.4
Version: 1.7.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v1.7/admin/
*/

var blue		= '#348fe2',
    blueLight	= '#5da5e8',
    blueDark	= '#1993E4',
    aqua		= '#49b6d6',
    aquaLight	= '#6dc5de',
    aquaDark	= '#3a92ab',
	green		= '#00acac',
	greenLight	= '#33bdbd',
	greenDark	= '#008a8a',
	orange		= '#f59c1a',
	orangeLight	= '#f7b048',
	orangeDark	= '#c47d15',
    dark		= '#2d353c',
    grey		= '#b6c2c9',
    purple		= '#727cb6',
    purpleLight	= '#8e96c5',
    purpleDark	= '#5b6392',
    red         = '#ff5b57';
    
//var handleDonutChart = function () {
//	"use strict";
//	if ($('#donut-chart').length !== 0) {
//        var data = [];
//        var a = ['a', 'b', 'c', 'd', 'e'];
//        var series = 5;
//        var colorArray = [dark, green, purple];
////        var nameArray = ['Unique Visitor', 'Bounce Rate', 'Total Page Views', 'Avg Time On Site', '% New Visits'];
//        var nameArray = a;
//        var dataArray = [15,15,15,15,40];
//        for( var i = 0; i<series; i++)
//        {
//            data[i] = { label: nameArray[i], data: dataArray[i], color: colorArray[i] };
//        }
//        
//        $.plot($("#donut-chart"), data, 
//        {
//            series: {
//                pie: { 
//                    innerRadius: 0.5,
//                    show: true,
//                    combine: {
//                        color: '#999',
//                        threshold: 0.1
//                    }
//                }
//            },
//            grid:{borderWidth:0, hoverable: true, clickable: true},
//            legend: {
//                show: false
//            }
//        });
//    }
//};
var handleInteractiveChart = function () {
	"use strict";
    function showTooltip(x, y, contents) {
        $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css( {
            top: y - 45,
            left: x - 55
        }).appendTo("body").fadeIn(200);
    }
	if ($('#interactive-chart').length !== 0) {
        var d1 = [[0, 42], [1, 53], [2,66], [3, 60], [4, 68], [5, 66], [6,71],[7, 75], [8, 69], [9,70], [10, 68], [11, 72], [12, 78], [13, 86]];
        var d2 = [[0, 12], [1, 26], [2,13], [3, 18], [4, 35], [5, 23], [6, 18],[7, 35], [8, 24], [9,14], [10, 14], [11, 29], [12, 30], [13, 43]];
        
        $.plot($("#interactive-chart"), [
                {
                    data: d1, 
                    label: "Page Views", 
                    color: purple,
                    lines: { show: true, fill:false, lineWidth: 2 },
                    points: { show: false, radius: 5, fillColor: '#fff' },
                    shadowSize: 0
                }, {
                    data: d2,
                    label: 'Visitors',
                    color: green,
                    lines: { show: true, fill:false, lineWidth: 2, fillColor: '' },
                    points: { show: false, radius: 3, fillColor: '#fff' },
                    shadowSize: 0
                }
            ], 
            {
                xaxis: {  tickColor: '#ddd',tickSize: 2 },
                yaxis: {  tickColor: '#ddd', tickSize: 20 },
                grid: { 
                    hoverable: true, 
                    clickable: true,
                    tickColor: "#ccc",
                    borderWidth: 1,
                    borderColor: '#ddd'
                },
                legend: {
                    labelBoxBorderColor: '#ddd',
                    margin: 0,
                    noColumns: 1,
                    show: true
                }
            }
        );
        var previousPoint = null;
        $("#interactive-chart").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
            if (item) {
                if (previousPoint !== item.dataIndex) {
                    previousPoint = item.dataIndex;
                    $("#tooltip").remove();
                    var y = item.datapoint[1].toFixed(2);
                    
                    var content = item.series.label + " " + y;
                    showTooltip(item.pageX, item.pageY, content);
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null;            
            }
            event.preventDefault();
        });
    }
};

var Chart = function () {
	"use strict";
    return {
        //main function
        init: function () {
//            $.getScript('/plugins/flot/jquery.flot.js').done(function() {
                $.getScript('/plugins/flot/jquery.flot.time.js').done(function() {
//                    $.getScript('/plugins/flot/jquery.flot.resize.js').done(function() {
                        $.getScript('/plugins/flot/jquery.flot.pie.js').done(function() {
                            $.getScript('/plugins/flot/jquery.flot.stack.js').done(function() {
//                                $.getScript('/plugins/flot/jquery.flot.crosshair.js').done(function() {
//                                    $.getScript('/plugins/flot/jquery.flot.categories.js').done(function() {
//                                        handleDonutChart();
//                                        handleInteractiveChart();
//                                    });
//                                });
                            });
                        });
//                    });
                });
//            });
        }
    };
}();