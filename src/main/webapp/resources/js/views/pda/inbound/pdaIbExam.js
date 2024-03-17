/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고검수[PdaIbExamApp]
 * Program Code     : PWMPDAIB101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaIbExamApp = function () {
	"use strict";

	//그리드
	var $pdaIbExamHGrid = $('#pdaIbExamHGrid');

	//Program Code, Program Name
	var proCd = 'PWMPDAIB101E';
	var proNm = 'pdaIbExam';

	//콜백 플래그
	var collbackFlag = true;

	var workYmd = '';

    return {
        init: function () {

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
    		//입고번호확인
    		if(barcode.length == WMSUtil.barcodeTextLength('IB_NO')){ //10

    			//입고번호 스캔시, 제품코드 삭제
    			$('#pdaIbExamItemCd').val('');
    			$('#pdaIbExamIbNo').val(barcode);

    			fnGridSearch();

			//제품바코드 확인
        	}else if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
    				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
        			||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){

        		//입고번호 있을때만.
        		if($('#pdaIbExamIbNo').val().trim() != ''){
        			collbackFlag = false;
        			$('#pdaIbExamItemCd').val(barcode);
        			fnItemSearch(barcode);
        		}else{

        		}

    		}
    	}
    }

    //그리드 초기화
    function fnList(){
    	$pdaIbExamHGrid.paragonGrid({
            url			: '/pda/ctrl/inbound/pdaIbExam/listPdaIbExamD',
            cellEditable: false,
            sortable	: false,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'CLIENT_CD', 		width:"100px",	align:"center",		hidden:true},
                {editable: false, name:'ITEM_CD', 			width:"100px", 	align:"center"		},
                {editable: false, name:'ITEM_NM', 			width:"150px", 	align:"left"		},
                {editable: false, name:'APPR_QTY', 			width:"80px", 	align:"right", 		formatter:"integer"},
                {editable: false, name:'EXAM_QTY', 			width:"80px", 	align:"right", 		formatter:"integer"},
                {editable: false, name:'IB_NO', 			width:"60px", 	align:"center",		hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ',		width:"60px", 	align:"center",		hidden:true},
                {editable: false, name:'IB_GBN_CD',			width:"60px", 	align:"center",		hidden:true},
                {editable: false, name:'APPR_QTY',			width:"60px", 	align:"center",		hidden:true},

                {editable: false, name:'SUPPLIER_NM', 		width:"50px", 	align:"left", 		hidden:true},
                {editable: false, name:'EXAM_QTY_DETAIL', 	width:"50px", 	align:"right", 		hidden:true},
                {editable: false, name:'UOM', 				width:"50px", 	align:"center",		hidden:true},
                {editable: false, name:'PKQTY', 			width:"50px", 	align:"right", 		hidden:true},
                {editable: false, name:'APPR_BOX_QTY', 		width:"50px", 	align:"right", 		hidden:true},
                {editable: false, name:'APPR_EA_QTY', 		width:"50px", 	align:"right",		hidden:true},
                {editable: false, name:'EXAM_BOX_QTY', 		width:"50px", 	align:"right", 		hidden:true},
                {editable: false, name:'EXAM_EA_QTY', 		width:"50px", 	align:"right", 		hidden:true},
                {editable: false, name:'ITEM_BARCODE', 		width:"50px", 	align:"center", 	hidden:true},
                {editable: false, name:'MAKE_LOT', 			width:"50px", 	align:"center", 	hidden:true},
                {editable: false, name:'ITEM_ST_CD', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'MAKE_YMD', 			width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOT_ATTR1', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOT_ATTR2', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOT_ATTR3', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOT_ATTR4', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOT_ATTR5', 		width:"50px", 	align:"center", 	hidden: true},

                {editable: false, name:'BOX_UOM_CD', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'EA_UOM_CD', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'BOX_UOM_CD', 		width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'EA_UOM_CD', 		width:"50px", 	align:"center", 	hidden: true},

                {editable: false, name:'LARGE_CLASS_CD', 	width:"50px", 	align:"center", 	hidden: true},
                {editable: false, name:'LOCAL_EXPORT_GBN_CD',width:"50px", 	align:"center", 	hidden: true},
                //인터페이스
                {editable: false, name:'DC_CD', 			width:"100px",	align:"center",		hidden:true},
                {editable: false, name:'PO_NO',	 			width:"100px",	align:"center"},


            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaIbExamHGrid.getRowData( iRow );

                fnDeatilPop(rowData);
            },
            gridComplete : function(){
            	//UI 초기화
            	WMSUtil.pwaGridDynamicArea(proNm);

            	//데이터가 있을때, 0번째 데이터를 이용하여 공급처 입력
            	//또, 제품코드 엘리먼트에 데이터가 존재하면, 그리드내 같은 제품을 찾아 위에서 순차적으로 팝업을 연다
            	var rowDatas = $pdaIbExamHGrid.getRowData();
            	if(rowDatas.length > 0){

            		var rowData = rowDatas[0];
            		$('#pdaIbExamSupNm').val(rowData.SUPPLIER_NM);

            		//1.제품코드로 조회했을때
            		//2.조회후 제품코드가 있을때
            		//그리드 내 제품코드를 찾아 상세페이지로이동
            		//검수수량이 승인수량보다 적을때 팝업오픈 : 주석
            		//그리드내 제품코드가 있을때 상세페이지 이동
                	var itemCdValue = $('#pdaIbExamItemCd').val();
                	if(itemCdValue != '' && !collbackFlag){
//                		var selRowData = {};
//                		var selRowValidation = false;
//
//                		for(var i = 0; i < ids.length; i++){
//                			var forRowData = $pdaIbExamHGrid.getRow(ids[i]);
//                			var apprQty = forRowData.APPR_QTY;
//                			var examQty = forRowData.EXAM_QTY;
//
//                			console.log(Number(apprQty))
//                			console.log(Number(examQty))
//
//                			if(Number(apprQty) > Number(examQty)){
//                				selRowData = forRowData;
//                				selRowValidation = true;
//                				break;
//
//                			}
//                		}
//                		if(selRowValidation) fnDeatilPop(selRowData);
                		for(var i = 0; i < rowDatas.length; i++){
                    		rowData = rowDatas[i];
                			if(itemCdValue == rowData.ITEM_CD){
                				fnDeatilPop(rowData);
                    		}
                		}
                	}else{
                	}
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){

    	//작업일자 세팅
    	workYmd = CoreSession.s_workYmd;

		//엔터 이벤트
		$('#pdaIbExamIbNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaIbExamItemCd').val('');
				$('#pdaIbExamIbNo').blur();
				fnGridSearch();
			}
		});
		$('#pdaIbExamItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				collbackFlag = false;
				$('#pdaIbExamItemCd').blur();
//				$('#pdaIbExamIbNoSearchBtn').trigger('click');
				fnItemSearch($('#pdaIbExamItemCd').val());
			}
		})

    	//조회버튼 클릭
    	$('#pdaIbExamIbNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearch();
    	});

    	//선택시 그리드 전체선택(TODO :  수정필요)
    	$('#pdaIbExamAllCheckBtn').click(function(){
    		$('#cb_'+proNm+'HGrid').trigger('click');
    	});

    	//삭제처리
    	$('#pdaIbExamDeleteBtn').click(function(){
    		fnSave('DELETE' , 'MSG_COM_CFM_001'); //삭제하시겠습니까?
    	});

    	//확정처리
    	$('#pdaIbExamConfirmBtn').click(function(){
    		fnSave('CONFIRM', 'MSG_COM_CFM_015'); //확정하시겠습니까?
    	});

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});
    }

    //제품 조회
    function fnItemSearch(barcode){
    	var sendData = {
    			ibNo	: $('#pdaIbExamIbNo').val(),
    			workYmd	: WMSUtil.fnDateSetting.yyyymmdd(workYmd),
    			itemCd	: barcode
		}

    	$.ajax({
    		url			: '/pda/ctrl/common/listIbExamItem',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){
    			var data = data.dt_grid;
    			//입고에 제품이 없음.
    			if(data.length == 0){
        			Util.alert('MSG_INRI_VAL_071'); //검수리스트에 없는 제품입니다.
//    				Util.alert('MSG_INRI_VAL_067'); //입고번호내 존재하지 않는 제품입니다.
    				$('#pdaIbExamItemCd').val('');
    				return false;
				//제품이 1건 있음.
    			}else if(data.length == 1){
    				$('#pdaIbExamItemCd').val(data[0].ITEM_CD);
    				fnGridSearch();
				//제품이 2건이상
    			}else{
    		        PopApp.coreOpenPopup({
    		            ajaxUrl 	: '/pda/ctrl/common/pdaItemPop',
    		            id 			: 'modalItemPopup',
    		            width 		: '550',
    		            domainId	: "PWMCM111Q_P1",
    		            data		: {
    		        		proCd		: proCd,
    		        		ibNo		: $('#pdaIbExamIbNo').val(),
    		        		itemCd		: $('#pdaIbExamItemCd').val(),
    		        		workYmd		: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
    		        		ibProgStCd	: '20'
    		        	},
    		            visible		: true,
    		            fullScreen 	: true,
    		            onload 		: function(modal) {
    		                modal.show();
    		            },
    		            callback 	: function(data){
    		            	$('#pdaIbExamItemCd').val(data.ITEM_CD);
    		            	fnGridSearch();
    		            },
    		            closeEvent	: function(){
    		            	$('#pdaIbExamItemCd').val('');
    		            	fnGridSearch();
    		            }
    		        });
    			}
    		}
    	})
    }

    //데이터
    function sendData(){
    	return {
    		proCd		: proCd,
    		ibNo		: $('#pdaIbExamIbNo').val(),
//    		itemCd		: $('#pdaIbExamItemCd').val(),
    		workYmd		: WMSUtil.fnDateSetting.yyyymmdd(workYmd),
    		ibProgStCd	: '20'
    	}
    }

    //그리드 조회
    function fnGridSearch(){
		$pdaIbExamHGrid.paragonGridSearch(sendData());
    }

    //입고번호 조회
    function fnSearch(){

//		if(ibNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/inbound/pdaIbExam/pdaIbExamNoInquiryPop",
                id			: "pdaIbExamNoInquiryPop",
                domainId	: "PWMPDAIB101E_P1",
                data		: sendData(),
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "IB_NO"			: "pdaIbExamIbNo",
                        "SUPPLIER" 		: "pdaIbExamSupNm"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	collbackFlag = true;
                	fnGridSearch();
                }
            });
