/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹- 출고번호조회 [PdaObPickingSearchObNoApp]
 * Program Code     : PWMPDAOB101E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 29.  		First Draft.
 */
var pdaObPickingNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaObPickingNoInquiryPopHGrid = $('#pdaObPickingNoInquiryPopHGrid');

	//
	var getData = $("#pdaObPickingNoInquiryPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB101E_P2';
	var proNm = 'pdaObPickingNoInquiryPop';

	var gridObGbnCd;

    return {
        init: function () {

        	gridObGbnCd	= WMSUtil.fnCombo.grid_selectBox('pdaObPickingNoInquiryPopObGbnCd', 'OB_GBN_CD','','',' ');

    		fnEvents();

    		fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaObPickingNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObPicking/listPdaObNoInquiryD',
            shrinkToFit 	: false,
            postData		: sendData(),
            colModel		: [
               {editable: false, name:'CLIENT_CD',      width:"100px", hidden:true},
               {editable: false, name:'OB_GBN_CD',      width:"100px", align:"center", 	hidden: true},
               {editable: false, name:'OB_GBN',         width:"100px", align:"center",
                   edittype:'select', formatter:'select', editoptions: { value:gridObGbnCd }
               },
               {editable: false, name:'STORE_NM',       width:"130px", align:"left"		},
               {editable: false, name:'OB_NO',          width:"100px", align:"center"	},
               {editable: false, name:'STORE_CD',       width:"150px", align:"left", 	hidden:true},
               {editable: false, name:'PICK_QTY',       width:"60px",  align:"right", 	hidden:true},
               {editable: false, name:'OB_DETAIL_SEQ',  width:"60px",  align:"right", 	hidden:true},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaObPickingNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaObPickingNoInquiryPop").popupCallback(rowData);
                $("#pdaObPickingNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObPickingNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaObPickingNoInquiryPopHGrid.data('loadCount', 1);
            	}
//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObPickingNoInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    //이벤트
    function fnEvents(){

//    	WMSUtil.focusScrollUp('pdaObPickingNoInquiryPopObYmd');

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaObPickingNoInquiryPopObYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaObPickingNoInquiryPopObYmdDatePicker').datepicker("setDate", new Date());
		}

    	$('#pdaObPickingNoInquiryPopObYmd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaObPickingNoInquiryPopObGbnCd').change(function(){
    		fnGridSearch();
    	});
    }

    //그리드 검색.
    function fnGridSearch(){
    		$pdaObPickingNoInquiryPopHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
			obYmd 		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingNoInquiryPopObYmd').val()),
			obGbnCd 	: $('#pdaObPickingNoInquiryPopObGbnCd option:selected').val(),
			obProgStCd 	: getData.obProgStCd
    	}
    }
}();

$(document).ready(function() {
	pdaObPickingNoInquiryPopApp.init();
});