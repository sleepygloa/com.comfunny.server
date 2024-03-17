
var SdDcApp = function () {
    "use strict";

    //프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PWMMS101E';
    const proNm = 'sdDc';
    const apiUrl = '/api/wms/sd/dc';

    // [El]프로그램 그리드
    const $sdDcHGrid = $("#sdDcHGrid");

    let gridUseYn;
    let gridCountryCd;
    let gridCityCd;

    let $callBackInput;

    const firstLoad = true;

    return {
        init: function () {
            gridUseYn	 		= WMSUtil.fnCombo.grid_selectBox('sdDcUseYn', 'YN');
            gridCountryCd		= WMSUtil.fnCombo.grid('COUNTRY_CD');
            gridCityCd			= WMSUtil.fnCombo.grid('CITY_CD');
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
        WMSUtil.changePop(proNm, 'Dc');

        //조회 버튼
        $("#sdDcSearchBtn").click(function(){
            fnSearch();
        });

        //행 추가
        $("#sdDcAddBtn").click(function(){
            $sdDcHGrid.paragonGridAddRow();
        });

        //저장 버튼
        $("#sdDcSaveBtn").click(function(){
            fnSave();
        });

        //행 삭제 버튼
        $("#sdDcDelBtn").click(function(){
            fnSave('DELETE');
        });

        //엑셀 다운로드
        $("#sdDcExcelBtn").click(function(){
            $sdDcHGrid.downloadExcelAllItems();
        });

        //물류센터 팝업
        $("#sdDcDcPop").click(function(){
            WMSUtil.popup.client('obApprClient');
        });
    }


    /** 조회버튼클릭 */
    function fnSearch(){
        $sdDcHGrid.paragonGridSearch({
            dcNm : $('#sdDcDcCd').val(),
            useYn : $('#sdDcUseYn').val()
        });
    }

    //Check Grid Modification
    function fnModCheck(){
        return $sdDcHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /** 그리드 조회 */
    function fnList(){
        $sdDcHGrid.paragonGrid({
            url				: apiUrl+'/selectDcList',
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
                {editable: true,name:'DC_CD', 		width:"100px", align:"center", disabled:true, excel:true,
                    required:true,
                    editoptions : { maxlength:20,
                        dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },
                {editable: true,name:'DC_NM', 		width:"200px", required:true, excel:true,
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
                {editable: true,name:'CEO_NM', 		width:"100px", align:"left", excel:true,

                    editoptions : { maxlength:50, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true,name:'POST_NO',		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'BASIC_ADDR', width:"300px",align:"left", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'DETAIL_ADDR', width:"300px",align:"left", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'BIZ_TP', 	width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'BIZ_KND', 	width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'TEL_NO', 		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:50, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true,name:'FAX_NO', 		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:50, dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true,name:'CONTACT_NM',  width:"100px",align:"center"},
                {editable: true,name:'CONTACT_TEL_NO',  width:"100px",align:"center"},
                {editable: true,name:'CONTACT_EMAIL',  width:"100px",align:"center"},
                {editable: true, name:'COUNTRY_CD', 	width:"100px",align:"center",  fixed :true,hidden:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridCountryCd, maxlength:6 }
                },
                {editable: true, name:'CITY_CD', 		width:"100px",align:"center",fixed :true,hidden:true,
                    edittype:'select',formatter:'select', editoptions: { value:gridCityCd, maxlength:6 }
                },
                {editable: true, name:'USE_YN', 				width:"100px",align:"center",  fixed :true, excel:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn },
                    required:true
                },
                {editable: true,name:'REMARK', 					width:"200px",align:"center", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
            ],
            pager			: "#sdDcHGridNavi",
            domainId		: "DC_LIST",
            gridComplete	: function(){
                var ids = $sdDcHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdDcHGrid.setFocus(0);

                }
            }
        });
    }


    //Grid Row Save
    function fnSave(flag) {
        // 데이터 키 : Value Key
        var rowData = {
            modFlag			:"MOD_FLAG" ,
            dcCd			:"DC_CD" ,
            dcNm			:"DC_NM" ,
            bizNo			:"BIZ_NO" ,
            bizNm			:"BIZ_NM" ,
            ceoNm			:"CEO_NM" ,
            postNo			:"POST_NO" ,
            basicAddr		:"BASIC_ADDR",
            detailAddr		:"DETAIL_ADDR",
            bizTp			:"BIZ_TP",
            bizKnd			:"BIZ_KND",
            telNo			:"TEL_NO",
            faxNo			:"FAX_NO",
            countryCd		:"COUNTRY_CD",
            cityCd			:"CITY_CD",
            useYn			:"USE_YN",
            remark			:"REMARK"
        }

        var jsonData = $sdDcHGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = "";
        var saveUrl = apiUrl+'/save';
        if(flag == 'DELETE'){
            msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            saveUrl = apiUrl+'/delete';
        }else{
            msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        }
        // console.log(jsonData);
        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            fnList();
        }, true)
    }

    //Validation
    function fnValidate(){

        var idx = $sdDcHGrid.getGridParam('selarrrow');

        //로우 닫기
        for(var i = 0; i < idx.length; i++){
            $sdDcHGrid.jqGrid('saveRow', idx[i], false,'clientArray');
        }

        //유효성검사
        for(var i = 0; i < idx.length; i++){
            var rowdata = $sdDcHGrid.getRowData(idx[i]);

            /* 필수값 유효성 검사 */
            if(!(rowdata.DC_CD)){
                Util.alert('MSG_MST_VAL_002'); //물류센터코드 항목은 필수 입력입니다.
                return false;
            }else if(rowdata.DC_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_003'); //물류센터코드는 공백으로 입력 할 수 없습니다.
                return false;
            }
            if(!(rowdata.DC_NM)){
                Util.alert('MSG_MST_VAL_004'); //물류센터명 항목은 필수 입력입니다.
                return false;
            }
            if(rowdata.DC_NM.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_005'); //물류센터명은 공백으로 입력 할 수 없습니다.
                return false;
            }
        }
        return true;
    }

}();

$(document).ready(function() {
    SdDcApp.init();
});
