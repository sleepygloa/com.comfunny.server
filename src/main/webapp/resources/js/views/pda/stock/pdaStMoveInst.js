/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 지시이동[PdaStMoveInstApp]
 * Program Code     : PWMPDARO101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaStMoveInstApp = function () {
	"use strict";

	var $pdaStMoveInstHGrid = $('#pdaStMoveInstHGrid');
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStMoveInst';

    return {
        init: function () {

    		getEvents();
    		getList();

	    }
    };


    function getList(){
    	$pdaStMoveInstHGrid.paragonGrid({
            url: '/pda/ctrl/stock/pdaStMoveInst/listPdaStMoveInstD',
            rowEditable		: false,
//          rowClickFocus	: true,
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
            postData: {
            	moveNo :  "gridDrawing",
            },
            colModel: [
                       {editable: false,name:'TGT_LOC', 	width:"100px", align:"center"},
                       {editable: false,name:'ITEM_CD', 	width:"100px", align:"center"},
                       {editable: false,name:'ITEM_NM', 	width:"100px", align:"center"},
                       {editable: false,name:'INST_QTY', 	width:"100px", align:"center"},
                       {editable: false,name:'MOVE_LOC',	width:"150px", align:"left"	 },
                       {editable: false,name:'PLT_ID',		width:"150px", align:"left"  },

                       {editable: false,name:'UOM',			width:"100px", hidden:true},
                       {editable: false,name:'CONV_UOM_QTY',width:"100px", hidden:true},
                       {editable: false,name:'ITEM_ST_CD', 	width:"100px", hidden:true},
                       {editable: false,name:'STD_UOM_CD', 	width:"100px", hidden:true},
                       {editable: false,name:'CONV_UOM_CD', width:"100px", hidden:true},
                       {editable: false,name:'TGT_LOC', 	width:"100px", hidden:true},
                       {editable: false,name:'TO_PLT_ID', 	width:"150px", hidden:true},
            ],
            ondblClickRow: function(id, iRow, iCol, e){
                var iRow = $pdaStMoveInstHGrid.getGridParam("selrow");
                var rowData = $pdaStMoveInstHGrid.getRowData( iRow );

                //Paragon Popup.
                PopApp.coreOpenPopup({
                    ajaxUrl	: "/pda/ctrl/stock/pdaStMoveInst/pPdaStMoveInstConfirm",
                    data 	: {rowData: rowData},
                    id		: "modalPPdaStMoveInst",
                    domainId: "STOCK_MOVE_NO_TITLE",
                    fullScreen : true,
                    onload: function(modal) {
                    	App.setElIds();
                        modal.show();
                    }
                });
//                App.callBackCasting(rowData);
//                $("#pPdaRoPickSearchRo").popupCallback(rowData);
//                $("#pPdaRoPickSearchRo").paragonClosePopup();
            },
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);


            	var ids = $pdaStMoveInstHGrid.jqGrid("getDataIDs");
            	if(ids.length > 0){
            		$("#pdaStMoveInstTgtLoc").val($pdaStMoveInstHGrid.getRowData(ids[0]).TGT_LOC);
            	}

               	var stMoveNo = $('#pdaStMoveInstStMoveNo');
            	if(stMoveNo.val() == ''){
            		stMoveNo.focus();
            	}

            },
            onSelectRowEvent: function(currRowData,prevRowData){
            	$("#pdaStMoveInstTgtLoc").val('');
            	$("#pdaStMoveInstTgtLoc").val(currRowData.TGT_LOC);
            }
    	})
    }

    function getEvents(){
    	/**
    	 * 전역 Enter 검사
    	 * 키보드 엔터 및 바코드 인식 후 바로 엔터 처리
    	 */
		$(document).keydown(function(event){
			if(event.keyCode == 13) {

				var objId = event.target.id;
				if (objId == 'pdaStMoveInstItemCd'){
					$('#pdaStMoveInstItemCd').blur();
					fnGridSearch();
				}

				event.preventDefault();

				return false;
			}
		});

    	//WMSUtil.focusScrollUp('pPdaIbExamSearchIbNoIbYmd');

       	$('#pdaStMoveInstBtn').on('click', function(){
       		fnGridSearch();
		});

       	$('#pdaStMoveInstNoBtn').on('click', function(){
       		fnStMoveInstNo();
		});

    }

    function fnStMoveInstNo(){

   		var stMoveNo = $('#pdaStMoveInstStMoveNo').val();

		if(stMoveNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/stock/pdaStMoveInst/pdaStMoveInstNoInquiryPop",
                id			: "pdaStMoveInstNoInquiryPop",
                domainId	: "PWMPDAST101E_P1",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                    		"STOCK_MOVE_NO"		:	"pdaStMoveInstStMoveNo"
                    };
                    App.setElIds(callBack);
                    modal.show();
                }
            });
		}

   		var itemCd = $('#pdaStMoveInstItemCd');
		if(itemCd.val() == ''){
			itemCd.focus();
		}

	}

    function fnGridSearch(){

    	var moveNo = $('#pdaStMoveInstStMoveNo').val();
    	var itemCd = $('#pdaStMoveInstItemCd').val();

    	if(!moveNo){
    		moveNo = "empty";
    	}
    	if(!itemCd){
    		itemCd = "undefined itemCd";
    	}
		var data = {
				moveNo 	: moveNo,
				itemCd	: itemCd
		};

		// 대상 로케이션 검색전 초기화
		$("#pdaStMoveInstTgtLoc").val('');

		$pdaStMoveInstHGrid.paragonGridSearch(data);


    }

}();

$(document).ready(function() {
	PdaStMoveInstApp.init();
});