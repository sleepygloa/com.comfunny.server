/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고토탈피킹- 웨이브번호조회 [PdaObTotalPickingWaveNoInquiryPopApp]
 * Program Code     : PWMPDAOB102E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 29.  		First Draft.
 */
var PdaObTotalPickingWaveNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaObTotalPickingWaveNoInquiryPopHGrid = $('#pdaObTotalPickingWaveNoInquiryPopHGrid');

	var getData = $("#pdaObTotalPickingWaveNoInquiryPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaObTotalPickingWaveNoInquiryPop';

    return {
        init: function () {

    		getEvents();

    		getList();

	    }
    };

    function getList(){
    	$pdaObTotalPickingWaveNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObTotalPicking/listPdaObTotalPickingWaveNoInquiry',
            shrinkToFit 	: false,
            postData	:
            {
            	waveYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObTotalPickingWaveNoInquiryPopWaveYmd').val()) //yyyy-mm-dd -> yyyymmdd
        	},
            colModel		: [
                {editable: false,name:'WAVE_NO', width:"100px", align:"center"},
                {editable: false,name:'WAVE_STD_NO', width:"100px", align:"center"},
                {editable: false,name:'WAVE_STD_DESC', width:"200px", align:"left"},
                {editable: false,name:'IN_DT', width:"100px", align:"center"}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaObTotalPickingWaveNoInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaObTotalPickingWaveNoInquiryPop").popupCallback(rowData);
                $("#pdaObTotalPickingWaveNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObTotalPickingWaveNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaObTotalPickingWaveNoInquiryPopHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObTotalPickingWaveNoInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    function getEvents(){

//    	WMSUtil.focusScrollUp('pdaObTotalPickingWaveNoInquiryPopWaveYmd');

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaObTotalPickingWaveNoInquiryPopWaveYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaObTotalPickingWaveNoInquiryPopWaveYmd').datepicker("setDate", new Date());
		}

    	$('#pdaObTotalPickingWaveNoInquiryPopWaveYmd').on('changeDate', function(){
    		fnGridSearch();
    	});

    }

    //그리드 검색.
    function fnGridSearch(){
		var data = {
    			waveYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObTotalPickingWaveNoInquiryPopWaveYmd').val())
    		};
    		$pdaObTotalPickingWaveNoInquiryPopHGrid.paragonGridSearch(data);
    }
}();

$(document).ready(function() {
	PdaObTotalPickingWaveNoInquiryPopApp.init();
});