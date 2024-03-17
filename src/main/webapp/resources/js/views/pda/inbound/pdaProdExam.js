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
	var proCd = 'PWMPDAIB204E';
	var proNm = 'pdaProdExam';

	//CALLBACK Flag
	var collbackFlag = true;

	//enter trigger code
    var enterCode = $.Event("keypress");
    enterCode.keyCode = 13; // # Some key code value

    //바코드스캔유무
    var barcodeFlag = false;

    //내수/수출 구분 플래그, 확정처리에서 유효성검사
    var localExportGbnCdFlag = 'D';

    //20190324 PROD_LINE_CD 와 SHIFT_GROUP_CD 리스트
//    var shiftGroupList;

    //작업상태
    var workFlag = false;

    return {
        init: function () {

//        	WMSUtil.fnCombo.selectBox('pdaProdExamProdGrp',  'PROD_GRP_CD', ParagonSession.s_prodGrpCd, false, ' ');
//        	WMSUtil.fnCombo.selectBox('pdaProdExamProdGrp',  'PROD_GRP_CD',  '', false, ' ');

        	//일부러 부서와 라인해서 만듬.
//        	WMSUtil.fnCombo.prodDept('pdaProdExamProdLine', 'PROD_LINE_CD', '', '', ' ');
        	fnProdLineCombo();

//        	WMSUtil.fnCombo.selectBox('pdaProdExamShiftGrpCd',  'SHIFT_GRP_CD');

        	WMSUtil.fnCombo.selectBox('pdaProdExamDalat',  'YN', 'N');

        	fnEvents();

	    },
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
    		result = JSON.parse(result);

    		fnBarcode(result);

	    }
    };

    //생산라인 콤보박스
    function fnProdLineCombo(){
        $.ajax({
            url 		: "/pda/ctrl/inbound/pdaProdExam/listPdaProdExamNonPlanItemProdLineAndShiftGroup",
            type 		: "POST",
            data     	: {
            	prodInstYmd : WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
            	prodGrpCd	: CoreSession.s_prodGrpCd
            		},
            dataType 	: "json",
            success 	: function(result) {
            	$('#pdaProdExamProdLine').append('<option value=""></option>')
            	Util.MakeSelectOptions($('#pdaProdExamProdLine'), result);
//            	shiftGroupList = result;
            }
        });
    }

    //생산라인 변경시 조회이벤트
	function fnChangeProdLine(){

		if($(this).val() == ''){
			$('#pdaProdExamShiftGrpCd').empty();
			return false;
		}


		$.ajax({
			url		: '/pda/ctrl/inbound/pdaProdExam/listPdaProdExamProdLineAndShiftGroupGrouping',
			type 	: "POST",
			data	: JSON.stringify({
				prodLineCd	: $('#pdaProdExamProdLine').val(),
	        	prodInstYmd : WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
	        	prodGrpCd	: CoreSession.s_prodGrpCd
			}),
	        contentType: 'application/json; charset=utf-8',
			success : function(data){

				var dt_grid = data.dt_grid;

				if(dt_grid.length == 0){
					Util.alert('MSG_INRI_ERR_038'); //해당 생산라인에 SHIFT_GROUP이 배정되지 않았습니다.
					$('#pdaProdExamShiftGrpCd').empty();

					return false;
				}else{

					if(dt_grid[0].PROD_PROG_ST_CD == 30){
    					Util.alert('MSG_INRI_ERR_037'); //해당 제품은 생산마감된 라인 입니다.
//    					$('#pdaProdExamDalat').attr('disabled', false);
    					fnInit();
    					return false;
					}

					fnShiftGroup(dt_grid);
				}
			}
		})
	}

    //생산라인 변경시 쉬프트 그룹 입력
    function fnShiftGroup(dt_grid){

    	//2019-03-26 SHIFT_GROUP COMBO 추가
    	$('#pdaProdExamShiftGrpCd').empty();
    	for (var i = 0 ; i < dt_grid.length; i++){
    		var value = dt_grid[i].SHIFT_GROUP_CD;
    		var name  = dt_grid[i].SHIFT_GROUP_CD;

    		var option = '<option value="'+value+'" >'+name+'</option>'

    		$('#pdaProdExamShiftGrpCd').append(option);

    	}

    	if(dt_grid.length > 1){
    		$('#pdaProdExamShiftGrpCd').attr('disabled', false);
    	}else{
    		$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');
    	}

//2019-03-25 SHIFT_GROUP 입력 방식에서 콤보박스로 변경으로 주석
//    	for(var i = 0; i < shiftGroupList.length; i++){
//    		if(prodLineCd == shiftGroupList[i].VALUE){
//    			$('#pdaProdExamShiftGrpCd').val(shiftGroupList[i].VALUE)
//    			.attr('disabled', 'disabled');
//    		}
//    	}
    }

    function fnBarcode(data){

    	var activeProgram = $('li.main-tab.active > a').data('procd');
    	if(proCd == activeProgram){
        	barcodeFlag = true;
        	var barcode = null;
        	for (var i in data){
        		barcode = data[i];
        	}

        	if(barcodeFlag){
        		if(barcode == null){

            	}else if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
        				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
            			||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){
            		$('#pdaProdExamItemCd').val(barcode).blur();
            		fnItemSearch(barcode);
            	}
        	}
        	barcodeFlag = false;

    	}

    }

    function fnEvents(){

    	WMSUtil.pwaGridDynamicArea(proNm);

		//작업일자
//		var workYmd = ParagonSession.s_workYmd;
//		if(workYmd != undefined){
//			$('#pdaProdExamProdYmdDatePicker').datepicker("setDate", new Date(workYmd));
//			$('#pdaProdExamProdYmd').val(workYmd);
//		}else{
//			$('#pdaProdExamProdYmdDatePikcer').datepicker("setDate", new Date());
//			$('#pdaProdExamProdYmd').val(workYmd);
//		}

		var date = new Date();
		var year = date.getFullYear();
		var month = new String(date.getMonth()+1);
		var day = new String(date.getDate());

		// 한자리수일 경우 0을 채워준다.
		if(month.length == 1){
		  month = "0" + month;
		}
		if(day.length == 1){
		  day = "0" + day;
		}
//
//		//$("#regDate").val(year + "" + month + "" + day);
//
		$('#pdaProdExamProdYmdDatePikcer').datepicker("setDate", new Date());
		$('#pdaProdExamProdYmd').val(year + "-" + month + "-" + day);

		/*
		 * var date = new Date();
var year = date.getFullYear();
var month = new String(date.getMonth()+1);
var day = new String(date.getDate());

// 한자리수일 경우 0을 채워준다.
if(month.length == 1){
  month = "0" + month;
}
if(day.length == 1){
  day = "0" + day;
}

$("#regDate").val(year + "" + month + "" + day);
[출처] 자바스크립트 오늘날짜 구하기 (YYYYMMDD)|작성자 히키코보라
(/
		 */

		//엔터 이벤트
		$('#pdaProdExamItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				fnItemSearch($(this).val());
			}
		})

    	//국가코드 팝업
    	$('#pdaProdExamCountryBtn').click(function(){
    		fnCountryPop();
    	})

    	//확정 진행
    	$('#pdaProdExamConfirmBtn').click(function(){
    		fnConfirm();
    		setTimeout( fnWorkFlagInit , 1000 * 5); // 3초 이후에 run2 함수를 실행
    	})

    	//날짜 변경 시 초기화
