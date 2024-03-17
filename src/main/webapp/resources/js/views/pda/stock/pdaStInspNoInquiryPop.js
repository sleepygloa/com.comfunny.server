/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고실사 - 번호조회 [PdaStInspNoInquiryPopApp]
 * Program Code     : PWMPDAST103E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 17.  		First Draft.
 */
var PdaStInspNoInquiryPopApp = function () {
	"use strict";



	//그리드
	var $pdaStInspNoInquiryPopHGrid = $('#pdaStInspNoInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAST103E_P1';
	var proNm = 'pdaStInspNoInquiryPop';

	//부모에게 전달 받은 데이터
	//var getData = $("#modalPPdaIbPutwSearchPltId").PopAppGetData();

	var gridStockInspGbn;

    return {
        init: function () {

        	gridStockInspGbn = WMSUtil.fnCombo.grid_selectBox('pdaStInspNoInquiryPopGbnCd', 'STOCK_INSP_GBN_CD');

        	fnEvents();

    		fnList();

	    }
    };

    function fnEvents(){

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;

		if(workYmd != undefined){
			$('#pdaStInspNoInquiryPopYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaStInspNoInquiryPopYmdDatePicker').datepicker("setDate", new Date());
		}

		//작업일자 변경 시 조회
    	$('#pdaStInspNoInquiryPopYmd').on('change', function(){
    		fnGridSearch();
    	});

    	//작업구분 변경시 조회
    	$('#pdaStInspNoInquiryPopGbnCd').change(function(){
    		fnGridSearch();
    	});
    }

    //그리드 조회
    function fnList(){
    	$pdaStInspNoInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStInsp/listStInspNoInquiryPopD',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
//            multiselect	: true,
            postData	: sendData(),
            colModel	: [
                {editable: false, name:'STOCK_INSP_NO',		width:"100px", align:"center"},
                {editable: false, name:'STOCK_INSP_GBN_CD', width:"100px", align:"center", hidden:true},
                {editable: false, name:'STOCK_INSP_GBN', 	width:"150px", align:"center",
                	edittype:'select', formatter:'select', editoptions: { value:gridStockInspGbn }
                },
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStInspNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStInspNoInquiryPop").popupCallback(rowData);
                $("#pdaStInspNoInquiryPop").coreClosePopup();
            },
            //로딩 중 동적으로 그리드 영역 수정.
            loadComplete : function(){
        		WMSUtil.pwaGridDynamicArea(proNm);

            },
            gridComplete : function(){
            	//caption 총건수
            	/*$('.captionRowCount').remove();
            	var count = $pdaStInspNoInquiryPopHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
            }
    	})
    }

    //데이터
    function sendData(){
    	return {
			workYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStInspNoInquiryPopYmd').val()),
			stockInspGbnCd : $('#pdaStInspNoInquiryPopGbnCd option:selected').val()
    	}
    }

    //그리드 검색.
    function fnGridSearch(){
		$pdaStInspNoInquiryPopHGrid.paragonGridSearch(sendData());
    }

}();

$(document).ready(function() {
	PdaStInspNoInquiryPopApp.init();
});