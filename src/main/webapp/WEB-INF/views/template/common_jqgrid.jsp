<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
<!--     <script src="/common/core-grid.js"></script> -->
<!--     <script src="/js/jquery.jqGrid.min.js"></script> -->
<!--     <script src="/js/jqgrid-ui.js"></script> -->
	</head>
<body>
<div class="" >
<ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li><a href="javascript:;">UI Template</a></li>
	<li class="active">jqGrid<i class="fa fa-star active"></i></li>
</ol>
<h1 class="page-header">jqGrid</h1>
</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i>
<!-- 					<small>Search</small> -->
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputEmail2" size="10" placeholder="프로그램코드">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputPassword2" placeholder="프로그램명">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="searchBtn" type="submit" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i><i data-domain-id="ROW_ADD_BTN" >행추가1</i>
				</button>
			</div>
			</form>
	</div>

<div class="grid-wrapper" >
	<table id="tempJQGrid1"  ></table>
	<div id="tempJQGridNavi1"></div>
	<table id="tempJQGrid3"  ></table>
	<div id="tempJQGridNavi3"></div>
	<table id="tempJQGrid2"  ></table>
	<div id="tempJQGridNavi2"></div>
</div>
<script>
        $(document).ready(function () {



           /*  $("#table_list_12").jqGrid({
            	url: 'http://www.trirand.net/examples/grid/loading_data/million_linqdatasource/default.aspx?jqGridID=JQGrid1',
                mtype: "GET",
                datatype: "json",
                page: 1,

                data: mydata,
                datatype: "local",
                height: 450,
				regional : 'kr',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 20,
                rowList: [10, 20, 30,50,100],
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'id',index:'id', editable: true, width:60, sorttype:"int",search:true},
                    {name:'invdate',index:'invdate', editable: true, width:90, sorttype:"date", formatter:"date"},
                    {name:'name',index:'name', editable: true, width:100},
                    {name:'amount',index:'amount', editable: true, width:80, align:"right",sorttype:"float", formatter:"number"},
                    {name:'tax',index:'tax', editable: true, width:80, align:"right",sorttype:"float"},
                    {name:'total',index:'total', editable: true, width:80,align:"right",sorttype:"float"},
                    {name:'note',index:'note', editable: true, width:100, sortable:false}
                ],
                pager: "#pager_list_1",
                viewrecords: true,
                caption: "프로그램 목록",
                addtext: 'Add',
                edittext: 'Edit',
                rownumbers: true,
                hidegrid: false
            }); */
            /* $("#table_list_1").jqGrid({
            	url: '/settings/system/program/listProgram?autoPage=false',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 450,
				regional : 'kr',
				autowidth: true,
				shrinkToFit: true,
                rowNum: 20,
                rowList: [10, 20, 30,50,100],
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD'},
                    {name:'PRO_NM'},
                    {name:'PRO_DESC'},
                    {name:'CALL_URL'},
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',index:'IN_DT',sortable:false}
                ],
                pager: "#pager_list_1",
                viewrecords: true,
				emptyrecords: 'Scroll to bottom to retrieve new page', // the message will be displayed at the bottom
                caption: "프로그램 목록",
                addtext: 'Add',
                edittext: 'Edit',
                scroll: 1,
                hidegrid: false,
                rownumbers: true
            }); */
            $("#tempJQGrid1").paragonGrid({
            	url: '/ctrl/settings/system/program/listProgram',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 200,
                sortable:true,
                autowidth: true,
				shrinkToFit: false,
                countable: false,
                rowClickFocus: true, //클릭시 색변함
             	multiselect: true, // 체크 박스
                rowList: [10, 20, 30,50,100],
                viewrecords: true,
//                 colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {width:50,sortable:true,name:'PRO_CD', key: true},
                    {width:50,sortable:true,name:'PRO_NM'},
                    {width:100,sortable:true,name:'PRO_DESC'},
                    {width:200,sortable:true,name:'CALL_URL'},
                    {width:200,sortable:true,name:'IN_USER_ID'},
                    {width:100,sortable:true,name:'USE_YN', align:"right"},
                    {width:100,sortable:true,name:'IN_DT',sortable:false}
                ],
                pager: "#tempJQGridNavi1",
                loadonce: true,
                caption: "프로그램 목록",
                width: 750,
                hidegrid: false,
                rownumbers: true,
                domainId : "SCHD_LIST",
                emptyrecords: 'Scroll to bottom to retrieve new page',
                groupHeaders:[
                    {
                    	rowspan : true,
                    	header:[
							{start: 'PRO_CD', length: 4 , domain:"SCHD_LIST", text: '프로그램정보'},
// 							{start: 'PRO_NM', length: 5 , domain:"PRO_NM" },
						]
                    },
//                     {
//                     	rowspan : false,
//                     	header:[
// 							{start: 'PRO_CD', length: 1	, domain:"CALL_URL",title: 'AAAAA'},
// 							{start: 'PRO_NM', length: 2	, domain:"IN_DT"},
// 							{start: 'IN_USER_ID', length: 2	, title:"유저정보"},
// 						]
//                     },
                ]
            });
//             $("#tempJQGrid1").jqGrid('setGroupHeaders', {
//             	  useColSpanStyle: false,
//             	  groupHeaders:[
//             		{startColumnName: 'PRO_CD', numberOfColumns: 1, titleText: '<i data-domain-id="SCHD_LIST"></i>'},
//             		{startColumnName: 'PRO_NM', numberOfColumns: 5, titleText: 'Shiping222'},
//             	  ]
//             });
//             $("#tempJQGrid1").jqGrid('setGroupHeaders', {
//             	  useColSpanStyle: false,
//             	  groupHeaders:[
//             		{startColumnName: 'PRO_CD', numberOfColumns: 1, titleText: '<em>Price111</em>'},
//             		{startColumnName: 'PRO_NM', numberOfColumns: 2, titleText: 'Shiping1'},
//             		{startColumnName: 'IN_USER_ID', numberOfColumns: 3, titleText: 'Shiping2'}
//             	  ]
//             });


            $("#tempJQGrid2").jqGrid({
            	url: '/ctrl/settings/system/program/listProgram',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 200,
                pageable: true,
                countable:true,
                sortable:true,
                autowidth: true,
                onSelectRow: editRow,
                domainId : "SCHD_LIST",
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD', key: true},
                    {name:'PRO_NM',editable : true},
                    {name:'PRO_DESC',editable : true},
                    {name:'CALL_URL',editable : true,
                    	editoptions : {
							size:10,
							maxlength: 15,
							editrules:{
								//edithidden:true,
								required:true,
								custom:true,
								custom_func: fnNumberCheck
// 							},
// 							dataInit : function(el) {
// 								$(el).onlyNumber();
							}
						}
                    },
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',sortable:false}
                ],
//                 viewrecords: true,
                pager: "#tempJQGridNavi2",
//                 loadonce: true,
                caption: "프로그램 목록2",
                width: 750,
                rowNum: 10,
                hidegrid: false,	// 창접기 버튼
                rownumbers: true,

                scroll: 1, // set the scroll property to 1 to enable paging with scrollbar - virtual loading of records
                emptyrecords: '조회된 데이타가 없습니다.' // the message will be displayed at the bottom
            });
            var lastSelection;
            function editSuccessful() {
                console.log("success");
            }
            function editFailed() {
                console.log("fail");
            }
            function editRow(id) {
                if (id && id !== lastSelection) {
                    var grid = $("#tempJQGrid2");
                    grid.jqGrid('restoreRow',lastSelection);

                    var editParameters = {
                        keys: true,
                        successfunc: editSuccessful,
                        errorfunc: editFailed
                    };

                    grid.jqGrid('editRow',id, editParameters);
                    lastSelection = id;
                }
            }
            function fnNumberCheck(values, colname) {
				console.log(values);
				console.log(colname);
				if (values < 0 || values > 1000){
				   return [false,"0부터 1000이하의 값을 입력해주세요"];
				}else{
				   return [true,""];
				}

			}
