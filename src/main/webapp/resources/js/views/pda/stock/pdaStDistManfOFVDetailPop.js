/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹 - 출고피킹상세 [PdaObPickingDetailPopApp]
 * Program Code     : PWMPDAOB101E_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2018. 08. 29.       First Draft.
 */
var PdaObPickingDetailPopApp = function () {
    "use strict";

    //그리드
    var getData = $("#pdaObPickingOFVDetailPop").PopAppGetData().rowData;

    //프로그램 코드, 명
    var proCd = 'PWMPDAOB101E_P1';
    var proNm = 'pdaObPickingOFVDetailPop';
    //협의에 따라 $('#' + proNm + 'id')

    var pickQtyVal = 0;
    var availQty = 0;


    return {
        init: function () {

            setUI();

            WMSUtil.fnCombo.selectBox('pdaObPickingOFVDetailPopLotAttr1', 'COUNTRY_CD');
            WMSUtil.fnCombo.selectBox('pdaObPickingOFVDetailPopLotAttr2', 'YN');
            WMSUtil.fnCombo.selectBox('pdaObPickingOFVDetailPopItemSt', 'ITEM_ST_CD');
            WMSUtil.fnCombo.selectBox('pdaObPickingOFVDetailPopNobRs', 'NOB_RS_CD');

            fnInfo();

            fnEvents();

        },
        barcode : {
            fnSearchPltId : function (barcode){
                var sendData = {
                        proCd           : proCd, //팝업
                        workYmd         : WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
                        obNo            : getData.OB_NO,
                        obDetailSeq     : getData.OB_DETAIL_SEQ,
                        obInstNo        : getData.OB_INST_NO,
                        locCd           : null,
                        lotAttr1		: getData.LOT_ATTR1_CD,
                        lotAttr2		: getData.LOT_ATTR2_CD,
                        pltId           : barcode
                }

//              /pda/ctrl/outbound/pdaObPickingy/listPdaPltIdInquiry
                //PLT ID 확인
                $.ajax({
                    url         : '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVDetailPltList',
                    type        : "POST",
                    data        : JSON.stringify(sendData),
                    contentType : 'application/json; charset=utf-8',
                    success     : function(data){

                        var data = data.dt_grid;
                        if(data.length == 0){
                            Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
                            fnInit();
                            return false;
                        }else if(data.length == 1){
                        	sendData['locTypeCd'] = data[0].LOC_TYPE_CD
                            fnScanPltId(sendData);
                        }else{
                            PopApp.coreOpenPopup({
                                ajaxUrl     : "/pda/ctrl/common/pdaPltIdPop",
                                id          : "pdaCommPltIdPop",
                                domainId    : "PWMPDAIB102E_P1",
                                fullScreen  : true,
                                data        : sendData,
                                onload      : function(modal) {
                                    // 팝업화면 클릭 시 code, name.
    //                                  var callBack = {
    //                                  };
    //                                  App.setElIds(callBack);
                                    modal.show();
                                }, callback : function (data){
                                    var  dt = data;

                                    //팝업에서 선택한 PLT_ID 로 변경
                                    sendData["pltId"] = dt.PLT_ID;
                                    sendData["locCd"] = dt.LOC_CD;
                                    sendData["lotId"] = dt.LOT_ID;
                                    sendData["locTypeCd"] = dt.LOC_TYPE_CD;
                                    fnScanPltId(sendData);
                                }
                            });
                        }
                    }
                })
            },
            fnSearchLocCd : function (barcode){
                var sendData = {
                        proCd           : proCd, //팝업
                        workYmd         : WMSUtil.fnDateSetting.yyyymmdd(CoreSession.s_workYmd),
                        obNo            : getData.OB_NO,
                        obDetailSeq     : getData.OB_DETAIL_SEQ,
                        obInstNo        : getData.OB_INST_NO,
                        pltId           : null,
                        itemCd			: getData.ITEM_CD,
                        lotAttr1		: getData.LOT_ATTR1_CD,
                        lotAttr2		: getData.LOT_ATTR2_CD,
                        locCd           : barcode
                }

                $.ajax({
                    url         : '/pda/ctrl/outbound/pdaObPickingOFV/listPdaObPickingOFVDetailPltList',
                    type        : "POST",
                    data        : JSON.stringify(sendData),
                    contentType : 'application/json; charset=utf-8',
                    success     : function(data){

                        var data = data.dt_grid;
                        if(data.length == 0){
                            Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다
                            fnInit();
                            return false;
                        }else if(data.length == 1){
                            $('#pdaObPickingOFVDetailPopPickLocCd').val(barcode);
                            $('#pdaObPickingOFVDetailPopToPltId').val(data[0].PLT_ID);
                            $('#pdaObPickingOFVDetailPopLotId').val(data[0].LOT_ID);

                            fnLotInfo(data[0]);

                        }else{
                            PopApp.coreOpenPopup({
                                ajaxUrl     : "/pda/ctrl/common/pdaPltIdPop",
                                id          : "pdaCommPltIdPop",
                                domainId    : "PWMPDAIB102E_P1",
                                fullScreen  : true,
                                data        : sendData,
                                onload      : function(modal) {
                                    // 팝업화면 클릭 시 code, name.
    //                                  var callBack = {
    //                                  };
    //                                  App.setElIds(callBack);
                                    modal.show();
                                }, callback : function (data){
                                    var  dt = data;

                                    //팝업에서 선택한 PLT_ID 로 변경
                                    $('#pdaObPickingOFVDetailPopPickLocCd').val(dt.LOC_CD);
                                    $('#pdaObPickingOFVDetailPopToPltId').val(dt.PLT_ID);
                                    $('#pdaObPickingOFVDetailPopLotId').val(dt.LOT_ID);

                                    fnLotInfo(dt);
                                }
                            });
                        }
                    }
                })
            },
        }
    };

    //PLT 파렛트 스캔 로직
    function fnScanPltId(sendData){
    	//출고구분이 OT출고(12)가 아니고, 파렛트 ID 스캔의 콜백 데이터가 OT 출고일 때, 처리불가
    	if(getData.OB_GBN_CD != '12' && sendData.locTypeCd == '2'){
    		Util.alert('MSG_OUTRI_VAL_084'); //OT출고 일 때만 OT존 파렛트를 피킹 할 수 있습니다.
    		fnInit();
    		return false;
    	}


        $.ajax({
            url         : '/pda/ctrl/outbound/pdaObPickingOFV/pdaObPickingOFVPltChk',
            type        : "POST",
            data        : JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            success     : function(data){

                if(data.stsCd == 100){
                    alert(data.msgTxt);
                    fnInit();
                    return false;
                }

                var data = data.dt_grid;
                if(data.length == 0){
//                  Util.alert(''); //조회된 데이터가 없습니다?
                	fnInit();
                }else if(data.length == 1){
                    $('#pdaObPickingOFVDetailPopPickLocCd').val(data[0].LOC_CD);
                    $('#pdaObPickingOFVDetailPopToPltId').val(data[0].PLT_ID);
                    $('#pdaObPickingOFVDetailPopLotId').val(data[0].LOT_ID);
                    $('#pdaObPickingOFVDetailPopLotAttr1').val(data[0].LOT_ATTR1);
                    $('#pdaObPickingOFVDetailPopLotAttr2').val(data[0].LOT_ATTR2);
                    $('#pdaObPickingOFVDetailPopLotAttr3').val(data[0].LOT_ATTR3);
                    $('#pdaObPickingOFVDetailPopLotAttr4').val(data[0].LOT_ATTR4);
                    $('#pdaObPickingOFVDetailPopLotAttr5').val(data[0].LOT_ATTR5);

                    fnLotInfo(data[0]);
                }else{
                    console.log('else');
                }
            }
        })
    }

    //UI 세팅
    function setUI(){
        WMSUtil.pwaGridDynamicArea(proNm);
    }

    //부모그리드의 행 데이터를 가져와 자식모달 의 form 에 data set
    function fnInfo(){

        $('#pdaObPickingOFVDetailPopObNo').text(getData.OB_NO + " - " + getData.STORE_NM);

        $('#pdaObPickingOFVDetailPopPromotionGbnCd').val(getData.PROMOTION_GBN);
        $('#pdaObPickingOFVDetailPopItemCd').val(getData.ITEM_CD);
        $('#pdaObPickingOFVDetailPopItemNm').val(getData.ITEM_NM);
        $('#pdaObPickingOFVDetailPopUom').val(getData.UOM);
        $('#pdaObPickingOFVDetailPopPkqty').val(getData.PKQTY);
        /*$('#pdaObPickingOFVDetailPopItemSt option[value="'+getData.ITEM_ST_CD+'"]').attr("selected", "selected");*/
        $('#pdaObPickingOFVDetailPopItemSt').val(getData.ITEM_ST);
        $('#pdaObPickingOFVDetailPopInstLocCd').val(getData.INST_LOC_CD);
        $('#pdaObPickingOFVDetailPopPickLocCd').val(getData.INST_LOC_CD);
        $('#pdaObPickingOFVDetailPopFrPltId').val(getData.PLT_ID);
        $('#pdaObPickingOFVDetailPopToPltId').val(getData.PLT_ID); //추가 스캔PLT ID leeJonghyuk 2019.01.14
        $('#pdaObPickingOFVDetailPopLotId').val(getData.LOT_ID); //추가 스캔PLT ID leeJonghyuk 2019.01.14
        $('#pdaObPickingOFVDetailPopInstBoxQty').val(getData.INST_BOX_QTY);
        $('#pdaObPickingOFVDetailPopInstEaQty').val(getData.INST_EA_QTY);
//      if(getData.PICK_QTY != 0){


//      $('#pdaObPickingOFVDetailPopPickingBoxQty').val(Number(getData.INST_BOX_QTY)-Number(getData.PICK_BOX_QTY));
//      $('#pdaObPickingOFVDetailPopPickingEaQty').val(Number(getData.INST_EA_QTY)-Number(getData.PICK_EA_QTY));
//      }else{
//          $('#pdaObPickingOFVDetailPopPickingBoxQty').val(getData.PICK_BOX_QTY_D);
//          $('#pdaObPickingOFVDetailPopPickingEaQty').val(getData.PICK_EA_QTY_D);
//      }

        //부모창에서 받아오는 정보와
        //상세화면에서 파렛트스캔할때 LOT 정보의 처리는 하나의 function 에서 처리함.
        fnLotInfo(getData);

//      $('#pdaObPickingOFVDetailPopPickingZoneLocCd').val(getData.PICK_ZONE_LOC_CD);




        //파렛트를 스캔하여 상세페이지로 이동했을때
        if(getData.PLT_ID != undefined){
            $('#pdaObPickingOFVDetailPopToPltId').val(getData.PLT_ID);
            $('#pdaObPickingOFVDetailPopPickLocCd').val(getData.LOC_CD);
//          PdaObPickingDetailPopApp.barcode.fnSearchPltId(getData.PLT_ID);


        //더블클릭하여 상세페이지로 이동햇을때
        }else{

        }


    };

    //이벤트
    function fnEvents(){

        $('#pdaObPickingOFVDetailPopCloseBtn').click(function(){
            $("#pdaObPickingOFVDetailPop").popupCallback();
            $("#pdaObPickingOFVDetailPop").coreClosePopup();
        })

        //사용불가
//      $('#pdaObPickingOFVDetailPopPickLocCd').attr('disabled', 'disabled');

		//엔터 이벤트
		$('#pdaObPickingOFVDetailPopPickLocCd').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var locCd = $(this).val().trim();
				var pltId = $('#pdaObPickingOFVDetailPopToPltId').val().trim();

				if(locCd == '' && pltId == ''){
					Util.alert('MSG_COM_VAL_106'); //로케이션을 입력해주세요
//					alert('로케이션을 입력해주세요');
					return false;
				}

				PdaObPickingDetailPopApp.barcode.fnSearchLocCd(locCd);
				return false;
			}
		});
		$('#pdaObPickingOFVDetailPopToPltId').keydown(function(e){
			if(e.keyCode == 13 || e.keyCode == 9){
				var pltId = $(this).val().trim();
				var locCd = $('#pdaObPickingOFVDetailPopPickLocCd').val().trim();

				if(locCd == '' && pltId == ''){
					Util.alert('MSG_COM_VAL_107'); //파렛트ID을 입력해주세요
//					alert('파렛트ID을 입력해주세요');
					return false;
				}

				PdaObPickingDetailPopApp.barcode.fnSearchPltId(pltId);
				return false;
			}
		});
        $('#pdaObPickingOFVDetailPopPickingEaQty').keydown(function(e){
            if(e.keyCode == 13 || e.keyCode == 9){
                var pickQty =   Number($('#pdaObPickingOFVDetailPopPickingBoxQty').val()) *
                                Number(getData.PKQTY) +
                                Number($('#pdaObPickingOFVDetailPopPickingEaQty').val())
//              if(getData.INST_QTY > pickQty){
//              }else{
//                  $('#pdaObPickingOFVDetailPopMakeLot')[0].scrollIntoView();
//              }
            }
        });
