/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고번호조회팝업 [PdaIbExamNoInquiryPopApp]
 * Program Code     : PWMPDAIB101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaIbExamNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaIbExamNoInquiryPopHGrid = $('#pdaIbExamNoInquiryPopHGrid');

	var getData = $("#pdaIbExamNoInquiryPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB101E_P1';
	var proNm = 'pdaIbExamNoInquiryPop';


	var gridIbGbnCd;

    return {
        init: function () {

    		gridIbGbnCd = WMSUtil.fnCombo.grid_selectBox('pdaIbExamNoInquiryPopIbGbnCd', 'IB_GBN_CD');

    		fnEvents();

    		fnList();

	    }
    };

    //이벤트
    function fnEvents(){

//    	WMSUtil.focusScrollUp('pdaIbExamNoInquiryPopIbYmd');

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaIbExamNoInquiryPopIbYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaIbExamNoInquiryPopIbYmdDatePicker').datepicker("setDate", new Date());
		}

		//입고일자 변경시 이벤트
    	$('#pdaIbExamNoInquiryPopIbYmd').on('change', function(){
    		fnGridSearch();
    	});

    	//입고구분 변경시 이벤트
    	$('#pdaIbExamNoInquiryPopIbGbnCd').change(function(){
    		fnGridSearch();
    	});
    }

    //그리드 초기화
    function fnList(){
    	$pdaIbExamNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/inbound/pdaIbExam/listPdaIbNoInquiry',
            shrinkToFit 	: false,
            postData	:
            {
            	ibYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaIbExamNoInquiryPopIbYmd').val()), //yyyy-mm-dd -> yyyymmdd
    			ibGbnCd : $('#pdaIbExamNoInquiryPopIbGbnCd option:selected').val(),
    			ibProgStCd : getData.ibProgStCd
        	},
            colModel		: [
                {editable: false, name:'CLIENT_CD', 	width:"100px", 	hidden:true},
                {editable: false, name:'IB_GBN_CD', 	width:"100px", 	align:"center", hidden: true},
                {editable: false, name:'IB_GBN', 		width:"100px", 	align:"center",
                	edittype:'select', formatter:'select', editoptions: { value:gridIbGbnCd }
                },
                {editable: false, name:'IB_NO', 		width:"100px", 	align:"center"},
                {editable: false, name:'SUPPLIER_CD', 	width:"150px", 	align:"left", hidden:true},
                {editable: false, name:'SUPPLIER', 	width:"130px",	align:"left"},
                {editable: false, name:'APPR_QTY', 		width:"80px", 	align:"right",formatter:"integer"}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaIbExamNoInquiryPopHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaIbExamNoInquiryPop").popupCallback(rowData);
                $("#pdaIbExamNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaIbExamNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaIbExamNoInquiryPopHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaIbExamNoInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }



    //그리드 검색.
    function fnGridSearch(){
		var data = {
    			ibYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaIbExamNoInquiryPopIbYmd').val()),
    			ibGbnCd : $('#pdaIbExamNoInquiryPopIbGbnCd option:selected').val()
    		};
    		$pdaIbExamNoInquiryPopHGrid.paragonGridSearch(data);
    }
}();

$(document).ready(function() {
	PdaIbExamNoInquiryPopApp.init();
});