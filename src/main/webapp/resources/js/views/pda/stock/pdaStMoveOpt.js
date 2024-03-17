/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고이동(임의)[PdaStMoveOptApp]
 * Program Code     : PWMPDARO101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStMoveOptApp = function () {
	"use strict";

	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStMoveOpt';

    return {
        init: function () {

        	setUI();
    		getEvents();

	    }
    };

    function setUI(){
    	WMSUtil.pwaGridDynamicArea(proNm);
    }

    function getEvents(){
    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
		$(document).keydown(function(event){
			if(event.keyCode == 13) {

				var objId = event.target.id;
				if (objId == 'pdaStMoveOptTgtLoc'){
					$('#pdaStMoveOptTgtLoc').blur();
					//fnGridSearch();
				}

				event.preventDefault();

				return false;
			}
		});

       	$('#pdaStMoveOptSearchBtn').on('click', function(){
       		var dataParam = true;
       		fnStOptMoveSearch(dataParam);
		});

       	$('#pdaStMoveOptTgtLocBtn').on('click', function(){
       		fnStOptMoveSearch();
		});

       	$('#pdaStMoveOptConfirmBtn').on('click', function(){
       		fnStOptMoveConfirm();
		});

    }

    function fnStOptMoveSearch(dataParam){

   		var tgtPltId = $('#pdaStMoveOptTgtPltId').val();

		if(tgtPltId == '' || dataParam == true){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/stock/pdaStMoveOpt/pdaStMoveOptNoInquiryPop",
                id			: "pdaStMoveOptNoInquiryPop",
                domainId	: "PWMPDAST102E_P1",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                    		"LOC" 		:   "pdaStMoveOptTgtLoc",
                    		"PLT_ID"	:	"pdaStMoveOptTgtPltId"
                    };
                    App.setElIds(callBack);
                    modal.show();
                }
            });
		}

   		var toLoc = $('#pdaStMoveOptToLoc');
		if(toLoc.val() == ''){
			toLoc.focus();
		}

	}

    function fnStOptMoveConfirm(){
    	var toLoc = $('#pdaStMoveOptToLoc').val();
    	var tgtPltId = $('#pdaStMoveOptTgtPltId').val();
    	var tgtLoc = $('#pdaStMoveOptTgtLoc').val();

    	var dataSet = {
    			toLoc 		: toLoc,
    			tgtPltId 	: tgtPltId,
    			tgtLoc 		: tgtLoc
    	};

		if(toLoc != '' && tgtPltId != ''  && tgtLoc != '' ){
console.log("OptMoveConfirm fnSave Complete!", dataSet);
		}
    }

}();

$(document).ready(function() {
	PdaStMoveOptApp.init();
});