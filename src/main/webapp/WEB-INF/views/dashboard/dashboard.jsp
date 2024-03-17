<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


	<div id="dashboardContainer" class="container" >
		<div id="dashboardHeaderGrp" class="col-xs-w100" style="margin-botom:5px;">
			<form class="form-inline" onsubmit="return false;">

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">

						<span class="input-group-addon col-xs-w30" data-domain-id="WORK_YMD"></span>
						<div id="dashboardWorkYmdDatePicker" class="col-xs-w100 input-group-sm date">
							<input id="dashboardWorkYmd" type="text" class="form-control input-sm col-xs-w100" readonly />
							<div id="dashboardWorkYmdBtn" class="input-group-btn">
							  	<button  type="button" class="btn btn-sm btn-primary" >
							  		<i class="fa fa-calendar"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PROD_GRP"></span>
						<select id="dashboardProdGrp" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="PRINT_DRIVER"></span>
						<select id="dashboardPrintDriver" class="form-control input-sm"></select>
					</div>
				</div>
			</form>
		</div>

		<div id="dashboardMenuGrp" class="col-xs-w100" style="text-align:center; ">
		</div>
	</div>

	<!-- end page container -->
	<script src="/js/views/dashboard/dashboard.js"></script>
























<!-- <ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li class="active">Dashboard</li>
</ol>
<h1 class="page-header">Dashboard <small>VertexID</small></h1>
<div class="row">
	begin col-3
	<div class="col-md-3 col-sm-6">
		<div class="widget widget-stats bg-green" style="padding:10px 5px 10px 10px; margin-bottom:10px;">
			<div class="stats-icon" style="width:90px; opacity:1;">
			  <p id="ibPrgsRate" style="font-size:24px;"></p>
			</div>
			<div class="stats-info">
				<h4 data-domain-id="IB_PROG_RATE"></h4>
				<p id="ibPrgsText"></p>
			</div>
			<div class="stats-link" >
				<a href="javascript:$('#menu-id-123').trigger('click');" style="margin:5px -10px -10px -10px;">자세히 <i class="fa fa-arrow-circle-o-right"></i></a>
				<a style="margin:5px -10px -10px -10px;">&nbsp</a>
			</div>
		</div>
	</div>
	end col-3
	begin col-3
	<div class="col-md-3 col-sm-6">
		<div class="widget widget-stats bg-blue" style="padding:10px 5px 10px 10px; margin-bottom:10px;">
			<div class="stats-icon" style="width:90px; opacity:1;">
              <p id="obPrgsRate" style="font-size:24px;"></p>
            </div>
            <div class="stats-info">
                <h4 data-domain-id="OB_PROG_RATE"></h4>
                <p id="obPrgsText"></p>
            </div>
            <div class="stats-link">
				<a href="javascript:;" style="margin:5px -10px -10px -10px;">자세히 <i class="fa fa-arrow-circle-o-right"></i></a>
				<a style="margin:5px -10px -10px -10px;">&nbsp</a>
			</div>
		</div>
	</div>
	end col-3
	begin col-3
	<div class="col-md-3 col-sm-6">
		<div class="widget widget-stats bg-purple" style="padding:10px 5px 10px 10px; margin-bottom:10px;">
			<div class="stats-icon" style="width:90px; opacity:1;">
              <p id="pickPrgsRate" style="font-size:24px;"></p>
            </div>
            <div class="stats-info">
                <h4 data-domain-id="PICK_PROG_RATE"></h4>
                <p id="pickPrgsText"></p>
            </div>
            <div class="stats-link">
				<a href="javascript:;" style="margin:5px -10px -10px -10px;">자세히 <i class="fa fa-arrow-circle-o-right"></i></a>
				<a style="margin:5px -10px -10px -10px;">&nbsp</a>
			</div>
		</div>
	</div>
	end col-3
	begin col-3
    <div class="col-md-3 col-sm-6">
        <div class="widget widget-stats bg-red" style="padding:10px 5px 10px 10px; margin-bottom:10px;">
            <div class="stats-icon"><i class="fa fa-clock-o"></i></div>
            <div class="stats-info">
                <h4 data-domain-id="CURR_STOCK"></h4>
                <p id="stockBoxText"></p>
            </div>
            <div class="stats-link">
                <a href="javascript:;" style="margin:5px -10px -10px -10px;">자세히 <i class="fa fa-arrow-circle-o-right"></i></a>
                <a style="margin:5px -10px -10px -10px;">&nbsp</a>
            </div>
        </div>
    </div>
	end col-3
</div> -->
<!-- end row -->
<!-- begin row -->
<!-- <div class="row">
	<div class="col-md-9">
		<div class="panel panel-inverse" data-sortable-id="index-1" style="margin-bottom:10px;">
			<div class="panel-heading" style="padding:5px 10px 5px 10px;">
				<div class="panel-heading-btn">
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					<a id="interactive-chart-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="panel-title" data-domain-id="STOCK_STATUS"></h4>
			</div>
			<div class="panel-body">
				<div id="interactive-chart" style="height:285px;"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
        <div class="panel panel-inverse" data-sortable-id="index-2" style="margin-bottom:10px;">
            <div class="panel-heading" style="padding:5px 10px 5px 10px;">
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a id="donut-chart-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
                <h4 class="panel-title" data-domain-id="ZONE_KEEP_RATE"></h4>
            </div>
            <div class="panel-body">
                <div id="donut-chart" style="height:285px;"></div>
            </div>
        </div>
	</div>
</div>
<div class="row m-b-15">
    <div class="col-md-3">
        <div class="panel panel-inverse" data-sortable-id="index-5" style="margin-bottom:10px;">
            <div class="panel-heading" style="padding:5px 10px 5px 10px;">
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a id="donut-chart2-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
                <h4 class="panel-title" data-domain-id="STOCK_IMPEND"></h4>
            </div>
            <div class="panel-body">
                <div id="donut-chart2" style="height:285px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="panel panel-inverse" data-sortable-id="index-3" style="margin-bottom:10px;">
            <div class="panel-heading" style="padding:5px 10px 5px 10px;">
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a id="donut-chart3-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
                <h4 class="panel-title" data-domain-id="STOCK_LONGTM"></h4>
            </div>
            <div class="panel-body">
                <div id="donut-chart3" style="height:285px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="panel panel-inverse" data-sortable-id="index-4" style="margin-bottom:10px;">
            <div class="panel-heading" style="padding:5px 10px 5px 10px;">
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a id="donut-chart4-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
                <h4 class="panel-title" data-domain-id="HIGHRK_ORDER_ITEM"></h4>
            </div>
            <div class="panel-body">
                <div id="donut-chart4" style="height:285px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="panel panel-inverse" data-sortable-id="index-5" style="margin-bottom:10px;">
            <div class="panel-heading" style="padding:5px 10px 5px 10px;">
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    <a id="donut-chart5-reload" href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
                <h4 class="panel-title" data-domain-id="HIGHRK_PICK_LOC"></h4>
            </div>
            <div class="panel-body">
                <div id="donut-chart5" style="height:285px;"></div>
            </div>
        </div>
    </div> -->
<!-- </div>
<script src="/js/paragon/paragon-chart.js"></script>
<script src="/js/views/dashboard/dashboard.js"></script> -->
