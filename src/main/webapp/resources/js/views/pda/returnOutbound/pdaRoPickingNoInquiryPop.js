/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반출피킹 - 반출번호 조회 [PdaRiPutwApp]
 * Program Code     : PWMPDARO101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 05.  		First Draft.
 */
var PdaRoPickingNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaRoPickingNoInquiryPopHGrid = $('#pdaRoPickingNoInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRoPickingNoInquiryPop';

	//부모에게 전달 받은 데이터
	var getData = $("#pdaRoPickingNoInquiryPop").PopAppGetData();

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaRoPickingNoInquiryPopGbnCd', 'RO_GBN_CD');

        	getEvents();

        	getList();

	    }
    };

    function getEvents(){

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;

		if(workYmd != undefined){
			$('#pdaRoPickingNoInquiryPopRoYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaRoPickingNoInquiryPopRoYmd').datepicker("setDate", new Date());
		}

    	$('#pdaRoPickingNoInquiryPopRoYmd').on('changeDate', function(){
    		fnGridSearch();
    	});

    	$('#pdaRoPickingNoInquiryPopGbnCd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaRoPickingNoInquiryPopBtn').click(function(){
    		fnGridSearch();
    	});

    }

    function getList(){

    	$pdaRoPickingNoInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/returnOutbound/pdaRoPicking/listPdaRoNoInquiry',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            postData	:
            {
            	roPlanYmd: WMSUtil.fnDateSetting.yyyymmdd($('#pdaRoPickingNoInquiryPopRoYmd').val()), //yyyy-mm-dd -> yyyymmdd
    			roGbnCd  : $('#pdaRoPickingNoInquiryPopGbnCd option:selected').val(),
        	},
            colModel	: [
                {editable: false, name:'RO_NO', 		width:"100px", align:"center"},
                {editable: false, name:'SUPPLIER_NM', 	width:"150px", align:"left"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaRoPickingNoInquiryPopHGrid.getRowData(iRow);

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaRoPickingNoInquiryPop").popupCallback(rowData);
                $("#pdaRoPickingNoInquiryPop").coreClosePopup();
            },
            //로딩 중 동적으로 그리드 영역 수정.
            loadComplete : function(){
        		WMSUtil.pwaGridDynamicArea(proNm);
            },
            gridComplete : function(){
            	//caption 총건수
            	/*$('.captionRowCount').remove();
            	var count = $pdaRoPickingNoInquiryPopHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
            }
    	});

    }

    //그리드 검색.
    function fnGridSearch(){

		var data = {
				roPlanYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaRoPickingNoInquiryPopRoYmd').val()),
    			roGbnCd 	: $('#pdaRoPickingNoInquiryPopGbnCd option:selected').val()
    		};

		$pdaRoPickingNoInquiryPopHGrid.paragonGridSearch(data);
    }

}();

$(document).ready(function() {
	PdaRoPickingNoInquiryPopApp.init();
});