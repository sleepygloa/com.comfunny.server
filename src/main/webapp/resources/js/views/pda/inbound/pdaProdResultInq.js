/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산실적조회 [PdaProdResultInqApp]
 * Program Code     : PWMPDAIB206E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 12. 11.  		First Draft.
 */
var bindData = {};
var PdaProdResultInqApp = function () {
	"use strict";

	//그리드
	var $pdaProdResultInqHGrid = $('#pdaProdResultInqHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB206E';
	var proNm = 'pdaProdResultInq';

	//CALLBACK Flag
	var collbackFlag = true;

	//enter trigger code
    var enterCode = $.Event("keypress");
    enterCode.keyCode = 13; // # Some key code value

    var firstLoad = true;
    var page = 0;
    var pageLength = 0;
    var pageDataArr = [];
    var pageData = null;

    var arrowDisabled = '#b4b4b4';
    var arrowEnabled   = '#555';

    return {
        init: function () {

        	fnList()

        	WMSUtil.fnCombo.prodDept('pdaProdResultInqProdDept', 'PROD_DEPT_CD');

        	WMSUtil.fnCombo.selectBox('pdaProdResultInqProdGrp', 'PROD_GRP_CD', CoreSession.s_prodGrpCd);

        	WMSUtil.fnCombo.prodLine('pdaProdResultInqProdLine',  'PROD_LINE_CD', $('#pdaProdResultInqProdDept option:selected').val());

        	WMSUtil.fnCombo.selectBox('pdaProdResultInqDalat',  'YN', 'N');

        	fnEvents();

        	fnSearch();

	    }
    };


    function fnEvents(){

//    	WMSUtil.pwaGridDynamicArea(proNm);

		//작업일자
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaProdResultInqProdYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaProdResultInqProdYmdDatePicker').datepicker("setDate", new Date());
		}

    	//생산부서-생산라인 이벤트
    	$('#pdaProdResultInqProdDept').change(function(){
    		$('#pdaProdResultInqProdLine').empty();
    		WMSUtil.fnCombo.prodLine('pdaProdResultInqProdLine', 'PROD_LINE_CD', $(this).val());
    	});

    	//생산부서 변경 시 초기화
    	$('#pdaProdResultInqProdDept').change(function(){
    		fnSearch();
    	})

    	//날짜 변경 시 초기화
    	$('#pdaProdResultInqProdYmd').change(function(){
    		fnSearch();
    	})

    	//생산조 변경 시 초기화
    	$('#pdaProdResultInqProdGrp').change(function(){
    		fnSearch();
    	})

    	//생산라인 변경 시 초기화
    	$('#pdaProdResultInqProdLine').change(function(){
    		fnSearch();
    	})

    	//왼쪽 버튼 클릭
    	$('#pdaProdResultInqLeftBtn').click(function(){
    		//페이지 개수가 있을때
    		//왼쪽 끝에서 선택시 제일 마지막으로
//    		if(pageLength != 0){
//    			if(page != 0){
//    				--page;
//    			}else{
//    				page = pageLength;
//    			}
//    			fnResultDataSet(page);
//    		}
    		//왼쪽 끝에서 선택시 제일 마지막으로
    		if(pageLength != 0){
    			if(page != 0){
    				--page;
    				fnArrowYn(page);
    				fnResultDataSet(page);

    			}else{
    				fnArrowYn(page);
//    				page = pageLength;
    			}
    		}
    	});

    	//오른쪽 버튼 클릭
    	$('#pdaProdResultInqRightBtn').click(function(){
    		//페이지 개수가 있을때
    		//오른쪽 끝에서 선택시 제일 처음으로
//    		if(pageLength != 0){
//    			if(page != pageLength){
//    				++page;
//    			}else{
//    				page = 0;
//    			}
//
//    			fnResultDataSet(page);
//    		}
    		//오른쪽 끝에서 선택시 제일 처음으로
    		if(pageLength != 0){
    			if(page != pageLength){
    				++page;
    				fnArrowYn(page);
    				fnResultDataSet(page);

    			}else{
    				fnArrowYn(page);
    			}
    		}
    	});

    	//인쇄버튼
    	$('#pdaProdResultInqPrintBtn').click(function(){
    		fnPrint();
    	});

    	//삭제버튼
    	$('#pdaProdResultDeleteBtn').click(function(){
    		fnDel();
    	});


    	//접기
    	$('div.foldToggle').click(function (e) {

    		if($('div.fold.active').length == 0){
    			$('div.fold').addClass('active');
    		}else{
    			$('div.fold').removeClass('active');
    		}
    	});

    }

    //초기화
    function fnInit(){

    	//제품 코드 초기화
    	$('#pdaProdResultInqItemCd').text('');

    	//그리드 초기화
    	$pdaProdResultInqHGrid.jqGrid('clearGridData');

    	//표 초기화
		$('#pdaProdResultInqPlanPltQty'	 ).text('');
		$('#pdaProdResultInqPlanBoxQty'  ).text('');
		$('#pdaProdResultInqResultPltQty').text('');
		$('#pdaProdResultInqResultBoxQty').text('');
		$('#pdaProdResultInqDiffrPltQty' ).text('');
		$('#pdaProdResultInqDiffrBoxQty' ).text('');
		page = 0;
    }

    //화살표 Disabled 처리
    function fnArrowYn(i){
    	if(i == 0){
    		if(pageLength == 0){
    			$('#pdaProdResultInqLeftBtn' ).css('color', arrowDisabled);
        		$('#pdaProdResultInqRightBtn').css('color', arrowDisabled);
    		}else{
    			$('#pdaProdResultInqLeftBtn' ).css('color', arrowDisabled);
    			$('#pdaProdResultInqRightBtn').css('color', arrowEnabled);
    		}
    	}else if(i == pageLength){
    		$('#pdaProdResultInqLeftBtn' ).css('color', arrowEnabled);
    		$('#pdaProdResultInqRightBtn').css('color', arrowDisabled);
    	}else{
    		$('#pdaProdResultInqLeftBtn' ).css('color', arrowEnabled);
    		$('#pdaProdResultInqRightBtn').css('color', arrowEnabled);
    	}
    }

    //조회
    function fnSearch(){
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaProdResultInq/listProdResultItem',
    		type 	: "POST",
    		data	: sendData(),
    		height	: "100px",
//            contentType: 'application/json; charset=utf-8',
    		success : function(data){

    			pageDataArr.length = 0;
    			fnInit();

    			//dt_table임.
    			if(data.length != 0){

    				//페이지 개수 저장
    				pageLength = data.length-1;

    				//처음 검색시 page = 0 일때 왼쪽 화살표 disabled 표시
    				fnArrowYn(page);

    				//화면 오픈시 조회
					pageDataArr = data;

					$("div.fold").removeClass("active");

					fnResultDataSet(0);

    			}else{
    				$pdaProdResultInqHGrid.paragonGridLocalSearch(pageDataArr);
    			}


    		}
    	})
    }

    function fnResultDataSet(i){

    	$pdaProdResultInqHGrid.jqGrid('clearGridData');

    	//데이터 입력
    	//제품코드입력
		$('#pdaProdResultInqItemCd').text(pageDataArr[i][0].ITEM_LIST);

		var removeNullList = [];

		//null 인 데이터 list 에서 제거
		for(var j = 0; j < pageDataArr[i].length; j++){
			if(pageDataArr[i][j].LOT_ATTR3 == null){
			}else{
				removeNullList.push(pageDataArr[i][j]);
			}
		}

		//그리드
		$pdaProdResultInqHGrid.paragonGridLocalSearch(removeNullList);
//		$pdaProdResultInqHGrid.paragonGridLocalSearch(pageDataArr[i]);

		//표 입력
		$('#pdaProdResultInqPlanPltQty'  ).text(thousandSeparatorCommas(pageDataArr[i][0].PROD_PLAN_PLT_QTY));
		$('#pdaProdResultInqPlanBoxQty'  ).text(thousandSeparatorCommas(pageDataArr[i][0].PROD_PLAN_BOX_QTY));
		$('#pdaProdResultInqResultPltQty').text(thousandSeparatorCommas(pageDataArr[i][0].PROD_PLT_QTY));
		$('#pdaProdResultInqResultBoxQty').text(thousandSeparatorCommas(pageDataArr[i][0].PROD_BOX_QTY));
		$('#pdaProdResultInqDiffrPltQty' ).text(thousandSeparatorCommas(pageDataArr[i][0].DIFFR_PLT_QTY));
		$('#pdaProdResultInqDiffrBoxQty' ).text(thousandSeparatorCommas(pageDataArr[i][0].DIFFR_BOX_QTY));

		//실적차이수량이 - 이면 빨간색 표시
		if(pageDataArr[i][0].DIFFR_PLT_QTY < 0){
			$('#pdaProdResultInqDiffrPltQty').css('color', '#FF0000');
		}
		if(pageDataArr[i][0].DIFFR_BOX_QTY < 0){
			$('#pdaProdResultInqDiffrBoxQty').css('color', '#FF0000');
		}

    }

    //데이터
    function sendData(){
    	return {
			prodInstYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdResultInqProdYmd').val()),
			prodDeptCd		: $('#pdaProdResultInqProdDept').val(),
			prodGrpCd		: $('#pdaProdResultInqProdGrp' ).val(),
			prodLineCd		: $('#pdaProdResultInqProdLine').val(),
//			itemCd 			: $('#pdaProdResultInqItemCd').val()
    	}
    }


    //그리드 조회
    function fnList(data){
    	$pdaProdResultInqHGrid.paragonGrid({
            sortable	: true,
            data		: data,
            datatype	: "local",
            rownumbers	: true,
    		multiselect	: true,
//    		multiselectone : true,
            height		: "190px",
            colModel	: [
        	   	{name:'LOT_ATTR3',	 			width:"100px",	align: "center"	},
                {name:'QTY',          			width:"80px",	align: "right"	},
                {name:'PLT_ID',       			width:"150px",	align: "center"	},
                {name:'ITEM_CD',       			width:"100px",	align: "center", hidden:true	},
                {name:'ITEM_NM',       			width:"100px",	align: "center", hidden:true	},
                {name:'DC_CD',       			width:"100px",	align: "center", hidden:true	},
                {name:'MAKE_LOT',      			width:"100px",	align: "center", hidden:true	},
//                {name:'PROD_INST_YMD',       	width:"100px",	align: "center", hidden:true	},
//                {name:'PROD_YMD',       		width:"100px",	align: "center", hidden:true	},
                {name:'MAKE_DT',       			width:"100px",	align: "center", hidden:true	},
                {name:'UOM',       				width:"100px",	align: "center", hidden:true	},
                {name:'MM', 		      		width:"100px",	align: "center", hidden:true	},//도메인없음.
                {name:'EXPORT_COUNTRY',       	width:"100px",	align: "center", hidden:true	},//도메인없음.

            ],
            gridComplete : function(){
            	$('th[id^=pdaProdResultInqHGrid]').css('height', '20px');

            	$('td[aria-describedby^=pdaProdResultInqHGrid_]').css('height', '20px');
//            	var tr = $('#pdaProdResultInqHGrid tbody tr');
//            	tr.find('td').not().css('height', '30px');
//            	console.log(tr.find('td'))
//            	console.log(tr.find('td').not(firstChild))

            }
//            domainId	: "ITEM_LIST",
    	})
    }


    //인쇄
    function fnPrint(){
//    	var rowId = $pdaProdResultInqHGrid.jqGrid('getGridParam','selarrrow');
//
//        if(rowId.length < 1){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return false;
//        }
//
//        var gridData = $pdaProdResultInqHGrid.getRowData(rowId);
//
//        var data = {
//        		itemCd			: gridData.ITEM_CD,
//        		itemNm			: gridData.ITEM_NM,
//        		makeLot			: gridData.MAKE_LOT,
//        		exportCountry	: gridData.EXPORT_COUNTRY,
//        		makeYmd			: gridData.MAKE_YMD,
//        		mm				: gridData.MM,
//        		qty				: gridData.QTY,
//        		uom				: gridData.UOM,
//        		pltId			: gridData.PLT_ID,
//        		prodPlanYmd		: gridData.PROD_INST_YMD,
//        		proCd			: proCd
//        }


        var rowData = {
        		itemCd			: "ITEM_CD",
        		itemNm			: "ITEM_NM",
        		makeLot			: "MAKE_LOT",
        		exportCountry	: "EXPORT_COUNTRY",
        		makeDt			: "MAKE_DT",
        		mm				: "MM",
        		qty				: "QTY",
        		uom				: "UOM",
        		pltId			: "PLT_ID",
//        		prodPlanYmd		: "PROD_INST_YMD"
        }

        //1. 널 검사
        var chkData = $pdaProdResultInqHGrid.getSelectedJsonData("dt_data", rowData);
        if(chkData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

		App.prcsStart();
    	$.ajax({
    		url			: '/pda/ctrl/inbound/pdaProdResultInq/listProdResultInqRePrint',
    		type 		: "POST",
    		height		: "100px",
    		data		: chkData,
            contentType	: 'application/json; charset=utf-8',
    		success 	: function(data){
    			if(data.stsCd == 200){
    				alert(data.msgTxt);
    			}else{
    				alert(data.msgTxt);
    				return false;
    			}

			}
    	});
    }

    // 삭제
    function fnDel(){
    	var rowId = $pdaProdResultInqHGrid.jqGrid('getGridParam','selarrrow');

        if(rowId.length < 1){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        if(rowId.length != 1) {
        	Util.alert('MSG_COM_VAL_112');	// 한개 의 행만 선택하세요.
        	return false;
        }
//
//        var gridData = $pdaProdResultInqHGrid.getRowData(rowId);
//
//        var data = {
//        		itemCd			: gridData.ITEM_CD,
//        		itemNm			: gridData.ITEM_NM,
//        		makeLot			: gridData.MAKE_LOT,
//        		exportCountry	: gridData.EXPORT_COUNTRY,
//        		makeYmd			: gridData.MAKE_YMD,
//        		mm				: gridData.MM,
//        		qty				: gridData.QTY,
//        		uom				: gridData.UOM,
//        		pltId			: gridData.PLT_ID,
//        		prodPlanYmd		: gridData.PROD_INST_YMD,
//        		proCd			: proCd
//        }


        if (confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) {//삭제하시겠습니까?

	        var rowData = {
	        		itemCd			: "ITEM_CD",
	        		itemNm			: "ITEM_NM",
	        		makeLot			: "MAKE_LOT",
	        		exportCountry	: "EXPORT_COUNTRY",
	        		makeDt			: "MAKE_DT",
	        		mm				: "MM",
	        		qty				: "QTY",
	        		uom				: "UOM",
	        		pltId			: "PLT_ID",
	//        		prodPlanYmd		: "PROD_INST_YMD"
	        }

	        //1. 널 검사
	        var chkData = $pdaProdResultInqHGrid.getSelectedJsonData("dt_data", rowData);
	        if(chkData == false){
	            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
	            return false;
	        }

			App.prcsStart();
	    	$.ajax({
	    		url			: '/pda/ctrl/inbound/pdaProdResultInq/updateProdResultInqDel',
	    		type 		: "POST",
	    		height		: "100px",
	    		data		: chkData,
	            contentType	: 'application/json; charset=utf-8',
	    		success 	: function(data){
	    			if(data.stsCd == 200){
	    				alert(data.msgTxt);
	    				fnSearch();
	    			}else{
	    				alert(data.msgTxt);
	    				return false;
	    			}

				}
	    	});
        }
    }

    //천단위 콤마.
    function thousandSeparatorCommas ( number ){
   	 	var string = "" + number;  // 문자로 바꾸기.
   	 	string = string.replace( /[^-+\.\d]/g, "" )  // ±기호와 소수점, 숫자들만 남기고 전부 지우기.
   		var regExp = /^([-+]?\d+)(\d{3})(\.\d+)?/;  // 필요한 정규식.
   	 	while ( regExp.test( string ) ) string = string.replace( regExp, "$1" + "," + "$2" + "$3" );  // 쉼표 삽입.
   	 return string;
   }
}();

$(document).ready(function() {
	PdaProdResultInqApp.init();
});
