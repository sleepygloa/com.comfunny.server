/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹- 출고번호조회-오리온 [PdaObPickingSearchObNoApp]
 * Program Code     : PWMPDAOB201E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 09. 29.  		First Draft.
 */
var pdaObPickingOFVNoInquiryPopApp = function () {
	"use strict";

	//그리드
	var $pdaObPickingOFVNoInquiryPopHGrid = $('#pdaObPickingOFVNoInquiryPopHGrid');

	//
	var getData = $("#pdaObPickingOFVNoInquiryPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB201E_P2';
	var proNm = 'pdaObPickingOFVNoInquiryPop';

	var gridObGbnCd;

    return {
        init: function () {

        	gridObGbnCd	= WMSUtil.fnCombo.grid_selectBox('pdaObPickingOFVNoInquiryPopObGbnCd', 'OB_GBN_CD','','',' ');

    		fnEvents();

    		fnList();

	    }
    };


    //그리드 초기화
    function fnList(){
    	$pdaObPickingOFVNoInquiryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVNoInquiryD',
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
               {editable: false, name:'OB_PLAN_YMD',  	width:"60px",  align:"right", 	hidden:true},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaObPickingOFVNoInquiryPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaObPickingOFVNoInquiryPop").popupCallback(rowData);
                $("#pdaObPickingOFVNoInquiryPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObPickingOFVNoInquiryPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaObPickingOFVNoInquiryPopHGrid.data('loadCount', 1);
            	}
//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObPickingOFVNoInquiryPopHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            }
    	})
    }

    //이벤트
    function fnEvents(){

//    	WMSUtil.focusScrollUp('pdaObPickingOFVNoInquiryPopObYmd');

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaObPickingOFVNoInquiryPopObYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaObPickingOFVNoInquiryPopObYmdDatePicker').datepicker("setDate", new Date());
		}

    	$('#pdaObPickingOFVNoInquiryPopObYmd').change(function(){
    		fnGridSearch();
    	});

    	$('#pdaObPickingOFVNoInquiryPopObGbnCd').change(function(){
    		fnGridSearch();
    	});
    }

    //그리드 검색.
    function fnGridSearch(){
    		$pdaObPickingOFVNoInquiryPopHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
			obYmd 		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingOFVNoInquiryPopObYmd').val()),
			obGbnCd 	: $('#pdaObPickingOFVNoInquiryPopObGbnCd option:selected').val(),
			obProgStCd 	: getData.obProgStCd
    	}
    }
}();

$(document).ready(function() {
	pdaObPickingOFVNoInquiryPopApp.init();
});