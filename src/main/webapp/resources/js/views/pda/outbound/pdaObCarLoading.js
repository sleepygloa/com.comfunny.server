/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고상차 [PdaObCarLoadingApp]
 * Program Code     : PWMPDAOB104E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho 	 	2018. 08. 21.  		First Draft.
 */
var PdaObCarLoadingApp = function () {
	"use strict";

	//그리드
	var $pdaObCarLoadingHGrid = $('#pdaObCarLoadingHGrid');

	//프로그램 코드, 명
	var proCd = 'PWMPDAOB104E';
	var proNm = 'pdaObCarLoading';

	//현재 날짜
	var workYmd = CoreSession.s_workYmd;

	var gRowData = {};

    return {
    	variant : function(rowData){

    		if(rowData != undefined){
    			gRowData = rowData
    		}

    		return gRowData;

    	},
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

    		//상세팝업 확인

    		if($('#pdaObCarLoadingDetailPop').length != 0){
    			if(barcode.length == WMSUtil.barcodeTextLength('ITEM_CD')
				||barcode.length == WMSUtil.barcodeTextLength('ITEM_BARCODE')
    			||barcode.length == WMSUtil.barcodeTextLength('BOX_BARCODE')){
    				PdaObCarLoadingDetailPopApp.barcode.fnSearchItem(barcode);
    			}else{
    				$('#pdaObCarLoadingDetailPopItemCd').val('');
    			}
    			return false;
    		}

    		//차량번호 스캔
    		$('#pdaObCarLoadingCarNo').val(barcode);
    		fnSearchCarNo();
    	}
    }


    //이벤트
    function fnEvents(){

		//엔터 이벤트
		$('#pdaObCarLoadingCarNo').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				$('#pdaObCarLoadingCarNo').blur();
				fnSearchCarNo();
			}
		});

    	//선택시 그리드 전체선택(TODO :  수정필요)
