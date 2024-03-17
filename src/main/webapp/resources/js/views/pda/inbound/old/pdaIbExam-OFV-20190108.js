/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고검수 [PdaIbExamApp]
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

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaIbExam';

	//입고번호 자릿수
	var ibNoLength = 10;

	//CALLBACK Flag
	var collbackFlag = true;

    return {
        init: function () {

        	getEvents();

        	getList();

	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{
    		if($('#pdaIbExamIbNo').val().trim() == ''){
    			$('#pdaIbExamIbNo').val(barcode);
    			$('#pdaIbExamIbNoSearchBtn').trigger('click');
    		}else if($('#pdaIbExamItemCd').val() == ''){
    			$('#pdaIbExamItemCd').val(barcode);
    			$('#pdaIbExamIbNoSearchBtn').trigger('click');
    		}
    	}
    }

    function getList(){
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
                {editable: false, name:'APPR_QTY', 			width:"60px", 	align:"right"		},
                {editable: false, name:'EXAM_QTY', 			width:"60px", 	align:"right"		},
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


            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaIbExamHGrid.getRowData( iRow );

//                var sendData = {
//                		ibNo		: rowData.IB_NO,
//                		ibDetailSeq : rowData.IB_DETAIL_SEQ,
//                		ibGbnCd		: rowData.IB_GBN_CD,
//                		apprQty		: rowData.APPR_QTY,
//                		examQty		: rowData.EXAM_QTY,
//                		apprBoxQty	: rowData.APPR_BOX_QTY,
//                		apprEaQty	: rowData.APPR_EA_QTY,
//                		itemCd		: rowData.ITEM_CD,
//                		itemNm		: rowData.ITEM_NM,
//                		supplierNm	: rowData.SUPPLIER_NM,
//                		examQtyDetail : rowData.EXAM_QTY_DETAIL,
//                		uom			: rowData.UOM,
//                		pkqty		: rowData.PKQTY,
////                		apprBoxQty	: rowData.APPR_BOX_QTY,
////                		apprEaQty	: rowData.APPR_EA_QTY,
////                		examBoxQty	: rowData.EXAM_BOX_QTY,
////                		examEaQty	: rowData.EXAM_EA_QTY,
//                		itemBarcode : rowData.ITEM_BARCODE,
//                		makeLot		: rowData.MAKE_LOT,
//                		itemStCd	: rowData.ITEM_ST_CD,
//                		makeYmd		: rowData.MAKE_YMD,
//                		boxUomCd    : rowData.BOX_UOM_CD,
//                		eaUomCd     : rowData.EA_UOM_CD,
//                		distExpiryYmd	: rowData.DIST_EXPIRY_YMD
//
//                }

                fnConfirmPop(rowData);
            },
            gridComplete : function(){

            	//[주석] focus 로직 - 앱 구현으로 바코드 로직 구현됨.
            	//입고번호 유무 --> focus 위치
//            	var ibNo = $('#pdaIbExamIbNo');
//            	if(ibNo.val() != '' && ibNo.val().length == ibNoLength){
//            		//검색 완료
//            		//ITEM_CD  = '' --> focus
//            		//ITEM_CD  != '' --> blur
//            		var itemCd = $('#pdaIbExamItemCd');
//            		if(itemCd.val() == ''){
//            			itemCd.focus();
//            		}else{
//            			$(this).blur();
//            		}
//            	}

            	//그리드 로딩 첫번째, 첫번째 아님 유무 --> focus 여부
            	if($pdaIbExamHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaIbExamIbNo').focus();
            		$pdaIbExamHGrid.data('loadCount', 1);
            	}

            	//행 1개 이상 --> 공급처명 입력(0번째 행데이터에 저장된 공급처명)
            	//			  --> 제품코드 조회조건 존재시 상세팝업 열기(order by 에서 IB_NO, IB_DEATIL_SEQ 순으로 ASC 정렬)
            	var ids = $pdaIbExamHGrid.jqGrid('getDataIDs');
            	if(ids.length > 0){
            		var rowData = $pdaIbExamHGrid.getRow(ids[0]);
            		$('#pdaIbExamSupNm').val(rowData.SUPPLIER_NM);

                	var itemCdValue = $('#pdaIbExamItemCd').val();
                	if(itemCdValue != '' && !collbackFlag){
                		var selRowData = {};
                		var selRowValidation = false;

                		for(var i = 0; i < ids.length; i++){
                			var forRowData = $pdaIbExamHGrid.getRow(ids[i]);
                			var apprQty = forRowData.APPR_QTY;
                			var examQty = forRowData.EXAM_QTY;

                			if(Number(apprQty) > Number(examQty)){
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

    function scanBtnClick(){
    	$('#pdaIbExamIbNoSearchBtn').trigger('click');
    }

    function getEvents(){

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(document).keydown(function(event){
    		if(event.keyCode == 13) {

    			var objId = event.target.id;

    			if (objId == 'pdaIbExamIbNo'){
    				$('#pdaIbExamIbNo').blur();
    				$('#pdaIbExamIbNoSearchBtn').trigger('click');
    			}
    			else if (objId == 'pdaIbExamItemCd'){
    				collbackFlag = false;

    				$('#pdaIbExamItemCd').blur();
    				$('#pdaIbExamIbNoSearchBtn').trigger('click');
    			}
    			event.preventDefault();
    			return false;
    		}
    	});


    	//입고번호 [10자리] 일때 검색(blur 키보드 상태가 보일때, 높이를 잘못 인식하는 버그가 있어 blur처리)
    	$('#pdaIbExamIbNo').keyup(function(e){
    		var ibNo = $(this).val();
    		if(ibNo.length == ibNoLength){
    			$(this).blur();
        		fnSearch();
    		}
    	})

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
    }

    function fnGridSearch(){
		var data = {
    			ibNo 	: $('#pdaIbExamIbNo').val(),
    			itemCd 	: $('#pdaIbExamItemCd').val(),
    		};
		$pdaIbExamHGrid.paragonGridSearch(data);
    }

    function fnSearch(){

   		var ibNo 	= $('#pdaIbExamIbNo').val();
   		var itemCd 	= $('#pdaIbExamItemCd').val();

   		/**
   		 * IB_NO == '' --> 팝업
   		 * IB_NO != '' --> 그리드 검색.
   		 * */
		if(ibNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/inbound/pdaIbExam/pdaIbExamNoInquiryPop",
                id			: "pdaIbExamNoInquiryPop",
                domainId	: "PWMPDAIB101E_P1",
                data		: {
                	ibProgStCd : "20"
                },
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "IB_NO"			: "pdaIbExamIbNo",
                        "SUPPLIER_NM" 	: "pdaIbExamSupNm"
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	collbackFlag = true;
                	fnSearch();
                }
            });
		}else{
			fnGridSearch();
		}
	}

    function fnConfirmPop(rowData){
        PopApp.coreOpenPopup({
            ajaxUrl	: "/pda/ctrl/inbound/pdaIbExam/pdaIbExamSavePop",
            data 	: {rowData: rowData},
            id		: "pdaIbExamSavePop",
//            width	: "550",
            domainId: "PWMPDAIB101E_P2",
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
    	var selId = $pdaIbExamHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var rowData = {
                clientCd	: "CLIENT_CD" ,
                ibNo		: "IB_NO",
                ibDetailSeq	: "IB_DETAIL_SEQ",
                apprQty		: "APPR_QTY",
                examQty		: "EXAM_QTY"
        }

        var jsonData = $pdaIbExamHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

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

    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaIbExam/updatePdaIbExam',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
    		async	: false,
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			if(data.stsCd == 200){
    				alert(data.msgTxt);
    			}else if(data.stsCd == 201){
    				alert(data.msgTxt);
    			}
    			fnGridSearch();
    			//App.prcsEnd();
    		},
    		complete : function(data){
    			//App.prcsEnd();
    		}
    	})

    }

}();

$(document).ready(function() {
	MobileUtil.closeApp();
	MobileUtil.getBarcode({
		callback : "PdaIbExamApp.fnCallbackBarcode",
	});
	PdaIbExamApp.init();
});
