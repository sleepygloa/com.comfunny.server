/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고진행현황 [pdaObProgress]
 * Program Code     : PWMPDAOB205E
 * Description      :
 * Revision History
 * Author          		Date           		Description
 * -------------		-------------		------------------
 * Hong Jeong Bo 	 	2018. 12. 07.  		First Draft.
 */
var PdaObProgressApp = function () {
	"use strict";

	//그리드
	var $pdaObProgressHGrid = $('#pdaObProgressHGrid');
	var $pdaObProgressDGrid = $('#pdaObProgressDGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB205E';
	var proNm = 'pdaObProgress';

	var gridObGbnCd;

	var firstLoad = true;

    return {
        init: function () {

        	WMSUtil.fnCombo.itemClassLarge('pdaObProgressLargeClassCd', 'pdaObProgressMiddleClassCd', 'pdaObProgressSku');

        	WMSUtil.fnCombo.selectBox('pdaObProgressObGbnCd',  'OB_GBN_CD');

        	gridObGbnCd = WMSUtil.fnCombo.grid('OB_GBN_CD');

        	fnEvents();

        	fnList();
	    }
    };

    //이벤트
    function fnEvents(){

		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaObProgressObYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaObProgressObYmdDatePicker').datepicker("setDate", new Date());
		}

    	$('#pdaObProgressObYmd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaObProgressObGbnCd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaObProgressLargeClassCd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaObProgressMiddleClassCd').change(function(){
    		fnGridSearch();
    	});

    }

    //그리드 초기화
    function fnList(){
    	$pdaObProgressHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/obProgress/listPdaObProgress',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
 			postData	: sendData(),
 			//multiselect	: true,
            colModel	: [
        	   {editable: false, name:'OB_GBN_CD', 	width:"150px", align:"center",	hidden:true},
               {editable: false, name:'OB_GBN',     width:"120px", align:"center",
                   edittype:'select', formatter:'select', editoptions: { value:gridObGbnCd }
               },
               {editable: false, name:'SO_CNT', 		width:"70px", 	align:"right" , formatter:"integer"},
               {editable: false, name:'PLAN_QTY', 		width:"80px", 	align:"right" , formatter:"integer"},
               {editable: false, name:'CONF_QTY', 		width:"80px", 	align:"right" , formatter:"integer"},
               {editable: false, name:'PICK_QTY', 		width:"80px", 	align:"right" , formatter:"integer"},
               {editable: false, name:'OB_PROG_RATE', 	width:"150px", 	align:"center"},

           ],
			onSelectRowEvent : function(currRowData, prevRowData) {
				$pdaObProgressDGrid.paragonGridSearch({
					obGbnCd 		: currRowData.OB_GBN_CD,
        			obYmd			: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObProgressObYmd').val()),
        			largeClassCd	: $('#pdaObProgressLargeClassCd').val(),
        			middleClassCd 	: $('#pdaObProgressMiddleClassCd').val()
				});
			},
            gridComplete : function(){
                var ids = $pdaObProgressHGrid.jqGrid("getDataIDs");
                if (ids.length > 0) {
//                    	$pdaObProgressHGrid.setFocus(0);

                	var rowData = $pdaObProgressHGrid.getRowData(ids[0]);
                	if(firstLoad){
                		firstLoad = false;
                		fnListDetail({
                			obGbnCd 		: rowData.OB_GBN_CD,
                			obYmd			: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObProgressObYmd').val()),
                			largeClassCd	: $('#pdaObProgressLargeClassCd').val(),
                			middleClassCd 	: $('#pdaObProgressMiddleClassCd').val()
                		});
                	}else{
                		$pdaObProgressDGrid.paragonGridSearch({
                			obGbnCd 		: rowData.OB_GBN_CD,
                			obYmd			: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObProgressObYmd').val()),
                			largeClassCd	: $('#pdaObProgressLargeClassCd').val(),
                			middleClassCd 	: $('#pdaObProgressMiddleClassCd').val()
            			});
            		}
            	}else{
            		$pdaObProgressDGrid.jqGrid('clearGridData');
            	}
        	}
		})

    }

    //그리드 초기화
    function fnListDetail(rowData){
    	$pdaObProgressDGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/obProgress/listPdaObProgressDetail',
//            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            postData	: rowData,
            colModel	: [
                {editable: false, name:'SO_NO', 	width:"120px", 	align:"center"},
                {editable: false, name:'STORE', 	width:"200px", 	align:"center"},
                {editable: false, name:'PLAN_QTY', 	width:"80px", 	align:"right" , formatter:"integer"},
                {editable: false, name:'CONF_QTY', 	width:"80px", 	align:"right" , formatter:"integer"},
                {editable: false, name:'RSTORE', 	width:"150px", 	align:"center", hidden:true},
                {editable: false, name:'OB_NO', 	width:"100px", 	align:"center", hidden:true},

            ],
            gridComplete : function(){
            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);
            }
    	})
    }

    //그리드 조회
    function fnGridSearch(){
    	$pdaObProgressHGrid.paragonGridSearch(sendData());
    }


    //데이터
    function sendData(){
    	return {
        	obGbnCd			: 	$('#pdaObProgressObGbnCd option:selected').val(),
        	obYmd			:	WMSUtil.fnDateSetting.yyyymmdd($('#pdaObProgressObYmd').val()),
        	largeClassCd	:	$('#pdaObProgressLargeClassCd').val(),
            middleClassCd	:	$('#pdaObProgressMiddleClassCd').val()
    	}
    }



}();

$(document).ready(function() {
	PdaObProgressApp.init();
});
