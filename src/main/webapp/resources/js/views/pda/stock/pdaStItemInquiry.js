/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품재고조회 [PdaStItemInquiryApp]
 * Program Code     : PWMPDAST107E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 09. 17.  		First Draft.
 */
var PdaStItemInquiryApp = function () {
	"use strict";

	//프로그램코드, 프로그램명
	var proCd = 'PWMPDAST107E';
	var proNm = 'pdaStItemInquiry';

	//그리드
	var $pdaStItemInquiryHGrid = $('#pdaStItemInquiryHGrid');

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

    	}else{

			if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
			 ||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
		     ||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){
				$('#pdaStItemInquiryItemCd').val(barcode);
				fnItemSearch();
				return false;
			}
    	}
    }

    function fnItemSearch(){
    	$.ajax({
    		url		: '/pda/ctrl/common/listStItemInq',
    		type 	: "POST",
    		data	: JSON.stringify({
        		proCd	: proCd,
    			itemCd 	: $('#pdaStItemInquiryItemCd').val(),
    		}),
    		async	: false,
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			var dt_grid = data.dt_grid;

    			if(dt_grid.length == 0){
    				Util.alert('MSG_MST_VAL_081'); //제품정보가 없습니다.
    				return false;
    			}else if(dt_grid.length == 1){
    				var data = dt_grid[0]; // 제품코드 입력시 형태가 같기 하기 위해 변수에 저장.
    				$('#pdaStItemInquiryItemCd').val(data.ITEM_CD);
    				fnGridSearch();
    			}else{
    		        PopApp.coreOpenPopup({
    		            ajaxUrl 	: '/pda/ctrl/common/pdaItemPop',
    		            id 			: 'modalItemPopup',
    		            width 		: '550',
    		            domainId	: "PWMCM111Q_P1",
    		            data		: {
    		        		proCd	: proCd,
    		    			itemCd 	: $('#pdaStItemInquiryItemCd').val(),
    		    		},
    		            visible		: true,
    		            fullScreen 	: true,
    		            onload 		: function(modal) {
    		                modal.show();
    		            },
    		            callback 	: function(data){
    	    				$('#pdaStItemInquiryItemCd').val(data.ITEM_CD);
    	    				fnGridSearch();
    		            }
    		        });
    			}
    		}
    	});
    }

    //그리드 조회
    function fnList(){
    	$pdaStItemInquiryHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStItemInquiry/listPdaStockItemInquiryD',
            rowEditable		: false,
//          rowClickFocus	: true,
            cellEditable	: false,
//            sortable		: true,
            shrinkToFit		: false,
            colModel: [
				{editable: false,name:'ITEM_CD',		width:"80px",	align:"center", hidden:true},
				{editable: false,name:'ITEM_NM',		width:"80px",	align:"left",	hidden:true},
				{editable: false,name:'LOC', 			width:"80px",	align:"center"},
				{editable: false,name:'STOCK_QTY', 		width:"80px", 	align:"right" },
				{editable: false,name:'MAKE_YMD', 		width:"100px", 	align:"center"},
				{editable: false,name:'MAKE_LOT', 		width:"100px", 	align:"center"},
				{editable: false,name:'DIST_EXPIRY_YMD',width:"120px", 	align:"center"},
				{editable: false,name:'LOT_ATTR1',		width:"120px", 	align:"center"},
				{editable: false,name:'LOT_ATTR2',		width:"60px", 	align:"center"},
				{editable: false,name:'PLT_ID',			width:"150px", 	align:"center"},
				{editable: false,name:'UOM',			width:"150px", 	align:"center", hidden:true },

            ],
            onSelectRowEvent: function(currRowData, prevRowData){
				fnSetInfo(currRowData)
            },
            gridComplete : function(){
            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);

            	//데이터 1건 이상일때.
            	var ids = $pdaStItemInquiryHGrid.jqGrid('getDataIDs');
            	if(ids.length > 0) {
            		var rowData = $pdaStItemInquiryHGrid.getRowData(ids[0]);
            		fnSetInfo(rowData);
            	}else{
            		fnInit();
            	}

            }
    	})
    }

    //이벤트
    function fnEvents(){

		//엔터 이벤트
		$('#pdaStItemInquiryItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStItemInquiryItemCd').blur();
				//제품바코드, 박스바코드, 제품코드 조회후 그리드 조회
				fnItemSearch();
			}
		});

		//제품검색 팝업 버튼 클릭
       	$('#pdaStItemInquiryItemBtn').click(function(){
       		fnItemPop();
		});
    }

    //제품 분류별 조회 팝업
    function fnItemPop(){
        PopApp.coreOpenPopup({
            ajaxUrl 	: '/pda/ctrl/common/pdaItemClassPop',
            id 			: 'modalItemClassPopup',
            width 		: '550',
            domainId	: "PWMCM125Q_P1",
            data		: {
        		proCd		: proCd,
        		workYmd		: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
        	},
            visible		: true,
            fullScreen 	: true,
            onload 		: function(modal) {
                modal.show();
            },
            callback 	: function(data){
            	$('#pdaStItemInquiryItemCd').val(data.ITEM_CD);
            	fnGridSearch();
            }
        });
    }

    //그리드 조회
    function fnGridSearch(){
		$pdaStItemInquiryHGrid.paragonGridSearch({itemCd : $('#pdaStItemInquiryItemCd').val()});
    }

    //데이터 입력
    function fnSetInfo(setData){
    	$('#pdaStItemInquiryItemNm').val(setData.ITEM_NM);
    	$('#pdaStItemInquiryPkqty').val(setData.STOCK_QTY);
    	$('#pdaStItemInquiryUom').val(setData.UOM);
    }


    //데이터
    function sendData(){
    	return {
    		proCd	: proCd,
			itemCd 	: $('#pdaStItemInquiryItemCd').val(),
    	}
    }

    //데이터 초기화
    function fnInit(){
    	$('#pdaStItemInquiryItemNm').val('');
    	$('#pdaStItemInquiryPkqty').val('');
    	$('#pdaStItemInquiryUom').val('');
    }


}();

$(document).ready(function() {
	//Android Barcode Listener
	MobileUtil.getBarcode({
		callback : "PdaStItemInquiryApp.fnCallbackBarcode",
	});

	//ProgramApp
	PdaStItemInquiryApp.init();
});