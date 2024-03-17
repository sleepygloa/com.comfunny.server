/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고실사 - 번호조회 [PdaStItemInquiryPopApp]
 * Program Code     : PWMPDARO102EP
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 17.  		First Draft.
 */
var PdaStItemInquiryPopApp = function () {
	"use strict";



	//그리드
	var $pdaStItemInquiryPopHGrid = $('#pdaStItemInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStItemInquiryPop';

	//부모에게 전달 받은 데이터
	//var getData = $("#modalPPdaIbPutwSearchPltId").PopAppGetData();

	var gridStockInspGbn;

    return {
        init: function () {

        	WMSUtil.fnCombo.itemClassLarge('pdaStItemInquiryPopCategory', 'pdaStItemInquiryPopBrand', 'pdaStItemInquiryPopSku');

        	getEvents();
    		getList();

	    }
    };

    function getEvents(){

    	$('#pdaStItemInquiryPopItemNmSearchBtn').click(function(){
    		fnGridSearch();
    	});

    	$('#pdaStItemInquiryPopCategory').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaStItemInquiryPopBrand').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaStItemInquiryPopSku').change(function(){
    		fnGridSearch();
    	});

    }

    //그리드 조회
    function getList(){
    	$pdaStItemInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStItemInquiry/listPdaStockItemInquiryD',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
            //multiselect	: true,
            postData	:
            {
            	itemNm 			: 'Grid Drawing'
        	},
            colModel	: [
                {editable: false, name:'ITEM_CD',	width:"70px", align:"center"},
                {editable: false, name:'ITEM_NM', 	width:"200px", align:"center"},
                {editable: false, name:'STOCK_QTY', width:"200px", align:"center", hidden:true},
                {editable: false, name:'UOM', 		width:"200px", align:"center", hidden:true},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStItemInquiryPopHGrid.getRowData(iRow);

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#modalPdaItemSearchPopup").popupCallback(rowData);
                $("#modalPdaItemSearchPopup").coreClosePopup();
            },
            //로딩 중 동적으로 그리드 영역 수정.
            loadComplete : function(){
        		WMSUtil.pwaGridDynamicArea(proNm);
            },
            gridComplete : function(){

            }
    	})
    }

    //그리드 검색.
    function fnGridSearch(){
		var data = {
            	itemNm 			: $('#pdaStItemInquiryPopItemNm').val(),
                largeClassCd    : $('#pdaStItemInquiryPopCategory').val(),
                middleClassCd   : $('#pdaStItemInquiryPopBrand').val(),
                smallClassCd    : $('#pdaStItemInquiryPopSku').val()
    		};

		$pdaStItemInquiryPopHGrid.paragonGridSearch(data);
    }

}();

$(document).ready(function() {
	PdaStItemInquiryPopApp.init();
});