//      $('#pdaObPickingOFVDetailPopPickingZoneLocCd').keydown(function(e){
//          if(e.keyCode == 13 || e.keyCode == 9){
//
//              console.log($('input[id="pdaObPickingOFVDetailPopPickingZoneLocCd"]:focus').length)
//              return false;
//          }
//      });

        //확정
        $('#pdaObPickingOFVDetailPopSaveBtn').click(function(){
            fnSave();
        })

        //수량 선택시 블록지정
        $('input[id$="Qty"]').click(function(){
            $(this).select();
        });
    }

    //확정
    function fnSave(){
        var sendData = {
                obNo            : getData.OB_NO,
                obDetailSeq     : getData.OB_DETAIL_SEQ,
                obInstNo        : getData.OB_INST_NO,
                itemCd          : $('#pdaObPickingOFVDetailPopItemCd').val(),
                itemNm          : $('#pdaObPickingOFVDetailPopItemNm').val(),
                itemStCd        : $('#pdaObPickingOFVDetailPopItemSt option:selected').val(),
                pickLocCd       : $('#pdaObPickingOFVDetailPopPickLocCd').val(),
                instLocCd       : $('#pdaObPickingOFVDetailPopInstLocCd').val(),
                frPltId         : $('#pdaObPickingOFVDetailPopFrPltId').val(),
                pltId           : $('#pdaObPickingOFVDetailPopToPltId').val(),
                instQty         : (Number($('#pdaObPickingOFVDetailPopInstBoxQty').val()) * Number(getData.PKQTY)) + Number($('#pdaObPickingOFVDetailPopInstEaQty').val()),
                pickQty         : (Number($('#pdaObPickingOFVDetailPopPickingBoxQty').val()) * Number(getData.PKQTY)),
                pickTotQty      : (Number($('#pdaObPickingOFVDetailPopPickingTotBoxQty').val()) * Number(getData.PKQTY)) + Number($('#pdaObPickingOFVDetailPopPickingTotEaQty').val()),
                pickBoxQty      : $('#pdaObPickingOFVDetailPopPickingBoxQty').val(),
                pickEaQty       : $('#pdaObPickingOFVDetailPopPickingEaQty').val(),
                makeLot         : $('#pdaObPickingOFVDetailPopMakeLot').val(),
                nobRsCd         : $('#pdaObPickingOFVDetailPopNobRs option:selected').val(),
                makeYmd         : WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingOFVDetailPopMakeYmd').val()),
                distExpiryYmd   : WMSUtil.fnDateSetting.yyyymmdd($('#pdaObPickingOFVDetailPopDistExpiryYmd').val()),
                lotAttr1        : $('#pdaObPickingOFVDetailPopLotAttr1').val(),
                lotAttr2        : $('#pdaObPickingOFVDetailPopLotAttr2').val(),
                lotAttr3        : $('#pdaObPickingOFVDetailPopLotAttr3').val(),
                lotAttr4        : $('#pdaObPickingOFVDetailPopLotAttr4').val(),
                lotAttr5        : $('#pdaObPickingOFVDetailPopLotAttr5').val(),
                pickZoneLocCd   : $('#pdaObPickingOFVDetailPopPickingZoneLocCd').val(),
                lotId           : $('#pdaObPickingOFVDetailPopLotId').val(),
                promotionGbn	: $('#pdaObPickingOFVDetailPopPromotionGbnCd').val(),
                promotionGbnCd	: getData.PROMOTION_GBN_CD
        }

        //유효성 검사
        if(sendData.pickLocCd == ''){
            Util.alert('MSG_OUTRI_VAL_033'); // 피킹로케이션 항목은 필수 입력입니다.
            return false;
        }
        if(sendData.pltId == ''){
            Util.alert('MSG_OUTRI_VAL_031'); //파렛트ID 항목은 필수 입력입니다.
            return false;
        }
        if(sendData.pickBoxQty == ''){
            Util.alert('MSG_OUTRI_VAL_035'); //피킹박스수량 항목은 필수 입력입니다.
            return false;
        }
//      if(sendData.pickEaQty == ''){
//          Util.alert('MSG_OUTRI_VAL_037'); //피킹낱개수량 항목은 필수 입력입니다.
//          return false;
//      }
/*      if(sendData.makeLot == ''){
            alert('제조LOT은 필수입력입니다.');
            $('#pdaObPickingOFVDetailPopMakeLot').focus();
            return false;
        }*/
        /** 검수 확정 로직*/
        if(sendData.pickQty <= 0 || sendData.pickQty == ''){
            Util.alert('MSG_OUTRI_VAL_080'); //박스의 수는 0을 초과해야합니다.
            return false;
        }

      if(sendData.pickBoxQty.indexOf('.') > -1){
          Util.alert('MSG_COM_VAL_105'); //수량을 정수로만 입력 할수 있습니다.
          return false;
      }

        //2. INST_QTY > PICK_QTY --> 미출고사유 필수 입력------------해당 부분이 Validation에 필요시 다시 주석 제거
/*      if(instQty > pickQty){
            if(sendData.nobRsCd == ''){
                alert('미출고사유를 입력해주세요.');
                $('#pdaObPickingOFVDetailPopNobRs').focus();
                return false;
            }
        }*/
//      //1. 피킹 수량이 지시수량보다 적을경우 미출고사유입력해야함
//      if(Number(sendData.instQty) > (Number(sendData.pickQty)+Number(sendData.pickTotQty))){
//          if(sendData.nobRsCd == ''){
//              Util.alert('MSG_OUTRI_VAL_049'); //미출고사유를 입력 해주십시오.
//              return false;
//          }
//      }
        //2. 피킹 수량이 지시수량보다 많을 경우 에러
        if(Number(sendData.instQty) < (Number(sendData.pickQty)+Number(sendData.pickTotQty))){
            Util.alert('MSG_OUTRI_ERR_011'); //피킹로케이션 수량은 지시수량 이상으로 저장 할 수 없습니다.
            return false;
        }
//      //3.
//      if(Number(sendData.instQty) == (Number(sendData.pickQty)+Number(sendData.pickTotQty))){
//          if(sendData.nobRsCd != ''){
//              Util.alert('MSG_OUTRI_VAL_065'); //미출고사유를 다시 입력해주세요
//              return false;
//          }
//      }

        if(!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return false; //저장 하시겠습니까?

        App.prcsStart();
        $.ajax({
            url         : '/pda/ctrl/outbound/pdaObPickingOFV/updatePdaObPickingOFVDetailPop',
            type        : "POST",
            data        : JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            success     : function(data){
                if(data.stsCd == 200){
                    alert(data.msgTxt);
                    $("#pdaObPickingOFVDetailPop").popupCallback();
                    $("#pdaObPickingOFVDetailPop").coreClosePopup();
                }else{
                    alert(data.msgTxt);
                }
            },
            error		:function(data){
            	console.log('error');


            },
            fail		: function(data){
            	console.log('fail')
            }
        })
    }

    function fnLotInfo(data){
        $('#pdaObPickingOFVDetailPopMakeLot').val(data.MAKE_LOT);
        $('#pdaObPickingOFVDetailPopMakeYmd').val(data.MAKE_YMD);
        $('#pdaObPickingOFVDetailPopDistExpiryYmd').val(data.DIST_EXPIRY_YMD);
        $('#pdaObPickingOFVDetailPopLotAttr1').val(data.LOT_ATTR1);
        $('#pdaObPickingOFVDetailPopLotAttr2').val(data.LOT_ATTR2);
        $('#pdaObPickingOFVDetailPopLotAttr3').val(data.LOT_ATTR3);
        $('#pdaObPickingOFVDetailPopLotAttr4').val(data.LOT_ATTR4);
        $('#pdaObPickingOFVDetailPopLotAttr5').val(data.LOT_ATTR5);

        $('#pdaObPickingOFVDetailPopInstBoxQtyBtn').text(getData.BOX_UOM_CD);
        $('#pdaObPickingOFVDetailPopPickingTotBoxQtyBtn').text(getData.BOX_UOM_CD);
        $('#pdaObPickingOFVDetailPopPickingBoxQtyBtn').text(getData.BOX_UOM_CD);
        $('#pdaObPickingOFVDetailPopInstEaQtyBtn').text(getData.EA_UOM_CD);
        $('#pdaObPickingOFVDetailPopPickingTotEaQtyBtn').text(getData.EA_UOM_CD);
        $('#pdaObPickingOFVDetailPopPickingEaQtyBtn').text(getData.EA_UOM_CD);

        //피킹총수량
        $('#pdaObPickingOFVDetailPopPickingTotBoxQty').val(getData.PICK_BOX_QTY);
//        $('#pdaObPickingOFVDetailPopPickingTotEaQty').val(getData.PICK_EA_QTY);

        //피킹수량
//        $('#pdaObPickingOFVDetailPopPickingBoxQty').val(getData.PICK_QTY);

        availQty = data.AVAIL_QTY;

        //피킹수량 가용 수량 계산
        var pickQtyChai =   (Number(getData.INST_BOX_QTY)-Number(getData.PICK_BOX_QTY));

           // 지시수량-총피킹수량 = 30
           // 1. availQty100, 2. avavilQty 20
           // if valQty > availQty
           // availQty - valQty =
           // else
           // availQty

        //차이가 가용보다 크면?
        if(pickQtyChai > availQty){
        	//가용 0 일때
            if (availQty == 0){
                pickQtyVal=0;
            //피킹수량에 가용수량을 입력
            }else{
                pickQtyVal = availQty;
            }
        //차이와 가용수량이 같거나 가용수량이 클때
        }else{
            pickQtyVal = pickQtyChai;
        }
        //pdaObPickingOFVDetailPopPickingBoxQty
      $('#pdaObPickingOFVDetailPopPickingBoxQty').val(pickQtyVal);
    }

    function fnInit(){
        $('#pdaObPickingOFVDetailPopPickLocCd').val('');
        $('#pdaObPickingOFVDetailPopToPltId').val('');
    }

}();

$(document).ready(function() {
    PdaObPickingDetailPopApp.init();
});

