/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고시리얼 [PdaIbSerialApp]
 * Program Code     : PWMPDAIB103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 18.  		First Draft.
 */
var PdaIbSerialApp = function () {
	"use strict";

	//그리드
	var $pdaIbSerialHGrid = $('#pdaIbSerialHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaIbSerial';

	var ibNoLength = 10;

	var callBackData = {};

    return {
        init: function () {

        	fnEvents();

        	fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaIbSerialHGrid.paragonGrid({
            url			: '/pda/ctrl/inbound/pdaIbSerial/listPdaIbSerialD',
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

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaIbSerialHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');

            	var ibNo = $('#pdaIbSerialIbNo');
            	if(ibNo.val() != ''){
            		//검색 완료
            		//ITEM_CD  = '' --> focus
            		//ITEM_CD  != '' --> blur
            		var itemCd = $('#pdaIbSerialItemCd');
            		if(itemCd.val() == ''){
            			itemCd.focus();
            		}else{
            			$(this).blur();
            		}
            	}

            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaIbSerialHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaIbSerialIbNo').focus();
            		$pdaIbSerialHGrid.data('loadCount', 1);
            	}

            }
    	})
    }

    //이벤트
    function fnEvents(){

    	//엔터 이벤트
		$('#pdaIbSerialIbNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbSerialIbNo').blur();
				$('#pdaIbSerialIbNoSearchBtn').trigger('click');
			}
		});
		$('#pdaIbSerialItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbSerialItemCd').blur();
				$('#pdaIbSerialIbNoSearchBtn').trigger('click');
			}
		});
		$('#pdaIbSerialIbSerialNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbSerialIbSerialNo').blur();
				$('#pdaIbSerialIbSerialNoAddBtn').trigger('click');
			}
		})

    	$('#pdaIbSerialExamQty').val(0);
    	$('#pdaIbSerialScanQty').val(0);

    	$('#pdaIbSerialIbNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearch();
    	});

    	$('#pdaIbSerialDeleteBtn').click(function(){
    		var addFlag = $pdaIbSerialHGrid.paragonGridCheckedDeleteData();
    		$('#pdaIbSerialSacnQty').val($pdaIbSerialHGrid.checkedGridCount());
    	});

    	$('#pdaIbSerialSaveBtn').click(function(){
    		fnSave('SAVE', 'MSG_COM_CFM_003'); //저장하시겠습니까?
    	});

    	$('#pdaIbSerialIbSerialNoAddBtn').click(function(){
    		if($('#pdaIbSerialIbSerialNo').val() != ''){
        		var scanQty = $('#pdaIbSerialScanQty').val();
        		var examQty = $('#pdaIbSerialExamQty').val();

        		if(examQty <= scanQty){
        			alert('스캔한 수량이 검수수량을 초과하였습니다.');
        			$('#pdaIbSerialIbSerialNo').val('').focus();
        			return false;
        		}

        		$pdaIbSerialHGrid.paragonGridAddRow({
        			addData : {
        				"SERIAL_ID" 	: $('#pdaIbSerialIbSerialNo').val()
        			}
        		});

        		$('#pdaIbSerialScanQty').val(++scanQty);

        		$('#pdaIbSerialIbSerialNo').val('').focus();
    		}

    	});
    }

    function fnSearch(){

   		var sendData = {
   				ibNo		: $('#pdaIbSerialIbNo').val(),
   				itemCd		: $('#pdaIbSerialItemCd').val(),
   				ibSerialNo	: $('#pdaIbSerialIbSerialNo').val(),
   		};

   		/**
   		 * IB_NO == '' --> 팝업
   		 * IB_NO != '' --> 데이터 수량 체크
   		 * */
		if(sendData.ibNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/inbound/pdaIbExam/pdaIbExamNoInquiryPop",
                id			: "pdaIbExamNoInquiryPop",
                domainId	: "PWMPDAIB101E_P1",
                data		: {
                	ibProgStCd : "30"
                },
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "IB_NO"			: "pdaIbSerialIbNo",
                    };
                    App.setElIds(callBack);
                    modal.show();
                }
                ,callback	: function(data){
                	$('#pdaIbSerialItemCd').focus();
                }
            });
		}else{
			if(sendData.itemCd != ''){
				App.prcsStart();
		    	$.ajax({
		    		url			: '/pda/ctrl/inbound/ibSerial/listPdaIbSerial',
		    		type 		: "POST",
		    		data		: JSON.stringify(sendData),
		            contentType	: 'application/json; charset=utf-8',
		    		success 	: function(data){
		    			var dt_data = data.dt_grid;
		    			if(dt_data.length != 0){
		    				$('#pdaIbSerialExamQty').val(dt_data[0].EXAM_QTY);
		    				callBackData = dt_data[0];
		    			}else{
		    				$('#pdaIbSerialExamQty').val('0');
		    			}
		    		},
		    	})
			}else{
				$('#pdaIbSerialItemCd').focus();
			}
			$pdaIbSerialHGrid.paragonGridSearch();
			$('#pdaibSerialScanQty').val('0');
		}
	}


    //UPDATE 로직.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaIbSerialHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }


        var rowData = {
                serialId	: "SERIAL_ID"
        }

        var jsonData = $pdaIbSerialHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        var sendData = {
        		"flag"			: flag,
        		"ibNo"			: $('#pdaIbSerialIbNo').val(),
        		"ibDetailSeq" 	: callBackData.IB_DETAIL_SEQ,
        		"dt_data" 		: jsonObj.dt_data
        }

        //확정 진행
        if (!confirm((Util.confirm(msgCd)).msgTxt)) return;

        App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaIbSerial/insertPdaIbSerial',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			if(flag == 'CONFIRM'){
    				Util.alert('MSG_COM_SUC_003'); //저장되었습니다.
    			}
    		},
    	})

    }

}();

$(document).ready(function() {
	PdaIbSerialApp.init();
});
