/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고처리 - 유통가공 재출력팝업 - 오리온 [PdaStDistManfOFVReprintPopApp]
 * Program Code     : PWMPDAST412Q_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2019. 05. 09.  		First Draft.
 */
var PdaStDistManfOFVReprintPopApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = 'PWMPDAST412Q_P2';
	var proNm = 'pdaStDistManfOFVReprintPop';

	//부모 그리드
	var $pdaStDistManfOFVHGrid = $('#pdaStDistManfOFVHGrid');

	//그리드
	var $pdaStDistManfOFVReprintPopHGrid = $('#pdaStDistManfOFVReprintPopHGrid');

	//
	var getData = $("#pdaStDistManfOFVReprintPop").PopAppGetData();

    return {
        init: function () {

    		fnEvents();

    		fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaStDistManfOFVReprintPopHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaObPickingOFV/listPdaObPickingOFVReprint',
            shrinkToFit 	: false,
            postData		: getData,
            colModel		: [
               {editable: false, name:'CLIENT_CD',      width:"100px", hidden:true},
               {editable: false, name:'MAKE_YMD',       width:"100px", align:"center"},
               {editable: false, name:'PLT_ID',		    width:"120px", align:"center"},
               {editable: false, name:'QTY',		    width:"80px",  align:"right",  formatter:"integer"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStDistManfOFVReprintPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStDistManfOFVReprintPop").popupCallback(rowData);
                $("#pdaStDistManfOFVReprintPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaStDistManfOFVReprintPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaStDistManfOFVReprintPopHGrid.data('loadCount', 1);
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){

    	//삭제 버튼
    	$('#pdaStDistManfOFVDelBtn').click(function(){
    		fnDel();
    	})

    	//재출력 버튼
    	$('#pdaStDistManfOFVReprintBtn').click(function(){
    		fnReprint();
    	})
    }

    //삭제
    function fnDel(){

    	var rowid = $pdaStDistManfOFVReprintPopHGrid.getGridParam('selrow');
    	var rowData = $pdaStDistManfOFVReprintPopHGrid.getRowData(rowid);

    	var sendData = {
			distManfNo	: getData.distManfNo,
//    		pltId		: rowData.PLT_ID,
			itemCd		: getData.itemCd
    	}

    	$.ajax({
    		url			: '/pda/ctrl/stock/pdaStDistManfOFV/updatePdaStDistManfOFVPltDelete',
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
    				$pdaStDistManfOFVReprintPopHGrid.paragonGridReload();

    				//삭제 후 데이터가 0개 이하일 때 팝업 닫기.
    				var ids = $pdaStDistManfOFVReprintPopHGrid.getGridParams('getDataIDs');
    				if(ids.length < 1){
    	                $("#pdaStDistManfOFVReprintPop").popupCallback();
    	                $("#pdaStDistManfOFVReprintPop").coreClosePopup();
    				}
    			}
    		}
    	})
    }

    //재출력
    function fnReprint(){

    	var rowid = $pdaStDistManfOFVReprintPopHGrid.getGridParam('selrow');
    	var rowData = $pdaStDistManfOFVReprintPopHGrid.getRowData(rowid);

    	var sendData = {
			distManfNo	: getData.distManfNo,
			pltId		: rowData.PLT_ID,
			itemCd		: getData.itemCd
    	}


    	$.ajax({
    		url			: '/pda/ctrl/stock/pdaStDistManfOFV/listPdaStDistManfOFVReprint',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				alert(data.msgTxt);
    			}
    		}
    	})
    }

    //그리드 검색.
    function fnGridSearch(){
		$pdaStDistManfOFVReprintPopHGrid.paragonGridSearch(sendData());
    }

    //데이터
//    function sendData(){
//    	return {
//			obYmd 		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStDistManfOFVReprintPopObYmd').val()),
//			obGbnCd 	: $('#pdaStDistManfOFVReprintPopObGbnCd option:selected').val(),
//			obProgStCd 	: getData.obProgStCd
//    	}
//    }
}();

$(document).ready(function() {
	PdaStDistManfOFVReprintPopApp.init();
});