/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고처리 - 유통가공 취소처리 - 오리온 [PdaStDistManfOFVCanclePopApp]
 * Program Code     : PWMPDAST412Q_P3
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 29.  		First Draft.
 */
var PdaStDistManfOFVCanclePopApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = 'PWMPDAST412Q_P3';
	var proNm = 'pdaStDistManfOFVCanclePop';

	//부모 그리드
	var $pdaStDistManfOFVHGrid = $('#pdaStDistManfOFVHGrid');

	//그리드
	var $pdaStDistManfOFVCanclePopHGrid = $('#pdaStDistManfOFVCanclePopHGrid');

	var getData = $("#pdaStDistManfOFVCanclePop").PopAppGetData();

    return {
        init: function () {

    		fnEvents();

    		fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaStDistManfOFVCanclePopHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaObPickingOFV/listPdaObPickingOFVNoInquiryD',
            shrinkToFit 	: false,
            postData		: sendData(),
            colModel		: [
               {editable: false, name:'CLIENT_CD',      width:"100px", hidden:true},
               {editable: false, name:'PLT_ID',         width:"120px", align:"center"},
               {editable: false, name:'OB_QTY',         width:"80px",  align:"right",  formatter:"integer"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStDistManfOFVCanclePopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStDistManfOFVCanclePop").popupCallback(rowData);
                $("#pdaStDistManfOFVCanclePop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaStDistManfOFVCanclePopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaStDistManfOFVCanclePopHGrid.data('loadCount', 1);
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){
    	//취소 버튼
    	$('#pdaStDistManfOFVCanclePopCancleBtn').change(function(){
    		fnCancle();
    	});
    }

    //취소
    function fnCancle(){

    	var rowid = $pdaStDistManfOFVHGrid.getGridParam('selrow');
    	var rowData = $pdaStDistManfOFVHGrid.getRowData(rowid);

    	if(rowid.length == 0){
    		Util.alert(""); //선택된 행이 없습니다.
    		return false;
    	}

    	var sendData = {
			distManfNo	: getData.distManfNo,
    		pltId		: rowData.PLT_ID,
			itemCd		: getData.itemCd
    	}

    	$.ajax({
    		url			: '/pda/ctrl/stock/pdaStDistManfOFV/updatePdaStDistManfOFVCancle',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				//부모 그리드 재조회
    				$pdaStDistManfOFVHGrid.paragonGridReload();

    				//현재 그리드 재조회
    				$pdaStDistManfOFVCanclePopHGrid.paragonGridReload();

    				//삭제 후 데이터가 0개 이하일 때 팝업 닫기.
    				var ids = $pdaStDistManfOFVCanclePopHGrid.getGridParams('getDataIDs');
    				if(ids.length < 1){
    	                $("#pdaStDistManfOFVReprintPop").popupCallback();
    	                $("#pdaStDistManfOFVReprintPop").coreClosePopup();
    				}
    			}
    		}
    	})
    }

    //그리드 검색.
    function fnGridSearch(){
		$pdaStDistManfOFVCanclePopHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
			itemCd 		: $('#pdaStDistManfOFVCanclePopItemCd').val(),
			pltId 		: $('#pdaStDistManfOFVCanclePopPltId').val(),
    	}
    }
}();

$(document).ready(function() {
	PdaStDistManfOFVCanclePopApp.init();
});