//    	$('#pdaObCarLoadingAllCheckBtn').click(function(){
//    		$('#cb_'+proNm+'HGrid').trigger('click');
//    	});

    	//차량번호 조회 팝업
    	$('#pdaObCarLoadingCarNoSearchBtn').click(function(){
    		$(this).blur();
    		fnCarNoPop();
    	});

    	$('#pdaObCarLoadingSearchBtn').click(function(){
//    		$(this).blur();
//    		fnGridSearch();
    	});
    	//상차수량 일괄생성//수량확인완료
        $('#pdaObCarLoadingBatchCreationBtn').click(function(){
            fnBatchCreation();
        });
    	//확정
    	$('#pdaObCarLoadingConfirmBtn').click(function(){
    		fnConfirm();
    	});
    }


    //차량번호 조회
    function fnSearchCarNo(){
    	$.ajax({
    		url		: '/pda/ctrl/common/listPdaCarNoPop',
    		data	: sendData(),
    		success : function(data){
    			var data = data.dt_grid;

    			//데이터 2건 이상
    			if(data.length >= 2){
    				//차량번호 조회 팝업
    				fnCarNoPop();
				//데이터 1건
    			}else if (data.length == 1){
    				//그리드 조회
    				fnGridSearch();
				//데이터 0건
    			}else{
    				//초기화
    				fnInit();
    			}
    		}
    	});
    };

    //차량번호 조회 팝업
    function fnCarNoPop(){
        PopApp.coreOpenPopup({
            ajaxUrl		: "/pda/ctrl/common/pdaCarNoPop",
            data 		: {
        		proCd	: proCd,
        		workYmd	: WMSUtil.fnDateSetting.yyyymmdd(workYmd),
            },
            id			: "modalCarNoPop",
            domainId	: "PWMPDAOB104E_P2",
            fullScreen 	: true,
            onload		: function(modal) {
                modal.show();
            },
            //팝업 종료 후 callback 있을때.
            callback : function(data){
            	$('#pdaObCarLoadingCarNo').val(data.CAR_NO);
            	fnGridSearch();
            }
        });
    }

    //그리드 조회
    function fnList(){
    	$pdaObCarLoadingHGrid.paragonGrid({
            url			: '/pda/ctrl/outbound/obCarLoading/listPdaObCarLoading',
            cellEditable: false,
//            sortable	: true,
            data		: {
            	workYmd : CoreSession.s_workYmd
            },
            shrinkToFit	: false,
            multiselect	: true,
            colModel	: [
                {editable: false, name:'STORE_NM', 		width:"100px", align:"left",   hidden:true},
                {editable: false, name:'STORE_CD', 		width:"100px", align:"center", hidden:true},
                {editable: false, name:'RSTORE_CD', 	width:"100px", align:"center", hidden:true},
                {editable: false, name:'OB_DETAIL_SEQ', width:"100px", align:"center", hidden:true},
                {editable: false, name:'OB_PROG_ST_CD', width:"100px", align:"center", hidden:true},
                {editable: false, name:'PICK_ZONE_LOC', width:"150px", align:"center", hidden:true},
                {editable: false, name:'PICK_QTY', 		width:"80px",  align:"right",  hidden:true},
                {editable: false, name:'SO_QTY', 		width:"80px",  align:"right",  hidden:true},
                {editable: false, name:'LOAD_QTY', 		width:"80px",  align:"right",  hidden:true},
                {editable: false, name:'STORE', 		width:"150px", align:"left"   },
                {editable: false, name:'SO',  			width:"40px",  align:"right", formatter:"integer"  },
                {editable: false, name:'PICK', 			width:"40px",  align:"right", formatter:"integer"  },
                {editable: false, name:'CARLD', 		width:"40px",  align:"right", formatter:"integer"  },
            	{editable: false, name:'OB_NO', 		width:"100px", align:"center" },
            	{editable: false, name:'LOAD_YN', 		width:"80px",  align:"center" },
            ],
            ondblClickRow: function(id, iRow, iCol, e){

            	//선택한 행의 Data
                var rowData = $pdaObCarLoadingHGrid.getRowData( iRow );
//console.log('rowData.LOAD_YN',rowData.LOAD_YN);
				fnObCarLoadingDetailPop(rowData);


            },
            gridComplete : function(){

            	//그리드 로딩 첫, 아님 유무 --> focus 여부
            	if($pdaObCarLoadingHGrid.data('loadCount') == 0){
            		WMSUtil.pwaGridDynamicArea(proNm);
            		$pdaObCarLoadingHGrid.data('loadCount', 1);
            		//처음 불러올때 입고번호 포커스
            		//$('#pdaObPickingObNo').focus();
            	}

            	var ids = $pdaObCarLoadingHGrid.jqGrid('getDataIDs');

            	if(ids.length > 0){

            		//배송처 코드와 명 2줄로표현.
            		$('td[aria-describedby=pdaObCarLoadingHGrid_STORE]').css({
//            			'word-break'	: 'break-all',
            			'display'		: '-webkit-box',
//            			'white-space'	: 'normal',
            			'display'		: 'box',
            			'-webkit-line-clamp'	: '2',
            			'-webkit-box-orient'	: 'vertical',
            			'text-overflow'	: 'ellipsis',
            			'overflow'		: 'hidden'
            			});

            		//c

            		for (var i = 0; i < ids.length; i++) {
            			//피킹수량과 상차수량이 같으면 백그라운드 하이라이트 적용       *** 현재는 or 논리식을 사용하지만 피킹수량과 상차수량이 동일하고 상차여부가 '예'면 이라는 and 조건으로 변경한다.***
            				if($pdaObCarLoadingHGrid.getRow(ids[i]).OB_PROG_ST_CD == '80')
            				{
            					$pdaObCarLoadingHGrid.setRowData(i+1,false,{background: '#e5e9ed'});
            				}
            		}

            		if(ids.length == 1 && (!($pdaObCarLoadingHGrid.getRow(ids[i]).PICK_QTY == $pdaObCarLoadingHGrid.getRow(ids[i]).LOAD_QTY)
            			||	$pdaObCarLoadingHGrid.getRow(ids[i]).LOAD_YN == 'N')) //조회건수가 1건이며 수량이 일치하지 않고, 상차여부가 아니요인 경우
            		{
            			var rowData = $pdaObCarLoadingHGrid.getRowData( ids );

            			fnObCarLoadingDetailPop(rowData);
//console.log('rowData',rowData);
            		}
            	}
            }
    	})
    }


    function fnObCarLoadingDetailPop(rowData){
//console.log('rowData2',rowData);
		if(rowData.OB_PROG_ST_CD == '80'){
			return false;
		}else{
			PopApp.coreOpenPopup({
				ajaxUrl	: "/pda/ctrl/outbound/obCarLoading/pdaObCarLoadingDetailPop",
				data 	: {rowData: rowData},
				id		: "pdaObCarLoadingDetailPop",
				domainId: "PWMPDAOB104E_P1",
				fullScreen : true,
				onload: function(modal) {
					App.setElIds();
					modal.show();
				},
				//팝업 종료 후 callback 있을때.
				callback : function(){
//        	collbackFlag = true;
					fnGridSearch();
				},
				closeEvent:function(){
					fnGridSearch();
				}
			});
		}

    }

    //그리드 조회
    function fnGridSearch(){
		$pdaObCarLoadingHGrid.paragonGridSearch(sendData());
    }

    //확정
    function fnConfirm(){

        var rowData = {
            //clientCd: "CLIENT_CD",
            obNo		: "OB_NO",
            obProgStCd	: "OB_PROG_ST_CD",
            pickQty		: "PICK_QTY"
        };

        //1. 체크된 리스트.
        var jsonData = $pdaObCarLoadingHGrid.getSelectedJsonData("dt_data", rowData);

        //유효성 검사
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);

        jsonObject.prog = "FW";
        jsonObject.opRuleCd = "2006";

        var jsonObject = JSON.parse(jsonData);
        var dt_data = jsonObject.dt_data;
        var flag = false;

        for(var i = 0 ; i < dt_data.length; i++){
          if(dt_data[i].pickQty == 0){
              	flag = true;
            	Util.alert('MSG_OUTRI_VAL_066'); //피킹수량이 없습니다.
            break;
          }
          if(dt_data[i].obProgStCd >= 70){
        	  flag = true;
              Util.alert('MSG_OUTRI_ERR_012'); //확정된 데이터는 확정 할 수 없습니다.
              //Util.alertCode('Không thể thực hiện hoàn thành khối lượng trong giai đoạn kiểm tra số tiền.'); //상차확정 단계에서는 수량완료처리를 할 수 없습니다.
              break;
          }
      }
      if(flag) return false;

      fnAjaxSave(JSON.stringify(jsonObject));
