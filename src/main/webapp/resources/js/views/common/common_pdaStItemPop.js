/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품 조회 팝업 [MasterZoneApp]
 * Program Code     :
 * Description      : 카데고리-브랜드-SKU-ITEM 으로 조회하는 팝업
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk       2017. 3. 02.        First Draft.
 */

var commonStItemPopApp = function(){
    "use strict";

	//프로그램 코드, 명
	var proCd = 'PWMPDAIB102E_P1';
	var proNm = 'pdaCommPltIdPop';

    var $stItemPopHGrid = $("#stItemPopHGrid");
    var $callBackInput;

	var getData = $("#modalStItemPopup").PopAppGetData();

	var pProCd = getData.proCd;
	console.log(pProCd);

    return{
        init: function(){

        	getList();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    function getList(){

    	$stItemPopHGrid.paragonGrid({
        url			: '/pda/ctrl/common/listGetItemCd',
        sortable	: true,
        postData 	: getData,
        shrinkToFit	: false,
        colModel	: [
            {name:'ITEM_CD',   width:"100px",	align: "center" },
            {name:'ITEM_NM',   width:"200px",	align: "center"	},
        ],
//        domainId	: "ITEM_LIST",
        ondblClickRow: function(id, iRow, iCol, e){
            var rowData = $stItemPopHGrid.getRowData( iRow );
            App.callBackCasting(rowData);
            $("#modalStItemPopup").popupCallback(rowData);
            $("#modalStItemPopup").coreClosePopup();
        }
      });
    }

    //재고조회 그리드
/*    function fnStInspList(){
      $itemPopGrid.paragonGrid({
        url			: '/pda/ctrl/common/listStInspItem',
        sortable	: true,
        postData 	: getData,
        shrinkToFit	: false,
        colModel	: [
            {name:'ITEM_CD',         		width:"100px",	align: "center" },
            {name:'ITEM_NM',          		width:"200px",	align: "center"	},
        ],
        ondblClickRow: function(id, iRow, iCol, e){
            var rowData = $itemPopGrid.getRowData( iRow );
            App.callBackCasting(rowData);
            $("#modalItemPopup").popupCallback(rowData);
            $("#modalItemPopup").paragonClosePopup();
        }
      });
    }*/

}();

$(document).ready(function() {
	commonStItemPopApp.init();
});