//             $("#tempJQGrid3").paragonGrid({
//             	url: '/ctrl/settings/system/program/listProgram',
//             	sortable:true,
// 				colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
//                 colModel:[
//                     {name:'PRO_CD', key: true},
//                     {name:'PRO_NM'},
//                     {name:'PRO_DESC'},
//                     {name:'CALL_URL'},
//                     {name:'IN_USER_ID'},
//                     {name:'USE_YN', align:"right"},
//                     {name:'IN_DT',sortable:false}
//                 ],
//                 pager: "#tempJQGridNavi3",
//                 caption: "서버에서 PAGE 처리"
//             });
// 			$("#searchBtn").click(function(){
// 				$("#tempJQGrid3").jqGrid('setGridParam', { colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자']});
// 				$("#tempJQGrid3").trigger("reloadGrid");
// 			});
            // Add selection
//             $("#table_list_1").setSelection(4, true);


            // Setup buttons
//             $("#table_list_1").jqGrid('navGrid', '#pager_list_1',
//                     {edit: true, add: true, del: true, search: true},
//                     {height: 200, reloadAfterSubmit: true}
//             );
            // 문제 있음 !!!!!!!!!!!!!!!!
//             $("#table_list_1").jqGrid('navGrid', '#pager_list_1',
//                     {edit: true, add: true, del: true, search: true},
//                     {height: 200, reloadAfterSubmit: true,refresh: true}
//             );

            // Add responsive to jqGrid
            $(window).bind('resize', function () {
                var width = $(".grid-wrapper:visible").eq(0).width();
//                 $('#tempJQGrid1').setGridWidth(width);
                $('#tempJQGrid2').setGridWidth(width);
            });


