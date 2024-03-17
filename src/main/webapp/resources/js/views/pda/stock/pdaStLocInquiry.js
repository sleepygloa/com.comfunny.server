/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 조회관리- 로케이션 조회[PdaStLocSearchApp]
 * Program Code     : PWMPDAST108E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 09. 20.  		First Draft.
 */
var PdaStLocInquiryApp = function () {
	"use strict";

	var proCd = 'PWMPDAST108E';
	var proNm = 'pdaStLocInquiry';

	var $pdaStLocInquiryHGrid = $('#pdaStLocInquiryHGrid');

    return {
        init: function () {

    		fnEvents();

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

    	}else if(barcode.length == WMSUtil.barcodeTextLength('LOC_CD')){
    		$('#pdaStLocInquiryLocCd').val(barcode);
    		fnGridSearch();
    	}

    }

    //그리드 초기화
    function fnList(){
    	$pdaStLocInquiryHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStLocInquiry/listPdaStLocInquiryD',
            rowEditable		: true,
//          rowClickFocus	: true,
            cellEditable	: false,
//            sortable		: true,
            shrinkToFit		: false,
            colModel: [
                       {editable: false,name:'STOCK_QTY', 		width:"80px", 	align:"right" },
                       {editable: false,name:'ITEM', 			width:"200px", align:"left" },
                       {editable: false,name:'ITEM_ST', 		width:"80px", 	align:"center"},
                       {editable: false,name:'MAKE_YMD',		width:"120px", 	align:"center"},
                       {editable: false,name:'MAKE_LOT',		width:"120px", 	align:"center"},
                       {editable: false,name:'DIST_EXPIRY_YMD',	width:"120px", 	align:"center"},
                       {editable: false,name:'PLT_ID',			width:"150px", align:"center"},
                       {editable: false,name:'ITEM_CD', 		width:"100px", 	align:"center", hidden:true},
                       {editable: false,name:'ITEM_NM', 		width:"200px", align:"left", hidden:true },
            ],
            gridComplete : function(){
            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);

            }
    	})
    }

    //이벤트
    function fnEvents(){
    	//로케이션 코드
    	$('#pdaStLocInquiryLocCd').keydown(function(e){
    		if(e.keyCode == 13 || e.keyCode == 9){
    			fnGridSearch();
    		}
    	})
    	//조회
		$('#pdaStLocInquirySearchBtn').on('click', function(){
       		fnGridSearch();
		});

    }

    //그리드 조회
    function fnGridSearch(){
		$pdaStLocInquiryHGrid.paragonGridSearch(sendData());

    }

    //데이터
    function sendData(){
    	return {
    		locCd : $('#pdaStLocInquiryLocCd').val()
    	}
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStLocInquiryApp.fnCallbackBarcode",
	});

	PdaStLocInquiryApp.init();
});