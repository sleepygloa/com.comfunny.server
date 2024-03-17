/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산검수 [PdaProdExamApp]
 * Program Code     : PWMPDAIB204E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 12. 11.  		First Draft.
 */
var bindData = {};
var PdaProdExamApp = function () {
	"use strict";

	//그리드
	var $pdaProdExamHGrid = $('#pdaProdExamHGrid');

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaProdExam';

	//제품코드 자릿수
	var itemCdLength = 7;
	var itemLargeClassCd = '';

	//CALLBACK Flag
	var collbackFlag = true;

	//enter trigger code
    var enterCode = $.Event("keypress");
    enterCode.keyCode = 13; // # Some key code value

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaProdExamProdGrp', 'PROD_GRP_CD', CoreSession.s_prodGrpCd);

        	WMSUtil.fnCombo.selectBox('pdaProdExamProdLine',  'PROD_LINE_CD');

//        	WMSUtil.fnCombo.selectBox('pdaProdExamShiftGrpCd',  'SHIFT_GRP_CD');

        	WMSUtil.fnCombo.selectBox('pdaProdExamDalat',  'YN', 'N');

        	getEvents();


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

    	}else if(barcode.length == 14 || barcode.length == 7){
    		$('#pdaProdExamItemCd').val(barcode).blur();
    		fnItemSearch();
    	}

    }

    function getEvents(){

//    	$('#pdaProdExamItemCd').focus();

    	WMSUtil.pwaGridDynamicArea(proNm);

//    	WMSUtil.fnTagYmdSetting('pdaProdExamProdYmd', true);
		//작업일자
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaProdExamProdYmd').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaProdExamProdYmd').datepicker("setDate", new Date());
		}

    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
    	$(document).keydown(function(event){
    		if(event.keyCode == 13) {

    			var objId = event.target.id;

    			if (objId == 'pdaProdExamItemCd'){
    				fnItemSearch();
//    				$('#pdaProdExamCountryBtn').trigger('click');
    			}
//    			else if (objId == 'pdaProdExamItemCd'){
//    				collbackFlag = false;
//
//    				$('#pdaProdExamItemCd').blur();
//    				$('#pdaProdExamIbNoSearchBtn').trigger('click');
//    			}
    			event.preventDefault();
    			return false;
    		}
    	});

    	//국가코드 팝업
    	$('#pdaProdExamCountryBtn').click(function(){
    		fnCountryPop();
    	})

    	//확정 진행
    	$('#pdaProdExamConfirmBtn').click(function(){
    		fnConfirm();
    	})

    	//날짜 변경 시 초기화
    	$('#pdaProdExamProdYmd').change(function(){
    		fnInit();
    	})

    	//생산조 변경 시 초기화
    	$('#pdaProdExamProdGrp').change(function(){
    		fnInit();
    	})

    	//생산라인 변경 시 초기화
    	$('#pdaProdExamProdLine').change(function(){
    		fnInit();
    	})

    	//DALAT 여부 초기값 수정불가.
    	$('#pdaProdExamDalat').attr('disabled', 'disabled');

    	//수출국가 변경 시
    	$('#pdaProdExamCountryCd').change(function(){
    		console.log(bindData);
    	})

    }

    function fnInit(){
		$('#pdaProdExamItemCd').val('');
		$('#pdaProdExamItemNm').val('');
		$('#pdaProdExamQty').val('');
		$('#pdaProdExamDalat').val('N');
		$('#pdaProdExamShiftGrpCd').val('');
		$('#pdaProdExamCountryCd').val('');
		$('#pdaProdExamCountryNm').val('');
		$('#pdaProdExamUomCd').text('');

//		$('#pdaProdExamQty').attr('readonly', false);
		$('#pdaProdExamCountryBtn').css('display', 'block');
		$('#pdaProdExamShiftGrpCd').attr('readonly', false);

		$('#pdaProdExamItemCd').focus();
    }

    function sendData(){
    	return {
			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
			prodGrpCd		: $('#pdaProdExamProdGrp').val(),
			prodLineCd		: $('#pdaProdExamProdLine').val(),
			itemCd 			: $('#pdaProdExamItemCd').val()
    	}
    }

    //제품코드 검색
    function fnItemSearch(){
    	bindData = {};
    	if($('#pdaProdExamItemCd').val().trim().length == 0){

    	}else{
        	$.ajax({
        		url		: '/pda/ctrl/common/listProdItem',
        		type 	: "POST",
        		data	: sendData(),
        		async	: false,
//                contentType: 'application/json; charset=utf-8',
        		success : function(data){
        			var dt_grid = data.dt_grid;

        			// dt_grid에 prod_inst_ymd가 not null 수량 카운트
        			// for 작업
        			// 변수 prod_inst_cnt
        			// dt_grid_length == 0 제품이 없음 처리안됨
        			// prod_inst_cnt == 0 생산계획 제품이 없음 (제품 선택 팝업)
        			// prod_inst_cnt == 1 생산계획 단일 제품
        			// prod_inst_cnt > 1 제품 선택 팝업


        			//DALAT 은 항상 수정불가(DISABLED)
        			$('#pdaProdExamDalat').attr('disabled', 'disabled');


        			//0: 조회된 데이터가 없을때, 입력값들 초기화.
        			if(dt_grid.length == 0){

        				fnInit();

        			//!0: 조회된 데이터가 0건이 아닐때
        			//생산일자 유/무 개수 파악하여 분기
        			}else{
        				var dt = dt_grid[0];

        				var planItemCnt = 0;
        				var nonPlanItemCnt = 0;

            			for(var i in dt_grid){
    						if(dt_grid[i].PROD_INST_YMD == null){
    							nonPlanItemCnt++;
    						}else{
    							planItemCnt++;
    						}
            			}

            			//생산 계획 제품 == 0, 팝업.
            			if(planItemCnt == 0){


            				if(nonPlanItemCnt > 1){
                				//생산계획 없는 제품 진행.
            			        PopApp.coreOpenPopup({
            			            ajaxUrl 	: '/pda/ctrl/commonItemPop',
            			            id 			: 'modalItemPopup',
            			            width 		: '550',
            			            domainId	: "PWMCM111Q_P1",
            			            data		: sendData(),
            			            visible		: true,
            			            fullScreen 	: true,
            			            onload 		: function(modal) {
            			                var callBack ={
            			                        "ITEM_CD"           : "pdaProdExamItemCd",
            			                        "ITEM_NM"           : "pdaProdExamItemNm",
            			                        "QTY"               : "pdaProdExamQty",
            			                        "SHIFT_GROUP_CD"    : "pdaProdExamShiftGrpCd"
            			                };
            			                App.setElIds(callBack);
            			                modal.show();
            			            },
            			            callback 	: function(data){
console.log(data)
            			            	if (confirm((Util.confirm('MSG_INRI_CFM_015')).msgTxt)) {//생산계획에 없는 데이터 입니다. 진행 하시겠습니까?
                			            	$('#pdaProdExamUomCd').text(data.UOM_CD);
                			            	itemLargeClassCd = data.LARGE_CLASS_CD;

//                							$('#pdaProdExamQty').attr('disabled', 'disabled');
                							if(data.LARGE_CLASS_CD == '04'){ //04: 스낵
                								$('#pdaProdExamDalat').attr('disabled', false);
                								$('#pdaProdExamDalat').val('N');
                							}
//                							$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');
            			            	}else{
            			            		fnInit();
            			            	}
            			            }
            			        });
            				}else{
    			            	if (confirm((Util.confirm('MSG_INRI_CFM_015')).msgTxt)) {//생산계획에 없는 데이터 입니다. 진행 하시겠습니까?
        			            	$('#pdaProdExamUomCd').text(dt.UOM_CD);
        			            	itemLargeClassCd = dt.LARGE_CLASS_CD;

//        							$('#pdaProdExamQty').attr('disabled', 'disabled');
        							if(dt.LARGE_CLASS_CD == '04'){ //04: 스낵
        								$('#pdaProdExamDalat').attr('disabled', false);
        								$('#pdaProdExamDalat').val('N');
        							}

        							$('#pdaProdExamItemCd'		).val(dt.ITEM_CD);
        	            			$('#pdaProdExamItemNm'		).val(dt.ITEM_NM);
                    			    $('#pdaProdExamQty'			).val(dt.QTY);
                    			    $('#pdaProdExamShiftGrpCd'	).val(dt.SHIFT_GROUP_CD);
                    			    $('#pdaProdExamCountryCd'	).val(dt.EXPORT_COUNTRY_CD);
                    			    $('#pdaProdExamCountryNm'	).val(dt.EXPORT_COUNTRY);
//        							$('#pdaProdExamShiftGrpCd'	).attr('disabled', 'disabled');


//                    				//내수제품 D:내수, E:수출, D일때 수출국가수정 불가. E일때 수출국가수정가능
//                    				if(dt.LOCAL_EXPORT_GBN_CD == 'D'){
//                    					$('#pdaProdExamCountryBtn').css('display', 'none');
//                    				}else{//수출
//                    					$('#pdaProdExamCountryBtn').css('display', 'block');
//                    				}
    			            	}else{
    			            		fnInit();
    			            	}
            				}

            			//생산 계획 제품 == 1, 조회
            			//생산마감 유효성검사
            			//수출국가가 내수--> ''(빈칸, 공란), 수출--> 값 표시 및 팝업버튼 표시
            			//SNACK 제품일 경우 DALAT 여부 수정 가능.
            			}else if(planItemCnt == 1){

	            			if(dt.PROD_PROG_ST_CD == '30'){
	        					Util.alert('MSG_INRI_VAL_059'); //해당제품은 생산마감된 제품입니다.
	        					$('#pdaProdExamDalat').attr('disabled', false);
	        					fnInit();

	        					return false;
	        				}

	            			$('#pdaProdExamItemCd'		).val(dt.ITEM_CD);
	            			$('#pdaProdExamItemNm'		).val(dt.ITEM_NM);
            			    $('#pdaProdExamQty'			).val(dt.QTY);
            			    $('#pdaProdExamShiftGrpCd'	).val(dt.SHIFT_GROUP_CD);
            			    $('#pdaProdExamCountryCd'	).val(dt.EXPORT_COUNTRY_CD);
            			    $('#pdaProdExamCountryNm'	).val(dt.EXPORT_COUNTRY);
        			    	$('#pdaProdExamUomCd'		).text(dt.UOM_CD);



        			    	//조회후 나머지데이터 수정불가.
//            				$('#pdaProdExamQty').attr('readonly', true);

            				//스낵인 경우 DALAT 여부 수정가능
            				if(dt.LARGE_CLASS_CD == '04'){ //04: 스낵
            					$('#pdaProdExamDalat').attr('disabled', false);
            					$('#pdaProdExamDalat').val('N');
            				}

            				//내수제품 D:내수, E:수출, D일때 수출국가수정 불가. E일때 수출국가수정가능
            				if(dt.LOCAL_EXPORT_GBN_CD == 'D'){
            					$('#pdaProdExamCountryBtn').css('display', 'none');
            				}else{//수출
            					$('#pdaProdExamCountryBtn').css('display', 'block');
            				}

            				$('#pdaProdExamDalat').val(dt.DALAT_YN);
            				$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');


            			//생산 계획 제품 > 1, 팝업
            			//기본 데이터 입력, 수출국가 코드 검색팝업 띄움.
                		//SNACK 제품일 경우 DALAT 여부 수정 가능.
            			}else{
            		        PopApp.coreOpenPopup({
            		            ajaxUrl 	: '/pda/ctrl/commonItemPop',
            		            id 			: 'modalItemPopup',
            		            width 		: '550',
            		            domainId	: "PWMCM111Q_P1",
            		            data		: sendData(),
            		            visible		: true,
            		            fullScreen 	: true,
            		            onload 		: function(modal) {
            		                var callBack ={
            		                        "ITEM_CD"           : "pdaProdExamItemCd",
            		                        "ITEM_NM"           : "pdaProdExamItemNm",
            		                        "QTY"               : "pdaProdExamQty",
            		                        "SHIFT_GROUP_CD"    : "pdaProdExamShiftGrpCd"
            		                };
            		                App.setElIds(callBack);
            		                modal.show();
            		            },
            		            callback 	: function(data){
            		            	$('#pdaProdExamUomCd').text(data.UOM_CD);
            		            	itemLargeClassCd = data.LARGE_CLASS_CD;

//            						$('#pdaProdExamQty').attr('disabled', 'disabled');
            						if(data.LARGE_CLASS_CD == '04'){ //04: 스낵
            							$('#pdaProdExamDalat').attr('disabled', false);
            							$('#pdaProdExamDalat').val('N');
            						}
            						$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');
            		            }
            		        });
            			}
        			}
        		}
        	});
    	}
    }


    function fnConfirm(){
//      if (!confirm((Util.confirm('ss')).msgTxt)) return; //삭제하시겠습니까?

		if($('#pdaProdExamItemCd').val() == ''){
			Util.alert('MSG_MST_VAL_045');
			return false;
		}
//		if($('#pdaProdExamItemCd').val().length != itemCdLength){ //제품코드는 {0} 자리입니다. 확인해 주세요.
//			Util.alert('MSG_MST_VAL_076', itemCdLength);
//			return false;
//		}

		if($('#pdaProdExamQty').val() == ''){
			Util.alert('MSG_MST_VAL_075'); //수량 항목은 필수 입력입니다.
			return false;
		}
		//Vietnam 은 '' 공백 처리,
//		if($('#pdaProdExamCountryCd').val() == ''){
//			Util.alert('MSG_MST_VAL_070');
//			return false;
//		}
		if($('#pdaProdExamDalat').val() == '' || $('#pdaProdExamDalat').val() == null){
			Util.alert('MSG_MST_VAL_074'); //DALAT 을 선택해주세요.
			return false;
		}
		if($('#pdaProdExamShiftGrpCd').val() == ''){
			Util.alert('MSG_MST_VAL_071');
			return false;
		}

		//SHIFT 그룹명 4자리만 가능.
		if($('#pdaProdExamShiftGrpCd').val().length != 4){
			Util.alert('MSG_MST_VAL_071');
			return false;
		}

		var sendData = {
				prodPlanYmd	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
				prodGrpCd	: $('#pdaProdExamProdGrp').val(),
				prodLineCd	: $('#pdaProdExamProdLine').val(),
				itemCd		: $('#pdaProdExamItemCd').val(),
				itemNm		: $('#pdaProdExamItemNm').val(),
				qty			: $('#pdaProdExamQty').val(),
				uom			: $('#pdaProdExamUomCd').text(),
				countryCd	: $('#pdaProdExamCountryCd').val(),
				countryNm	: $('#pdaProdExamCountryNm').val(),
				dalatYn		: $('#pdaProdExamDalat').val(),
				shiftGrpCd	: $('#pdaProdExamShiftGrpCd').val()
		}

    	$.ajax({
    		url		: '/ctrl/inboundProdExam/updatePdaProdExam',
    		type 	: "POST",
    		data	: JSON.stringify(sendData),
    		async	: false,
            contentType: 'application/json; charset=utf-8',
    		success : function(data){

    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				alert(data.msgTxt);
    				fnInit();
    			}

    		}
    	})
    }

    function fnCountryPop(){
        PopApp.coreOpenPopup({
            ajaxUrl 	: '/pda/ctrl/commonCountryPop',
            id 			: 'modalCountryPopup',
            width 		: '550',
            domainId	: 'PWMIF101Q_P1',
            visible		: true,
            onload 		: function(modal) {
                var callBack ={
                		"COUNTRY_CD" : "pdaProdExamCountryCd",
                        "COUNTRY"	 : "pdaProdExamCountryNm",
                };
                App.setElIds(callBack);
                modal.show();
            },
            callback 	: function(data){
            	var countryCd = data.COUNTRY_CD;

            	if(countryCd == 'VNM' || data.COUNTRY_CD == '84'){

            		//베트남일 때 '' 처리
            		$('#pdaProdExamCountryCd').val('');
            		$('#pdaProdExamCountryNm').val('');

            	}else{
            	}


            }
        });
    }

}();

$(document).ready(function() {
	MobileUtil.closeApp();
	MobileUtil.getBarcode({
		callback : "PdaProdExamApp.fnCallbackBarcode",
	});

	PdaProdExamApp.init();
});