//
//        if(jsonObject.dt_data[0].pickQty == 0){
//            Util.alert('MSG_OUTRI_VAL_066'); //피킹수량이 없습니다.
//            return false;;
//        }
//
//        //출하확정
//        if(Number(jsonObject.dt_data[0].obProgStCd) < 70){
//
//            fnAjaxSave(JSON.stringify(jsonObject));
//
//        }else{
//            Util.alert('MSG_OUTRI_ERR_012'); //출하상차 확정을 할 수 없습니다. 다시 확인 부탁드립니다.
//            return false;
//        }

    }

    //일괄생성
    function fnBatchCreation (){

        var rowData = {
            //clientCd: "CLIENT_CD",
            obNo        : "OB_NO",
            obProgStCd  : "OB_PROG_ST_CD",
            pickQty		: "PICK_QTY"
        };

        //1. 체크된 리스트.
        var jsonData = $pdaObCarLoadingHGrid.getSelectedJsonData("dt_data", rowData);

        //유효성 검사
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);
        var dt_data = jsonObject.dt_data;
        var flag = false;

        for(var i = 0 ; i < dt_data.length; i++){
          if(dt_data[i].pickQty == 0){
              	flag = true;
            	Util.alert('MSG_OUTRI_VAL_066'); //피킹수량이 없습니다.
            break;
          }
          if(dt_data[i].obProgStCd == 80){
        	  flag = true;
              Util.alert('MSG_OUTRI_VAL_081'); //확정된 데이터는 확정 할 수 없습니다.
              //Util.alertCode('Không thể thực hiện hoàn thành khối lượng trong giai đoạn kiểm tra số tiền.'); //상차확정 단계에서는 수량완료처리를 할 수 없습니다.
              break;
          }
      }
      if(flag) return false;


        if(!confirm((Util.confirm('MSG_OUTRI_VAL_072')).msgTxt)) return false; //수량확인완료 하시겠습니까?
//        if(!confirm('MSG_OUTRI_VAL_072')) return false; //수량확인완료 하시겠습니까?

        App.prcsStart();
        $.ajax({
            url         : "/pda/ctrl/outbound/obCarLoading/updateObCarLoadingBatchCreation",
            data        : jsonData,
            dataType    : "json",
            type        : "POST",
            cache       : false,
            contentType : 'application/json; charset=utf-8',
            success     : function(data){

                if(data.stsCd == 200){
                    alert(data.msgTxt);
                    fnGridSearch();
                }else{
                    alert(data.msgTxt);
                }

            }
        });

    }

    function fnAjaxSave(jsonData){

        if(!confirm((Util.confirm('MSG_COM_CFM_015')).msgTxt)) return false; //확정 하시겠습니까?

        App.prcsStart();
        $.ajax({
            url			: "/pda/ctrl/outbound/obCarLoading/updateObCarLoadingConfirm",
            data		: jsonData,
            dataType	: "json",
            type		: "POST",
            cache		: false,
            contentType	: 'application/json; charset=utf-8',
            success		: function(data){

                if(data.stsCd == 200){
                    alert(data.msgTxt);
                    fnGridSearch();
                }else{
                	alert(data.msgTxt);
                }

            }
        });
    }

    //초기화
    function fnInit(){
    	$('#pdaObCarLoadingCarNo').val('')

    	fnGridSearch();
    }

    //데이터
    function sendData(){
    	return {
    		proCd	: proCd,
    		carNo	: $('#pdaObCarLoadingCarNo').val(),
    		workYmd	: WMSUtil.fnDateSetting.yyyymmdd(workYmd),
    	}
    }

}();

$(document).ready(function() {
	MobileUtil.getBarcode({
		callback : "PdaObCarLoadingApp.fnCallbackBarcode",
	});

	PdaObCarLoadingApp.init();
});
