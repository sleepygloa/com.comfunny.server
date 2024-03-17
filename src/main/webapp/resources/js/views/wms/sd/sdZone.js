
var SdZoneApp = function () {
    "use strict";

    //프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PWMMS101E';
    const proNm = 'sdZone';
    const apiUrl = '/api/wms/sd/zone';

    // [El]프로그램 그리드
    const $HGrid = $("#sdZoneHGrid");
    const $sdZoneLevelDcGrid = $("#sdZoneLevelDcGrid");
    const $sdZoneLevelAreaGrid = $("#sdZoneLevelAreaGrid");
    const $sdZoneLevelZoneGrid = $("#sdZoneLevelZoneGrid");

    let gridUseYn;
    let gridCountryCd;
    let gridCityCd;
    let gridDc;
    let gridArea = ':'
    let gridKeepTypeCd;
    let gridHoldStCd;

    let $callBackInput;

    const firstLoad = true;

    return {
        init: function () {
            gridUseYn	 		= WMSUtil.fnCombo.grid_selectBox('sdZoneUseYn', 'YN');
            gridKeepTypeCd	 		= WMSUtil.fnCombo.grid('KEEP_TYPE_CD');
            gridHoldStCd	 		= WMSUtil.fnCombo.grid('HOLD_ST_CD');

            fnEvents();

            fnList();
            fnListLevelDc();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

        //조회 버튼
        $("#sdZoneSearchBtn").click(function(){
            fnSearch();
        });

        //행 추가
        $("#sdZoneAddBtn").click(function(){
            fnAdd();
        });

        //저장 버튼
        $("#sdZoneSaveBtn").click(function(){
            fnSave();
        });

        //행 삭제 버튼
        $("#sdZoneDelBtn").click(function(){
            fnDelete();
        });

        //엑셀 다운로드
        $("#sdZoneExcelBtn").click(function(){
            $HGrid.downloadExcelAllItems();
        });


        $('#sdZoneHGridDiv').css('display', 'block');
        $('#sdZoneLevelGridDiv').css('display', 'none');
        $('#tab1').click(function(){
            $('#sdZoneHGridDiv').css('display', 'block');
            $('#sdZoneLevelGridDiv').css('display', 'none');
        })
        $('#tab2').click(function(){
            $('#sdZoneHGridDiv').css('display', 'none');
            $('#sdZoneLevelGridDiv').css('display', 'block');
        })

    }


    /** 조회버튼클릭 */
    function fnSearch(){
        $HGrid.paragonGridSearch(JSON.stringify({
            zoneNm : $('#sdZoneZoneCd').val(),
            useYn : $('#sdZoneUseYn').val()
        }));

        var idxArea = $sdZoneLevelAreaGrid.jqGrid('getGridParam','selrow');
        if($sdZoneLevelAreaGrid.getDataIDs().length > 0  && idxArea == null) idxArea = 1
        var rowDataArea = $sdZoneLevelAreaGrid.getRowData(idxArea);
        $sdZoneLevelZoneGrid.paragonGridSearch(JSON.stringify({
            bizCd:rowDataArea.BIZ_CD,
            dcCd:rowDataArea.DC_CD,
            areaCd:rowDataArea.AREA_CD
        }));
    }

    //Check Grid Modification
    function fnModCheck(){
        return $HGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /** 그리드 조회 */
    function fnList(){
        $HGrid.paragonGrid({
            url				: apiUrl+'/selectZoneList',
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
                {editable: false, name:'BIZ_CD',        width:"100px",align:"center"},
                {editable: false, name:'DC_CD', 	    width:"100px",align:"center"},
                {editable: false, name:'DC_NM', 	    width:"100px",align:"center"},
                {editable: false, name:'AREA_CD', 	    width:"100px",align:"center"},
                {editable: false, name:'AREA_NM', 	    width:"100px",align:"center"},
                {editable: false, name:'ZONE_CD', 	    width:"100px",align:"center"},
                {editable: false, name:'ZONE_NM', 	    width:"100px",align:"center"},
                {editable: false,name:'KEEP_TYPE_CD',   width:"100px",align:"center",
                    fixed :true, required: false,
                    edittype:'select', formatter:'select', editoptions: { value:gridKeepTypeCd,}
                },
                {editable: false,name:'HOLD_ST_CD',    width:"100px",align:"center",
                    fixed :true, required: false,
                    edittype:'select', formatter:'select', editoptions: { value:gridHoldStCd,}
                },
                {editable: false,name:'REMARK',        width:"200px",align:"center"},
                {editable: false,name:'USE_YN',        width:"100px",align:"center",
                    fixed :true, required: false,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn,}
                },
            ],
            pager			: "#sdZoneHGridNavi",
            domainId		: "ZONE_LIST",
            gridComplete	: function(){
                var ids = $HGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $HGrid.setFocus(0);

                }
            }
        });
    }

    /** 그리드 조회 */
    function fnListLevelDc(){
        $sdZoneLevelDcGrid.paragonGrid({
            url				: apiUrl + '/selectLevelDcList',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: false,
//			multielonly:true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                {editable: false,name:'BIZ_CD',         width:"100px",align:"center", hidden:true},
                {editable: false,name:'DC_CD', 	        width:"100px",align:"center"},
                {editable: false,name:'DC_NM', 		    width:"100px",align:"center"},
            ],
            pager			: "#sdZoneLevelDcGridNavi",
            domainId		: "DC_LIST",
            gridComplete	: function(){
                var ids = $sdZoneLevelDcGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdZoneLevelDcGrid.setFocus(0);
                }

                fnListLevelDcArea();
            },onSelectRowEvent: function(currRowData, prevRowData){
                $sdZoneLevelAreaGrid.paragonGridSearch(JSON.stringify({
                    bizCd:currRowData.BIZ_CD,
                    dcCd:currRowData.DC_CD
                }));
            }
        });
    }
    /** 그리드 조회 */
    function fnListLevelDcArea(){
        $sdZoneLevelAreaGrid.paragonGrid({
            url				: apiUrl + '/selectLevelAreaList',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: false,
//			multielonly:true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                {editable: false,name:'BIZ_CD',         width:"100px",align:"center", hidden:true},
                {editable: false,name:'DC_CD', 	        width:"100px",align:"center", hidden:true},
                // {editable: false,name:'DC_NM', 		    width:"100px",align:"center"},
                {editable: false,name:'AREA_CD', 		width:"100px",align:"center"},
                {editable: false,name:'AREA_NM',        width:"100px",align:"center"},
                // {editable: false,name:'ZONE_CD', 		width:"100px",
                //     //                          required:true,
                //     searchBtnClick : function(value, rowid, colid) {
                //         fnAddZonePop(rowid);
                //     }
                // },
            ],
            pager			: "#sdZoneLevelAreaGridNavi",
            domainId		: "AREA_LIST",
            gridComplete	: function(){
                var ids = $sdZoneLevelAreaGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdZoneLevelAreaGrid.setFocus(0);
                }
                fnListLevelDcAreaZone();
            },onSelectRowEvent: function(currRowData, prevRowData){
                $sdZoneLevelZoneGrid.paragonGridSearch(JSON.stringify({
                    bizCd:currRowData.BIZ_CD,
                    dcCd:currRowData.DC_CD,
                    areaCd:currRowData.AREA_CD
                }));
            }
        });
    }
    /** 그리드 조회 */
    function fnListLevelDcAreaZone(){
        $sdZoneLevelZoneGrid.paragonGrid({
            url				: apiUrl + '/selectLevelZoneList',
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
                {editable: false,name:'BIZ_CD',         width:"100px",align:"center", hidden:true},
                {editable: false,name:'DC_CD', 	        width:"100px",align:"center", hidden:true},
                {editable: false,name:'AREA_CD', 		width:"100px",align:"center", hidden:true},
                {editable: true,name:'ZONE_CD',        width:"100px",align:"center"},
                {editable: true,name:'ZONE_NM',        width:"100px",align:"center"},
                {editable: true,name:'KEEP_TYPE_CD',   width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridKeepTypeCd,}
                },
                {editable: true,name:'HOLD_ST_CD',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridHoldStCd,}
                },
                {editable: true,name:'REMARK',        width:"100px",align:"center"},
                {editable: true,name:'USE_YN',        width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn,}
                },
            ],
            pager			: "#sdZoneLevelZoneGridNavi",
            domainId		: "ZONE_LIST",
            gridComplete	: function(){
                var ids = $sdZoneLevelZoneGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdZoneLevelZoneGrid.setFocus(0);
                }
            }
        });
    }
    function fnAdd(){

        // var idxDc = $sdZoneLevelDcGrid.jqGrid('getGridParam','selrow');
        // if($sdZoneLevelDcGrid.getDataIDs().length > 0  && idxDc == null) idxDc = 1
        // var rowDataDc = $sdZoneLevelDcGrid.getRowData(idxDc);


        var idxArea = $sdZoneLevelAreaGrid.jqGrid('getGridParam','selrow');
        if($sdZoneLevelAreaGrid.getDataIDs().length > 0  && idxArea == null) idxArea = 1
        var rowDataArea = $sdZoneLevelAreaGrid.getRowData(idxArea);

        $sdZoneLevelZoneGrid.paragonGridAddRow({
            addData : {
                BIZ_CD : rowDataArea.BIZ_CD,
                DC_CD:   rowDataArea.DC_CD,
                AREA_CD: rowDataArea.AREA_CD
            }
        })
    }

    //Grid Row Save
    function fnSave() {
        // 데이터 키 : Value Key
        var rowData = {
            modFlag			:"MOD_FLAG" ,
            bizCd           :"BIZ_CD",
            dcCd            :"DC_CD",
            areaCd          :"AREA_CD",
            zoneCd			:"ZONE_CD" ,
            zoneNm			:"ZONE_NM" ,
            keepTypeCd      :"KEEP_TYPE_CD",
            holdStCd        :"HOLD_ST_CD",
            useYn			:"USE_YN",
            remark			:"REMARK"
        }

        var jsonData = $sdZoneLevelZoneGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var saveUrl = apiUrl+'/saveZone';

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
            areaCd          :"AREA_CD",
            zoneCd			:"ZONE_CD" ,
        }

        var jsonData = $sdZoneLevelZoneGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
        var saveUrl = apiUrl+'/deleteZone';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            fnSearch();
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
            if(!(rowdata.ZONE_CD)){
                Util.alert('MSG_MST_VAL_002'); //물류센터코드 항목은 필수 입력입니다.
                return false;
            }else if(rowdata.ZONE_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_003'); //물류센터코드는 공백으로 입력 할 수 없습니다.
                return false;
            }
            if(!(rowdata.ZONE_NM)){
                Util.alert('MSG_MST_VAL_004'); //물류센터명 항목은 필수 입력입니다.
                return false;
            }
            if(rowdata.ZONE_NM.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_005'); //물류센터명은 공백으로 입력 할 수 없습니다.
                return false;
            }
        }
        return true;
    }

}();

$(document).ready(function() {
    SdZoneApp.init();
});
