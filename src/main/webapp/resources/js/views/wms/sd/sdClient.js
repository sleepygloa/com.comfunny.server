
var SdClientApp = function () {
    "use strict";

    //프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PWMMS101E';
    const proNm = 'sdClient';
    const apiUrl = '/api/wms/sd/client';

    // [El]프로그램 그리드
    const $HGrid = $("#sdClientHGrid");

    let gridUseYn;
    let gridCountryCd;
    let gridCityCd;

    let $callBackInput;

    const firstLoad = true;

    return {
        init: function () {
            gridUseYn	 		= WMSUtil.fnCombo.grid_selectBox('sdClientUseYn', 'YN');
            gridCountryCd		= WMSUtil.fnCombo.grid('COUNTRY_CD');
            gridCityCd			= WMSUtil.fnCombo.grid('CITY_CD');

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
        // WMSUtil.changePop(proNm, 'Client');

        //조회 버튼
        $("#sdClientSearchBtn").click(function(){
            fnSearch();
        });

        //행 추가
        $("#sdClientAddBtn").click(function(){
            fnAdd();
        });

        //저장 버튼
        $("#sdClientSaveBtn").click(function(){
            fnSave();
        });

        //행 삭제 버튼
        $("#sdClientDelBtn").click(function(){
            fnSave('DELETE');
        });

        //엑셀 다운로드
        $("#sdClientExcelBtn").click(function(){
            $HGrid.downloadExcelAllItems();
        });

    }


    /** 조회버튼클릭 */
    function fnSearch(){
        $HGrid.paragonGridSearch({
            clientNm : $('#sdClientClientCd').val(),
            useYn : $('#sdClientUseYn').val()
        });
    }

    //Check Grid Modification
    function fnModCheck(){
        return $HGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /** 그리드 조회 */
    function fnList(){
        $HGrid.paragonGrid({
            url				: apiUrl+'/selectClientList',
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
                {editable: true,name:'CLIENT_CD', 		width:"100px", align:"center", disabled:true, excel:true,
                    required:true,
                    editoptions : { maxlength:20,
                        dataInit : function(el) {
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },
                {editable: true,name:'CLIENT_NM', 		width:"200px", required:true, excel:true,
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
            pager			: "#sdClientHGridNavi",
            domainId		: "CLIENT_LIST",
            gridComplete	: function(){
                var ids = $HGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $HGrid.setFocus(0);

                }
            }
        });
    }

    function fnAdd(){
        $HGrid.paragonGridAddRow();
    }

    //Grid Row Save
    function fnSave(flag) {
        // 데이터 키 : Value Key
        var rowData = {
            modFlag			:"MOD_FLAG" ,
            clientCd		:"CLIENT_CD" ,
            clientNm		:"CLIENT_NM" ,
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

        var jsonData = $HGrid.getSelectedJsonData("dt_grid",rowData);

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

        var idx = $HGrid.getGridParam('selarrrow');

        //로우 닫기
        for(var i = 0; i < idx.length; i++){
            $HGrid.jqGrid('saveRow', idx[i], false,'clientArray');
        }

        //유효성검사
        for(var i = 0; i < idx.length; i++){
            var rowdata = $HGrid.getRowData(idx[i]);

            /* 필수값 유효성 검사 */
            if(!(rowdata.CLIENT_CD)){
                Util.alert('MSG_MST_VAL_002'); //고객사코드 항목은 필수 입력입니다.
                return false;
            }else if(rowdata.CLIENT_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_003'); //고객사코드는 공백으로 입력 할 수 없습니다.
                return false;
            }
            if(!(rowdata.CLIENT_NM)){
                Util.alert('MSG_MST_VAL_004'); //고객사명 항목은 필수 입력입니다.
                return false;
            }
            if(rowdata.CLIENT_NM.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_005'); //고객사명은 공백으로 입력 할 수 없습니다.
                return false;
            }
        }
        return true;
    }

}();

$(document).ready(function() {
    SdClientApp.init();
});
