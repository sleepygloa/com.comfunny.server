/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 지시이동 - 이동번호조회 [PdaStMoveInstNoInquiryPopApp]
 * Program Code     : PWMPDAST101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 05.  		First Draft.
 */
var PdaStMoveInstNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaStMoveInstNoInquiryPopHGrid = $('#pdaStMoveInstNoInquiryPopHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStMoveInstNoInquiryPop';

	//부모에게 전달 받은 데이터
	//var getData = $("#modalPPdaIbPutwSearchPltId").PopAppGetData();

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaStMoveInstNoInquiryPopGbnCd', 'MOVE_GBN_CD');

        	getEvents();

    		getList();

	    }
    };


    function getEvents(){

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;

		if(workYmd != undefined){
			$('#pdaStMoveInstNoInquiryPopYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaStMoveInstNoInquiryPopYmd').datepicker("setDate", new Date());
		}

    	$('#pdaStMoveInstNoInquiryPopYmd').on('changeDate', function(){
    		fnGridSearch();
    	});

    	$('#pdaStMoveInstNoInquiryPopGbnCd').change(function(){
    		fnGridSearch();
    	});

    }

    function getList(){
    	$pdaStMoveInstNoInquiryPopHGrid.paragonGrid({
            url			: '/pda/ctrl/stock/pdaStMoveInst/listPdaStMoveNoInquiry',
            cellEditable: true,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            postData	:
            {
            	workYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStMoveInstNoInquiryPopYmd').val()),
            	moveGbnCd : 	$('#pdaStMoveInstNoInquiryPopGbnCd option:selected').val(),
        	},
            multiselect	: true,
            colModel	: [
                {editable: false, name:'STOCK_MOVE_GBN', width:"150px", align:"left"},
                {editable: false, name:'STOCK_MOVE_NO',  width:"150px", align:"center"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaStMoveInstNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaStMoveInstNoInquiryPop").popupCallback(rowData);
                $("#pdaStMoveInstNoInquiryPop").coreClosePopup();
            },
            //로딩 중 동적으로 그리드 영역 수정.
            loadComplete : function(){
        		WMSUtil.pwaGridDynamicArea(proNm);

            },
            gridComplete : function(){
            	//caption 총건수
            /*	$('.captionRowCount').remove();
            	var count = $pdaStMoveInstNoInquiryPopHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
            }
    	})
    }

    //그리드 검색.
    function fnGridSearch(){
		var data = {
				workYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaStMoveInstNoInquiryPopYmd').val()),
				moveGbnCd : $('#pdaStMoveInstNoInquiryPopGbnCd option:selected').val(),
    		};

			$pdaStMoveInstNoInquiryPopHGrid.paragonGridSearch(data);
    }

}();

$(document).ready(function() {
	PdaStMoveInstNoInquiryPopApp.init();
});