//    	$('#pdaProdExamProdYmd').change(function(){
//    		fnInit();
//    	})

    	//생산조 변경 시 초기화
//    	$('#pdaProdExamProdGrp').change(function(){
//    		fnInit();
//    	})

    	//생산라인 변경 시 초기화
//    	$('#pdaProdExamProdLine').change(function(){
//    		fnInit();
//    	})

    	//생산라인 변경 시 쉬프트 그룹변경
    	$('#pdaProdExamProdLine').change(function(){
    		fnChangeProdLine();
    	})
    	//

    	//초기값 수정불가.
    	$('#pdaProdExamProdGrpCd').attr('disabled', 'disabled');
    	$('#pdaProdExamDalat').attr('disabled', 'disabled');
		$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');
		$('#pdaProdExamProdGrp').attr('disabled', 'disabled');
		$('#pdaProdExamProdLine').attr('disabled', 'disabled');
		//수출국가 초기값 수정불가
		$('#pdaProdExamCountryBtn').css('display', 'none');

//    	//수출국가 변경 시
//    	$('#pdaProdExamCountryCd').change(function(){
//    	})

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});
    }

	function fnWorkFlagInit(){
		workFlag = false;
		App.prcsEnd();
	}

    //Init Data, 데이터 초기화
    function fnInit(){
		$('#pdaProdExamItemCd').val('');
		$('#pdaProdExamItemNm').val('');
		$('#pdaProdExamItemNm').text('');
		$('#pdaProdExamQty').val('');
		$('#pdaProdExamDalat').val('N');
//		$('#pdaProdExamShiftGrpCd').val('');
		$('#pdaProdExamShiftGrpCd').empty();
		$('#pdaProdExamCountryCd').val('');
		$('#pdaProdExamCountryNm').val('');
		$('#pdaProdExamUomCd').text('');

//		$('#pdaProdExamQty').attr('readonly', false);
		$('#pdaProdExamProdGrpCd').val('');
		$('#pdaProdExamProdLine').val('');
		$('#pdaProdExamShiftGrpCd').attr('readonly', false);
		$('#pdaProdExamCountryBtn').css('display', 'none');
		$('#pdaProdExamDalat').attr('disabled', 'disabled');
    }

    //Init Data. ItemCd 제외
    function fnInitNotItemCd(){
		$('#pdaProdExamItemNm').val('');
		$('#pdaProdExamItemNm').text('');
		$('#pdaProdExamQty').val('');
		$('#pdaProdExamDalat').val('N');
//		$('#pdaProdExamShiftGrpCd').val('');
		$('#pdaProdExamShiftGrpCd').empty();
		$('#pdaProdExamCountryCd').val('');
		$('#pdaProdExamCountryNm').val('');
		$('#pdaProdExamUomCd').text('');

//		$('#pdaProdExamQty').attr('readonly', false);
		$('#pdaProdExamProdGrpCd').val('');
		$('#pdaProdExamProdLine').val('');
		$('#pdaProdExamShiftGrpCd').attr('readonly', false);
		$('#pdaProdExamCountryBtn').css('display', 'none');
		$('#pdaProdExamDalat').attr('disabled', 'disabled');
    }

    function sendData(){
    	return {
    		proCd			: proCd,
			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
//			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
			prodGrpCd		: CoreSession.s_prodGrpCd,
//			prodLineCd		: $('#pdaProdExamProdLine').val(),
			itemCd 			: $('#pdaProdExamItemCd').val()
    	}
    }

    //제품코드 검색
    function fnItemSearch(barcode){
    	bindData = {};
    	if($('#pdaProdExamItemCd').val().trim().length == 0){
    		fnInit();
    	}else{
    		fnInit();

        	$.ajax({
        		url		: '/pda/ctrl/common/listProdItem',
        		type 	: "POST",
        		data	: JSON.stringify({
            		proCd			: proCd,
        			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
        			//prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
        			prodGrpCd		: CoreSession.s_prodGrpCd,
//        			prodLineCd		: $('#pdaProdExamProdLine').val(),
        			itemCd 			: barcode
        		}),
        		async	: false,
                contentType: 'application/json; charset=utf-8',
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
        				Util.alert('MSG_MST_VAL_081'); //제품정보가 없습니다.
        				fnInit();

        			//!0: 조회된 데이터가 0건이 아닐때
        			//생산일자 유/무 개수 파악하여 분기
        			}else{
        				var dt = dt_grid[0];

        				var planItemCnt = 0;      // 생산계획   제품수
        				var nonPlanItemCnt = 0;   // 비생산계획 제품수
        				var totalItemCnt = 0;	  // 전체 제품수
            			for(var i in dt_grid){
    						if(dt_grid[i].PROD_INST_YMD == null){
    							nonPlanItemCnt++;
    						}else{
    							planItemCnt++;
    						}
    						totalItemCnt++;
            			}

            			//생산 계획 제품 == 0, 팝업.
            			if(planItemCnt == 0){

            				if(nonPlanItemCnt > 1){
            					fnProdItemPop(barcode);
            				}else{
            					//생산계획에 없는 데이터 입력
            					fnNotProdPlanDataSetting(dt);
            				}

            			//생산 계획 제품 == 1, 조회
            			//생산마감 유효성검사
            			//수출국가가 내수--> ''(빈칸, 공란), 수출--> 값 표시 및 팝업버튼 표시
            			//SNACK 제품일 경우 DALAT 여부 수정 가능.
            			}else if(planItemCnt == 1){
            				//생산계획 없는제품도 존재
//            				if(nonPlanItemCnt >= 1){
//            					fnProdItemPop();
//            				}else{
        		            	//생산계획 있는 데이터 세팅
//        		            	fnProdPlanDataSetting(dt);
//            				}
            				if($('input:checkbox[id="pdaProdExamItemChk"]').is(":checked") == true && totalItemCnt > 1){
            					fnProdItemPop(barcode);
            				} else {
            					fnProdPlanDataSetting(dt);
            				}


            			//생산 계획 제품 > 1, 팝업
            			//기본 데이터 입력, 수출국가 코드 검색팝업 띄움.
                		//SNACK 제품일 경우 DALAT 여부 수정 가능.
            			}else{
            				fnProdItemPop(barcode);
            			}
        			}
        		}
        	});
    	}
    }

    //생산 제품 조회 팝업
    function fnProdItemPop(barcode){
        PopApp.coreOpenPopup({
            ajaxUrl 	: '/pda/ctrl/common/pdaItemPop',
            id 			: 'modalItemPopup',
            width 		: '550',
            domainId	: "PWMCM111Q_P1",
            data		: {
        		proCd			: proCd,
    			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
    			//prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
    			prodGrpCd		: CoreSession.s_prodGrpCd,
//    			prodLineCd		: $('#pdaProdExamProdLine').val(),
    			itemCd 			: barcode
    		},
            visible		: true,
            fullScreen 	: true,
            onload 		: function(modal) {
//                var callBack ={
//                        "ITEM_CD"           : "pdaProdExamItemCd",
//                        "ITEM_NM"           : "pdaProdExamItemNm",
//                        "QTY"               : "pdaProdExamQty",
//                        "SHIFT_GROUP_CD"    : "pdaProdExamShiftGrpCd"
//                };
//                App.setElIds(callBack);
                modal.show();
            },
            callback 	: function(data){

            	//생산라인 로 생산계획있는제품인지, 없는제품인지 확인
            	if(data.PROD_LINE_CD == ''){
            		fnNotProdPlanDataSetting(data);
            	}else{
	            	//생산계획 있는 데이터 세팅
	            	fnProdPlanDataSetting(data);
            	}
            }
        });
    }

    //생산계획 있는 데이터 세팅
    function fnProdPlanDataSetting(data){
    	//생산중지 여부
    	if(data.USER_COL2 == 'N'){
    		Util.alert("MSG_INRI_ERR_035"); //생산 중지된 제품 입니다
    		fnInit();
    		return false;
    	}

		if(data.PROD_PROG_ST_CD == '30'){
			Util.alert('MSG_INRI_ERR_037'); //해당 제품은 생산마감된 라인 입니다.
//			$('#pdaProdExamDalat').attr('disabled', false);
			fnInit();
			return false;
		}

		//UOM 이상유무확인
    	if(data.PLT_PKQTY == '' || data.PLT_PKQTY == null || data.PLT_PKQTY == '9999999'){
    		Util.alert('MSG_INRI_VAL_065'); //파렛트입수가 없습니다.
    		fnInit();
    		return false;
    	}

		$('#pdaProdExamItemCd'		).val(data.ITEM_CD);
		$('#pdaProdExamItemNm'		).val(data.ITEM_NM);
		$('#pdaProdExamItemNm'		).text(data.ITEM_NM);
		$('#pdaProdExamProdGrpCd'	).val(CoreSession.s_prodGrp);
		$('#pdaProdExamProdLine'    ).val(data.PROD_LINE_CD);
	    $('#pdaProdExamQty'			).val(data.QTY);

	    //
//	    $('#pdaProdExamShiftGrpCd'	).val(data.SHIFT_GROUP_CD);
	    fnShiftGroup([{SHIFT_GROUP_CD : data.SHIFT_GROUP_CD}])

	    $('#pdaProdExamCountryCd'	).val(data.USER_COL4);
	    $('#pdaProdExamCountryNm'	).val(data.EXPORT_COUNTRY);
    	$('#pdaProdExamUomCd'		).text(data.UOM_CD);

//		$('#pdaProdExamQty').attr('disabled', 'disabled');
		if(data.LARGE_CLASS_CD == '04'){ //04: 스낵
			$('#pdaProdExamDalat').attr('disabled', false);
			$('#pdaProdExamDalat').val('N');
		}else{
			$('#pdaProdExamDalat').val('N');
		}

		//내수제품 D:내수, E:수출, D일때 수출국가수정 불가. E일때 수출국가수정가능
		if(data.LOCAL_EXPORT_GBN_CD == 'D'){
			$('#pdaProdExamCountryBtn').css('display', 'none');

		    $('#pdaProdExamCountryCd'	).val('84');
		    $('#pdaProdExamCountryNm'	).val('VIETNAM');

		}else{//수출
//			$('#pdaProdExamCountryBtn').css('display', 'block');
//
//		    $('#pdaProdExamCountryCd'	).val('');
//		    $('#pdaProdExamCountryNm'	).val('');
//
			//2019.04.18 E 일때, 빈칸 및 팝업 가능 이었지만, 인터페이스로 받기때문에
			//값을 넣어주고, 팝업 제거.
			$('#pdaProdExamCountryCd'	).val(data.USER_COL4);
		    $('#pdaProdExamCountryNm'	).val(data.EXPORT_COUNTRY);

			$('#pdaProdExamDalat').attr('disabled', 'disabled');

		}

		$('#pdaProdExamShiftGrpCd').attr('disabled', 'disabled');
//		$('#pdaProdExamProdGrp').attr('disabled', 'disabled');


		//내수/수출 구분 값 저장
		localExportGbnCdFlag = data.LOCAL_EXPORT_GBN_CD;
    }

    //생산계획에 없는 데이터 세팅
    function fnNotProdPlanDataSetting(data){
    	//생산중지 여부
    	if(data.USER_COL2 == 'N'){
    		Util.alert("MSG_INRI_ERR_035"); //생산 중지된 제품 입니다
    		fnInit();
    		return false;
    	}

		if(data.PROD_PROG_ST_CD == '30'){
			Util.alert('MSG_INRI_ERR_037'); //해당 제품은 생산마감된 라인 입니다.
//			$('#pdaProdExamDalat').attr('disabled', false);
			fnInit();
			return false;
		}

		//UOM 이상유무확인
    	if(data.PLT_PKQTY == '' || data.PLT_PKQTY == null || data.PLT_PKQTY == '9999999'){
    		Util.alert('MSG_INRI_VAL_065'); //파렛트입수가 없습니다.
    		fnInit();
    		return false;
    	}

    	if (confirm((Util.confirm('MSG_INRI_CFM_015')).msgTxt)) {//생산계획에 없는 데이터 입니다. 진행 하시겠습니까?

    		var sendData = {
    				itemCd		: data.ITEM_CD,
					prodInstYmd	: WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd)
    		}

    		//화면 로딩시 생산라인 콤보박스를 구성하고,
    		//생산계획에 없는 데이터는 생산라인을 조회하여 입력XXX, 선택함
    		$.ajax({
    			url			: '/pda/ctrl/inbound/pdaProdExam/listPdaProdExamNonPlanItem',
    			data		: JSON.stringify(sendData),
    			contentType	: 'application/json; charset=utf-8',
    			success		: function(data){
    				if(data.dt_grid.length != 0){
    					$('#pdaProdExamProdLine').val(data.dt_grid[0].PROD_LINE_CD);
//    					$('#pdaProdExamShiftGrpCd').val(data.dt_grid[0].SHIFT_GROUP_CD)
//												.attr('disabled', 'disabled');

    					fnChangeProdLine()
//    					fnShiftGroup(data.dt_grid);
//    					$('#pdaProdExamShiftGrpCd').val(data.dt_grid[0].SHIFT_GROUP_CD);
//    					$('#pdaProdExamShiftGrpCd'	).attr('disabled', false);
    				}else{
    					//그러나 라인정보가 없을 수 없음. 2019-03-25

    					//제품이 생산되었던 라인 정보가 없음.
    					$('#pdaProdExamShiftGrpCd'	).attr('disabled', false);
    					$('#pdaProdExamShiftGrpCd').empty();
    				}
    			}

    		});

			$('#pdaProdExamItemCd').val(data.ITEM_CD);
			$('#pdaProdExamItemNm').val(data.ITEM_NM);
			$('#pdaProdExamItemNm').text(data.ITEM_NM);
			$('#pdaProdExamProdGrpCd').val(CoreSession.s_prodGrp);
//			$('#pdaProdExamProdLine').val(data.PROD_LINE_CD);
		    $('#pdaProdExamQty').val(data.QTY);
//		    $('#pdaProdExamShiftGrpCd').val(data.SHIFT_GROUP_CD);
//		    $('#pdaProdExamShiftGrpCd').val('');
		    $('#pdaProdExamCountryCd').val(data.USER_COL4);
		    $('#pdaProdExamCountryNm').val(data.EXPORT_COUNTRY);
		    $('#pdaProdExamUomCd').text(data.UOM_CD);

//			$('#pdaProdExamQty').attr('disabled', 'disabled');
			if(data.LARGE_CLASS_CD == '04'){ //04: 스낵
				$('#pdaProdExamDalat').attr('disabled', false);
				$('#pdaProdExamDalat').val('N');
			}

//			//내수제품 D:내수, E:수출, D일때 수출국가수정 불가. E일때 수출국가수정가능
			if(data.LOCAL_EXPORT_GBN_CD == 'D'){
				$('#pdaProdExamCountryBtn').css('display', 'none');

			    $('#pdaProdExamCountryCd'	).val('84');
			    $('#pdaProdExamCountryNm'	).val('VIETNAM');

			}else{//수출
//				$('#pdaProdExamCountryBtn').css('display', 'block');
//
//			    $('#pdaProdExamCountryCd'	).val('');
//			    $('#pdaProdExamCountryNm'	).val('');

				//2019.04.18 E 일때, 빈칸 및 팝업 가능 이었지만, 인터페이스로 받기때문에
				//값을 넣어주고, 팝업 제거.
				$('#pdaProdExamCountryCd'	).val(data.USER_COL4);
			    $('#pdaProdExamCountryNm'	).val(data.EXPORT_COUNTRY);

				$('#pdaProdExamDalat').attr('disabled', 'disabled');
			}

			//생산조 활성화
			$('#pdaProdExamProdLine'	).attr('disabled', false);

//			$('#pdaProdExamProdGrp'		).attr('disabled', false);

			//내수/수출 구분 값 저장
			localExportGbnCdFlag = data.LOCAL_EXPORT_GBN_CD;
    	}else{
    		fnInit();
    	}
    }

    function fnConfirm(){
    	App.prcsStart();

    	if(workFlag){
    		return false;
    	}else{
    		workFlag = true;
    	}

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
		if($('#pdaProdExamProdLine').val() == ''){
			Util.alert('MSG_INRI_VAL_0063'); //생산라인 항목은 필수 입력 입니다.
			return false;
		}

		/** 검수 확정 로직*/
        if($('#pdaProdExamQty').val() <= 0 || $('#pdaProdExamQty').val() == ''){
            Util.alert('MSG_OUTRI_VAL_080'); //박스의 수는 0을 초과해야합니다.
            return false;
        }

      if($('#pdaProdExamQty').val().indexOf('.') > -1){
          Util.alert('MSG_COM_VAL_105'); //수량을 정수로만 입력 할수 있습니다.
          return false;
      }
//		if($('#pdaProdExamProdGrp').val() == ''){
//			Util.alert('MSG_INRI_VAL_064'); //생산조 항목은 필수 입력입니다.
//			return false;
//		}


		if($('#pdaProdExamDalat').val() == '' || $('#pdaProdExamDalat').val() == null){
			Util.alert('MSG_MST_VAL_074'); //DALAT 을 선택해주세요.
			return false;
		}
		if($('#pdaProdExamShiftGrpCd option:selected').val() == '' ||
				$('#pdaProdExamShiftGrpCd option:selected').val() == "null" ||
				$('#pdaProdExamShiftGrpCd option:selected').val() == undefined){
			Util.alert('MSG_MST_VAL_071'); //SHIFT 조 항목은 필수입력입니다.
			return false;
		}

//		//SHIFT 그룹명 4자리만 가능.
//		if($('#pdaProdExamShiftGrpCd').val().length != 4){
//			Util.alert('MSG_INRI_VAL_066'); //SHIFT 조를 정확히 입력해주세요(4자리)
//			return false;
//		}


		//내수/수출구분, 수출일때국가를 검색해야함
		if(localExportGbnCdFlag == 'E'){
			if($('#pdaProdExamCountryCd').val().trim() == ''){
				Util.alert('MSG_MST_VAL_070'); //수출국가는 필수입력입니다.
				return false;
			}
		}


		var sendData = {
				prodPlanYmd : WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
				//prodPlanYmd	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdExamProdYmd').val()),
//				prodPlanYmd	: $('#pdaProdExamProdYmd').val(), //날짜형식 그대로 보내 서버에서 형식 변환함.
//				prodGrpCd	: $('#pdaProdExamProdGrp').val(),
				prodGrpCd	: CoreSession.s_prodGrpCd,
				prodLineCd	: $('#pdaProdExamProdLine').val(),
				itemCd		: $('#pdaProdExamItemCd').val(),
				itemNm		: $('#pdaProdExamItemNm').val(),
				qty			: $('#pdaProdExamQty').val(),
				uom			: $('#pdaProdExamUomCd').text(),
				lotAttr1	: $('#pdaProdExamCountryCd').val(),
				countryNm	: $('#pdaProdExamCountryNm').val(),
				lotAttr2	: $('#pdaProdExamDalat').val(),
				shiftGrpCd	: $('#pdaProdExamShiftGrpCd option:selected').val()
		}
		App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaProdExam/updatePdaProdExam',
    		type 	: "POST",
    		async	: false,
    		data	: JSON.stringify(sendData),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){
    			workFlag = false;
    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				alert(data.msgTxt);
    				fnInit();
    			}

    		}, complete	: function(){
    			workFlag = false;
    		}
    	})
    }

    function fnCountryPop(){
        PopApp.coreOpenPopup({
            ajaxUrl 	: '/pda/ctrl/common/pdaCountryPop',
            id 			: 'modalCountryPopup',
            width 		: '550',
            domainId	: 'PWMCM120Q_P1',
            visible		: true,
            fullScreen 	: true,
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
	MobileUtil.getBarcode({
		callback : "PdaProdExamApp.fnCallbackBarcode",
	});

	PdaProdExamApp.init();
});
