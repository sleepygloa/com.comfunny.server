/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고토탈피킹 [PdaObTotalPickingApp]
 * Program Code     : PWMPDAOB102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObTotalPickingApp = function () {
	"use strict";

	//그리드
	var $pdaObTotalPickingHGrid = $('#pdaObTotalPickingHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB102E';
	var proNm = 'pdaObTotalPicking';

	//CALLBACK Flag
	var collbackFlag = true;

    return {
        init: function () {

        	getEvents();

        	getList();

	    }
    };

    function getList(){
    	$pdaObTotalPickingHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/pdaObTotalPicking/listPdaObTotalPickingD',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                   {editable: false, name:'WAVE_NO', 		width:"100px", align:"center", hidden:true},
                   {editable: false, name:'INST_LOC_CD', 	width:"100px", align:"center"},
                   {editable: false, name:'ITEM_CD', 		width:"100px", align:"center"},
                   {editable: false, name:'ITEM_NM', 		width:"150px", align:"left"},
                   {editable: false, name:'INST_QTY', 		width:"60px",  align:"right"},
                   {editable: false, name:'PICK_QTY', 		width:"60px",  align:"right"},
                   {editable: false, name:'PLT_ID', 		width:"150px", align:"center"},
                   {editable: false, name:'COMPANY_CD', 	width:"100px", align:"center", hidden:true},
                   {editable: false, name:'OB_NO', 			width:"100px", align:"center", hidden:true},
                   {editable: false, name:'OB_DETAIL_SEQ', 	width:"100px", align:"center", hidden:true},
                   {editable: false, name:'OB_INST_NO', 	width:"100px", align:"center", hidden:true},
                   {editable: false, name:'ITEM_ST_CD',		width:"50px",  align:"center", hidden:true},
                   {editable: false, name:'ITEM_ST', 		width:"50px",  align:"center", hidden:true},
                   {editable: false, name:'UOM', 			width:"50px",  align:"center", hidden:true},
                   {editable: false, name:'PKQTY', 			width:"50px",  align:"center", hidden:true},
                   {editable: false, name:'INST_BOX_QTY', 	width:"50px",  align:"right", hidden:true},
                   {editable: false, name:'INST_EA_QTY', 	width:"50px",  align:"right", hidden:true},
                   {editable: false, name:'MAKE_LOT', 		width:"150px", align:"center", hidden:true},
                   {editable: false, name:'MAKE_YMD', 		width:"100px", align:"center", hidden:true},
                   {editable: false, name:'DIST_EXPIRY_YMD', width:"100px", align:"center", hidden:true},
                   {editable: false, name:'LOT_ATTR1', 		width:"100px", align:"left", hidden:true},
                   {editable: false, name:'LOT_ATTR2', 		width:"100px", align:"left", hidden:true},
                   {editable: false, name:'LOT_ATTR3', 		width:"100px", align:"left", hidden:true},
                   {editable: false, name:'LOT_ATTR4', 		width:"100px", align:"left", hidden:true},
                   {editable: false, name:'LOT_ATTR5', 		width:"100px", align:"left", hidden:true},
                   {editable: false, name:'LOT_ID', 		width:"100px", align:"left", hidden:true}
            ],
            ondblClickRow: function(id, iRow, iCol, e){

            	//선택한 행의 Data
                var rowData = $pdaObTotalPickingHGrid.getRowData( iRow );

                fnConfirmPop(rowData);

            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObTotalPickingHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaObTotalPickingObNo').focus();
            		$pdaObTotalPickingHGrid.data('loadCount', 1);
            	}

//            	//caption 총건수
//            	$('.captionRowCount').remove();
//            	var count = $pdaObTotalPickingHGrid.getGridParam("records");
//            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');

            	var waveNo = $('#pdaObTotalPickingWaveNo');
            	if(waveNo.val() != ''){
            		//검색 완료
            		//ITEM_CD  = '' --> focus
            		//ITEM_CD  != '' --> blur
            		var itemCd = $('#pdaObTotalPickingItemCd');
            		if(itemCd.val() == ''){
            			itemCd.focus();
            		}else{
            			$(this).blur();
            		}
            	}


            	//행 1개 이상 --> 제품코드 존재시 상세팝업 열기
            	var ids = $pdaObTotalPickingHGrid.jqGrid('getDataIDs');
            	if(ids.length > 0){

                	var itemCdValue = $('#pdaObTotalPickingItemCd').val();
                	if(itemCdValue != '' && !collbackFlag){
                		var selRowData = {};
                		var selRowValidation = false;

                		for(var i = 0; i < ids.length; i++){
                			var forRowData = $pdaObTotalPickingHGrid.getRow(ids[i]);
                			var itemCd = forRowData.ITEM_CD;

                			if(itemCdValue == itemCd){
                				selRowData = forRowData;
                				selRowValidation = true;
                				break;

                			}
                		}
                		if(selRowValidation) fnConfirmPop(selRowData);
                	}else{
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

    			if (objId == 'pdaObTotalPickingWaveNo'){
    				$('#pdaObTotalPickingWaveNo').blur();
    				$('#pdaObTotalPickingWaveNoSearchBtn').trigger('click');
    			}
    			else if (objId == 'pdaObTotalPickingItemCd'){
    				collbackFlag = false;

    				$('#pdaObTotalPickingItemCd').blur();
    				$('#pdaObTotalPickingWaveNoSearchBtn').trigger('click');
    			}
    			event.preventDefault();
    			return false;
    		}
    	});

    	//처음 불러올때 입고번호 포커스
    	$('#pdaObTotalPickingWaveNo').focus();

    	$('#pdaObTotalPickingWaveNoSearchBtn').click(function(){
    		$(this).blur();
    		fnObTotalPickingSearchNo();
    	});

    	$('#pdaObTotalPickingDivideBtn').click(function(){
    		fnSave('DIVIDE', 'MSG_COM_CFM_017'); //분배하시겠습니까?
    	});
    }

    function fnGridSearch(){
		var data = {
    			waveNo 	: $('#pdaObTotalPickingWaveNo').val(),
    			itemCd 	: $('#pdaObTotalPickingItemCd').val(),
    		};
		$pdaObTotalPickingHGrid.paragonGridSearch(data);
    }

    function fnObTotalPickingSearchNo(){

   		var waveNo = $('#pdaObTotalPickingWaveNo').val();
   		var itemCd = $('#pdaObTotalPickingItemCd').val();

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
                        "WAVE_NO"			: "pdaObTotalPickingWaveNo"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	collbackFlag = true;
                	fnObTotalPickingSearchNo();
                }
            });
		}else{
			fnGridSearch();
		}
	}

    function fnConfirmPop(rowData){
        PopApp.coreOpenPopup({
            ajaxUrl	: "/pda/ctrl/outbound/pdaObTotalPicking/pdaObTotalPickingDetailPop",
            data 	: {rowData: rowData},
            id		: "pdaObTotalPickingDetailPop",
//            width	: "550",
            domainId: "PWMPDAOB102E_P2",
            fullScreen : true,
            onload: function(modal) {
            	App.setElIds();
                modal.show();
            },
            //팝업 종료 후 callback 있을때.
            callback : function(){
            	collbackFlag = true;
            	fnGridSearch();
            }
        });
    }

    //UPDATE 로직.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaObTotalPickingHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var rowData = {
                instLocCd	: "INST_LOC_CD",
                itemCd		: "ITEM_CD",
                pickQty		: "PICK_QTY",
                pltId		: "PLT_ID"
        }

        var jsonData = $pdaObTotalPickingHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        var sendData = {
        		"flag"		: flag,
        		"dt_data" 	: jsonObj.dt_data
        }

    }

}();

$(document).ready(function() {
	PdaObTotalPickingApp.init();
});
