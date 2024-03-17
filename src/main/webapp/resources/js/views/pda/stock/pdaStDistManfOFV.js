/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 재고처리-유통가공-오리온 [PdaStDistManfApp]
 * Program Code     : PWMPDAST412E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2019. 05. 09.  		First Draft.
 */
var PdaStDistManfApp = function () {
	"use strict";

	//프로그램 코드, 명
	var proCd = 'PWMPDAST412E';
	var proNm = 'pdaStDistManfOFV';

	//그리드
	var $pdaStDistManfOFVHGrid = $('#pdaStDistManfOFVHGrid');
	var $pdaStDistManfOFVDGrid = $('#pdaStDistManfOFVDGrid');


	//CALLBACK Flag
	var callbackFlag = true;

    var gridDalatYn;
    var gridExportCountryCd;

    var workYmd = '';
    var callbackData;
    var callbackLocCd;
    var gridObProgStCd;
    var callbackObGbnCd = '';


    var firstLoad = true;

    return {
        init: function () {

            fnEvents();

            fnList();

	    },
	    //바코드 콜백
	    fnCallbackBarcode : function(result){
			result = decodeURI(result);
			result = JSON.parse(result);

			fnBarcode(result);
	    }
    };

    //바코드 콜백
    function fnBarcode(data){
    	var barcode = null;
    	for (var i in data){
    		barcode = data[i];
    	}

    	if(barcode == null){

    	}else{

    		//세트 검수 팝업
    		if($('#pdaStDistManfOFVSetExamPop').length == 1){
    			//제품 스캔
        		if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
        				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
            			||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){

        			PdaStDistManfOFVSetExamPop.barcode.fnItemSearch(barcode);
        			return false;
        		}
    		}


    		//구성품출고 팝업
    		if($('#pdaStDistManfOFVDetailPop').length == 1){
    		}

    		//유통가공 번호 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('DIST_MANF_NO')){
    			$('#pdaStDistManfOFVDistManfNo').val(barcode);
    			fnGridSearch();
    			return false;
    		}

			//제품 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
    				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
        			||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){

    			fnItemSearch(barcode);
    			return false;
    		}
    		//파렛트 ID 스캔
    		if(barcode.length == WMSUtil.barcodeTextLength('PLT_ID')){
    			$('#pdaStDistManfOFVPltId').val(barcode);
    			fnSearchPltId(barcode);
    			return false;
    		}
    	}
    }

    //그리드 초기화
    function fnList(){
    	$pdaStDistManfOFVHGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStDistManfOFV/listPdaStDistManfOFVH',
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
            height			: '150',
//            multiselect		: true,
            colModel		: [
    		   {editable: false, name:'SET_ITEM_CD', 		width:"80px", 	align:"center", hidden:true},
    		   {editable: false, name:'SET_ITEM_NM', 		width:"200px", 	align:"left", 	hidden:true},
    		   {editable: false, name:'ITEM', 				width:"200px", 	align:"left"},

    		   {editable: false, name:'WORK_QTY', 			width:"60px", 	align:"right",  formatter:"integer"},
    		   {editable: false, name:'RESULT_QTY', 		width:"60px", 	align:"right",  formatter:"integer"},
            ],
            gridComplete : function(){

            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaStDistManfOFVHGrid.data('loadCount') == 0){
//            		WMSUtil.pwaGridDynamicArea(proNm);
            		$pdaStDistManfOFVHGrid.data('loadCount', 1);
            		//처음 불러올때 입고번호 포커스
            		//$('#pdaStDistManfOFVObNo').focus();
            	}

            	var ids = $pdaStDistManfOFVHGrid.jqGrid('getDataIDs');

            	if(firstLoad){
            		fnListD();

            		firstLoad = false;
            	}else{
            	}
            },
            ondblClickRow: function(id, iRow, iCol, e){

        	  //선택한 행의 Data
    	  		var rowData = $pdaStDistManfOFVHGrid.getRowData(iRow);

				fnReprintPop(rowData);
            },
    	})
    }


    //상세그리드 초기화
    function fnListD(){
    	$pdaStDistManfOFVDGrid.paragonGrid({
            url				: '/pda/ctrl/stock/pdaStDistManfOFV/listPdaStDistManfOFVD',
            cellEditable	: false,
            sortable		: true,
            shrinkToFit		: false,
            height			: '150',
//            multiselect		: true,
            colModel		: [
    		   {editable: false, name:'PART_ITEM_CD', 		width:"80px", 	align:"center", hidden:true},
    		   {editable: false, name:'PART_ITEM_NM', 		width:"200px", 	align:"left", hidden:true},
    		   {editable: false, name:'ITEM',		 		width:"200px", 	align:"left"},
    		   {editable: false, name:'INST_QTY', 			width:"60px", 	align:"right",  formatter:"integer"},
    		   {editable: false, name:'OB_QTY', 			width:"60px", 	align:"right",  formatter:"integer"},
            ],
            gridComplete : function(){
            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaStDistManfOFVHGrid.data('loadCount') == 0){
//            		WMSUtil.pwaGridDynamicArea(proNm);
            		$pdaStDistManfOFVHGrid.data('loadCount', 1);
            	}
            },
            ondblClickRow: function(id, iRow, iCol, e){

          	  //선택한 행의 Data
      	  		var rowData = $pdaStDistManfOFVDGrid.getRowData(iRow);

  				fnCanclePop(rowData);
              },
    	})
    }

    //이벤트
    function fnEvents(){

    	//작업일자 세팅
    	workYmd = WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd);

		//엔터 이벤트
    	//유통가공 조회 팝업
		$('#pdaStDistManfOFVDistManfNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStDistManfOFVItemCd').val('');
				$('#pdaStDistManfOFVPltId').val('');
				$(this).blur();
				fnGridSearch();
			}
		});
		//제품 조회
		$('#pdaStDistManfOFVItemCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStDistManfOFVItemCd').blur();
				fnSearchItemCd($(this).val());
			}
		});
		//PLT_ID 조회
		$('#pdaStDistManfOFVPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaStDistManfOFVPltId').blur();
				fnSearchPltId($(this).val());
			}
		});

		//출고피킹번호 조회 팝업
    	$('#pdaStDistManfOFVDistManfNoSearchBtn').click(function(){
    		$(this).blur();
    		fnSearchDistManfNo();
    	});
    }

    //그리드 조회
    function fnGridSearch(){
		$pdaStDistManfOFVHGrid.paragonGridSearch(sendData());
		$pdaStDistManfOFVDGrid.paragonGridSearch(sendData());
    }

    //유통가공 조회 팝업
    function fnSearchDistManfNo(){

        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/stock/pdaStDistManfOFV/pdaStDistManfOFVNoInquiryPop",
            id			: "pdaStDistManfOFVNoInquiryPop",
            domainId	: "PWMPDAST412Q_P1",
            fullScreen 	: true,
            onload		: function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack = {
                    "DIST_MANF_NO"	: "pdaStDistManfOFVDistManfNo"
                };
                App.setElIds(callBack);
                modal.show();
            },
            callback	: function(data){
            	$('#pdaStDistManfOFVDistManfNo').val(data.DIST_MANF_NO)
            	fnGridSearch();
            }
        });
	}

    //제품조회 팝업
    function fnSearchItemCd(barcode){

    	var sendData = {
    			proCd			: proCd, //팝업
    			workYmd			: CoreSession.s_workYmd,
    			distManfNo		: $('#pdaStDistManfOFVDistManfNo').val(),
    			itemCd			: barcode
		}

    	//listStDistManfItem
    	//PLT ID 확인
    	$.ajax({
    		url			: '/pda/ctrl/common/listStDistManfItem',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			var data = data.dt_grid;
    			if(data.length == 0){
    				Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
    				$('#pdaStDistManfOFVPltId').val('');
    				return false;
    			}else if(data.length == 1){
    				fnItemInquiryInPlt(rowData);
//    			}else{
//    				PopApp.paragonOpenPopup({
//   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
//   		                id			: "pdaCommPltIdPop",
//   		                domainId	: "PWMPDAIB102E_P1",
//   		                fullScreen 	: true,
//   		                data		: sendData,
//   		                onload		: function(modal) {
//   		                    modal.show();
//   		                }, callback : function (data){
//   		                	var  dt = data;
//
//   		                	//팝업에서 선택한 PLT_ID 로 변경
//   		                	fnItemInquiryInPlt(rowData);
//   		                }
//   		            });
    			}
    		}
    	})
    }

    //재출력 팝업
    function fnReprintPop(rowData){
        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/stock/pdaStDistManfOFV/pdaStDistManfOFVReprintPop",
            id			: "pdaStDistManfOFVReprintPop",
            domainId	: "PWMPDAST412Q_P2",
            fullScreen 	: true,
            data		: {
            	distManfNo	: rowData.DIST_MANF_NO,
            	itemCd		: rowData.SET_ITEM_CD
            },
            onload		: function(modal) {
                modal.show();
            },
            callback	: function(data){
            	fnGridSearch();
            }
        });
    }

    //취소 팝업
    function fnCanclePop(rowData){
        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/stock/pdaStDistManfOFV/pdaStDistManfOFVCanclePop",
            id			: "pdaStDistManfOFVCanclePop",
            domainId	: "PWMPDAST412Q_P3",
            fullScreen 	: true,
            data		: {
            	distManfNo	: rowData.DIST_MANF_NO,
            	itemCd		: rowData.PART_ITEM_CD
            },
            onload		: function(modal) {
                modal.show();
            },
            callback	: function(data){
            	fnGridSearch();
            }
        });
    }
    //데이터
    function sendData(){
    	return {
    		proCd		: proCd,
			distManfNo	: $('#pdaStDistManfOFVDistManfNo').val(),
			itemCd		: $('#pdaStDistManfOFVItemCd').val(),
			pltId		: $('#pdaStDistManfOFVPltId').val(),
			workYmd		: workYmd
    	}
    }

    //파렛트ID 조회
    function fnSearchPltId(barcode){

    	var sendData = {
    			proCd			: proCd, //팝업
    			workYmd			: workYmd,
    			distManfNo		: $('#pdaStDistManfOFVDistManfNo').val(),
    			pltId			: barcode
		}

    	//PLT ID 확인
    	$.ajax({
    		url			: '/pda/ctrl/stock/pdaStDistManfOFV/listPdaStDistManfOFVDetailPltList',
    		type 		: "POST",
    		data		: JSON.stringify(sendData),
            contentType	: 'application/json; charset=utf-8',
    		success		: function(data){

    			var data = data.dt_grid;
    			if(data.length == 0){
    				Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
    				$('#pdaStDistManfOFVPltId').val('');
    				return false;
    			}else if(data.length == 1){
    				fnItemInquiryInPlt(rowData);
//    			}else{
//    				PopApp.paragonOpenPopup({
//   		                ajaxUrl		: "/pda/ctrl/common/pdaPltIdPop",
//   		                id			: "pdaCommPltIdPop",
//   		                domainId	: "PWMPDAIB102E_P1",
//   		                fullScreen 	: true,
//   		                data		: sendData,
//   		                onload		: function(modal) {
//   		                    modal.show();
//   		                }, callback : function (data){
//   		                	var  dt = data;
//
//   		                	//팝업에서 선택한 PLT_ID 로 변경
//   		                	fnItemInquiryInPlt(rowData);
//   		                }
//   		            });
    			}
    		}
    	})
    }

    //파렛트 내 제품 조회 팝업
    function fnItemInquiryInPlt(rowData){
console.log('detailPop')
//    	$.ajax({
//    		url			: '/pda/ctrl/stock/pdaStDistManfOFV/listpdaStDistManfOFVItemInquiryPop',
//    		type 		: "POST",
//    		data		: JSON.stringify(rowData),
//            contentType	: 'application/json; charset=utf-8',
//    		success		: function(data){
//
//    			//조회, 스캔한 파렛트 내의 제품중 프로모션과 아닌 제품의 개수 확인
//    			var dt_data = data.dt_grid
//    			//파레트에 제품이 없음. 알람창.
//    			if(dt_data.length == 0){
//    				Util.alert('MSG_OUTRI_VAL_068'); //출고번호내 존재하지 않는 제품입니다.
//    				$('#pdaStDistManfOFVPltId').val('');
//    				return false;
//				//1건, 상세 페이지로 이동
//    			}else if(dt_data.length == 1){

//    				fnGridSearch();
				//2개이상 팝업
//    			}else{
//        		        PopApp.paragonOpenPopup({
//        		            ajaxUrl 	: '/pda/ctrl/stock/pdaStDistManfOFV/pdaStDistManfOFVItemInquiryPop',
//        		            id 			: 'modalObPickingItemInqPopup',
//        		            width 		: '550',
//        		            domainId	: "PWMPDAOB201E_P3",
//        		            data		: {
//        		        		proCd		: proCd,
//        		        		obNo		: $('#pdaStDistManfOFVObNo').val(),
//        		        		pltId		: $('#pdaStDistManfOFVPltId').val(),
//        		        		workYmd		: workYmd,
//        		        		locCd		: rowData.locCd
//        		        	},
//        		            visible		: true,
//        		            fullScreen 	: true,
//        		            onload 		: function(modal) {
//        		                modal.show();
//        		            },
//        		            callback 	: function(data){
//        		            	fnGridSearch();
//        		            }
//        		        });
////    				}
//    			}
//    		}
//    	});
    }


}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaStDistManfApp.fnCallbackBarcode",
	});

	PdaStDistManfApp.init();
});

