/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹 [PdaObPickingApp]
 * Program Code     : PWMPDAOB101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObPickingApp = function () {
	"use strict";

	//그리드
	var $pdaObPickingHGrid = $('#pdaObPickingHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB101E';
	var proNm = 'pdaObPicking';

	//CALLBACK Flag
	var callbackFlag = true;

    var gridDalatYn;
    var gridExportCountryCd;

    return {
        init: function () {

            gridDalatYn = WMSUtil.fnCombo.grid('YN');

            gridExportCountryCd = WMSUtil.fnCombo.grid('COUNTRY_CD');

            fnEvents();

            fnList();

	    },
	    //바코드 콜백
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
			result = JSON.parse(result);

			fnBarcode(result);
	    }
    };

    //바코드 콜백
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{

    		//팝업
    		if($('#pdaObPickingDetailPop').length == 1){
    			//파렛트 ID 스캔
        		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
        			PdaObPickingDetailPopApp.barcode.fnSearchPltId(barcode);
//        			$('#pdaObPickingDetailPopPltIdScan').val(barcode);
        			return false;
        		}

        		//LOC 스캔
        		if(barcode.length == WMSUtil.barcodeTextLength('LOC_CD')){

        			//PICK_ZONE_LOC 포커스상태일 때 입력
        			if($('input[id="pdaObPickingDetailPopPickingZoneLocCd"]:focus').length == 1){
        				$('#pdaObPickingDetailPopPickingZoneLocCd').val(barcode);
        				return false;
    				//그외의 상황에서 PICK_LOC 입력
        			}else{
        				PdaObPickingDetailPopApp.barcode.fnSearchLocCd(barcode);
//        				$('#pdaObPickingDetailPopPickingZoneLocCd').val(barcode);
        				return false;
        			}
        		}
    		}

    		//출고번호 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('OB_NO')){
    			$('#pdaObPickingObNo').val(barcode);
    			fnGridSearch();
    			return false;
    		}
    		//파렛트 ID 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    			$('#pdaObPickingPltId').val(barcode);
    			fnSearchPltId();
    			return false;
    		}
    	}

    }

    //그리드 초기화
    function fnList(){
    	$pdaObPickingHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObPicking/listPdaObPickingD',
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
//            multiselect	: true,
            colModel		: [
                {editable: false, name:'INST_LOC_CD', 	width:"80px", 	align:"center"},
                {editable: false, name:'ITEM_CD', 		width:"80px", 	align:"center"},
                {editable: false, name:'ITEM_NM', 		width:"200px", 	align:"left"  },
                {editable: false, name:'INST_QTY', 		width:"60px", 	align:"right",  formatter:"integer"},
                {editable: false, name:'PICK_QTY', 		width:"60px", 	align:"right",  formatter:"integer"},
                {editable: false, name:'PLT_ID', 		width:"120px", 	align:"center"},

                {editable: false, name:'COMPANY_CD',    width:"100px",  align:"center", hidden:true},
                {editable: false, name:'OB_NO',         width:"100px",  align:"center", hidden:true},
                {editable: false, name:'OB_DETAIL_SEQ', width:"100px",  align:"center", hidden:true},
                {editable: false, name:'OB_INST_NO',    width:"100px",  align:"center", hidden:true},
                {editable: false, name:'ITEM_ST_CD',    width:"50px",   align:"center", hidden:true},
                {editable: false, name:'ITEM_ST',       width:"50px",   align:"center", hidden:true},
                {editable: false, name:'UOM',           width:"50px",   align:"center", hidden:true},
                {editable: false, name:'PKQTY',         width:"50px",   align:"center", hidden:true},
                {editable: false, name:'BOX_UOM_CD',    width:"50px",   align:"center", hidden:true},
                {editable: false, name:'EA_UOM_CD',     width:"50px",   align:"center", hidden:true},
                {editable: false, name:'INST_EA_QTY',   width:"50px",   align:"right",  hidden:true},
                {editable: false, name:'PICK_BOX_QTY',  width:"60px",   align:"right", hidden:true},
                {editable: false, name:'INST_BOX_QTY',  width:"60px",   align:"right", hidden:true},
                {editable: false, name:'PICK_EA_QTY',   width:"50px",   align:"right",  hidden:true},
                {editable: false, name:'MAKE_LOT',      width:"150px",  align:"center", hidden:true},
                {editable: false, name:'MAKE_YMD',      width:"100px",  align:"center", hidden:true},
                {editable: false, name:'DIST_EXPIRY_YMD',width:"100px", align:"center", hidden:true},
                {editable: false, name:'LOT_ATTR1',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR2',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR3',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR4',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR5',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'PICK_ZONE_LOC_CD',width:"100px",align:"left",   hidden:true},
                {editable: false, name:'WORK_ST_CD',	width:"100px",	align:"left",   hidden:true},
                {editable: false, name:'STORE_NM',      width:"100px",  align:"left",   hidden:true},
//                {editable: false, name:'PICK_BOX_QTY_D', width:"50px",  align:"right"
////                	,  hidden:true
//                	},
//                {editable: false, name:'PICK_EA_QTY_D',  width:"50px",  align:"right"
////                	,  hidden:true
//                	},
                {editable: false, name:'PICK_YN',  		width:"50px",   align:"right",  hidden:true}
            ],
            ondblClickRow: function(id, iRow, iCol, e){

            	//선택한 행의 Data
                var rowData = $pdaObPickingHGrid.getRowData(iRow);

                //gridComplete랑 중복되는 Check 부분 나중에 function 변경
				if(rowData.WORK_ST_CD == '30'){
					rowData.PICK_YN = 'N';
				}

				if(rowData.WORK_ST_CD == '10'){
					fnConfirmPop(rowData);
				}
            },
            gridComplete : function(){


            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObPickingHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		$pdaObPickingHGrid.data('loadCount', 1);
            		//처음 불러올때 입고번호 포커스
            		//$('#pdaObPickingObNo').focus();
            	}

            	var ids = $pdaObPickingHGrid.jqGrid('getDataIDs');

            	if(ids.length > 0){
            		for (var i = 0; i < ids.length; i++) {
            			//작업상태가 '30' 피킹이고, 지시수량과 피킹수량이 일치 할때 하이라이트를 준다.
     					if( $pdaObPickingHGrid.getRow(ids[i]).WORK_ST_CD == '30') {
     						$pdaObPickingHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.disabled()});

     						//임의의 컬럼 PICK_YN을 피킹 여부의 Flag로 사용하여 피킹 여부 확인
     						$pdaObPickingHGrid.jqGrid('setCell', i+1, 'PICK_YN', 'N');
     					}else{

     						if($pdaObPickingHGrid.getRow(ids[i]).WORK_ST_CD == '20'){
     							$pdaObPickingHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.caution()});
     						}

     						$pdaObPickingHGrid.jqGrid('setCell', i+1, 'PICK_YN', 'Y');
     					}

            		}
            	}

            	if(ids.length > 0){
            		var rowData = $pdaObPickingHGrid.getRow(ids[0]);
            		$('#pdaObPickingStoreNm').val(rowData.STORE_NM);
            	}else{
            		$('#pdaObPickingStoreNm').val('');
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){

		//엔터 이벤트
		$('#pdaObPickingObNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObPickingStoreNm').val('');
				$('#pdaObPickingPltId').val('');
				$('#pdaObPickingObNo').blur();
				fnGridSearch();
			}
		});
		$('#pdaObPickingPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObPickingPltId').blur();
				fnSearchPltId();
			}
		});

		//출고피킹번호 조회 팝업
    	$('#pdaObPickingObNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearchObNo();
    	});

    }

    //그리드 조회
    function fnGridSearch(){
		$pdaObPickingHGrid.paragonGridSearch(sendData());
    }

    //출고번호 조회 팝업
    function fnSearchObNo(){

//   		var obNo = $('#pdaObPickingObNo').val();
//
//		if(obNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/outbound/pdaObPicking/pdaObPickingNoInquiryPop",
                id			: "pdaObPickingNoInquiryPop",
                domainId	: "PWMCM118Q_P1",
                fullScreen 	: true,
                data		: {
                	obProgStCd : "30"
                },
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "OB_NO"		: "pdaObPickingObNo",
                        "STORE_NM" 	: "pdaObPickingStoreNm"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	fnGridSearch();
                }
            });
