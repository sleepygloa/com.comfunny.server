/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반입검수 [PdaRiExamApp]
 * Program Code     : PWMPDARI101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaRiExamApp = function () {
	"use strict";

	//그리드
	var $pdaRiExamHGrid = $('#pdaRiExamHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRiExam';

	//반입번호 자릿수
	var riNoLength = 10;

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
    		if($('#pdaRiExamRiNo').val().trim() == ''){
    			$('#pdaRiExamRiNo').val(barcode);
    			$('#pdaRiExamRiNoSearchBtn').trigger('click');
    		}else if($('#pdaRiExamItemCd').val() == ''){
    			$('#pdaRiExamItemCd').val(barcode);
    			$('#pdaRiExamRiNoSearchBtn').trigger('click');
    		}
    	}

    }

    function getList(){
    	$pdaRiExamHGrid.paragonGrid({
            url			: '/pda/ctrl/returnInbound/pdaRiExam/listPdaRiExamD',
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'CLIENT_CD', 		width:"100px", 	align:"center",	hidden:true},
                {editable: false, name:'ITEM_CD', 			width:"100px", 	align:"center"	},
                {editable: false, name:'ITEM_NM', 			width:"150px", 	align:"left"	},
                {editable: false, name:'PLAN_QTY', 			width:"80px", 	align:"right"	},
                {editable: false, name:'EXAM_QTY', 			width:"80px", 	align:"right"	},
                {editable: false, name:'COMPANY_CD', 		width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'DC_CD', 			width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'RI_NO', 			width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'RI_DETAIL_SEQ', 	width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'PLAN_BOX_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'PLAN_EA_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'EXAM_BOX_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'EXAM_EA_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'ITEM_GBN_CD', 		width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'STORE_NM', 			width:"50px", 	align:"left", 	hidden:true},
                {editable: false, name:'EXAM_QTY_DETAIL', 	width:"50px", align:"right", 	hidden:true},
                {editable: false, name:'UOM', 				width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'PKQTY', 			width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'EXAM_BOX_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'EXAM_EA_QTY', 		width:"50px", 	align:"right", 	hidden:true},
                {editable: false, name:'ITEM_BARCODE',		width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'MAKE_LOT', 			width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'ITEM_ST_CD',		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'MAKE_YMD', 			width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOT_ATTR1', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOT_ATTR2', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOT_ATTR3', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOT_ATTR4', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOT_ATTR5', 		width:"50px", 	align:"center", hidden: true},

                {editable: false, name:'BOX_UOM_CD', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'EA_UOM_CD', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'BOX_UOM_CD', 		width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'EA_UOM_CD', 		width:"50px", 	align:"center", hidden: true},

                {editable: false, name:'LARGE_CLASS_CD', 	width:"50px", 	align:"center", hidden: true},
                {editable: false, name:'LOCAL_EXPORT_GBN_CD',width:"50px", 	align:"center", hidden: true},
            ],
            ondblClickRow: function(id, iRow, iCol, e){

            	//선택한 행의 Data
                var rowData = $pdaRiExamHGrid.getRowData( iRow );

                //Paragon Popup.
                fnConfirmPop(rowData);

            },
            gridComplete : function(){

            	//[주석] focus 로직 - 앱 구현으로 바코드 로직 구현됨.
            	//반입번호 유무 --> focus 위치
//            	var riNo = $('#pdaRiExamRiNo');
//            	if(riNo.val() != '' && riNo.val().length == riNoLength){
//            		//검색 완료
//            		//ITEM_CD  = '' --> focus
//            		//ITEM_CD  != '' --> blur
//            		var itemCd = $('#pdaRiExamItemCd');
//            		if(itemCd.val() == ''){
//            			itemCd.focus();
//            		}else{
//            			$(this).blur();
//            		}
//            	}

            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaRiExamHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$('#pdaRiExamRiNo').focus();
            		$pdaRiExamHGrid.data('loadCount', 1);
            	}

            	WMSUtil.pwaGridDynamicArea(proNm);

            	//행 1개 이상 --> 배송처명 입력
            	//			  --> 제품코드 존재시 상세팝업 열기
            	var ids = $pdaRiExamHGrid.jqGrid('getDataIDs');
            	if(ids.length > 0){
            		var rowData = $pdaRiExamHGrid.getRow(ids[0]);
            		$('#pdaRiExamStoreNm').val(rowData.STORE_NM);

                	var itemCdValue = $('#pdaRiExamItemCd').val();
                	if(itemCdValue != '' && !collbackFlag){
                		var selRowData = {};
                		var selRowValidation = false;

                		for(var i = 0; i < ids.length; i++){
                			var forRowData = $pdaRiExamHGrid.getRow(ids[i]);
                			var planQty = forRowData.PLAN_QTY;
                			var examQty = forRowData.EXAM_QTY;

                			if(Number(planQty) > Number(examQty)){
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
    	$('#pdaRiExamRiNoSearchBtn').trigger('click');
    }

    function getEvents(){

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(document).keydown(function(event){
    		if(event.keyCode == 13) {

    			var objId = event.target.id;

    			if (objId == 'pdaRiExamRiNo'){
    				$('#pdaRiExamRiNo').blur();
    				$('#pdaRiExamRiNoSearchBtn').trigger('click');
    			}
    			else if (objId == 'pdaRiExamItemCd'){
    				collbackFlag = false;

    				$('#pdaRiExamItemCd').blur();
    				$('#pdaRiExamRiNoSearchBtn').trigger('click');
    			}
    			event.preventDefault();
    			return false;
    		}
    	});

    	//입고번호 [10자리] 일때 검색(blur 키보드 상태가 보일때, 높이를 잘못 인식하는 버그가 있어 blur처리)
    	$('#pdaRiExamRiNo').keyup(function(e){

    		var riNo = $(this).val();
    		if(riNo.length == riNoLength){
    			$(this).blur();
        		fnSearch();
    		}
    	})

    	$('#pdaRiExamRiNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearch();
    	});

    	//선택시 그리드 전체선택(TODO :  수정필요)
    	$('#pdaRiExamAllCheckBtn').click(function(){
    		$('#cb_'+proNm+'HGrid').trigger('click');
    	});

    	//삭제처리
    	$('#pdaRiExamDeleteBtn').click(function(){
    		fnSave('DELETE' , 'MSG_COM_CFM_001'); //삭제하시겠습니까?
    	});

    	//확정처리
    	$('#pdaRiExamConfirmBtn').click(function(){
    		fnSave('CONFIRM', 'MSG_COM_CFM_015'); //확정하시겠습니까?
    	});

    }

    function fnGridSearch(){
		var data = {
    			riNo 	: $('#pdaRiExamRiNo').val(),
    			itemCd 	: $('#pdaRiExamItemCd').val(),
    		};
		$pdaRiExamHGrid.paragonGridSearch(data);
    }

    function fnSearch(){

   		var riNo 	= $('#pdaRiExamRiNo').val();
   		var itemCd 	= $('#pdaRiExamItemCd').val();

   		/**
   		 * RI_NO == '' --> 팝업
   		 * RI_NO != '' --> 그리드 검색.
   		 * */
		if(riNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/returnInbound/pdaRiExam/pdaRiExamNoInquiryPop",
                id			: "pdaRiExamNoInquiryPop",
                domainId	: "PWMPDARI101E_P1",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "RI_NO"			: "pdaRiExamRiNo",
                        "STORE_NM" 		: "pdaRiExamStoreNm"
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
	};

	function fnConfirmPop(rowData){
        //Paragon Popup.
        PopApp.coreOpenPopup({
            ajaxUrl	: "/pda/ctrl/returnInbound/pdaRiExam/pdaRiExamSavePop",
            data 	: {rowData: rowData},
            id		: "pdaRiExamSavePop",
//            width	: "550",
            domainId: "PWMPDARI101E_P2",
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
	};

    //UPDATE 로직.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaRiExamHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

    	//확정 진행

        var rowData = {
                clientCd	: "CLIENT_CD" ,
                riNo		: "RI_NO",
                riDetailSeq	: "RI_DETAIL_SEQ",
                planQty		: "PLAN_QTY",
                examQty		: "EXAM_QTY"
        }


        var jsonData = $pdaRiExamHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        var dt_data = jsonObj.dt_data;
        var examQtyFlag = false;
        for(var i = 0 ; i < dt_data.length; i++){
        	if(dt_data[i].examQty == 0){
        		examQtyFlag = true;
        		alert('검수수량이 0인 데이터는 수정 할 수 없습니다.')
        		break;
        	}
        }
        if(examQtyFlag) return false;

        var sendData = {
        		"flag"		: flag,
        		"dt_data" 	: jsonObj.dt_data
        }

        if (!confirm((Util.confirm(msgCd)).msgTxt)) return; //삭제하시겠습니까?

    	$.ajax({
    		url		: '/pda/ctrl/returnInbound/pdaRiExam/updatePdaRiExam',
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
		callback : "PdaRiExamApp.fnCallbackBarcode",
	});
	PdaRiExamApp.init();
});
