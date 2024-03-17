/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고분배_분배리스트 [PdaObDivideDetailApp]
 * Program Code     : PWMPDAOB103E_P2
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObDivideDetailApp = function () {
	"use strict";

	//그리드
	var $pdaObDivideListHGrid = $('#pdaObDivideListHGrid');

	var getData = $("#pdaObDivideDetailPop").PopAppGetData().rowData;

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaObDivideList';


    return {
        init: function () {

        	getInfo();

        	getEvents();

        	getList();

	    }
    };

    function getInfo(){
    	$('#pdaObDivideListItemCd').val(getData.ITEM_CD);
    	$('#pdaObDivideListItemNm').val(getData.ITEM_NM);
    }

    function getList(){
    	$pdaObDivideListHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/obDivide/listPdaObDivideD',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
//            multiselect	: true,
            postData	:
            {
            	waveNo	: getData.WAVE_NO,
            	itemCd 	: $('#pdaObDivideListItemCd').val()
        	},
            colModel	: [
                {editable: false, name:'STORE_CD', width:"80px", align:"center"},
                {editable: false, name:'STORE_NM', width:"100px", align:"left"},
                {editable: false, name:'PICK_BOX_QTY', width:"80px", align:"right"},
                {editable: false, name:'PICK_EA_QTY', width:"80px", align:"right"}
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaObDivideListHGrid.getRowData( iRow );
                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#pdaObDivideDetailPop").popupCallback(rowData);
                $("#pdaObDivideDetailPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObDivideListHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaObDivideListWaveNo').focus();
            		$pdaObDivideListHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObDivideListHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');

            	var waveNo = $('#pdaObDivideListWaveNo');
            	if(waveNo.val() != ''){
            		//검색 완료
            		//ITEM_CD  = '' --> focus
            		//ITEM_CD  != '' --> blur
            		var itemCd = $('#pdaObDivideListItemCd');
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

    			if (objId == 'pdaObDivideListWaveNo'){
    				$('#pdaObDivideListWaveNo').blur();
    				$('#pdaObDivideListWaveNoSearchBtn').trigger('click');
    			}
    			else if (objId == 'pdaObDivideListItemCd'){
    				$('#pdaObDivideListItemCd').blur();
    				$('#pdaObDivideListWaveNoSearchBtn').trigger('click');
    			}
    			event.preventDefault();
    			return false;
    		}
    	});

    	//입고번호 [10자리] 일때 검색(blur 키보드 상태가 보일때, 높이를 잘못 인식하는 버그가 있어 blur처리)
    	$('#pdaObDivideListWaveNo').keyup(function(e){

    		var WaveNo = $(this).val();
//    		if(WaveNo.length == WaveNoLength){
//    			$(this).blur();
//        		fnObDivideListSearchNo();
//    		}
    	})

    	$('#pdaObDivideListWaveNoSearchBtn').click(function(){
    		$(this).blur();
    		fnObDivideListSearchNo();
    	});

    }

    function fnGridSearch(){
		var data = {
    			waveNo 	: $('#pdaObDivideListWaveNo').val(),
    			itemCd 	: $('#pdaObDivideListItemCd').val(),
    		};
		$pdaObDivideListHGrid.paragonGridSearch(data);
    }

    function fnObDivideListSearchNo(){

   		var waveNo = $('#pdaObDivideListWaveNo').val();
   		var itemCd = $('#pdaObDivideListItemCd').val();

   		/**
   		 * WAVE_NO == '' --> 팝업
   		 * WAVE_NO != '' --> 그리드 검색.
   		 * */
		if(waveNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/obMain/obTotalPicking/pPdaObTotalPickingSearchWaveNo",
                id			: "pPdaObTotalPickingSearchWaveNo",
                domainId	: "SEARCH_WAVE_NO",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "WAVE_NO"			: "pdaObDivideListWaveNo"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	fnObDivideListSearchNo();
                }
            });
		}else{
			var data = {
					waveNo 	: waveNo,
					itemCd 	: itemCd
			}
			$pdaObDivideListHGrid.paragonGridSearch(data);
		}
	}

}();

$(document).ready(function() {
	PdaObDivideDetailApp.init();
});