//		}else{
//			fnGridSearch();
//		}
	}

    //제품 상세 팝업
    function fnDeatilPop(rowData){
        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/inbound/pdaIbExam/pdaIbExamSavePop",
            data 		: {rowData: rowData},
            id			: "pdaIbExamSavePop",
//            width		: "550",
            domainId	: "PWMPDAIB101E_P2",
            fullScreen 	: true,
            onload		: function(modal) {
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

    //검수처리.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaIbExamHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

    	//DataTable 생성
        var rowData = {
                clientCd	: "CLIENT_CD" ,
                ibNo		: "IB_NO",
                ibDetailSeq	: "IB_DETAIL_SEQ",
                apprQty		: "APPR_QTY",
                examQty		: "EXAM_QTY"
        }

        var jsonData = $pdaIbExamHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);


        //검수수량이 0일 때 확정 불가
        var dt_data = jsonObj.dt_data;
        var examQtyFlag = false;
        for(var i = 0 ; i < dt_data.length; i++){
        	if(dt_data[i].examQty == 0){
        		examQtyFlag = true;
        		Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
        		break;
        	}
        }
        if(examQtyFlag) return false;

        var sendData = {
        		"flag"		: flag,
        		"dt_data" 	: jsonObj.dt_data
        }

        //확정 진행
        if (!confirm((Util.confirm(msgCd)).msgTxt)) return; //삭제하시겠습니까?

        App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/inbound/pdaIbExam/updatePdaIbExam',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success 	: function(data){
    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else if(data.stsCd == 200){
    				alert(data.msgTxt);
    				fnGridSearch();
    			}
    		}
    	})

    }

}();

$(document).ready(function() {
	//Android Barcode Listener
	MobileUtil.getBarcode({
		callback : "PdaIbExamApp.fnCallbackBarcode",
	});

	//ProgramApp
	PdaIbExamApp.init();
});
