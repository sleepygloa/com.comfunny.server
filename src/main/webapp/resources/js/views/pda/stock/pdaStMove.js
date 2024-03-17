/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고이동[PdaStMoveApp]
 * Program Code     : PWMPDAST109E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStMoveApp = function () {
	"use strict";

	var proCd = 'PWMPDAST109E';
	var proNm = 'pdaStMove';

	var frAgingYn = false;
	var toAgingYn = false;

    return {
        init: function () {

        	setUI();

    		fnEvents();

	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    			$('#pdaStMovePltId').val(barcode).blur();
    			fnSearch();
    		}else if(barcode.length <= Number(WMSUtil.barcodeTextLength('LOC_CD'))){
//    		}else{
    			$('#pdaStMoveToLoc').val(barcode).blur();
    			fnSearchToLoc();
//    			$('#pdaStMoveConfirmBtn').trigger('click');
    		}
    	}

    }

    //UI 세팅
    function setUI(){
    	$('#pdaStMoveHeaderGrp').css('height', deviceHeight - 40 - 50);
//    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    //이벤트
    function fnEvents(){

    	//확정 버튼
    	$('#pdaStMoveConfirmBtn').click(function(){
    		fnConfirm();
    	});

    	//조회 버튼
    	$('#pdaStMoveSearchBtn').click(function(){
    		fnSearch();
    	})

    	//엔터 이벤트
		$('#pdaStMovePltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				fnSearch();
				$(this).blur();
			}
		}).keyup(function(){
			if($(this).val().length == WMSUtil.barcodeTextLength('PLT_ID')){
				fnSearch();
				$(this).blur();
			}
		});

		$('#pdaStMoveToLoc').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				fnSearchToLoc();
				$(this).blur();
			}
		});

    }

    //조회
    function fnSearch(){

   		var pltId = $('#pdaStMovePltId').val();

   		$.ajax({
   			url		: '/pda/ctrl/stock/pdaStMove/listPdaStMovePltIdInq',
   			data	: {
   				pltId	: pltId
   			},
   			success	: function(data){
   				var dt_grid = data.dt_grid;

   				//조회된 데이터 없을때.
   				if(dt_grid.length == 0){
   					fnInit();
   					$('#pdaStMoveToLoc').val('');
   				//조회된 데이터 있을때
   				}else if(dt_grid.length == 1){
   					fnPltScanCallback(dt_grid[0]);
   				}else{
   		            PopApp.coreOpenPopup({
   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
   		                id			: "pdaCommPltIdPop",
   		                domainId	: "PWMPDAIB102E_P1",
   		                fullScreen 	: true,
   		                data		: sendData(),
   		                onload		: function(modal) {
   		                    // 팝업화면 클릭 시 code, name.
//   	   		                    var callBack = {
//   	   		                    };
//   	   		                    App.setElIds(callBack);
   		                    modal.show();
   		                },
   		                callback : function (data){

   		                	fnPltScanCallback(data);
   		                }
   		            });
   				}
   			}
   		});
	}

    function fnPltScanCallback(dt){

    	if(dt.AGING_YN == 'Y'){
    		frAgingYn = true;
    	}else{
    		frAgingYn = false;
    	}

//    	if(dt.AGING_YN == 'Y'){
//        	if(!confirm('해당 제품은 숙성 중인 제품입니다. 이동하시겠습니까?')){
//        		$('#pdaStMovePltId').val('');
//        		fnInit();
//        		return false;
//        	}
//    	}

		//TO_LOC 초기화
		$('#pdaStMoveToLoc').val('');

		$('#pdaStMoveItemCd').val(dt.ITEM_CD);
//			$('#pdaStMovePltPkqty').val(dt.PLT_PKQTY);
		$('#pdaStMoveItemNm').val(dt.ITEM_NM);
		$('#pdaStMoveInstBoxQty').val(dt.QTY);
//   		   					$('#pdaStMoveInstEaQty').val(dt.INST_EA_QTY);
		$('#pdaStMoveInstBoxQtyBtn').text(dt.BOX_CD);
//   		   					$('#pdaStMoveInstEaQtyBtn').text(dt.EA_CD);
		$('#pdaStMoveMakeLot').val(dt.MAKE_LOT);
		$('#pdaStMoveMakeYmd').val(dt.MAKE_YMD);
		$('#pdaStMoveDistExpiryYmd').val(dt.DIST_EXPIRY_YMD);
		$('#pdaStMoveLotAttr1').val(dt.LOT_ATTR1);
		$('#pdaStMoveLotAttr2').val(dt.LOT_ATTR2);
		$('#pdaStMoveLotAttr3').val(dt.LOT_ATTR3);
		$('#pdaStMoveFrLoc').val(dt.LOC_CD);


		$('#pdaStMoveMoveLocTypeCd').val(dt.LOC_TYPE_CD);

//				if(dt.MOVE_PROC_NM == 'MV'){
			$('#pdaStMoveMoveProcNm').val(dt.MOVE_PROC_NM);
//				}
    }

    //ToLoc 조회
    function fnSearchToLoc(){

    	var frLoc = $('#pdaStMoveFrLoc').val();
   		var toLoc = $('#pdaStMoveToLoc').val();
   		var locTypeCd =$('#pdaStMoveMoveLocTypeCd').val();

    	if(frLoc == toLoc){
    		Util.alert("MSG_ST_VAL_091"); //FROM 로케이션과 TO 로케이션이 같으면, 재고이동 하실 수 없습니다.
    		$('#pdaStMoveToLoc').val('');
    		return false;
    	}

		$.ajax({
		url		: '/pda/ctrl/stock/pdaStMove/listPdaStMoveToLocZoneInq',
		data	: {
			toLoc		: toLoc,
			itemCd		: $('#pdaStMoveItemCd').val()
		},
		success	: function(data){
			if(data.stsCd == 200){
				if(frAgingYn){
					if(	data.dt_grid[0].AREA_CD != '10'){
			        	if(!confirm((Util.confirm('MSG_ST_VAL_100')).msgTxt)){ //해당 제품은 숙성 중인 제품입니다. 이동하시겠습니까?
			        		//MSG_ST_VAL_100         49004306001035 42000
	//						Util.alert('');
							fnInit();
							$('#pdaStMoveToLoc').val('');
							$('#pdaStMovePltId').val('');

							return false;
			        	}
					}
				}



			}else{
				if(data.stsCd == 100){
					alert(data.msgTxt);
  					$('#pdaStMoveToLoc').val('');
				}
				$('#page-container').scrollTop($(document).height());
				return false;
			}
		}
	});

//    	//OT 존일때 OT존 검사
//    	if(locTypeCd == '2'){
//       		$.ajax({
//       			url		: '/pda/ctrl/stock/pdaStMove/listPdaStMoveToLocInq',
//       			data	: {
//       				frLoc		: frLoc,
//       				toLoc		: toLoc,
//       				locTypeCd	: locTypeCd
//       			},
//       			success	: function(data){
//       				if(data.stsCd == 200){
//       				}else{
//       					if(data.stsCd == 100){
//       						alert(data.msgTxt);
//       	   					$('#pdaStMoveToLoc').val('');
//       					}
//       					$('#page-container').scrollTop($(document).height());
//       					return false;
//       				}
//       			}
//       		});
//    	}


	}

    //확정
    function fnConfirm(){
    	var pltId = $('#pdaStMovePltId').val();
    	var frLoc = $('#pdaStMoveFrLoc').val();
    	var toLoc = $('#pdaStMoveToLoc').val();

    	if(frLoc == toLoc){
    		Util.alert("MSG_ST_VAL_091"); //FROM 로케이션과 TO 로케이션이 같으면, 재고이동 하실 수 없습니다.
    		$('#pdaStMoveToLoc').val('');
    		return false;
    	}


    	var sendData = {
    			pltId 		: pltId,
    			frLoc		: frLoc,
    			toLoc 		: toLoc
    	};

    	App.prcsStart();
   		$.ajax({
   			url		: '/pda/ctrl/stock/pdaStMove/updatePdaStMoveConfirm',
   			data	: sendData,
   			success : function(data){
   				if(data.stsCd == 100){
   					alert(data.msgTxt);
//   					fnInit();
//   					$('#pdaStMovePltId').val('');
   					$('#pdaStMoveToLoc').val('');
   				}else{
   					alert(data.msgTxt);
   					fnInit();
   					$('#pdaStMovePltId').val('');
   					$('#pdaStMoveToLoc').val('');
   				}
   			}
   		});
    }

    //초기화
    function fnInit(){
		$('#pdaStMoveItemCd').val('');
		$('#pdaStMoveItemNm').val('');
		$('#pdaStMoveInstBoxQty').val('');
		$('#pdaStMoveInstEaQty').val('');
		$('#pdaStMoveInstBoxQtyBtn').text('');
		$('#pdaStMoveMakeLot').val('');
		$('#pdaStMoveMakeYmd').val('');
		$('#pdaStMoveDistExpiryYmd').val('');
		$('#pdaStMoveDistExpiryYmd').val('');
		$('#pdaStMoveLotAttr1').val('');
		$('#pdaStMoveLotAttr2').val('');
		$('#pdaStMoveLotAttr3').val('');
		$('#pdaStMoveFrLoc').val('');
		$('#pdaStMoveMoveProcNm').val('');

		$('#pdaStMoveMoveLocTypeCd').val('');

		//최상단으로 이동
		$('#page-container').scrollTop(0);

		frAgingYn = false;
		toAgingYn = false;
    }

    //데이터
    function sendData(){
    	return {
    		proCd	: proCd,
    		pltId	: $('#pdaStMovePltId').val()
    	}
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStMoveApp.fnCallbackBarcode",
	});
	PdaStMoveApp.init();
});