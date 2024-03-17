/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산마감 [PdaProdCloseApp]
 * Program Code     : PWMPDAIB205E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 12. 17.  		First Draft.
 */
var PdaProdCloseApp = function () {
	"use strict";

	//그리드
	var $pdaProdCloseHGrid = $('#pdaProdCloseHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB205E';
	var proNm = 'pdaProdClose';

	//CALLBACK Flag
	var collbackFlag = true;

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('pdaProdCloseProdGrp', 'PROD_GRP_CD', CoreSession.s_prodGrpCd);

        	WMSUtil.fnCombo.prodDept('pdaProdCloseProdLine',  'PROD_LINE_CD', '', '');

        	fnEvents();

        	fnList();

	    }
    };

    //이벤트
    function fnEvents(){

		//작업일자, 생산일자
		var workYmd = CoreSession.s_workYmd;
		if(workYmd != undefined){
			$('#pdaProdCloseProdYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#pdaProdCloseProdYmdDatePicker').datepicker("setDate", new Date());
		}

    	//생산마감 버튼 클릭
    	$('#pdaProdCloseConfirmBtn').click(function(){
    		fnConfirm();
    	})

    	//콤보박스 데이터 변경시 그리드 재조회
    	$('#pdaProdCloseProdYmd').change(function(){
    		fnSearch();
    	});
		$('#pdaProdCloseProdGrp').change(function(){
			fnSearch();
    	});
		$('#pdaProdCloseProdLine').change(function(){
			fnSearch();
		});
    }

    //제품코드 검색
    function fnSearch(){
    	$pdaProdCloseHGrid.paragonGridSearch(sendData());
    }

    //조회 데이터
    function sendData(){
    	return {
    		prodYmd		: WMSUtil.fnDateSetting.yyyymmdd($('#pdaProdCloseProdYmd').val()),
    		prodGrpCd	: $('#pdaProdCloseProdGrp').val(),
    		prodLineCd	: $('#pdaProdCloseProdLine').val()
    	}
    }

    //그리드 초기화
    function fnList(){
    	$pdaProdCloseHGrid.paragonGrid({
            url				: '/pda/ctrl/inbound/pdaProdClose/listPdaProdClose',
//            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
//            rownumbers		: true,
            shrinkToFit		: false,
            postData		: sendData(),
            height			: '250',
            colModel		: [
                               {editable: false, name:'ITEM_CD',			width:"100px", align:"center", 	hidden:true},
                               {editable: false, name:'ITEM_NM',			width:"200px", align:"left",   	hidden:true},
                               {editable: false, name:'ITEM',				width:"150px", align:"left"},
                               {editable: false, name:'PLAN',				width:"50px",  align:"right", 	formatter :"integer"},
                               {editable: false, name:'RESULT',				width:"50px",  align:"right", 	formatter :"integer"},
                               {editable: false, name:'DIFFR',				width:"50px",  align:"right", 	formatter :"integer",
                             	  cellattr: function(rowId, tv, rowObject, cm, rdata) {
                            		  var value = WMSUtil.grid.fomatter.integerNotComma(tv);
                            		  if(value < 0){
                            			  return 'style="color:#ff0000;"' //RED
                            		  }
                            	  }
                               },
                               {editable: false, name:'PROD_PLAN_QTY',		width:"100px", align:"right", 	formatter :"integer", 	hidden:true},
                               {editable: false, name:'PROD_QTY',			width:"100px", align:"right", 	formatter :"integer", 	hidden:true},
                               {editable: false, name:'DIFFR_QTY',			width:"100px", align:"right", 	formatter :"integer", 	hidden:true},
            ],
            pager			: "#prodPlanInqDetailGridNavi",
            rowClickFocus	: true,
            gridComplete	: function(){

            	//생산 마감 완료된 데이터는 0, 생산 검수 중인 데이터는 1이상
            	var gridRowLength = $pdaProdCloseHGrid.getDataIDs().length;
            	//마감
            	if(gridRowLength == 0){
            		$('#pdaProdCloseEndBtn').css('display', 'block');
            		$('#pdaProdCloseConfirmBtn').css('display', 'none');
            	//검수중
            	}else{
            		$('#pdaProdCloseEndBtn').css('display', 'none');
            		$('#pdaProdCloseConfirmBtn').css('display', 'block');
            	}

            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);
            }
        });
    }


    //생산마감
    function fnConfirm(){

    	if (!confirm((Util.confirm('MSG_INRI_CFM_013')).msgTxt)) return; //마감하시겠습니까?

    	App.prcsStart();
    	$.ajax({
    		url		: '/pda/ctrl/inbound/pdaProdClose/updatePdaProdClose',
    		type 	: "POST",
    		data	: JSON.stringify(sendData()),
            contentType: 'application/json; charset=utf-8',
    		success : function(data){

    			if(data.stsCd == 100){
    				alert(data.msgTxt);
    				return false;
    			}else{
    				alert(data.msgTxt);
    				$pdaProdCloseHGrid.paragonGridSearch();
    			}

    		}
    	})
    }

}();

$(document).ready(function() {
	PdaProdCloseApp.init();
});
