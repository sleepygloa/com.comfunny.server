/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고상태변경 - 재고번호조회 [pdaStStateChangeNoInquiryPopApp]
 * Program Code     : PWMPDARO102EP
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 17.  		First Draft.
 */
var pdaStStateChangeNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaStStateChangeNoInquiryPopHGrid = $('#pdaStStateChangeNoInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStStateChangeNoInquiryPop';

	//부모에게 전달 받은 데이터
	//var getData = $("#modalPPdaIbPutwSearchPltId").PopAppGetData();

    return {
        init: function () {

        	setUI();
        	//WMSUtil.fnCombo.selectBox('pPdaStInspNoGbnCd', 'STOCK_INSP_GBN_CD');

        	getEvents();

        	getList();

	    }
    };

    function setUI(){
    	$('.modal-body').css('height', modalDeviceHeight+'px');
    }

    function getEvents(){

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;

		if(workYmd != undefined){
			$('#pdaStStateChangeNoInquiryPopYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaStStateChangeNoInquiryPopYmd').datepicker("setDate", new Date());
		}

    	$('#pdaStStateChangeNoInquiryPopYmd').on('changeDate', function(){
    		fnGridSearch();
    	});

/*    	$('#pPdaStInspNoGbnCd').change(function(){
    		fnGridSearch();
    	});*/

    }

    function getList(){
    	$pdaStStateChangeNoInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStStateChange/listPdaStStateChangeNoInquiryPopD',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            postData	:
            {
            	workYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStStateChangeNoInquiryPopYmd').val()),
            	/*stockInspGbnCd : 	$('#pPdaStInspNoGbnCd option:selected').val(),*/
        	},
            colModel	: [
                {editable: false, name:'ITEM_ST_CHG_NO', width:"150px", align:"center"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStStateChangeNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStStateChangeNoInquiryPop").popupCallback(rowData);
                $("#pdaStStateChangeNoInquiryPop").coreClosePopup();
            },
            //로딩 중 동적으로 그리드 영역 수정.
            loadComplete : function(){
        		WMSUtil.pwaGridDynamicArea(proNm);

            },
            gridComplete : function(){
            	//caption 총건수
            	/*$('.captionRowCount').remove();
            	var count = $pdaStStateChangeNoInquiryPopHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
            }
    	})
    }

    //그리드 검색.
    function fnGridSearch(){
		var data = {
				workYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStStateChangeNoInquiryPopYmd').val()),
//				stockInspGbnCd : $('#pPdaStInspNoGbnCd option:selected').val(),
    		};

		$pdaStStateChangeNoInquiryPopHGrid.paragonGridSearch(data);
    }

}();

$(document).ready(function() {
	pdaStStateChangeNoInquiryPopApp.init();
});