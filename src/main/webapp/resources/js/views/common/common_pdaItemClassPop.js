/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품분류 조회 팝업 [PdaItemClassPopApp]
 * Program Code     :
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * Hong Jeong Bo 	2018. 10. 17.  		First Draft.
 */
var PdaItemClassPopApp = function () {
	"use strict";

	//그리드
	var $pdaItemClassPopHGrid = $('#pdaItemClassPopHGrid');

	//프로그램 코드, 명
	var proCd = '';
	var proNm = 'pdaItemClassPop';

	var getData = $("#modalItemClassPopup").PopAppGetData();

    return {
        init: function () {

        	WMSUtil.fnCombo.itemClassLarge('pdaItemClassPopLargeClassCd', 'pdaItemClassPopMiddleClassCd', 'pdaItemClassPopSmallClassCd', '/pda', 'Y');

        	fnEvents();

    		fnList();

	    }
    };

    //이벤트
    function fnEvents(){
    	//제품 조회
    	$('#pdaItemClassPopSearchBtn').click(function(){
    		fnGridSearch();
    	});

    	$('#pdaItemClassPopItemNm').keydown(function(e){
    		if(e.keyCode == 13 || e.keyCode == 9){
    			fnGridSearch();
    		}
    	})

//    	//콤보박스 변경시 그리드 조회
//    	$('#pdaItemClassPopLargeClassCd').change(function(){
//    		fnGridSearch();
//    	});
//    	$('#pdaItemClassPopMiddleClassCd').change(function(){
//    		fnGridSearch();
//    	});
//    	$('#pdaItemClassPopSmallClassCd').change(function(){
//    		fnGridSearch();
//    	});

    }

    //그리드 조회
    function fnList(){
    	$pdaItemClassPopHGrid.paragonGrid({
            url			: '/pda/ctrl/common/listItemClassPop',
//            sortable	: true,
            shrinkToFit	: false,
            //multiselect	: true,
            postData	: { itemNm : $('#'+proNm+'itemNm').val()},
            firstData	: false,
            colModel	: [
                {editable: false, name:'ITEM_CD',	width:"100px", align:"center"},
                {editable: false, name:'ITEM_NM', 	width:"200px", align:"left"},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaItemClassPopHGrid.getRowData(iRow);

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#modalItemClassPopup").popupCallback(rowData);
                $("#modalItemClassPopup").coreClosePopup();
            },
            gridComplete : function(){
            	//UI 세팅
            	WMSUtil.pwaGridDynamicArea(proNm);
            }
    	})
    }

    //조회
    function fnGridSearch(){
		$pdaItemClassPopHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
        	itemNm 			: $('#pdaItemClassPopItemNm').val(),
            largeClassCd    : $('#pdaItemClassPopLargeClassCd').val(),
            middleClassCd   : $('#pdaItemClassPopMiddleClassCd').val(),
            smallClassCd    : $('#pdaItemClassPopSmallClassCd').val()
    	}
    }

}();

$(document).ready(function() {
	PdaItemClassPopApp.init();
});