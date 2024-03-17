/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 조회관리- 파렛트 이력조회[PdaStPltHistSearchApp]
 * Program Code     : PWMPDAST411E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 09. 20.  		First Draft.
 */
var PdaStPltHistInquiryApp = function () {
	"use strict";

	var proCd = 'PWMPDAST411E';
	var proNm = 'pdaStPltHistInquiry';

	var $pdaStPltHistInquiryHGrid = $('#pdaStPltHistInquiryHGrid');

    return {
        init: function () {

    		fnEvent();

    		fnList();

	    },
	    //바코드 콜백
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
			result = JSON.parse(result);

			fnBarcode(result);
	    }
    };

    //바코드 콜백
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    		$('#pdaStPltHistInquiryPltId').val(barcode);
    		fnGridSearch();
    	}

    }

    //그리드 초기화
    function fnList(){
    	$pdaStPltHistInquiryHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStPltHistInquiry/listPdaStPltHistInquiry',
            rowEditable	: true,
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            height		: "300px",
            colModel: [
				{editable: false, name:'WORK_DT', 		  width:"150px",  align:"center"},
				{editable: false, name:'STOCK_HIST', 	  width:"150px",  align:"center"},
				{editable: false, name:'IOB_GBN', 		  width:"100px",   align:"center"},
				{editable: false, name:'LOC', 			  width:"80px",   align:"center"},
				{editable: false, name:'STOCK_QTY',		  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'ITEM_CD', 		  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'ITEM_NM', 		  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'UOM', 		  	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'WORK_QTY',		  width:"100px",  align:"center", hidden: true},  //integer Formattig이 먹히지 않아서 SQL에서 포맷해서 넘김
				{editable: false, name:'ITEM_ST_CD', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'MAKE_LOT', 		  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'MAKE_YMD', 		  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'LOT_ATTR1', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'LOT_ATTR2', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'LOT_ATTR3', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'LOT_ATTR4', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'LOT_ATTR5', 	  width:"100px",  align:"center", hidden: true},
				{editable: false, name:'DIST_EXPIRY_YMD', width:"100px",  align:"center", hidden: true},
            ],
            onSelectRowEvent: function(currRowData, prevRowData){
            	//선택시 form 데이터 입력
				fnSetInfo(currRowData)
            },
            gridComplete : function(){
            	//UI 세팅
//            	WMSUtil.pwaGridDynamicArea(proNm);

            	//그리드 데이터 1건 이상일때 첫행 데이터 form 에 입력
            	var ids = $pdaStPltHistInquiryHGrid.jqGrid('getDataIDs');
            	if(ids.length > 0) {
            		var rowData = $pdaStPltHistInquiryHGrid.getRowData(ids[0]);
            		fnSetInfo(rowData);
            	}else{
            		fnInit();
            	}
            }
    	})
    }

    //이벤트
    function fnEvent(){

    	//엔터
    	$('#pdaStPltHistInquiryPltId').keydown(function(e){
    		if(e.keyCode == 13 || e.keyCode == 9){
    			fnGridSearch();
    		}
    	});
    }

    //데이터 입력
    function fnSetInfo(rowData){

    	$('#pdaStPltHistInquiryStockQty').val(rowData.STOCK_QTY);
    	$('#pdaStPltHistInquiryStockQtyUom').text(rowData.UOM)

    	$('#pdaStPltHistInquiryUom').text(rowData.UOM);
    	$('#pdaStPltHistInquiryWorkQty').val(rowData.WORK_QTY);

    	$('#pdaStPltHistInquiryLotAttr1').val(rowData.LOT_ATTR1);
		$('#pdaStPltHistInquiryLotAttr2').val(rowData.LOT_ATTR2);
		$('#pdaStPltHistInquiryLotAttr3').val(rowData.LOT_ATTR3);
		$('#pdaStPltHistInquiryLotAttr4').val(rowData.LOT_ATTR4);
		$('#pdaStPltHistInquiryLotAttr5').val(rowData.LOT_ATTR5);

		$('#pdaStPltHistInquiryItemCd').val(rowData.ITEM_CD);
		$('#pdaStPltHistInquiryItemNm').val(rowData.ITEM_NM);
		$('#pdaStPltHistInquiryItemStCd').val(rowData.ITEM_ST_CD);
		$('#pdaStPltHistInquiryMakeLot').val(rowData.MAKE_LOT);
		$('#pdaStPltHistInquiryMakeYmd').val(rowData.MAKE_YMD);
		$('#pdaStPltHistInquiryDistExpiryYmd').val(rowData.DIST_EXPIRY_YMD);
    }

    //그리드 조회
    function fnGridSearch(){
		$pdaStPltHistInquiryHGrid.paragonGridSearch(sendData());

    }
    //데이터
    function sendData(){
    	return {
    		pltId	: $('#pdaStPltHistInquiryPltId').val()
    	}
    }

    //초기화
    function fnInit(){

    }
}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStPltHistInquiryApp.fnCallbackBarcode",
	});
	PdaStPltHistInquiryApp.init();
});