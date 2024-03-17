/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹-오리온 [PdaObPickingApp]
 * Program Code     : PWMPDAOB201E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObPickingApp = function () {
	"use strict";

	//그리드
	var $pdaObPickingOFVHGrid = $('#pdaObPickingOFVHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB201E';
	var proNm = 'pdaObPickingOFV';

	//CALLBACK Flag
	var callbackFlag = true;

    var gridDalatYn;
    var gridExportCountryCd;

    var workYmd = '';
    var callbackData;
    var callbackLocCd;
    var gridObProgStCd;
    var callbackObGbnCd = '';

    return {
        init: function () {

            gridDalatYn = WMSUtil.fnCombo.grid('YN');

            gridExportCountryCd = WMSUtil.fnCombo.grid('COUNTRY_CD');

            gridObProgStCd      = WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

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
    		if($('#pdaObPickingOFVDetailPop').length == 1){
    			//파렛트 ID 스캔
        		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
//        			Util.alert('MSG_OUTRI_VAL_071'); //이전화면으로 돌아가서 다시 작업하십시요.

        			PdaObPickingDetailPopApp.barcode.fnSearchPltId(barcode);
//        			$('#pdaObPickingOFVDetailPopPltIdScan').val(barcode);
        			return false;
        		}

        		//LOC 스캔
        		if(barcode.length == WMSUtil.barcodeTextLength('LOC_CD')){

        			//PICK_ZONE_LOC 포커스상태일 때 입력
        			if($('input[id="pdaObPickingOFVDetailPopPickingZoneLocCd"]:focus').length == 1){
        				$('#pdaObPickingOFVDetailPopPickingZoneLocCd').val(barcode);
        				return false;
    				//그외의 상황에서 PICK_LOC 입력
        			}else{
        				PdaObPickingDetailPopApp.barcode.fnSearchLocCd(barcode);
//        				$('#pdaObPickingOFVDetailPopPickingZoneLocCd').val(barcode);
        				return false;
        			}
        		}
    		}

    		//출고번호 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('OB_NO')){
    			$('#pdaObPickingOFVObNo').val(barcode);
    			fnGridSearch();
    			return false;
    		}
    		//파렛트 ID 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    			$('#pdaObPickingOFVPltId').val(barcode);
    			fnSearchPltId(barcode);
    			return false;
    		}
    	}

    }

    //그리드 초기화
    function fnList(){
    	$pdaObPickingOFVHGrid.paragonGrid({
            url				: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVD',
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
            multiselect		: true,
            colModel		: [
    		   	{editable: false, name:'PROMOTION_GBN',	width:"30px", 	align:"center"},
    		   	{editable: false, name:'ITEM', 			width:"150px", 	align:"left"  },
                {editable: false, name:'INST', 			width:"50px", 	align:"right",  formatter:"integer"},
                {editable: false, name:'PICK', 			width:"50px", 	align:"right",  formatter:"integer"},
                {editable: false, name:'LOT_ATTR1',     width:"120px",  align:"center"},
                {editable: false, name:'LOT_ATTR2',     width:"80px",   align:"center", hidden:true},

                {editable: false, name:'OB_GBN_CD', 	width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'ITEM_CD', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'ITEM_NM', 		width:"200px", 	align:"left",   hidden:true},
                {editable: false, name:'INST_QTY', 		width:"60px", 	align:"right",  formatter:"integer", hidden:true},
                {editable: false, name:'PICK_QTY', 		width:"60px", 	align:"right",  formatter:"integer", hidden:true},
                {editable: false, name:'PROMOTION_GBN_CD',	width:"50px", 	align:"center", hidden:true},
                {editable: false, name:'LOT_ID', 		width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'OB_PLAN_YMD', 	width:"80px", 	align:"center", hidden:true},
                {editable: false, name:'OB_PROG_ST_CD',	width:"80px", 	align:"center", hidden:true},
                { editable: false, name: "OB_PROG_ST",  width: "80px", align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridObProgStCd }
                },
                {editable: false, name:'INST_LOC_CD', 	width:"80px", 	align:"center", hidden:true},
//                {editable: false, name:'PLT_ID', 		width:"120px", 	align:"center", hidden:true},
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
                {editable: false, name:'PICK_QTY',  	width:"60px",   align:"right",  hidden:true},
                {editable: false, name:'INST_QTY',  	width:"60px",   align:"right",  hidden:true},
                {editable: false, name:'PICK_BOX_QTY',  width:"60px",   align:"right",  hidden:true},
                {editable: false, name:'INST_BOX_QTY',  width:"60px",   align:"right",  hidden:true},
                {editable: false, name:'PICK_EA_QTY',   width:"50px",   align:"right",  hidden:true},
                {editable: false, name:'MAKE_LOT',      width:"150px",  align:"center", hidden:true},
                {editable: false, name:'MAKE_YMD',      width:"100px",  align:"center", hidden:true},
                {editable: false, name:'DIST_EXPIRY_YMD',width:"100px", align:"center", hidden:true},
                {editable: false, name:'LOT_ATTR3',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR4',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR5',     width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'PICK_ZONE_LOC_CD',width:"100px",align:"left",   hidden:true},
                {editable: false, name:'WORK_ST_CD',	width:"100px",	align:"left",   hidden:true},
                {editable: false, name:'STORE_NM',      width:"100px",  align:"left",   hidden:true},
                {editable: false, name:'LOT_ATTR1_CD',  width:"120px",  align:"center",   hidden:true},
                {editable: false, name:'LOT_ATTR2_CD',  width:"80px",   align:"center",   hidden:true},
//                {editable: false, name:'PICK_BOX_QTY_D', width:"50px",  align:"right"
////                	,  hidden:true
//                	},
//                {editable: false, name:'PICK_EA_QTY_D',  width:"50px",  align:"right"
////                	,  hidden:true
//                	},
                {editable: false, name:'PICK_YN',  		width:"50px",   align:"right",  hidden:true}
            ],
//            ondblClickRow: function(id, iRow, iCol, e){
//
//            	//선택한 행의 Data
//                var rowData = $pdaObPickingOFVHGrid.getRowData(iRow);
//
////                //gridComplete랑 중복되는 Check 부분 나중에 function 변경
////				if(rowData.WORK_ST_CD == '30'){
////					rowData.PICK_YN = 'N';
////				}
////
//				if(rowData.OB_PROG_ST_CD < 60){
//					fnConfirmPop(rowData);
//				}
//            },
            gridComplete : function(){


            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObPickingOFVHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		$pdaObPickingOFVHGrid.data('loadCount', 1);
            		//처음 불러올때 입고번호 포커스
            		//$('#pdaObPickingOFVObNo').focus();
            	}

            	var ids = $pdaObPickingOFVHGrid.jqGrid('getDataIDs');

            	var pltFlag = false;
            	if(ids.length > 0){
            		//2019.04.21 출고구분 추가
            		$('#pdaObPickingOFVObGbnCd').val($pdaObPickingOFVHGrid.getRowData(0));

        			//출고진행상태 60 일 때, 회색처리
        			for (var i = 0; i < ids.length; i++) {
        				//확정 인 데이터는 회색 처리
        				if( $pdaObPickingOFVHGrid.getRowData(ids[i]).OB_PROG_ST_CD >= '60') {
        					$pdaObPickingOFVHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.disabled()});
        				}
//        				if($pdaObPickingOFVHGrid.getRowData(ids[i]).WORK_ST_CD == '20'){
//        					$pdaObPickingOFVHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.caution()});
//        				}
        			}
            		if(callbackData != undefined){
            			for(var i = 0 ; i < ids.length ; i++){
            				if($pdaObPickingOFVHGrid.getRowData(ids[i]).PROMOTION_GBN_CD.indexOf(callbackData.PROMOTION_GBN_CD) > -1
            					&&  $pdaObPickingOFVHGrid.getRowData(ids[i]).ITEM_CD.indexOf(callbackData.ITEM_CD) > -1
            					&&  $pdaObPickingOFVHGrid.getRowData(ids[i]).LOT_ATTR1.indexOf(callbackData.LOT_ATTR1) > -1
            					//20190507 DALAT 여부 체크 안함.
//            					&&  $pdaObPickingOFVHGrid.getRowData(ids[i]).LOT_ATTR2.indexOf(callbackData.LOT_ATTR2) > -1
            				){
            					var rowData = $pdaObPickingOFVHGrid.getRowData(ids[i]);

            					if(rowData.OB_PROG_ST_CD < 60){
            						rowData["PLT_ID"] = callbackData.PLT_ID;
            						rowData["LOT_ID"] = callbackData.LOT_ID;
            						rowData["LOT_ATTR1"] = callbackData.LOT_ATTR1;
            						rowData["LOT_ATTR2"] = callbackData.LOT_ATTR2;
            						rowData["LOT_ATTR3"] = callbackData.LOT_ATTR3;
            						rowData["LOT_ATTR4"] = callbackData.LOT_ATTR4;
            						rowData["LOT_ATTR5"] = callbackData.LOT_ATTR5;
            						rowData["MAKE_YMD"] = callbackData.MAKE_YMD;
            						rowData["MAKE_LOT"] = callbackData.MAKE_LOT;
            						rowData["DIST_EXPIRY_YMD"] = callbackData.DIST_EXPIRY_YMD;
            						rowData["PICK_BOX_QTY"] = callbackData.PICK_BOX_QTY;
            						rowData["PICK_QTY_C"] = callbackData.PICK_QTY_C;
            						rowData["AVAIL_QTY"] = callbackData.AVAIL_QTY;
            						rowData["OB_GBN_CD"] = callbackObGbnCd

            						rowData.LOC_CD = callbackLocCd.LOC_CD;
            						fnConfirmPop(rowData);
            						return false;
            					}else{

            						Util.alert('MSG_OUTRI_VAL_078'); //해당 제품은 피킹처리 된 제품입니다.
            						$('#pdaObPickingOFVPltId').val('');
            						return false;
            					}

            				}else{
                				if(i+1 == ids.length){
                					pltFlag = true;
                				}
            				}
            			}
            		}
            		if(pltFlag){
        				Util.alert('MSG_OUTRI_VAL_068'); //출고번호내 존재하지 않는 제품입니다.
        				$('#pdaObPickingOFVPltId').val('');
        				callbackData = undefined;
        				callbackLocCd = undefined;
        				return false;
            		}


//            		for (var i = 0; i < ids.length; i++) {
//            			//작업상태가 '30' 피킹이고, 지시수량과 피킹수량이 일치 할때 하이라이트를 준다.
//     					if( $pdaObPickingOFVHGrid.getRow(ids[i]).WORK_ST_CD == '30') {
//     						$pdaObPickingOFVHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.disabled()});
//
//     						//임의의 컬럼 PICK_YN을 피킹 여부의 Flag로 사용하여 피킹 여부 확인
//     						$pdaObPickingOFVHGrid.jqGrid('setCell', i+1, 'PICK_YN', 'N');
//     					}else{
//
//     						if($pdaObPickingOFVHGrid.getRow(ids[i]).WORK_ST_CD == '20'){
//     							$pdaObPickingOFVHGrid.setRowData(i+1,false,{background: WMSUtil.gridFocus.caution()});
//     						}
//
//     						$pdaObPickingOFVHGrid.jqGrid('setCell', i+1, 'PICK_YN', 'Y');
//     					}
//
//            		}
            	}

            	if(ids.length > 0){
            		var rowData = $pdaObPickingOFVHGrid.getRow(ids[0]);
            		$('#pdaObPickingOFVStoreNm').val(rowData.STORE_NM);
            	}else{
            		$('#pdaObPickingOFVStoreNm').val('');
            		callbackObGbnCd = '';
            	}
            }
    	})
    }

    //이벤트
    function fnEvents(){

    	//작업일자 세팅
    	workYmd = WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd);

		//엔터 이벤트
		$('#pdaObPickingOFVObNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObPickingOFVStoreNm').val('');
				$('#pdaObPickingOFVPltId').val('');
				$('#pdaObPickingOFVObNo').blur();
				fnGridSearch();
			}
		});
		$('#pdaObPickingOFVPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObPickingOFVPltId').blur();
				callbackData = undefined;
				callbackLocCd = undefined;
				fnSearchPltId($(this).val());
			}
		});

		//출고피킹번호 조회 팝업
    	$('#pdaObPickingOFVObNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearchObNo();
    	});

    	//선택시 그리드 전체선택(TODO :  수정필요)
    	$('#pdaObPickingOFVAllCheckBtn').click(function(){
    		$('#cb_'+proNm+'HGrid').trigger('click');
    	});

    	//삭제처리
    	$('#pdaObPickingOFVDeleteBtn').click(function(){
    		fnDelete();
    	});

    	//확정처리
    	$('#pdaObPickingOFVConfirmBtn').click(function(){
    		fnSave('CONFIRM', 'MSG_COM_CFM_015'); //확정하시겠습니까?
    	});

        //확정취소처리
        $('#pdaObPickingOFVAllCancleBtn').click(function(){
            fnCancle('CANCLE', 'MSG_OUTRI_CFM_009'); //피킹취소하시겠습니까?
        });

    }

    //그리드 조회
    function fnGridSearch(){
		$pdaObPickingOFVHGrid.paragonGridSearch(sendData());
    }

    //출고번호 조회 팝업
    function fnSearchObNo(){

//   		var obNo = $('#pdaObPickingOFVObNo').val();
//
//		if(obNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/outbound/pdaObPickingOFV/pdaObPickingOFVNoInquiryPop",
                id			: "pdaObPickingOFVNoInquiryPop",
                domainId	: "PWMCM118Q_P1",
                fullScreen 	: true,
                data		: {
                	obProgStCd : "30"
                },
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                        "OB_NO"		: "pdaObPickingOFVObNo",
                        "STORE_NM" 	: "pdaObPickingOFVStoreNm",
                    };
                    App.setElIds(callBack);
                    modal.show();
                },
                callback	: function(data){
                	console.log(data);
                	callbackObGbnCd = data.OB_GBN_CD;
                	$('#pdaObPickingOFVObGbnCd').val(data.OB_GBN_CD)
//                	workYmd = data.OB_PLAN_YMD;
                	callbackData = undefined;
                	callbackLocCd = undefined;
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
			obNo 	: $('#pdaObPickingOFVObNo').val(),
			pltId	: $('#pdaObPickingOFVPltId').val(),
			obGbnCd	: $('#pdaObPickingOFVObGbnCd').val(),
			workYmd	: workYmd
    	}
    }

    //파렛트ID 조회
    function fnSearchPltId(barcode){

    	var sendData = {
    			proCd			: proCd, //팝업
    			workYmd			: workYmd,
    			obNo			: $('#pdaObPickingOFVObNo').val(),
    			pltId			: barcode
		}

    	//PLT ID 확인
    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVDetailPltList',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			var data = data.dt_grid;
    			if(data.length == 0){
    				Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
    				$('#pdaObPickingOFVPltId').val('');
    				return false;
    			}else if(data.length == 1){
    				var rowData = {
    			    		proCd	: proCd,
    						obNo 	: $('#pdaObPickingOFVObNo').val(),
    						pltId	: $('#pdaObPickingOFVPltId').val(),
    						lotId	: data[0].LOT_ID,
    						workYmd	: workYmd,
    						locCd	: data[0].LOC_CD,
    						locTypeCd	: data[0].LOC_TYPE_CD
    				}

    				var dt = data[0];

    				callbackLocCd = {
    						LOC_CD	: dt.LOC_CD,
    						LOT_ATTR1 : dt.LOT_ATTR1,
    						LOT_ATTR2 : dt.LOT_ATTR2,
    						LOT_ATTR3 : dt.LOT_ATTR3,
    						LOT_ATTR4 : dt.LOT_ATTR4,
    						LOT_ATTR5 : dt.LOT_ATTR5,
    						MAKE_YMD : dt.MAKE_YMD,
    						MAKE_LOT : dt.MAKE_LOT,
    						DIST_EXPIRY_YMD : dt.DIST_EXPIRY_YMD
    				};
    				fnItemInquiryInPlt(rowData);
    			}else{
    				PopApp.coreOpenPopup({
	   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
	   		                id			: "pdaCommPltIdPop",
	   		                domainId	: "PWMPDAIB102E_P1",
	   		                fullScreen 	: true,
	   		                data		: sendData,
	   		                onload		: function(modal) {
	   		                    modal.show();
	   		                }, callback : function (data){
	   		                	var  dt = data;

	   		                	//팝업에서 선택한 PLT_ID 로 변경
	   		    				var rowData = {
	   		    			    		proCd	: proCd,
	   		    						obNo 	: $('#pdaObPickingOFVObNo').val(),
	   		    						pltId	: $('#pdaObPickingOFVPltId').val(),
	   		    						lotId	: dt.LOT_ID,
	   		    						workYmd	: workYmd,
	   		    						locCd	: dt.LOC_CD,
	   		    						locTypeCd	: dt.LOC_TYPE_CD
	   		    				}
	   		                	callbackLocCd = {
	   		    						LOC_CD : dt.LOC_CD,
	   		    						LOT_ATTR1 : dt.LOT_ATTR1,
	   		    						LOT_ATTR2 : dt.LOT_ATTR2,
	   		    						LOT_ATTR3 : dt.LOT_ATTR3,
	   		    						LOT_ATTR4 : dt.LOT_ATTR4,
	   		    						LOT_ATTR5 : dt.LOT_ATTR5,
	   		    						MAKE_YMD : dt.MAKE_YMD,
	   		    						MAKE_LOT : dt.MAKE_LOT,
	   		    						DIST_EXPIRY_YMD : dt.DIST_EXPIRY_YMD

	   		    				};
	   		                	fnItemInquiryInPlt(rowData);
	   		                }
	   		            });
    			}
    		}
    	})
    }

    //파렛트 내 제품 조회 팝업
    function fnItemInquiryInPlt(rowData){
    	//출고구분이 OT출고(12)가 아니고, 파렛트 ID 스캔의 콜백 데이터가 OT 출고일 때, 처리불가
    	if(callbackObGbnCd != '12' && rowData.locTypeCd == '2'){
    		Util.alert('MSG_OUTRI_VAL_084'); //OT출고 일 때만 OT존 파렛트를 피킹 할 수 있습니다.
    		$('#pdaObPickingOFVPltId').val('');
    		return false;
    	}

    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVItemInquiryPop',
    		type 		: "POST",
    		data		: JSON.stringify(rowData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			//조회, 스캔한 파렛트 내의 제품중 프로모션과 아닌 제품의 개수 확인
    			var dt_data = data.dt_grid
    			//파레트에 제품이 없음. 알람창.
    			if(dt_data.length == 0){
    				Util.alert('MSG_OUTRI_VAL_068'); //출고번호내 존재하지 않는 제품입니다.
    				$('#pdaObPickingOFVPltId').val('');
    				callbackData = undefined;
    				return false;
				//1건, 상세 페이지로 이동
    			}else if(dt_data.length == 1){

    				if(dt_data[0].OB_PROG_ST_CD == 60){
    					Util.alert('MSG_OUTRI_VAL_069'); //해당 파렛트는 피킹확정 된 파렛트 입니다.
    					$('#pdaObPickingOFVPltId').val('');
    					return false;
    				}

    		    	if(dt_data[0].AGING_YN == 'Y'){
    		    		Util.alert('MSG_ST_VAL_097'); //숙성중인 제품이어서 피킹이 안됩니다.
    		    		$('#pdaObPickingOFVPltId').val('');
    		    		return false;
    		    	}
    		    	if(dt_data[0].HOLD_QTY != 0){
    		    		Util.alert('MSG_ST_VAL_098'); //보류중인 제품이어서 피킹이 안됩니다.
    		    		$('#pdaObPickingOFVPltId').val('');
    		    		return false;
    		    	}
    		    	if(dt_data[0].AVAIL_QTY == 0){
    		    		Util.alert('MSG_ST_VAL_002'); //가용재고 데이터가 없습니다.
    		    		$('#pdaObPickingOFVPltId').val('');
    		    		return false;
    		    	}


    				$('#pdaObPickingOFVPltId').val(dt_data[0].PLT_ID);
    				callbackData = {
    						ITEM_CD			: dt_data[0].ITEM_CD,
    						LOC_CD			: dt_data[0].LOC_CD,
    						PROMOTION_GBN	: dt_data[0].PROMOTION_GBN,
    						PROMOTION_GBN_CD: dt_data[0].PROMOTION_GBN_CD,
    						PLT_ID			: dt_data[0].PLT_ID,
    						LOT_ID			: dt_data[0].LOT_ID,
    						MAKE_YMD		: dt_data[0].MAKE_YMD,
    						MAKE_LOT		: dt_data[0].MAKE_LOT,
    						DIST_EXPIRY_YMD		: dt_data[0].DIST_EXPIRY_YMD,
    						LOT_ATTR1		: dt_data[0].LOT_ATTR1,
    						LOT_ATTR2		: dt_data[0].LOT_ATTR2,
    						LOT_ATTR3		: dt_data[0].LOT_ATTR3,
    						LOT_ATTR4		: dt_data[0].LOT_ATTR4,
    						LOT_ATTR5		: dt_data[0].LOT_ATTR5,
    						PICK_BOX_QTY	: dt_data[0].PICK_BOX_QTY,
    						PICK_QTY_C		: dt_data[0].PICK_QTY_C,
    						AVAIL_QTY		: dt_data[0].AVAIL_QTY
    				}
    				fnGridSearch();
				//2개이상 팝업
    			}else{


    				//주석처리. SQL에서 60(피킹확정) 포함하여 조회할때 사용
//    				var dtDataCnt = dt_data.length;
//    				var obProgStCdCnt = 0;
//    				var rowCnt = -1;
//
//    				for(var i = 0 ; i < dt_data.length; i++){
//    					if(dt_data[i].OB_PROG_ST_CD == 60){
//    						obProgStCdCnt++;
//    					}else{
//    						rowCnt = i;
//    					}
//
//    					if(obProgStCdCnt == dt_data.length){
//    						Util.alert('MSG_OUTRI_VAL_069'); //해당 파렛트는 피킹확정 된 파렛트 입니다.
//    						return false;
//    					}
//    				}
//
//    				//조회된 데이터 중 확정인 데이터와의 차이가 1개면, 팝업을 띄우지 않고 바로 처리함.
//    				if((Number(dtDataCnt) - Number(obProgStCdCnt)) == 1){
//
//        		    	if(dt_data[rowCnt].AGING_YN == 'Y'){
//        		    		Util.alert('MSG_ST_VAL_097'); //숙성중인 제품이어서 피킹이 안됩니다.
//        		    		return false;
//        		    	}
//        		    	if(dt_data[rowCnt].HOLD_QTY != 0){
//        		    		Util.alert('MSG_ST_VAL_098'); //보류중인 제품이어서 피킹이 안됩니다.
//        		    		return false;
//        		    	}
//
//	    				callbackData = {
//	    						ITEM_CD			: dt_data[rowCnt].ITEM_CD,
//	    						PROMOTION_GBN	: dt_data[rowCnt].PROMOTION_GBN,
//	    						PLT_ID			: dt_data[rowCnt].PLT_ID,
//	    						LOT_ID			: dt_data[rowCnt].LOT_ID,
//	    						LOT_ATTR1		: dt_data[rowCnt].LOT_ATTR1,
//	    						LOT_ATTR2		: dt_data[rowCnt].LOT_ATTR2
//	    				}
//		            	fnGridSearch();
//    				}else{

        		        PopApp.coreOpenPopup({
        		            ajaxUrl 	: '/pda/ctrl/outbound/pdaObPickingOFV/pdaObPickingOFVItemInquiryPop',
        		            id 			: 'modalObPickingItemInqPopup',
        		            width 		: '550',
        		            domainId	: "PWMPDAOB201E_P3",
        		            data		: {
        		        		proCd		: proCd,
        		        		obNo		: $('#pdaObPickingOFVObNo').val(),
        		        		pltId		: $('#pdaObPickingOFVPltId').val(),
        		        		workYmd		: workYmd,
        		        		locCd		: rowData.locCd
        		        	},
        		            visible		: true,
        		            fullScreen 	: true,
        		            onload 		: function(modal) {
        		                modal.show();
        		            },
        		            callback 	: function(data){
                		    	if(data.AGING_YN == 'Y'){
                		    		Util.alert('MSG_ST_VAL_097'); //숙성중인 제품이어서 피킹이 안됩니다.
                		    		$('#pdaObPickingOFVPltId').val('');
                		    		return false;
                		    	}
                		    	if(data.HOLD_QTY != 0){
                		    		Util.alert('MSG_ST_VAL_098'); //보류중인 제품이어서 피킹이 안됩니다.
                		    		$('#pdaObPickingOFVPltId').val('');
                		    		return false;
                		    	}
                		    	if(data.AVAIL_QTY == 0){
                		    		Util.alert('MSG_ST_VAL_002'); //가용재고 데이터가 없습니다.
                		    		$('#pdaObPickingOFVPltId').val('');
                		    		return false;
                		    	}

        	    				callbackData = {
        	    						ITEM_CD			: data.ITEM_CD,
        	    						PROMOTION_GBN	: data.PROMOTION_GBN,
        	    						PROMOTION_GBN_CD: data.PROMOTION_GBN_CD,
        	    						PLT_ID			: data.PLT_ID,
        	    						LOT_ID			: data.LOT_ID,
        	    						MAKE_YMD		: data.MAKE_YMD,
        	    						MAKE_LOT		: data.MAKE_LOT,
        	    						DIST_EXPIRY_YMD		: data.DIST_EXPIRY_YMD,
        	    						LOT_ATTR1		: data.LOT_ATTR1,
        	    						LOT_ATTR2		: data.LOT_ATTR2,
        	    						LOT_ATTR3		: data.LOT_ATTR3,
        	    						LOT_ATTR4		: data.LOT_ATTR4,
        	    						LOT_ATTR5		: data.LOT_ATTR5,
        	    						PICK_BOX_QTY	: data.PICK_BOX_QTY,
        	    						PICK_QTY_C		: data.PICK_QTY_C,
        	    						AVAIL_QTY		: data.AVAIL_QTY
        	    				}
        		            	fnGridSearch();
        		            }
        		        });
//    				}
    			}
    		}
    	});
    }

    //상세팝업
    function fnConfirmPop(rowData){

//console.log('fnConfirmPop',rowData);
//		if(rowData.PICK_YN == 'N') return false;

        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/outbound/pdaObPickingOFV/pdaObPickingOFVDetailPop",
            data 		: {
            	rowData : rowData
        	},
            id			: "pdaObPickingOFVDetailPop",
            domainId	: "PWMPDAOB101E_P1",
            fullScreen : true,
            onload: function(modal) {
            	//App.setElIds();
                modal.show();
            },
            //팝업 종료 후 callback 있을때.
            callback : function(){
            	$('#pdaObPickingOFVPltId').val('');
            	callbackData = undefined;
            	callbackLocCd = undefined;
            	fnGridSearch();
            }
        });
    }

    //확정처리.
    function fnSave(flag, msgCd){

    	//행 선택 여부 확인
    	var selId = $pdaObPickingOFVHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
    	if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

    	//DataTable 생성
        var rowData = {
                clientCd	: "CLIENT_CD" ,
                obNo		: "OB_NO",
                obDetailSeq	: "OB_DETAIL_SEQ",
                instQty		: "INST_QTY",
                pickQty		: "PICK_QTY",
                obProgStCd	: "OB_PROG_ST_CD"
        }

        var jsonData = $pdaObPickingOFVHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        //검수수량이 0일 때 확정 불가
        var dt_data = jsonObj.dt_data;
        var pickFlag = false;
        var pickZeroFlag = false;
        for(var i = 0 ; i < dt_data.length; i++){
        	if(dt_data[i].pickQty == 0){
        		pickZeroFlag = true;
//        		Util.alert('MSG_OUTRI_VAL_066'); //피킹수량이 없습니다.
//        		break;
        	}
        	if(dt_data[i].obProgStCd >= 60){
        		pickFlag = true;
        		Util.alert('MSG_COM_ERR_099'); //확정된 데이터는 확정 할 수 없습니다.
        		break;
        	}
        }
        if(pickFlag) return false;

        if(pickZeroFlag) {
        	if (!confirm((Util.confirm('MSG_OUTRI_VAL_070')).msgTxt)) return false; //피킹 수량이 0 인 데이터가 포함되어있습니다. 진행하시겠습니까?
        }else{
            //확정 진행
            if (!confirm((Util.confirm(msgCd)).msgTxt)) return; //삭제하시겠습니까?
        }

        var sendData = {
        		"flag"		: flag,
        		"obPlanYmd" : workYmd,
        		"dt_data" 	: jsonObj.dt_data
        }

        App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPickingOFV/updatePdaObPickingOFVConfirm',
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

    //삭제
    function fnDelete(){

        var rowData = {
            clientCd 		: "CLIENT_CD",
            obNo 			: "OB_NO",
            obDetailSeq 	: "OB_DETAIL_SEQ",
            itemCd	 		: "ITEM_CD",
            promotionGbnCd  : "PROMOTION_GBN",
            obProgStCd		: "OB_PROG_ST_CD",
            pickQty         : "PICK_QTY"
        }
        var jsonData = $pdaObPickingOFVHGrid.getSelectedJsonData("dt_data", rowData);
        var jsonObj = JSON.parse(jsonData);
        var dt_data = jsonObj.dt_data;

        if(jsonData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        for(var i = 0; i < dt_data.length; i++){
        	if(dt_data[i].obProgStCd >= 60){
        		Util.alert('MSG_OUTRI_VAL_067'); //확정된 데이터는 삭제 하실 수 없습니다.
              	return false;
        	}

        	if(dt_data[i].pickQty == 0){
        	    Util.alert('MSG_OUTRI_VAL_079'); //삭제할 피킹 수량이 없습니다.
        	    return false;
        	}
        }

        //확정 진행
        if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

        App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/outbound/pdaObPickingOFV/updatePdaObPickingOFVDelete',
    		type 		: "POST",
    		data		: jsonData,
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

    //확정취소처리.
    function fnCancle(flag, msgCd){

        //행 선택 여부 확인
        var selId = $pdaObPickingOFVHGrid.getGridParam("selarrrow"); //선택한 Row 정보
        //선택 체크
        if(selId.length == 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        //DataTable 생성
        var rowData = {
                clientCd    : "CLIENT_CD" ,
                obNo        : "OB_NO",
                obDetailSeq : "OB_DETAIL_SEQ",
                instQty     : "INST_QTY",
                pickQty     : "PICK_QTY",
                obProgStCd  : "OB_PROG_ST_CD"
        }

        var jsonData = $pdaObPickingOFVHGrid.getSelectedJsonData("dt_data",rowData);
        var jsonObj = JSON.parse(jsonData);

        //검수수량이 0일 때 확정 불가
        var dt_data = jsonObj.dt_data;
        var pickFlag = false;
        var pickZeroFlag = false;
        for(var i = 0 ; i < dt_data.length; i++){
//            if(dt_data[i].pickQty == 0){
//                pickZeroFlag = true;
//              Util.alert('MSG_OUTRI_VAL_066'); //피킹수량이 없습니다.
//              break;
//            }
            if(dt_data[i].obProgStCd < 60){
                pickFlag = true;
//                Util.alert('MSG_COM_VAL_072'); //확정된 데이터는 확정 할 수 없습니다.
                Util.alertCode('MSG_OUTRI_VAL_077'); //출고 피킹확정 이상의 상태에서만 취소가능합니다.
                break;
            }
        }
        if(pickFlag) return false;

//        if(pickZeroFlag) {
//            if (!confirm((Util.confirm('MSG_OUTRI_VAL_070')).msgTxt)) return false; //피킹 수량이 0 인 데이터가 포함되어있습니다. 진행하시겠습니까?
//        }else{
            //확정취소 진행
            if (!confirm((Util.confirm(msgCd)).msgTxt)) return; //취소하시겠습니까?
//        }

        var sendData = {
                "flag"      : flag,
                "obPlanYmd" : workYmd,
                "dt_data"   : jsonObj.dt_data
        }

        App.prcsStart();
        $.ajax({
            url         : '/pda/ctrl/outbound/pdaObPickingOFV/updatePdaObPickingOFVCancle',
            type        : "POST",
            data        : JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            success     : function(data){
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
	MobileUtil.getBarcode({
		callback : "PdaObPickingApp.fnCallbackBarcode",
	});

	PdaObPickingApp.init();
});
