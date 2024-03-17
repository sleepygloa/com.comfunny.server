/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 재고상태변경 [pdaStStateChangeApp]
 * Program Code     : PWMPDAST104E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 26.  		First Draft.
 */
var pdaStStateChangeApp = function () {
	"use strict";

	var $pdaStStateChangeHGrid = $('#pdaStStateChangeHGrid');
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStStateChange';

    return {
        init: function () {

    		fnEvents();

    		fnList();

	    }
    };


    function fnList(){
    	$pdaStStateChangeHGrid.paragonGrid({
            url: '/pda/ctrl/stock/pdaStStateChange/listPdaStStateChangeD',
            rowEditable		: false,
//          rowClickFocus	: true,
            cellEditable	: false,
            sortable		: false,
            shrinkToFit		: false,
            postData: {
            	locCd 		:  "Undefined locCd",
            	itemCd 		:  "Undefined itemCd",
            	itemStChgNo :  "Undefined itemStChgNo",
            },
            colModel: [
                       {editable: false,name:'LOC', 		width:"100px", align:"center"},
                       {editable: false,name:'ITEM_CD', 	width:"100px", align:"center"},
                       {editable: false,name:'ITEM_NM', 	width:"120px", align:"center"},
                       {editable: false,name:'ITEM_ST', 	width:"70px",  align:"right" },
                       {editable: false,name:'STOCK_QTY',	width:"70px",  align:"right" },

                       {editable: false,name:'STD_UOM_CD',	width:"100px",  hidden:true },
                       {editable: false,name:'CONV_UOM_CD',	width:"100px",  hidden:true },
                       {editable: false,name:'FR_PLT_ID',	width:"100px",  hidden:true },
                       {editable: false,name:'ITEM_ST_CHG_NO',			width:"100px",  hidden:true },
                       {editable: false,name:'ITEM_ST_CHG_DETAIL_SEQ',	width:"100px",  hidden:true },
            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var iRow = $pdaStStateChangeHGrid.getGridParam("selrow");
                var rowData = $pdaStStateChangeHGrid.getRowData( iRow );

                //Paragon Popup.
                PopApp.coreOpenPopup({
                    ajaxUrl	: "/pda/ctrl/stock/pdaStStateChange/pdaStStateChangeDetailPop",
                    data 	: {rowData: rowData},
                    id		: "pdaStStateChangeDetailPop",
                    domainId: "PWMPDAST104E_P2",
                    fullScreen : true,
                    onload: function(modal) {
                    	App.setElIds();
                        modal.show();
                    }
                });
            },
            gridComplete : function(){

            	//caption 총건수
            	/*
 				$('.captionRowCount').remove();
            	var count = $pdaStStateChangeHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
 				*/
            	var ids = $pdaStStateChangeHGrid.jqGrid("getDataIDs");
            	if(ids.length > 0){
            		//조회 대상의 첫 로우의 값을
            		$("#pdaStStateChangeStInspDtlSeq").val($pdaStStateChangeHGrid.getRowData(ids[0]).STOCK_INSP_DETAIL_SEQ);
            	}


            },
            onSelectRowEvent: function(currRowData,prevRowData){
            	$("#pdaStStateChangeTgtLocCd").val(currRowData.TGT_LOC);
            }
    	})
    }

    function fnEvents(){
    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
		$(document).keydown(function(event){
			if(event.keyCode == 13) {

				var objId = event.target.id;
				if (objId == 'pdaStStateChangeItemStChgNo'){
					$('#pdaStStateChangeItemStChgNo').blur();
					fnItemStChgNoSearch();
				}

				event.preventDefault();

				return false;
			}
		});


       	$('#pdaStInspNoBtn').on('click', function(){
       		fnItemStChgNoSearch();
		});

       	$('#pdaStStateChangeAuthBtn').on('click', function(){
       		fnStStateChangeListSearch();
		});

    }



    function fnItemStChgNoSearch(){

        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/stock/pdaStStateChange/pdaStStateChangeNoInquiryPop",
            id			: "pdaStStateChangeNoInquiryPop",
            domainId	: "PWMPDAST104E_P1",
            fullScreen 	: true,
            onload		: function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack = {
                		"ITEM_ST_CHG_NO" 	:   "pdaStStateChangeItemStChgNo",
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    function fnStStateChangeListSearch(){

   		var itemStChgNo = $('#pdaStStateChangeItemStChgNo').val();
   		var tgtLoc 	 	= $('#pdaStStateChangeTgtLocCd').val();
   		var itemCd 	 	= $('#pdaStStateChangeItemCd').val();

   		if(itemStChgNo != ''&& tgtLoc != '' && itemCd != ''){
			var data = {
					itemStChgNo : itemStChgNo,
					locCd 		: tgtLoc,
					itemCd		: itemCd
			};

			$pdaStStateChangeHGrid.paragonGridSearch(data);
		}

	}

}();

$(document).ready(function() {
	pdaStStateChangeApp.init();
});