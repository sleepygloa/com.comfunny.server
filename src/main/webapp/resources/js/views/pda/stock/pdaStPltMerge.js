/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고관리 - 파렛트병합[PdaStPltMergeApp]
 * Program Code     : PWMPDAST106E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * -------------	-------------		------------------
 * hong jeong bo 	2018. 11. 02.  		First Draft.
 */
var PdaStPltMergeApp = function () {
	"use strict";

	var $pdaStPltMergeHGrid = $('#pdaStPltMergeHGrid');
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'pdaStPltMerge';

    return {
        init: function () {

    		getEvents();
    		getList();

	    }
    };

    function getList(){
    	$pdaStPltMergeHGrid.paragonGrid({
            url: '/pda/ctrl/stock/pdaStPltMerge/listStockPltMergePda',
            rowEditable	: false,
            cellEditable: false,
            sortable	: true,
            shrinkToFit	: false,
            postData: {
            	moveNo :  "gridDrawing",
            },
            colModel: [
                       {editable: false,name:'TGT_PLT_ID', 	width:"150px", align:"right"},
            ],
            ondblClickRow: function(id, iRow, iCol, e){
				/*
				var iRow = $pdaStPltMergeHGrid.getGridParam("selrow");
                var rowData = $pdaStPltMergeHGrid.getRowData( iRow );

                //Paragon Popup.
                PopApp.paragonOpenPopup({
                    ajaxUrl	: "/pda/ctrl/stMain/pdaStMoveInst/pPdaStMoveInstConfirm",
                    data 	: {rowData: rowData},
                    id		: "modalPPdaStMoveInst",
                    domainId: "STOCK_MOVE_NO_TITLE",
                    fullScreen : true,
                    onload: function(modal) {
                    	App.setElIds();
                        modal.show();
                    }
                });
				*/
            },
            gridComplete : function(){
            	WMSUtil.pwaGridDynamicArea(proNm);

            	//caption 총건수
            	/*
 				$('.captionRowCount').remove();
            	var count = $pdaStPltMergeHGrid.getGridParam("records");
            	$('#'+proNm + 'Grid_wrap').prepend('<span class="captionRowCount" style="position:absolute;right:0px;top:-15px;">총 건수 : '+count+' 건</span>');
            	*/
            }
    	})
    }

    function getEvents(){

       	$('#pdaStPltMergeAddBtn').on('click', function(){
       		fnNewPltAdd();
		});

       	$('#pdaStPltMergeBtn').on('click', function(){
       		fnStPltMerge();
		});

    }

    function fnNewPltAdd(){

    }

    function fnStPltMerge(){

    	var sendData	=	{
    			pltId	: 	$('#pdaStPltMergeTgtPltId').val(),
				toPltId :	$('#pdaStPltMergeMergePltId').val()
    	};

    	if(sendData.pltId == '' && sendData.toPltId == ''){
    		console.log('Empty Input Value');
    		return false;
    	}

    	if(!confirm((Util.confirm('MSG_COM_CFM_015')).msgTxt))//확정 하시겠습니까?
    		return false;

    	App.prcsStart();
		$.ajax({
			url		: '/pda/ctrl/stock/stPltMerge/updatePdaStPltMerge',
			type 	: "POST",
			data	:  JSON.stringify(sendData),
		    contentType: 'application/json; charset=utf-8',
			success : function(data){
console.log('updateStockPltMergeConfirmPda Result: ',data);

			},
			complete : function(data){

			}
		})

	}

    function fnGridSearch(){

    	var tgtPltId = $('#pdaStPltMergeTgtPltId').val();
    	var mergePltId = $('#pdaStPltMergeMergePltId').val();

    	if(!tgtPltId){
    		tgtPltId = "empty";
    	}
    	if(!mergePltId){
    		mergePltId = "undefined itemCd";
    	}

		var data = {
				pltId 	: tgtPltId,
				toPltId	: mergePltId
		};

		$pdaStPltMergeHGrid.paragonGridSearch(data);

    }

}();

$(document).ready(function() {
	PdaStPltMergeApp.init();
});