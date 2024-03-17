/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고상차 - 출고상차상세 [PdaObCarLoadingDetailPopApp]
 * Program Code     : PWMPDAOB104E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 10. 08.  		First Draft.
 */
var PdaObCarLoadingDetailPopApp = function () {
	"use strict";

	//그리드
	var $pdaObCarLoadingDetailPopHGrid = $('#pdaObCarLoadingDetailPopHGrid');

	//부모 데이터
	var getData = $("#pdaObCarLoadingDetailPop").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB104E_P1';
	var proNm = 'pdaObCarLoadingDetailPop';
	//협의에 따라 $('#' + proNm + 'id')

	var gRowData = {};
	var saveQtyChk = 'N';

    return {
        init: function () {

        	getInfo();

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

    //정보 불러오기
    function getInfo(){
		$('#pdaObCarLoadingDetailPopObNo').val(getData.OB_NO);
		$('#pdaObCarLoadingDetailPopStoreCd').val(getData.STORE_CD);
		$('#pdaObCarLoadingDetailPopStoreNm').val(getData.STORE_NM);
    };

    //초기화
    function fnInit(){
    	gRowData = {};

   		$('#pdaObCarLoadingDetailPopItemCd').val('');
		$('#pdaObCarLoadingDetailPopItemNm').val('');
   		$('#pdaObCarLoadingDetailPopUom').val('');
		$('#pdaObCarLoadingDetailPopPkqty').val('');
		$('#pdaObCarLoadingDetailPopLoadBoxQty').val('');
		$('#pdaObCarLoadingDetailPopLoadEaQty').val('');
		$('#pdaObCarLoadingDetailPopLoadBoxQtyBtn').text('');
		$('#pdaObCarLoadingDetailPopLoadEaQtyBtn').text('');

    }

    //바코드 콜백
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{

    		//상세팝업 확인


			if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
				||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE'))
			{
					$('#pdaObCarLoadingDetailPopItemCd').val(barcode);
					fnSearchItem(barcode);
			}else{

			}

    		//차량번호 스캔
/*    		$('#pdaObCarLoadingCarNo').val(barcode);
    		fnSearchCarNo();*/
    	}
    }

    function fnSearchItem(barcode){

    	var sendData = {
    			proCd	: 'PWMPDAOB104E_P1', //팝업
    			workYmd	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
    			obNo	: $('#pdaObCarLoadingDetailPopObNo').val(),
    			itemCd	: barcode
		}

    	$.ajax({
    		url			: '/pda/ctrl/common/listCarNoItem',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){
    			var data = data.dt_grid;

    			if(data.length == 0){

					Util.alert('MSG_OUTRI_VAL_082');//상차리스트에 없는 제품입니다.
					$('#pdaObCarLoadingDetailPopItemCd').val('');
    				return false;
    			}else{

//    				//상차완료제품 확인
//    				if(data[0].LOAD_YN == 'Y'){
////    					alert('해당 제품은 상차 완료된 제품입니다.');
//    					Util.alert('MSG_OUTRI_VAL_073'); //해당 제품은 상차 완료된 제품입니다.
//    					return false;
//    				}


					$('#pdaObCarLoadingDetailPopItemCd').val(data[0].ITEM_CD);

					var itemCd = $('#pdaObCarLoadingDetailPopItemCd').val();
					var ids = $pdaObCarLoadingDetailPopHGrid.getDataIDs();
					var rowData = $pdaObCarLoadingDetailPopHGrid.getRowData();

					//제품 스캔시 동일 제품의 P, N 등에 따라 여러 건이 존재 할 때,
					//multiCheck == 같은 제품이 여러건
					//priorityRow == 우선되어야하는 로우, LOAD_YN = N

					for(var i = 0 ; i < rowData.length; i++){
						//모든 로우를 다 흰색으로 바꾸면서, 상차 된 로우는 회색 처리
						$pdaObCarLoadingDetailPopHGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.init() });
        				if($pdaObCarLoadingDetailPopHGrid.getRow(ids[i]).LOAD_YN == 'Y'){
        					$pdaObCarLoadingDetailPopHGrid.setRowData(i+1,false,{background: '#595959'});
        				}
					}

					var multiCheck = 0;
					var priorityRow;
					var loadCnt = 0;
					for(var i = 0 ; i < rowData.length; i++){

						if(rowData[i].ITEM_CD == itemCd){
							if(rowData[i].LOAD_YN == 'N'){
								$pdaObCarLoadingDetailPopHGrid.setRowData(i+1, false, {background: WMSUtil.gridFocus.success()});

								fnClickGridDataSetting(rowData[i]);
								return false;
							}else{
								loadCnt++;
							}
						}

						if(i == rowData.length -1 && loadCnt > 0){
							Util.alert('MSG_OUTRI_VAL_083'); //해당 제품은 모두 상차되었습니다.
							$('#pdaObCarLoadingDetailPopItemCd').val('');
							return false;
						}
					}
				}
    		}
    	})
    }

    //이벤트
    function fnEvents(){

		//엔터 이벤트
		$('#pdaObCarLoadingDetailPopItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObCarLoadingDetailPopItemCd').blur();
				fnSearchItem($('#pdaObCarLoadingDetailPopItemCd').val());
				//PdaObCarLoadingDetailPopApp.barcode.fnSearchItem($(this).val());
			}
		});

		$('#pdaObCarLoadingDetailPopLoadBoxQty').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObCarLoadingDetailPopLoadBoxQty').blur();
			}
		});

		$('#pdaObCarLoadingDetailPopLoadEaQty').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObCarLoadingDetailPopLoadEaQty').blur();
			}
		});

		//저장
    	$('#pdaObCarLoadingDetailPopSaveBtn').click(function(){
        	$('#pdaObCarLoadingDetailPopLoadBoxQty').blur();
        	$('#pdaObCarLoadingDetailPopLoadEaQty').blur();
    		fnSave();
    	});

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});

    	//삭제버튼
    	$('#pdaObCarLoadingDetailPopDelBtn').click(function(){
    		fnDel();
    	});

    	$('#pdaObCarLoadingDetailPopLoadEaQty').change(function(){
    		var pickTotQty = $('#pdaObCarLoadingDetailPopPickTotQty').val();
    		var boxQty = $('#pdaObCarLoadingDetailPopLoadBoxQty').val();
    		var eaQty = $('#pdaObCarLoadingDetailPopLoadEaQty').val();
    		var pkQty = $('#pdaObCarLoadingDetailPopPkqty').val();

/*			if(parseInt(pickTotQty) < parseInt((boxQty*pkQty))+parseInt(eaQty)){
				alert('상차수량은 피킹수량을 초과할 수 없습니다.');
				$('#pdaObCarLoadingDetailPopLoadBoxQty').val(gRowData.BOX_QTY);
				$('#pdaObCarLoadingDetailPopLoadEaQty').val(gRowData.EA_QTY);
			}else{*/
				if(parseInt(eaQty) < 0){
					Util.alert("MSG_COM_VAL_108"); //0 보다 적은 수량을 입력 할 수 없습니다.
//					alert('0 보다 적은 수량은 입력할 수 없습니다.');
					$('#pdaObCarLoadingDetailPopLoadEaQty').val('0');
				}
				if(parseInt(eaQty) > parseInt(pkQty)){
					Util.alert('MSG_COM_VAL_109'); //입수보다 큰 수량은 입력할 수 없습니다.
//					alert('입수보다 큰 수량은 입력할 수 없습니다.');
					//$('#pdaObCarLoadingDetailPopLoadEaQty').val(pkQty);
				}
			//}
    	});

    	$('#pdaObCarLoadingDetailPopLoadBoxQty').change(function(){
    		var pickTotQty = $('#pdaObCarLoadingDetailPopPickTotQty').val();
    		var pickBoxQty = $('#pdaObCarLoadingDetailPopPickBoxQty').val();
    		var boxQty = $('#pdaObCarLoadingDetailPopLoadBoxQty').val();
    		var eaQty = $('#pdaObCarLoadingDetailPopLoadEaQty').val();
    		var pkQty = $('#pdaObCarLoadingDetailPopPkqty').val();


/*			if(parseInt(pickTotQty) < parseInt((boxQty*pkQty))+parseInt(eaQty)){
				alert('===========================');//alert('상차수량은 피킹수량을 초과할 수 없습니다.');
				$('#pdaObCarLoadingDetailPopLoadBoxQty').val(gRowData.BOX_QTY);
				$('#pdaObCarLoadingDetailPopLoadEaQty').val(gRowData.EA_QTY);
			}else{*/
				if(parseInt(boxQty) < 0){
					Util.alert("MSG_COM_VAL_108"); //0 보다 적은 수량을 입력 할 수 없습니다.
//					alert('0 보다 적은 수량은 입력할 수 없습니다.');
					$('#pdaObCarLoadingDetailPopLoadBoxQty').val('0');
				}
				if(parseInt(boxQty) > parseInt(pickBoxQty)){
					Util.alert('MSG_OUTRI_VAL_074'); // 피킹 수량보다 큰 수량을 입력 할 수 없습니다.
//					alert('피킹수량보다 큰 수량은 입력할 수 없습니다.');
					//$('#pdaObCarLoadingDetailPopLoadBoxQty').val(pickBoxQty);
				}
			//}
    	});


    }

   //그리드 초기화
   function fnList(){
    	$pdaObCarLoadingDetailPopHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/obCarLoading/listPdaObCarLoadingDetailPop',
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
    		postData		: sendData(),
            colModel		: [
    		   	{editable: false, name:'PROMOTION_GBN', width:"30px", 	align:"center"},
                {editable: false, name:'ITEM', 			width:"190px", 	align:"left"},
                {editable: false, name:'PICK', 			width:"40px", 	align:"right" , formatter:"integer"},
                {editable: false, name:'LOAD', 			width:"40px", 	align:"right" , formatter:"integer"},
                {editable: false, name:'PROMOTION_GBN_CD', width:"30px", 	align:"center", hidden:true},
                {editable: false, name:'ITEM_CD', 		width:"70px", 	align:"center", hidden:true},
                {editable: false, name:'ITEM_NM', 		width:"220px", 	align:"left",	hidden:true},
                {editable: false, name:'PICK_QTY', 		width:"80px", 	align:"right" , formatter:"integer", hidden:true},
                {editable: false, name:'LOAD_QTY', 		width:"80px", 	align:"right" , formatter:"integer", hidden:true},
                {editable: false, name:'OB_DETAIL_SEQ', width:"150px", 	align:"center", hidden:true},
                {editable: false, name:'OB_NO', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'PICK_EA_QTY', 	width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'UOM', 			width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'PKQTY', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'BOX_QTY', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'EA_QTY', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'BOX_UOM_CD', 	width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'EA_UOM_CD', 	width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'LOAD_YN', 		width:"80px", 	align:"center", hidden:true},
            ],
            gridComplete : function(){

            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);
            	var ids = $pdaObCarLoadingDetailPopHGrid.jqGrid('getDataIDs');

            	if(ids.length > 0){
            		for (var i = 0; i < ids.length; i++) {
        				if($pdaObCarLoadingDetailPopHGrid.getRow(ids[i]).LOAD_YN == 'Y')
        				{
        					$pdaObCarLoadingDetailPopHGrid.setRowData(i+1,false,{background: '#595959'});
        				}
            		}
            	}

            	$('th[id^=pdaObCarLoadingDetailPopHGrid]').css('height', '20px');

            	$('td[aria-describedby^=pdaObCarLoadingDetailPopHGrid_]').css('height', '20px');

            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	//선택한 행 포커스
            	fnClickGridDataSetting(currRowData);
            }
    	})
    }

   //상세
   //그리드 로우 표시
   function fnGridFocus(data){
		var ids = $pdaObCarLoadingDetailPopHGrid.getDataIDs();
		var rowData = $pdaObCarLoadingDetailPopHGrid.getRowData();
		for(var i = 0 ; i < rowData.length; i++){

			//상차 한 데이터와 아닌 데이터 확인하여, 초기화여부 진행
			//상차된 데이터, 색변화없음, 회색
			if(rowData[i].LOAD_YN == 'Y'){
				$pdaObCarLoadingDetailPopHGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.disabled() });
			//피킹, 미상차// 상차해야할 데이터 흰색처리
			}else{
				$pdaObCarLoadingDetailPopHGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.init() });
			}

			//선택한 행 포커스 처리
			if(rowData[i].ITEM_CD == data.ITEM_CD && rowData[i].PROMOTION_GBN == data.PROMOTION_GBN){
				$pdaObCarLoadingDetailPopHGrid.setRowData(ids[i], false, {background: WMSUtil.gridFocus.success()});

		    	//클릭시 로우의 값을 입력 폼에 세팅
		    	fnClickGridDataSetting(rowData[i]);
			}
		}
   }

   //그리드 선택시 데이터 입력
   function fnClickGridDataSetting(rowData){
   		gRowData = rowData;

   		$('#pdaObCarLoadingDetailPopItemCd').val(rowData.ITEM_CD);
   		$('#pdaObCarLoadingDetailPopItemNm').val(rowData.ITEM_NM);
		$('#pdaObCarLoadingDetailPopUom').val(rowData.UOM);
		$('#pdaObCarLoadingDetailPopPkqty').val(rowData.PKQTY);
		$('#pdaObCarLoadingDetailPopLoadBoxQty').val(rowData.BOX_QTY);
		$('#pdaObCarLoadingDetailPopLoadEaQty').val(rowData.EA_QTY);
		$('#pdaObCarLoadingDetailPopLoadBoxQtyBtn').text(rowData.BOX_UOM_CD);
		$('#pdaObCarLoadingDetailPopLoadEaQtyBtn').text(rowData.EA_UOM_CD);

		//상차수량 입력시 Validation Check
		$('#pdaObCarLoadingDetailPopPickBoxQty').val(rowData.PICK_QTY);
		$('#pdaObCarLoadingDetailPopPickTotQty').val(rowData.PICK_QTY * rowData.PKQTY);
   }

   //그리드 조회
    function fnGridSearch(){
    	var sendData = {
    			obNo			:	$('#pdaObCarLoadingDetailPopObNo').val(),
				itemCd			:	$('#pdaObCarLoadingDetailPopItem').val(),
    			//pickZoneLocCd	:	getData.PICK_ZONE_LOC
    	}

    	$pdaObCarLoadingDetailPopHGrid.paragonGridSearch(sendData);
    }

    //저장
    function fnSave(){

    	$('#pdaObCarLoadingDetailPopLoadBoxQty').blur();
    	$('#pdaObCarLoadingDetailPopLoadEaQty').blur();

    	if(gRowData.ITEM_CD == undefined){
    		Util.alert('MSG_COM_VAL_057'); //선택한 행이 없습니다.
    		return false;
    	}

		var pickTotQty = $('#pdaObCarLoadingDetailPopPickTotQty').val();
		var boxQty = $('#pdaObCarLoadingDetailPopLoadBoxQty').val();
		var eaQty = $('#pdaObCarLoadingDetailPopLoadEaQty').val();
		var pkQty = $('#pdaObCarLoadingDetailPopPkqty').val();

		if(parseInt(pickTotQty) < parseInt((boxQty*pkQty))+parseInt(eaQty)){
			return false;
		}else{
			if(!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return false; //저장하시겠습니까?
		}

		var jsonData = {
				obNo		: gRowData.OB_NO,
				obDetailSeq	: gRowData.OB_DETAIL_SEQ,
				loadQty     : Number($('#pdaObCarLoadingDetailPopLoadBoxQty').val()) * Number(gRowData.PKQTY)
					//(Number($('#pdaObCarLoadingDetailPopLoadBoxQty').val()) * Number(gRowData.PKQTY))
				//+ Number($('#pdaObCarLoadingDetailPopLoadEaQty').val())
		}

		App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/outbound/obCarLoading/updateObCarLoadingDetailPop',
    		type 		: "POST",
    		data		: JSON.stringify(jsonData),
            contentType	: 'application/json; charset=utf-8',
    		success 	: function(data){
    			if(data.stsCd == 200){
    				alert(data.msgTxt);

	                var rowData = $pdaObCarLoadingDetailPopHGrid.getRowData();

	                //제품rowData 0건이면 popup닫음
	                if (rowData.length == 0) {

	                  $("#pdaObCarLoadingDetailPop").popupCallback();
	                  $("#pdaObCarLoadingDetailPop").coreClosePopup();

	                }else{
	                	//저장할 출고상차상세 목록이 있을때 초기화,재검색
	                	fnInit();
	                    fnGridSearch();
	                }

    			}else{
    				alert(data.msgTxt);
    				return false;
    			}
    		},
    		complete : function(data){
    		        fnGridSearch();
    		}
    	});
    }

    //데이터
    function sendData(){
    	return {
			proCd	: proCd,
			workYmd	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
    		obNo 	: $('#pdaObCarLoadingDetailPopObNo').val()
    	}
    }

    //삭제
    function fnDel(){

    	var ids = $pdaObCarLoadingDetailPopHGrid.jqGrid('getGridParam', 'selrow');

    	if(ids == null){
            Util.alert('MSG_COM_VAL_057'); //선택한 행이 없습니다.
    		return false;
    	}

    	var rowData = $pdaObCarLoadingDetailPopHGrid.getRowData(ids);
    	if(rowData.LOAD_QTY == 0){
//    		alert('상차하지 않은 제품입니다.');
    		Util.alert('MSG_OUTRI_VAL_075'); //상차된 제품만 삭제 하실 수 있습니다.
    		return false;
    	}

    	var jsonData = {
    			obNo	: $('#pdaObCarLoadingDetailPopObNo').val(),
    			itemCd 	: $('#pdaObCarLoadingDetailPopItemCd').val(),
    			userCol1	: rowData.PROMOTION_GBN_CD
    	}

		App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/outbound/obCarLoading/updateObCarLoadingDetailPopDelete',
    		type 		: "POST",
    		data		: JSON.stringify(jsonData),
            contentType	: 'application/json; charset=utf-8',
    		success 	: function(data){
    			console.log(data)
    			if(data.stsCd == 200){
    				alert(data.msgTxt);
                	//저장할 출고상차상세 목록이 있을때 초기화,재검색
                	fnInit();
                    fnGridSearch();
                    $('#pdaObCarLoadingHGrid').paragonGridReload();
    			}else{
    				alert(data.msgTxt);
    				return false;
    			}
    		},
    	});
    }

}();

$(document).ready(function() {

	MobileUtil.getBarcode({
		callback : "PdaObCarLoadingDetailPopApp.fnCallbackBarcode",
	});

	PdaObCarLoadingDetailPopApp.init();
});

