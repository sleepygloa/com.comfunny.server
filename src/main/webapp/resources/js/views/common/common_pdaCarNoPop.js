/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 차량번호조회 팝업 [PdaObPickingSearchObNoApp]
 * Program Code     : PWMPDAOB104E_P2
 * Description      :
 * Revision History
 * Author          		Date           		Description
 * -------------		-------------		------------------
 * Hong Jeong Bo 	 	2018. 12. 05.  		First Draft.
 */
var PdaCarNoPopApp = function () {
	"use strict";

	//그리드
	var $pdaCarNoPopHGrid = $('#pdaCarNoPopHGrid');

	//
	var getData = $("#modalCarNoPop").PopAppGetData();

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB104E_P2';
	var proNm = 'pdaCarNoPop';

	//현재 날짜
	var workYmd = CoreSession.s_workYmd;

    return {
        init: function () {

    		fnList();

	    }
    };

    //그리드 조회
    function fnList(){
    	$pdaCarNoPopHGrid.paragonGrid({
            url			: '/pda/ctrl/common/listPdaCarNoPop',
            shrinkToFit : false,
            postData	: {
            	workYmd	:	WMSUtil.fnDateSetting.yyyymmdd(workYmd),
            },
            colModel: [
	             {editable: false,	name:'OB_NO', 		width:"100px", align:"center", hidden:true},
	             {editable: false,	name:'STORE', 		width:"100px", align:"center", hidden:true},
	             {editable: false,	name:'STORE_NM', 	width:"100px", align:"center", hidden:true},
	             {editable: false,	name:'RSTORE', 		width:"100px", align:"center", hidden:true},
	             {editable: false,	name:'RSTORE_NM', 	width:"100px", align:"center", hidden:true},
	             {editable: false,	name:'CAR_NO', 		width:"330px", align:"center"},

            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $pdaCarNoPopHGrid.getRowData( iRow );

                //callback 시 data 전송 및 팝업 닫기.
                App.callBackCasting(rowData);
                $("#modalCarNoPop").popupCallback(rowData);
                $("#modalCarNoPop").coreClosePopup();
            },
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaCarNoPopHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		//처음 불러올때 입고번호 포커스
            		$pdaCarNoPopHGrid.data('loadCount', 1);
            	}
          }
    	})
    }

}();

$(document).ready(function() {
	PdaCarNoPopApp.init();
});