//             setTimeout(function(){
//                 $('.wrapper-content').removeClass('animated fadeInRight');
//             },700);

        });

//     var objHeader = $("#gview_" + gridId + " > div.ui-state-default.ui-jqgrid-hdiv > div > table tr[role=rowheader] th");
    </script>

<!--     <table> -->
<!-- 		<thead> -->
<!-- 			<tr role="row" aria-hidden="true" class="jqg-first-row-header" -->
<!-- 				style="height: auto;"> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 35px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 35px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 222px;"></th> -->
<!-- 				<th role="gridcell" class="ui-first-th-ltr" -->
<!-- 					style="height: 0px; width: 221px;"></th> -->
<!-- 			</tr> -->
<!-- 			<tr class="ui-jqgrid-labels ui-sortable jqg-second-row-header" -->
<!-- 				role="row"> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr" colspan="1"><em>Price111</em></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr" colspan="5">Shiping222</th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 			</tr> -->
<!-- 			<tr role="row" -->
<!-- 				class="ui-jqgrid-labels jqg-third-row-header jqg-second-row-header"> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr" colspan="1"><em>Price111</em></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr" colspan="2">Shiping1</th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr"></th> -->
<!-- 				<th role="columnheader" -->
<!-- 					class="ui-state-default ui-th-column-header ui-th-ltr" colspan="3">Shiping2</th> -->
<!-- 			</tr> -->
<!-- 			<tr role="row" class="ui-jqgrid-labels jqg-third-row-header"> -->
<!-- 				<th id="tempJQGrid1_rn" role="columnheader" class="ui-th-column ui-th-ltr ui-state-default" style=""> -->
<!-- 					<div class="ui-th-div" id="jqgh_tempJQGrid1_rn"> -->
<!-- 						<span class="s-ico" style="display: none"> -->
<!-- 							<span sort="asc" class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span> -->
<!-- 							<span sort="desc" class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span> -->
<!-- 						</span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_cb" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" style=""><div -->
<!-- 						class="ui-th-div" id="jqgh_tempJQGrid1_cb"> -->
<!-- 						<input role="checkbox" id="cb_tempJQGrid1" class="cbox" -->
<!-- 							type="checkbox"><span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_PRO_CD" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_PRO_CD"> -->
<!-- 						프로그램코드<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_PRO_NM" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_PRO_NM"> -->
<!-- 						프로그램명<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_PRO_DESC" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_PRO_DESC"> -->
<!-- 						설명<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_CALL_URL" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_CALL_URL"> -->
<!-- 						URL<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_IN_USER_ID" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_IN_USER_ID"> -->
<!-- 						js Path<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_USE_YN" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 222px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_USE_YN"> -->
<!-- 						사용여부<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 				<th id="tempJQGrid1_IN_DT" role="columnheader" -->
<!-- 					class="ui-th-column ui-th-ltr ui-state-default" -->
<!-- 					style="width: 223px;"><span -->
<!-- 					class="ui-jqgrid-resize ui-jqgrid-resize-ltr" -->
<!-- 					style="cursor: col-resize;">&nbsp;</span> -->
<!-- 				<div class="ui-th-div ui-jqgrid-sortable" -->
<!-- 						id="jqgh_tempJQGrid1_IN_DT"> -->
<!-- 						등록일자<span class="s-ico" style="display: none"><span -->
<!-- 							sort="asc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-n"></span><span -->
<!-- 							sort="desc" -->
<!-- 							class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-state-disabled ui-icon ui-icon-triangle-1-s"></span></span> -->
<!-- 					</div></th> -->
<!-- 			</tr> -->
<!-- 		</thead> -->
<!-- 	</table> -->
</body>
</html>