//		}else{
//			fnGridSearch();
//		}
	}

    //데이터
    function sendData(){
    	return {
    		proCd	: proCd,
			obNo 	: $('#pdaObPickingObNo').val(),
    	}
    }

    //파렛트ID 조회
    function fnSearchPltId(){
    	var pltId = $('#pdaObPickingPltId').val()

    	//파렛트 ID 스캔시 디테일로 갈때 아이디값 비교를 위해 Grid전체 데이터를 담아둔다.
    	var gridData = $pdaObPickingHGrid.getRowData();

		for(var i=0; i < gridData.length; i++ ){
			if(gridData[i].PLT_ID == pltId && gridData[i].WORK_ST_CD == 10){
				fnConfirmPop(gridData[i]);
				return false;
			}
		}

		$('#pdaObPickingPltId').val('');
    }

    //상세팝업
    function fnConfirmPop(rowData){

//console.log('fnConfirmPop',rowData);
		if(rowData.PICK_YN == 'N') return false;

        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/outbound/pdaObPicking/pdaObPickingDetailPop",
            data 		: {
            	rowData: rowData
        	},
            id			: "pdaObPickingDetailPop",
            domainId	: "PWMPDAOB101E_P1",
            fullScreen : true,
            onload: function(modal) {
            	//App.setElIds();
                modal.show();
            },
            //팝업 종료 후 callback 있을때.
            callback : function(){
            	$('#pdaObPickingPltId').val('');
            	fnGridSearch();
            }
        });
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaObPickingApp.fnCallbackBarcode",
	});

	PdaObPickingApp.init();
});
