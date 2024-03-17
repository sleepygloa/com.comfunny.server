/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고처리 - 유통가공 세트검수 - 오리온 [PdaStDistManfOFVSetExamPopApp]
 * Program Code     : PWMPDAST412Q_P4
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2019. 05. 90.  		First Draft.
 */
var PdaStDistManfOFVSetExamPopApp = function () {
	"use strict";

	//부모 그리드
	var $pdaStDistManfOFVHGrid = $('#pdaStDistManfOFVHGrid');

	//그리드
	var $pdaStDistManfOFVSetExamPopHGrid = $('#pdaStDistManfOFVSetExamPopHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAST412Q_P4';
	var proNm = 'pdaStDistManfOFVSetExamPop';

    return {
        init: function () {

        	fnEvents();

	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    },
	    fnItemSearch : function(barcode){
	    	if($('#pdaStDistManfOFVSetExamPopItemCd').val().trim().length == 0){
	    		fnInit();
	    	}else{
	    		fnInit();

	        	$.ajax({
	        		url		: '/pda/ctrl/common/listProdItem',
	        		type 	: "POST",
	        		data	: JSON.stringify({
	            		proCd		: proCd,
	        			workYmd 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
	        			itemCd 		: barcode
	        		}),
	        		async	: false,
	                contentType: 'application/json; charset=utf-8',
	        		success : function(data){
	        			var dt_grid = data.dt_grid;



	        			//0: 조회된 데이터가 없을때, 입력값들 초기화.
	        			if(dt_grid.length == 0){
	        				Util.alert('MSG_MST_VAL_081'); //제품정보가 없습니다.
	        				fnInit();

	        			//!0: 조회된 데이터가 0건이 아닐때
	        			//생산일자 유/무 개수 파악하여 분기
	        			}else{
	        				var dt = dt_grid[0];
	        			}
	        		}
	        	});
	    	}
	    }
    };


    function fnEvents(){

    	WMSUtil.pwaGridDynamicArea(proNm);

		//엔터 이벤트
		$('#pdaStDistManfOFVSetExamPopItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				PdaStDistManfOFVSetExamPopApp.fnItemSearch($(this).val());
			}
		})

    	//확정 진행
    	$('#pdaStDistManfOFVSetExamPopConfirmBtn').click(function(){
    		fnExam();
    		setTimeout( fnWorkFlagInit , 1000 * 5); // 3초 이후에 run2 함수를 실행
    	})

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});
    }

    //검수작업 초기화
	function fnWorkFlagInit(){
		workFlag = false;
		App.prcsEnd();
	}

    //Init Data, 데이터 초기화
    function fnInit(){
		$('#pdaStDistManfOFVSetExamPopItemCd').val('');
		$('#pdaStDistManfOFVSetExamPopItemNm').val('');
		$('#pdaStDistManfOFVSetExamPopItemNm').text('');
		$('#pdaStDistManfOFVSetExamPopQty').val('');
		$('#pdaStDistManfOFVSetExamPopMakeYmd').val('');
		$('#pdaStDistManfOFVSetExamPopDistExpiryYmd').val('');
    }

    function sendData(){
    	return {
    		proCd		: proCd,
			workYmd 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
			itemCd 		: $('#pdaStDistManfOFVSetExamPopItemCd').val()
    	}
    }

    function fnExam(){
    	App.prcsStart();

    	if(workFlag){
    		return false;
    	}else{
    		workFlag = true;
    	}

//      if (!confirm((Util.confirm('ss')).msgTxt)) return; //삭제하시겠습니까?

		if($('#pdaStDistManfOFVSetExamPopItemCd').val() == ''){
			Util.alert('MSG_MST_VAL_045');
			return false;
		}

		if($('#pdaStDistManfOFVSetExamPopQty').val() == ''){
			Util.alert('MSG_MST_VAL_075'); //수량 항목은 필수 입력입니다.
			return false;
		}

		var sendData = {
				workYmd		 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
				itemCd			: $('#pdaStDistManfOFVSetExamPopItemCd').val(),
				itemNm			: $('#pdaStDistManfOFVSetExamPopItemNm').val(),
				qty				: $('#pdaStDistManfOFVSetExamPopQty').val(),
				uom				: $('#pdaStDistManfOFVSetExamPopUomCd').text(),
				makeYmd			: $('#pdaStDistManfOFVSetExamPopMakeYmd').val(),
				distExpiryYmd	: $('#pdaStDistManfOFVSetExamPopDistExpiryYmd').val(),
		}
		App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaStDistManfOFVSetExamPop/updatepdaStDistManfOFVSetExamPop',
    		type 	: "POST",
    		async	: false,
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			workFlag = false;
    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				alert(data.msgTxt);
    				fnInit();
    			}

    		}, complete	: function(){
    			workFlag = false;
    		}
    	})
    }


}();

$(document).ready(function() {
	PdaStDistManfOFVSetExamPopApp.init();
});
