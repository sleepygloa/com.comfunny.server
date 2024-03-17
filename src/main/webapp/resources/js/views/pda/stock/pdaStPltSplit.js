/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 파렛트분할[PdaStPltSplitApp]
 * Program Code     : PWMPDAST105E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 11. 02.  		First Draft.
 */
var PdaStPltSplitApp = function () {
	"use strict";

	var $pdaStPltSplitHGrid = $('#pdaStPltSplitHGrid');
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStPltSplit';

    return {
        init: function () {

    		getEvents();
    		getList();

	    }
    };

    function getList(){
    	$pdaStPltSplitHGrid.paragonGrid({
            url: '/pda/ctrl/stock/pdaStPltSplit/listPdaStPliSplitD',
            rowEditable		: false,
//          rowClickFocus	: true,
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            postData: {
            	tgtPltId :  "gridDrawing",
            },
            colModel: [
                       {editable: false,name:'ITEM_CD', 	width:"100px", align:"center"},
                       {editable: false,name:'ITEM_NM', 	width:"100px", align:"left"	 },
                       {editable: false,name:'LOT_ID', 		width:"100px", align:"center"},
                       {editable: false,name:'BOX_QTY',		width:"100px", align:"right" },
                       {editable: false,name:'EA_QTY',		width:"100px", align:"right" },
            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var iRow = $pdaStPltSplitHGrid.getGridParam("selrow");
                var rowData = $pdaStPltSplitHGrid.getRowData( iRow );

            },
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);

            	//caption 총건수
            	/*
 				$('.captionRowCount').remove();
            	var count = $pdaStPltSplitHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            	*/

            },
            onSelectRowEvent: function(currRowData,prevRowData){

            }
    	})
    }

    function getEvents(){
    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
		$(document).keydown(function(event){
			if(event.keyCode == 13) {

				var objId = event.target.id;
				if (objId == 'pdaStPltSplitTgtPltId'){
					$('#pdaStPltSplitTgtPltId').blur();
					fnGridSearch();
				}

				event.preventDefault();

				return false;
			}
		});


       	$('#pdaStPltSplitSearchBtn').on('click', function(){
       		fnGridSearch();
		});

       	$('#pdaStPltSplitBtn').on('click', function(){
       		fnStPltDivision();
		});

    }

    function fnStPltDivision(){


    }


    function fnGridSearch(){

    	var tgtPlId = $('#pdaStPltSplitTgtPltId').val();

    	if(!tgtPlId){
    		tgtPlId = "empty";
    	}

		var data = {
			tgtPlId : tgtPlId
		};

		$pdaStPltSplitHGrid.paragonGridSearch(data);

    }

}();

$(document).ready(function() {
	PdaStPltSplitApp.init();
});