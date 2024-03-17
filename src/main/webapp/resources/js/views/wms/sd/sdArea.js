
var SdAreaApp = function () {
    "use strict";

    //프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PWMMS101E';
    const proNm = 'sdArea';
    const apiUrl = '/api/wms/sd/area';

    // [El]프로그램 그리드
    const $sdAreaHGrid = $("#sdAreaHGrid");

    let gridUseYn;
    let gridCountryCd;
    let gridCityCd;
    let gridDc;

    let $callBackInput;

    const firstLoad = true;

    return {
        init: function () {
            gridUseYn	 		= WMSUtil.fnCombo.grid_selectBox('sdAreaUseYn', 'YN');
            console.log('gridUseYn',gridUseYn);

            fnEvents();

            fnList();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

        //Search or pop-up while typing
        WMSUtil.changePop(proNm, 'Area');

        //조회 버튼
        $("#sdAreaSearchBtn").click(function(){
            fnSearch();
        });

        //행 추가
        $("#sdAreaAddBtn").click(function(){
            $sdAreaHGrid.paragonGridAddRow();
        });

        //저장 버튼
        $("#sdAreaSaveBtn").click(function(){
            fnSave();
        });

        //행 삭제 버튼
        $("#sdAreaDelBtn").click(function(){
            fnDelete();
        });

        //엑셀 다운로드
        $("#sdAreaExcelBtn").click(function(){
            $sdAreaHGrid.downloadExcelAllItems();
        });

        fnSearchDc();
    }

    //사용자 조회
    function fnSearchDc(){
        App.prcsStart();
        $.ajax({
            url : "/api/wms/sd/common/selectDcCmbList",
            contentType: "application/json; charset=UTF-8",
            type : "POST",
            dataType : "json",
            async : false,
            cache : false,
            success : function(result) {
                console.log(result);
                gridDc = Util.MakeGridOptions(result.dt_list);
            }
        });
        App.prcsEnd();
    }

    /** 조회버튼클릭 */
    function fnSearch(){
        $sdAreaHGrid.paragonGridSearch({
            areaNm : $('#sdAreaAreaCd').val(),
            useYn : $('#sdAreaUseYn').val()
        });
    }

    //Check Grid Modification
    function fnModCheck(){
        return $sdAreaHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /** 그리드 조회 */
    function fnList(){
        $sdAreaHGrid.paragonGrid({
            url				: apiUrl+'/selectAreaList',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
//			multielonly:true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                // {editable: false,name:'BIZ_CD',  width:"100px"},
                {editable: true, name:'DC_CD', 	width:"100px",align:"center",  fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridDc,  }
                },
                {editable: true,name:'AREA_CD', 		width:"100px", align:"center", disabled:true, excel:true,
                    required:true,
                    editoptions : { maxlength:20,
                        dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },
                {editable: true,name:'AREA_NM', 		width:"200px", required:true, excel:true,
                    editoptions : { maxlength:100,
                        dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); })
                        }
                    }
                },
                /*                {editable: true,name:'PLANT', align:"center", width:"100px",
                                    editoptions : { maxlength:20, dataInit : function(el) {
                                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                                        }
                                    }
                                },*/
                {editable: true,name:'BIZ_NO', 		width:"100px", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },
                {editable: true,name:'BIZ_NM', 		width:"200px", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },

                {editable: true, name:'USE_YN', 				width:"100px",align:"center",  fixed :true, excel:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn },
                    required:true
                },
                {editable: true,name:'REMARK', 					width:"200px",align:"center", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
            ],
            pager			: "#sdAreaHGridNavi",
            domainId		: "AREA_LIST",
            gridComplete	: function(){
                var ids = $sdAreaHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdAreaHGrid.setFocus(0);

                }
            }
        });
    }

고
    //Grid Row Save
    function fnSave() {
        // 데이터 키 : Value Key
        var rowData = {
            modFlag			:"MOD_FLAG" ,
            bizCd           :"BIZ_CD",
            dcCd            :"DC_CD",
            areaCd			:"AREA_CD" ,
            areaNm			:"AREA_NM" ,
            keepTempeGbnCd  :"KEEP_TEMPE_GBN_CD",
            useYn			:"USE_YN",
            remark			:"REMARK"
        }

        var jsonData = $sdAreaHGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var saveUrl = apiUrl+'/saveArea';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            fnSearch();
        }, true)
    }
    //Grid Row Save
    function fnDelete() {
        // 데이터 키 : Value Key
        var rowData = {
            modFlag			:"MOD_FLAG" ,
            bizCd           :"BIZ_CD",
            dcCd            :"DC_CD",
            areaCd			:"AREA_CD" ,
        }

        var jsonData = $sdAreaHGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
        var saveUrl = apiUrl+'/deleteArea';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            fnSearch();
        }, true)
    }

    //Validation
    function fnValidate(){

        var idx = $sdAreaHGrid.getGridParam('selarrrow');

        //로우 닫기
        for(var i = 0; i < idx.length; i++){
            $sdAreaHGrid.jqGrid('saveRow', idx[i], false,'clientArray');
        }

        //유효성검사
        for(var i = 0; i < idx.length; i++){
            var rowdata = $sdAreaHGrid.getRowData(idx[i]);

            /* 필수값 유효성 검사 */
            if(!(rowdata.AREA_CD)){
                Util.alert('MSG_MST_VAL_002'); //물류센터코드 항목은 필수 입력입니다.
                return false;
            }else if(rowdata.AREA_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_003'); //물류센터코드는 공백으로 입력 할 수 없습니다.
                return false;
            }
            if(!(rowdata.AREA_NM)){
                Util.alert('MSG_MST_VAL_004'); //물류센터명 항목은 필수 입력입니다.
                return false;
            }
            if(rowdata.AREA_NM.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_005'); //물류센터명은 공백으로 입력 할 수 없습니다.
                return false;
            }
        }
        return true;
    }

}();

$(document).ready(function() {
    SdAreaApp.init();
});
