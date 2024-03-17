/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 수출국가 팝업 [PdaCountyPopApp]
 * Program Code     : PWMPDAIB101E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaCountyPopApp = function () {
	"use strict";

	//그리드
	var $countryPopHGrid = $('#countryPopHGrid');

	var getData = $("#modalCountryPopup").PopAppGetData();

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'countryPop';

    return {
        init: function () {

    		fnList();

	    }
    };

    function fnList(){
    	$countryPopHGrid.paragonGrid({
            url				: '/pda/ctrl/common/listCountry',
            shrinkToFit 	: false,
            sortable		: true,
            colModel		: [
                {editable: false, name:'CLIENT_CD', 	width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'COUNTRY_CD', 	width:"100px", align:"center", 	hidden: true},
                {editable: false, name:'COUNTRY', 		width:"100px", align:"center"	},
            ],
            //행 더블클릭 -> 팝업창 닫기, 데이터 콜백
            ondblClickRow: function(id, iRow, iCol, e){
                var rowData = $countryPopHGrid.getRowData( id );
                //callback 시 data 전송 및 팝업 닫기.

                App.callBackCasting(rowData);
                $("#modalCountryPopup").popupCallback(rowData);
                $("#modalCountryPopup").coreClosePopup();
            },
            gridComplete:function(){
            	WMSUtil.pwaGridDynamicArea(proNm);

            	var width = $('.ui-jqgrid-bdiv').css('width');

            	//한개컬럼있을때 동적으로 테이블전체로 채우기
            	$('#countryPopHGrid_COUNTRY').css('width', width);
            	$('#countryPopHGrid').css('width', width);

//            	$(window).on('resize.jqGrid', function () {
//            		$countryPopHGrid.jqGrid( 'setGridWidth', $("#countryPopContainer").width() );
//            	});

            }
    	})
    }


}();

$(document).ready(function() {
	PdaCountyPopApp.init();
});