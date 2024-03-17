/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고실사[PdaStInspApp]
 * Program Code     : PWMPDAST103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStInspApp = function () {
	"use strict";

	var $pdaStInspHGrid = $('#pdaStInspHGrid');
	var proCd = 'PWMPDAST103E';
	var proNm = 'pdaStInsp';


    return {
        init: function () {

    		fnEvents();

    		fnList();
	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    //바코드 스캔
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{

    		//상세 팝업
    		if($('#pdaStInspDetailPop').length != 0){
    			$('#pdaStInspDetailPopToPltId').val(barcode);
    			return false;
    		}

    		//신규생성 팝업
    		if($('#pdaStInspNewPop').length != 0){
    			if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
				 ||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
			     ||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){
    				$('#pdaStInspNewPopItemCd').val(barcode);
    				return false;
    			}
    			if(barcode.length == WMSUtil.barcodeTextLength('LOC_CD')){
    				$('#pdaStInspNewPopLocCd').val(barcode);
    				return false;
    			}
    			if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    				$('#pdaStInspNewPopPltId').val(barcode);
    				return false;
    			}
    		}

    		//실사 번호가 있을때만
    		//TGT, TO 로케이션 입력
			if(barcode == WMSUtil.barcodeTextLength('INSP_NO')){
				$('#pdaStInspStInspNo').val(barcode);
				fnGridSearch()
			}else if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
					 ||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
				     ||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){
				$('#pdaStInspItemCd').val(barcode);
				fnItemSearch();
				return false;
			}else if(length <= WMSUtil.barcodeTextLength('LOC')){
    				$('#pdaStInspTgtLoc').val(barcode);
    				fnGridSearch();
    				return false;
			}else if(barcode == WMSUtil.barcodeTextLength('INSP_NO')){
				$('#pdaStInspStInspNo').val(barcode);
				fnGridSearch()
    		}else if (barcode == WMSUtil.barcodeTextLength('PLT_ID')){
    			fnPltScan(barcode);
    		}
    	}
    }

    //존 콤보박스
	function fnZoneInq(){
		$.ajax({
			url 		: "/pda/ctrl/stock/pdaStInsp/listStInspZoneInq",
			type 		: "POST",
			dataType 	: "json",
			cache 		: false,
			success 	: function(result) {
				Util.MakeSelectOptions($('#pdaStInspZoneCd'), result);
			}
		});
	}


    //그리드 조회
    function fnList(){
    	$pdaStInspHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStInsp/listStInspD',
            rowEditable		: true,
//          rowClickFocus	: true,
            cellEditable	: true,
            sortable		: true,
            shrinkToFit		: false,
            colModel: [
                       {editable: false,name:'LOC', 				width:"100px", align:"center"},
                       {editable: false,name:'ITEM_CD', 				width:"100px", align:"center"},
                       {editable: false,name:'ITEM_NM', 				width:"120px", align:"center"},
                       {editable: false,name:'STOCK_QTY', 				width:"70px",  align:"right",	formatter:"integer"},
                       {editable: false,name:'INSP_QTY',				width:"70px",  align:"right",	formatter:"integer"},
                       {editable: false,name:'PLT_ID',					width:"150px", align:"center"},
                       {editable: false,name:'UOM',						width:"100px", hidden:true},
                       {editable: false,name:'STD_UOM_CD',				width:"100px", hidden:true},
                       {editable: false,name:'CONV_UOM_CD',				width:"100px", hidden:true},
                       {editable: false,name:'UOM',						width:"100px", hidden:true},
                       {editable: false,name:'PK_QTY',					width:"100px", hidden:true},
                       {editable: false,name:'ITEM_ST_CD',  			width:"100px", hidden:true},
                       {editable: false,name:'MAKE_LOT', 				width:"100px", hidden:true},
                       {editable: false,name:'MAKE_YMD', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ATTR1', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ATTR2', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ATTR3', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ATTR4', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ATTR5', 				width:"100px", hidden:true},
                       {editable: false,name:'LOT_ID', 					width:"100px", hidden:true},
                       {editable: false,name:'STOCK_INSP_NO', 			width:"100px", hidden:true},
                       {editable: false,name:'DIST_EXPIRY_YMD', 		width:"100px", hidden:true},
                       {editable: false,name:'STOCK_INSP_DETAIL_SEQ', 	width:"100px", hidden:true},
            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var iRow = $pdaStInspHGrid.getGridParam("selrow");
                var rowData = $pdaStInspHGrid.getRowData( iRow );

                fnModify(rowData);
//                App.callBackCasting(rowData);
//                $("#pPdaRoPickSearchRo").popupCallback(rowData);
//                $("#pPdaRoPickSearchRo").paragonClosePopup();
            },
            gridComplete : function(){
            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);


            },
//            onSelectRowEvent: function(currRowData,prevRowData){
//            	$("#pdaStInspTgtLoc").val(currRowData.TGT_LOC);
//            }
    	})
    }

    function fnModify(rowData){
        //실사 제품 상세 팝업.
        PopApp.coreOpenPopup({
            ajaxUrl	: "/pda/ctrl/stock/pdaStInsp/pdaStInspDetailPop",
            data 	: {rowData: rowData},
            id		: "pdaStInspDetailPop",
            domainId: "PWMPDAST103E_P2",
            fullScreen : true,
            onload: function(modal) {
            	App.setElIds();
                modal.show();
            },
            callback	: function(data){
//            	collbackFlag = true;
            	fnSearch();
            }
        });
    }

    //이벤트
    function fnEvents(){

    	//엔터 이벤트
		$('#pdaStInspStInspNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStInspStInspNo').blur();
			}
		});
		$('#pdaStInspItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStInspItemCd').blur();
				fnItemSearch();
			}
		});

		//실사번호 조회 팝업
       	$('#pdaStInspStInspNoBtn').on('click', function(){
       		fnSearch();
		});

       	//실사생성 버튼
       	$('#pdaStMoveInstNewBtn').on('click', function(){
       		fnNew();
		});

       	//존 콤보박스
       	fnZoneInq();

       	//존콤보박스 변경시 조회
       	$('#pdaStInspZoneCd').change(function(){
       		fnSearch();
       	});

       	$('#pdaStInspPltId').keydown(function(e){
       		if(e.keyCode == 13){
       			var barcode = $(this).val();
       			fnPltScan(barcode)
       		}
       	})

    }

    function fnPltScan(barcode){
		var rowData = $pdaStInspHGrid.getRowData();

		if(rowData.length == 0){
			Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다.
			$('#pdaStInspPltId').val('');
			return false;
		}else{
			for(var i = 0; i < rowData.length; i++){

				if(barcode == rowData[i].PLT_ID){
					fnModify(rowData[i]);
					$('#pdaStInspPltId').val('');
					return false;
				}
			}
			Util.alert('MSG_ST_VAL_101', barcode); //재고 목록에 없는 파렛트ID 입니다 [ {0} ]
			$('#pdaStInspPltId').val('');
			return false;
		}
    }

    //실사생성 버튼
    function fnNew(){

		if($('#pdaStInspStInspNo').val() == ''){
//			$('#pdaStInspStInspNo').focus();
			//팝업추가
			Util.alert('MSG_ST_VAL_102'); //재고실사대상을 조회한 후 신규생성을 하십시오.
			return false;
		}

		if($('#pdaStInspItemCd').val() == ''){
			Util.alert('MSG_ST_VAL_103'); //재고실사 신규생성 시 제품코드를 먼저 입력해주세요.
			return false;
		}
		

	        PopApp.coreOpenPopup({
	            ajaxUrl		: "/pda/ctrl/stock/pdaStInsp/pdaStInspNewPop",
	            data 		: sendData(),
	            id			: "pdaStInspNewPop",
	            domainId	: "PWMPDAST103E_P3",
	            fullScreen 	: true,
	            onload		: function(modal) {
//	                // 팝업화면 클릭 시 code, name.
//	                var callBack = {
//	                		"STOCK_INSP_NO" 	:   "pdaStInspStInspNo",
//	                };
//	                App.setElIds(callBack);
	                modal.show();
	            },
                callback	: function(data){
//                	collbackFlag = true;
                	fnSearch();
                }
	        });

    }

    //실사번호 조회 팝업
    function fnSearch(){

    	var stInspNo = $('#pdaStInspStInspNo').val();

   		//실사번호가 없을때
   		if(stInspNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/stock/pdaStInsp/pdaStInspNoInquiryPop",
                id			: "pdaStInspNoInquiryPop",
                domainId	: "PWMPDAST103E_P1",
//                data		: { rowData : rowData },
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                    		"STOCK_INSP_NO" 	:   "pdaStInspStInspNo",
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                //팝업 종료 후 callback 있을때.
                callback : function(){
//                	collbackFlag = true;
                	$('#pdaStInspItemCd').blur();
                	fnGridSearch();
                }
            });
        //실사번호가 있을때,
        //제품코드 유/무 모두
   		}else{
   			fnGridSearch();
   		}

    }

    //제품바코드 조회
    function fnItemSearch(){
    	App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/common/listStInspItem',
    		type 	: "POST",
    		data	: sendData(),
//            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			var dt_grid = data.dt_grid;

    			if(dt_grid.length == 0){

    			}else if(dt_grid.length == 1){
    				$('#pdaProdExamItemCd').val(dt_grid[0].ITEM_CD);
    				fnSearch();
    			}else{
    		        PopApp.coreOpenPopup({
	    	            ajaxUrl 	: '/pda/ctrl/common/pdaItemPop',
	    	            id 			: 'modalItemPopup',
	    	            width 		: '550',
	    	            domainId	: "PWMCM111Q_P1",
	    	            data		: sendData(),
	    	            visible		: true,
	    	            fullScreen 	: true,
	    	            onload 		: function(modal) {
	    	                var callBack ={
	    	                        "ITEM_CD"           : "pdaStInspItemCd"
	    	                };
	    	                App.setElIds(callBack);
	    	                modal.show();
	    	            },
	    	            callback 	: function(data){
	    	            	fnSearch();
	    	            }
	    	        });
    			}
    		}
    	});
    }

    //데이터
    function sendData(){
    	return {
    		proCd		: proCd,
			stInspNo 	: $('#pdaStInspStInspNo').val(),
			zoneCd		: $('#pdaStInspZoneCd option:selected').val(),
			locCd 		: $('#pdaStInspTgtLoc').val(),
			itemCd		: $('#pdaStInspItemCd').val()
    	}
    }

    //그리드 조회
    function fnGridSearch(){
		$pdaStInspHGrid.paragonGridSearch(sendData());
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStInspApp.fnCallbackBarcode",
	});
	PdaStInspApp.init();
});