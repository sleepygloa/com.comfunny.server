/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고처리 - 유통가공-오리온 [PdaStDistManfOFVNoInquiryApp]
 * Program Code     : PWMPDAST412Q_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 29.  		First Draft.
 */
var PdaStDistManfOFVNoInquiryPopApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = 'PWMPDAST412Q_P1';
	var proNm = 'pdaStDistManfOFVNoInquiryPop';

	//그리드
	var $pdaStDistManfOFVNoInquiryPopHGrid = $('#pdaStDistManfOFVNoInquiryPopHGrid');

	//
	var getData = $("#pdaStDistManfOFVNoInquiryPop").PopAppGetData();


    return {
        init: function () {

    		fnEvents();

    		fnList();

	    }
    };

    //그리드 초기화
    function fnList(){
    	$pdaStDistManfOFVNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStDistManfOFV/listpdaStDistManfOFVNoInquiryD',
            shrinkToFit 	: false,
            postData		: sendData(),
            colModel		: [
               {editable: false, name:'CLIENT_CD',      width:"100px", hidden:true},
               {editable: false, name:'DIST_MANF_NO',   width:"150px", align:"center"},
               {editable: false, name:'ITEM',		    width:"200px", align:"left"},
               {editable: false, name:'QTY',		    width:"80px",  align:"right",  formatter:"integer"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStDistManfOFVNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStDistManfOFVNoInquiryPop").popupCallback(rowData);
                $("#pdaStDistManfOFVNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaStDistManfOFVNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaStDistManfOFVNoInquiryPopHGrid.data('loadCount', 1);
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){


    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaStDistManfOFVNoInquiryPopWorkYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaStDistManfOFVNoInquiryPopWorkYmdDatePicker').datepicker("setDate", new Date());
		}

    	$('#pdaStDistManfOFVNoInquiryPopWorkYmd').change(function(){
    		fnGridSearch();
    	});

    }

    //그리드 검색.
    function fnGridSearch(){
    		$pdaStDistManfOFVNoInquiryPopHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
			workYmd 		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStDistManfOFVNoInquiryPopWorkYmd').val()),
    	}
    }
}();

$(document).ready(function() {
	PdaStDistManfOFVNoInquiryPopApp.init();
});