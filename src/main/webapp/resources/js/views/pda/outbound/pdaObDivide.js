/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고분배 [PdaObDivideApp]
 * Program Code     : PWMPDAOB103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObDivideApp = function () {
	"use strict";

	//그리드
	var $pdaObDivideHGrid = $('#pdaObDivideHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaObDivide';


    return {
        init: function () {

        	getEvents();

        	getList();

	    }
    };

    function getList(){
    	$pdaObDivideHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/pdaObDivide/listPdaWaveNoInquiry',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'ITEM_CD', width:"100px", align:"center"},
                {editable: false, name:'ITEM_NM', width:"150px", align:"left"},
                {editable: false, name:'PICK_BOX_QTY', width:"80px", align:"right"},
                {editable: false, name:'PICK_EA_QTY', width:"80px", align:"right"},
                {editable: false, name:'WAVE_NO', width:"100px", align:"center", hidden:true}
            ],
            ondblClickRow: function(id, iRow, iCol, e){

            	//선택한 행의 Data
                var rowData = $pdaObDivideHGrid.getRowData( iRow );

                //Paragon Popup.
                PopApp.coreOpenPopup({
                    ajaxUrl	: "/pda/ctrl/outbound/pdaObDivide/pdaObDivideDetailPop",
                    data 	: {rowData: rowData},
                    id		: "pdaObDivideDetailPop",
//                    width	: "550",
                    domainId: "PWMPDAOB103E_P2",
                    fullScreen : true,
                    onload: function(modal) {
                    	App.setElIds();
                        modal.show();
                    },
                    //팝업 종료 후 callback 있을때.
                    callback : function(){
                    	fnGridSearch();
                    }
                });
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObDivideHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaObDivideWaveNo').focus();
            		$pdaObDivideHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObDivideHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');

            	var waveNo = $('#pdaObDivideWaveNo');
            	if(waveNo.val() != ''){
            		//검색 완료
            		//ITEM_CD  = '' --> focus
            		//ITEM_CD  != '' --> blur
            		var itemCd = $('#pdaObDivideItemCd');
            		if(itemCd.val() == ''){
            			itemCd.focus();
            		}else{
            			$(this).blur();
            		}
            	}
            }
    	})
    }

    function getEvents(){

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(document).keydown(function(event){
    		if(event.keyCode == 13) {

    			var objId = event.target.id;

    			if (objId == 'pdaObDivideWaveNo'){
    				$('#pdaObDivideWaveNo').blur();
    				$('#pdaObDivideWaveNoSearchBtn').trigger('click');
    			}
    			else if (objId == 'pdaObDivideItemCd'){
    				$('#pdaObDivideItemCd').blur();
    				$('#pdaObDivideWaveNoSearchBtn').trigger('click');
    			}
    			event.preventDefault();
    			return false;
    		}
    	});

    	//입고번호 [10자리] 일때 검색(blur 키보드 상태가 보일때, 높이를 잘못 인식하는 버그가 있어 blur처리)
    	$('#pdaObDivideWaveNo').keyup(function(e){

    		var WaveNo = $(this).val();
//    		if(WaveNo.length == WaveNoLength){
//    			$(this).blur();
//        		fnObDivideSearchNo();
//    		}
    	})

    	$('#pdaObDivideWaveNoSearchBtn').click(function(){
    		$(this).blur();
    		fnObDivideSearchNo();
    	});

    }

    function fnGridSearch(){
		var data = {
    			waveNo 	: $('#pdaObDivideWaveNo').val(),
    			itemCd 	: $('#pdaObDivideItemCd').val(),
    		};
		$pdaObDivideHGrid.paragonGridSearch(data);
    }

    function fnObDivideSearchNo(){

   		var waveNo = $('#pdaObDivideWaveNo').val();
   		var itemCd = $('#pdaObDivideItemCd').val();

   		/**
   		 * WAVE_NO == '' --> 팝업
   		 * WAVE_NO != '' --> 그리드 검색.
   		 * */
		if(waveNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/outbound/pdaObTotalPicking/pdaObTotalPickingWaveNoInquiryPop",
                id			: "pdaObTotalPickingWaveNoInquiryPop",
                domainId	: "PWMPDAOB102E_P1",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "WAVE_NO"			: "pdaObDivideWaveNo"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	fnObDivideSearchNo();
                }
            });
		}else{
			var data = {
					waveNo 	: waveNo,
					itemCd 	: itemCd
			}
			$pdaObDivideHGrid.paragonGridSearch(data);
		}
	}

}();

$(document).ready(function() {
	PdaObDivideApp.init();
});
