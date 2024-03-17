/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반입검수 - 반입번호조회 [PdaRiExamSearchRiNOApp]
 * Program Code     : PWMPDARI101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 10. 11.  		First Draft.
 */
var pdariExamNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaRiExamNoInquiryPopHGrid = $('#pdaRiExamNoInquiryPopHGrid');

	var getData = $("#pdaRiExamNoInquiryPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRiExamNoInquiryPop';

	var gridGbnCd;

    return {
        init: function () {

    		gridGbnCd = WMSUtil.fnCombo.grid_selectBox('pdaRiExamNoInquiryPopRiGbnCd', 'RI_GBN_CD');

    		getEvents();

    		getList();

	    }
    };

    function getList(){
    	$pdaRiExamNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/returnInbound/pdaRiExam/listPdaRiExamNoInquiryPopNoInquiry',
            shrinkToFit 	: false,
            postData	:
            {
            	riYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaRiExamNoInquiryPopRiYmd').val()), //yyyy-mm-dd -> yyyymmdd
    			riGbnCd : $('#pdaRiExamNoInquiryPopRiGbnCd option:selected').val(),
    			riProgStCd : getData.riProgStCd
        	},
            colModel		: [
                {editable: false, name:'CLIENT_CD', width:"100px", 	hidden:true},
                {editable: false, name:'RI_GBN_CD', width:"100px", 	align:"center", hidden: true},
                {editable: false, name:'RI_GBN', 	width:"100px", 	align:"center",
                	edittype:'select', formatter:'select', editoptions: { value:gridGbnCd }
                },
                {editable: false, name:'RI_NO', 	width:"100px", 	align:"center"},
                {editable: false, name:'STORE_CD', 	width:"150px", 	align:"left", hidden:true},
                {editable: false, name:'STORE_NM', 	width:"130px", 	align:"left"},
                {editable: false, name:'PLAN_QTY', 	width:"80px",	align:"right"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaRiExamNoInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaRiExamNoInquiryPop").popupCallback(rowData);
                $("#pdaRiExamNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaRiExamNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaRiExamNoInquiryPopHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaRiExamNoInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'HGrid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    function getEvents(){

//    	WMSUtil.focusScrollUp('pdaRiExamNoInquiryPopRiYmd');

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaRiExamNoInquiryPopRiYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaRiExamNoInquiryPopRiYmd').datepicker("setDate", new Date());
		}

    	$('#pdaRiExamNoInquiryPopRiYmd').on('changeDate', function(){
    		fnGridSearch();
    	});

    	$('#pdaRiExamNoInquiryPopRiGbnCd').change(function(){
    		fnGridSearch();
    	});
    }

    //그리드 검색.
    function fnGridSearch(){
		var data = {
    			riYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaRiExamNoInquiryPopRiYmd').val()),
    			riGbnCd : $('#pdaRiExamNoInquiryPopRiGbnCd option:selected').val()
    		};
    		$pdaRiExamNoInquiryPopHGrid.paragonGridSearch(data);
    }
}();

$(document).ready(function() {
	pdariExamNoInquiryPopApp.init();
});