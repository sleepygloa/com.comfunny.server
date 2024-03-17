/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 반출관리 - 반출피킹
 * Program Code     : PWMPDARO102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 10. 02.  		First Draft.
 */
var PdaRoPickingApp = function () {
	"use strict";

	var $pdaRoPickingHGrid = $('#pdaRoPickingHGrid');
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaRoPicking';

    return {
        init: function () {

    		getEvents();
    		getList();

	    }
    };

    function getList(){
    	$pdaRoPickingHGrid.paragonGrid({
            url: '/pda/ctrl/returnOutbound/pdaRoPicking/listPdaRoPicking',
            rowEditable		: true,
//          rowClickFocus	: true,
            cellEditable	: true,
            sortable		: true,
            shrinkToFit		: false,
            postData: {
            		   roNo :  "gridDrawing",
            },
            colModel: [
                       {editable: false, name:'ITEM_CD', 	width:"100px", align:"center"},
                       {editable: false, name:'ITEM_NM', 	width:"100px", align:"left"  },
                       {editable: false, name:'INST_QTY', 	width:"100px", align:"right" },
                       {editable: false, name:'LOC',	    width:"150px", align:"center"},
                       {editable: false, name:'PLT_ID',		width:"150px", align:"center"},

                       {editable: false, name:'LOT_ATTR1',  	width:"100px", hidden:true},
                       {editable: false, name:'LOT_ATTR2',  	width:"100px", hidden:true},
                       {editable: false, name:'LOT_ATTR3',  	width:"100px", hidden:true},
                       {editable: false, name:'LOT_ATTR4',  	width:"100px", hidden:true},
                       {editable: false, name:'LOT_ATTR5',  	width:"100px", hidden:true},
                       {editable: false, name:'MAKE_LOT',   	width:"100px", hidden:true},
                       {editable: false, name:'MAKE_YMD',   	width:"100px", hidden:true},
                       {editable: false, name:'PK_QTY',   		width:"100px", hidden:true},
                       {editable: false, name:'INST_EA_QTY',	width:"100px", hidden:true},
                       {editable: false, name:'UOM',   			width:"100px", hidden:true},
                       {editable: false, name:'INST_BOX_QTY',	width:"100px", hidden:true},
                       {editable: false, name:'DIST_EXPIRY_YMD',width:"100px", hidden:true},
            ],
            ondblClickRow: function(id, iRow, iCol, e){

                var iRow = $pdaRoPickingHGrid.getGridParam("selrow");
                var rowData = $pdaRoPickingHGrid.getRowData( iRow );

                //Paragon Popup.
                PopApp.coreOpenPopup({
                    ajaxUrl	: "/pda/ctrl/returnOutbound/pdaRoPicking/pdaRoPickingDetailPop",
                    data 	: {rowData: rowData},
                    id		: "pdaRoPickingDetailPop",
                    domainId: "PWMPDARO101E_P2",
                    fullScreen : true,
                    onload: function(modal) {
                    	App.setElIds();
                        modal.show();
                    }
                });

            },
            gridComplete : function(){

            	WMSUtil.pwaGridDynamicArea(proNm);

            	//caption 총건수
            /*	$('.captionRowCount').remove();
            	var count = $pdaRoPickingHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');*/
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
				if (objId == 'pdaRoPickingItemCd'){
					$('#pdaRoPickingItemCd').blur();
					fnGridSearch();
				}

				event.preventDefault();

				return false;
			}
		});

       	$('#pdaRoPickingRoNo').focus();
    	//WMSUtil.focusScrollUp('pPdaIbExamSearchIbNoIbYmd');

       	$('#pdaRoPickingRoNo').on('click', function(){
       		fnGridSearch();
		});

       	$('#pdaRoPickingSearchBtn').on('click', function(){
       		fnRoPickingSearchRoNo();
		});

    }

    function fnRoPickingSearchRoNo(){

   		var roNo = $('#pdaRoPickingRoNo').val();

		if(roNo == ''){
            PopApp.coreOpenPopup({
                ajaxUrl		: "/pda/ctrl/returnOutbound/pdaRoPicking/pdaRoPickingNoInquiryPop",
                id			: "pdaRoPickingNoInquiryPop",
                domainId	: "PWMPDARO101E_P1",
                fullScreen 	: true,
                onload		: function(modal) {
                    // 팝업화면 클릭 시 code, name.
                    var callBack = {
                    		"RO_NO" 			:   "pdaRoPickingRoNo"	,
                    		"SUPPLIER_NM"		:	"pdaRoPickingSupplierNm"
                    };
                    App.setElIds(callBack);
                    modal.show();
                }
            });
		}
	}

    function fnGridSearch(){

    	var roNo = $('#pdaRoPickingRoNo').val();
    	var itemCd = $('#pdaRoPickingItemCd').val();

    	if(!roNo){
    		roNo = "undefined roNo";
    	}
    	if(!itemCd){
    		itemCd = "undefined itemCd";
    	}
		var data = {
				roNo 	: roNo,
				itemCd	: itemCd
		};

		$pdaRoPickingHGrid.paragonGridSearch(data);

    }

}();

$(document).ready(function() {
	PdaRoPickingApp.init();
});