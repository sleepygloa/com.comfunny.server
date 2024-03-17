/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고시리얼 [PdaObSerialApp]
 * Program Code     : PWMPDAOB102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 18.  		First Draft.
 */
var PdaObSerialApp = function () {
	"use strict";

	//그리드
	var $pdaObSerialHGrid = $('#pdaObSerialHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaObSerial';

	var obNoLength = 10;

	var callBackData = {};

    return {
        init: function () {

        	getEvents();

        	getList();

	    }
    };


    function getList(){
    	$pdaObSerialHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/obSerial/listPdaObSerial',
            rowEditable	: true,
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            loadui		: 'disable',
            colModel	: [
                {editable: false, name:'SERIAL_ID', width:"150px", align:"center"}
            ],
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObSerialHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');

            	var obNo = $('#pdaObSerialObNo');
            	if(obNo.val() != ''){
            		//검색 완료
            		//ITEM_CD  = '' --> focus
            		//ITEM_CD  != '' --> blur
            		var itemCd = $('#pdaObSerialItemCd');
            		if(itemCd.val() == ''){
            			itemCd.focus();
            		}else{
            			$(this).blur();
            		}
            	}

            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObSerialHGrid.data('loadCount') == 0){
            		//처음 불러올때 입고번호 포커스
            		$('#pdaObSerialObNo').focus();
            		$pdaObSerialHGrid.data('loadCount', 1);
            	}
            }
    	})
    }

    function scanBtnClick(){
    	$('#pdaObSerialObNoSearchBtn').trigger('click');
    }

    function getEvents(){
    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(document).keydown(function(event){
    		if(event.keyCode == 13) {

    			var objId = event.target.id;

    			if (objId == 'pdaObSerialObNo'){
    				$('#pdaObSerialObNo').blur();
    				$('#pdaObSerialObNoSearchBtn').trigger('click');
    			}

    			else if(objId == 'pdaObSerialItemCd'){

//    				if($('#pdaObSerialObSerialNo').val() == ''){
//    					alert('시리얼번호를 먼저 입력해주세요');
//    					$('#pdaObSerialItemCd').val('');
//    					return false;
//    				}
    				$('#pdaObSerialItemCd').blur();
    				$('#pdaObSerialObNoSearchBtn').trigger('click');
    				$('#pdaObSerialObSerialNo').focus();
    			}
    			else if(objId == 'pdaObSerialObSerialNo'){
    				$('#pdaObSerialObSerialNo').blur();
    				$('#pdaObSerialObSerialNoAddBtn').trigger('click');
    				$('#pdaObSerialObSerialNo').focus();
    			}

    			event.preventDefault();
    			return false;
    		}
    	});

    	$('#pdaObSerialPickQty').val(0);
    	$('#pdaObSerialScanQty').val(0);

//    	//입고번호 [10자리] 일때 검색(blur 키보드 상태가 보일때, 높이를 잘못 인식하는 버그가 있어 blur처리)
//    	$('#pdaObSerialObNo').keyup(function(e){
//
//    		var obNo = $(this).val();
//    		if(obNo.length == obNoLength){
//    			$(this).blur();
//    			fnObSerialSearchObNo();
//    		}
//    	})

    	$('#pdaObSerialObNoSearchBtn').click(function(){
    		$(this).blur();
    		fnObSerialSearchObNo();
    	});

    	$('#pdaObSerialDeleteBtn').click(function(){
    		var addFlag = $pdaObSerialHGrid.paragonGridCheckedDeleteData();
    		$('#pdaObSerialScanQty').val($pdaObSerialHGrid.checkedGridCount());
    	});

    	$('#pdaObSerialSaveBtn').click(function(){
    		fnSave('SAVE', 'MSG_COM_CFM_003'); //저장하시겠습니까?
    	});

    	$('#pdaObSerialObSerialNoAddBtn').click(function(){
    		var scanQty = Number($('#pdaObSerialScanQty').val());
    		var pickQty = Number($('#pdaObSerialPickQty').val());

    		if(pickQty <= scanQty){
    			Util.alert('MSG_INRI_VAL_070'); //스캔한 수량이 검수수량을 초과하였습니다.
//    			alert('스캔한 수량이 검수수량을 초과하였습니다.');
    			$('#pdaObSerialObSerialNo').val('').focus();
    			return false;
    		}

    		$pdaObSerialHGrid.paragonGridAddRow({
    			addData : {
    				"SERIAL_ID" 	: $('#pdaObSerialObSerialNo').val()
    			}
    		});

    		$('#pdaObSerialScanQty').val(++scanQty);

    		$('#pdaObSerialObSerialNo').val('').focus();
    	});
    }

    function fnObSerialSearchObNo(){

   		var sendData = {
   				obNo		: $('#pdaObSerialObNo').val(),
   				itemCd		: $('#pdaObSerialItemCd').val(),
   				obSerialNo	: $('#pdaObSerialObSerialNo').val(),
   		};

   		var obNo = $('#pdaObSerialObNo').val();
   		var itemCd = $('#pdaObSerialItemCd').val();
   		var serialNo = $('#pdaObSerialObSerialNo').val();

   		/**
   		 * OB_NO == '' --> 팝업
   		 * OB_NO != '' --> 데이터 수량 체크
   		 * */
		if(obNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/outbound/obPicking/pdaObPickingNoInquiryPop",
                id			: "pdaObPickingNoInquiryPop",
                domainId	: "PWMPDAOB101E_P2",
                fullScreen 	: true,
                data		: {
                	obProgStCd : ''
                },
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "OB_NO"			: "pdaObSerialObNo",
//                        "ITEM_CD"	 	: "pdaObSerialItemCd",
//                        "PICK_QTY"		: "pdaObSerialPickQty"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	$('#pdaObSerialItemCd').focus()
                }
            });
		}else{
			if(sendData.itemCd != ''){
		    	$.ajax({
		    		url			: '/pda/ctrl/outbound/obSerial/listPdaObSerial',
		    		type 		: "POST",
		    		data		: JSON.stringify(sendData),
		    		async		: false,
		            contentType	: 'application/json; charset=utf-8',
		    		success 	: function(data){
		    			var dt_data = data.dt_grid;
		    			if(dt_data.length != 0){
		    				$('#pdaObSerialPickQty').val(dt_data[0].PICK_QTY);
		    				callBackData = dt_data[0];
		    			}else{
		    				$('#pdaObSerialPickQty').val('0');
		    			}
		    		},
		    		complete : function(data){
		    			//App.prcsEnd();
		    		}
		    	})
			}else{
				$('#pdaObSerialItemCd').focus();
			}
			$pdaObSerialHGrid.paragonGridSearch();
			$('#pdaObSerialScanQty').val('0');
		}
	}


    //UPDATE 로직.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaObSerialHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

    	//확정 진행
    	if (!confirm((Util.confirm(msgCd)).msgTxt)) return;

        var rowData = {
        		serialId	: "SERIAL_ID"
        }

        var jsonData = $pdaObSerialHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        var sendData = {
        		"flag"			: flag,
        		"obNo"			: $('#pdaObSerialObNo').val(),
        		"ibDetailSeq" 	: callBackData.OB_DETAIL_SEQ,
        		"dt_data" 		: jsonObj.dt_data
        }

        App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/outbound/obSerial/listPdaObSerial',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			if(flag == 'CONFIRM'){
    				Util.alert('MSG_COM_SUC_003'); //저장되었습니다.
    			}
    		},
    		complete : function(data){
    			//App.prcsEnd();
    		}
    	})

    }

}();

$(document).ready(function() {
	PdaObSerialApp.init();
});
