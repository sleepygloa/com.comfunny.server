
var SdLocApp = function () {
    "use strict";

    //프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PWMMS101E';
    const proNm = 'sdLoc';
    const apiUrl = '/api/wms/sd/loc';

    // [El]프로그램 그리드
    const $HGrid = $("#sdLocHGrid");
    const $sdLocLevelDcGrid = $("#sdLocLevelDcGrid");
    const $sdLocLevelDcZoneGrid = $("#sdLocLevelDcZoneGrid");
    const $sdLocLevelDcZoneLocGrid = $("#sdLocLevelDcZoneLocGrid");

    let gridUseYn;
    let gridLocTypeCd;
    let gridLoadGbnCd;
    let gridHoldStCd;
    let gridItemMixLoadYn;
    let gridLotMixLoadYn;
    let gridKeepTypeCd;

    let $callBackInput;

    const firstLoad = true;

    return {
        init: function () {
            gridUseYn	 		    = WMSUtil.fnCombo.grid_selectBox('sdLocUseYn', 'YN');
            gridLocTypeCd	 		= WMSUtil.fnCombo.grid('LOC_TYPE_CD');
            gridLoadGbnCd	 		= WMSUtil.fnCombo.grid('LOAD_GBN_CD');
            gridHoldStCd	 		= WMSUtil.fnCombo.grid('HOLD_ST_CD');
            gridItemMixLoadYn	 	= WMSUtil.fnCombo.grid('YN');
            gridLotMixLoadYn	 	= WMSUtil.fnCombo.grid('YN');
            gridKeepTypeCd	 		= WMSUtil.fnCombo.grid('KEEP_TYPE_CD');

            fnEvents();

            fnList();
            fnListLevelDc();
            fnListLevelDcZone();
            fnListLevelDcZoneLoc();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

        //조회 버튼
        $("#sdLocSearchBtn").click(function(){
            fnSearch();
        });

        //행 추가
        $("#sdLocAddBtn").click(function(){
            fnAdd();
        });

        //저장 버튼
        $("#sdLocSaveBtn").click(function(){
            fnSave();
        });

        //행 삭제 버튼
        $("#sdLocDelBtn").click(function(){
            fnDelete();
        });

        //엑셀 다운로드
        $("#sdLocExcelBtn").click(function(){
            $HGrid.downloadExcelAllItems();
        });


        $('#sdLocHGridDiv').css('display', 'block');
        $('#sdLocLevelGridDiv').css('display', 'none');
        // $('#sdLocTab')
        $('#tab1').click(function(){
            $('#sdLocHGridDiv').css('display', 'block');
            $('#sdLocLevelGridDiv').css('display', 'none');
        })
        $('#tab2').click(function(){
            $('#sdLocHGridDiv').css('display', 'none');
            $('#sdLocLevelGridDiv').css('display', 'block');
        })

    }


    /** 조회버튼클릭 */
    function fnSearch(){
        $HGrid.paragonGridSearch(JSON.stringify({
            zoneNm : $('#sdLocZoneCd').val(),
            useYn : $('#sdLocUseYn').val()
        }));

        $sdLocLevelDcGrid.paragonGridSearch();
    }

    //Check Grid Modification
    function fnModCheck(){
        return $HGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /** 그리드 조회 */
    function fnList(){
        $HGrid.paragonGrid({
            url				: apiUrl+'/selectLocList',
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
                {editable: false,name:'ZONE_CD',        width:"100px",align:"center"},
                {editable: false,name:'LOC_CD',        width:"100px",align:"center"},
                {editable: false,name:'LOC_NM',        width:"100px",align:"center"},
                {editable: false,name:'LIN_CD',        width:"100px",align:"center"},
                {editable: false,name:'ROW_CD',        width:"100px",align:"center"},
                {editable: false,name:'LEV_CD',        width:"100px",align:"center"},
                {editable: false,name:'LOC_TYPE_CD',   width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLocTypeCd,}
                },
                {editable: false,name:'LOAD_GBN_CD',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLoadGbnCd,}
                },
                {editable: false,name:'HOLD_ST_CD',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridHoldStCd,}
                },
                {editable: false,name:'LOC_PRIOORD',        width:"100px",align:"center"},

                {editable: false,name:'ITEM_MIX_LOAD_YN',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridItemMixLoadYn,}
                },
                {editable: false,name:'LOT_MIX_LOAD_YN',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLotMixLoadYn,}
                },
                {editable: false,name:'HORIZONTAL',        width:"100px",align:"center"},
                {editable: false,name:'VERTICAL',        width:"100px",align:"center"},
                {editable: false,name:'HEIGHT',          width:"100px",align:"center"},
                {editable: false,name:'CBM',             width:"100px",align:"center"},
                {editable: false,name:'WEIGHT',          width:"100px",align:"center"},
                {editable: false,name:'REMARK',          width:"100px",align:"center"},
                {editable: false,name:'USE_YN',          width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn,}
                },
            ],
            pager			: "#sdLocHGridNavi",
            domainId		: "LOC_LIST",
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
        $sdLocLevelDcGrid.paragonGrid({
            url				: apiUrl + '/selectLevelDcList',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: false,
            firstData       : false,
//			multielonly:true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                {editable: false,name:'BIZ_CD',         width:"100px",align:"center", hidden:true},
                {editable: false,name:'DC_CD', 	        width:"100px",align:"center"},
                {editable: false,name:'DC_NM', 		    width:"100px",align:"center"},
            ],
            pager			: "#sdLocLevelDcGridNavi",
            domainId		: "DC_LIST",
            gridComplete	: function(){
                var ids = $sdLocLevelDcGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdLocLevelDcGrid.setFocus(0);

                    var currRowData = $sdLocLevelDcGrid.getRowData(ids[0]);
                    $sdLocLevelDcZoneGrid.paragonGridSearch(JSON.stringify({
                        bizCd:currRowData.BIZ_CD,
                        dcCd:currRowData.DC_CD
                    }));
                }

            },onSelectRowEvent: function(currRowData, prevRowData){
                $sdLocLevelDcZoneGrid.paragonGridSearch(JSON.stringify({
                    bizCd:currRowData.BIZ_CD,
                    dcCd:currRowData.DC_CD
                }));
            }
        });
    }

    /** 그리드 조회 */
    function fnListLevelDcZone(){
        $sdLocLevelDcZoneGrid.paragonGrid({
            url				: apiUrl + '/selectLevelDcZoneList',
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
                {editable: false,name:'ZONE_CD', 		    width:"100px",align:"center"},
                {editable: false,name:'ZONE_NM', 		    width:"100px",align:"center"},
            ],
            pager			: "#sdLocLevelDcZoneGridNavi",
            domainId		: "ZONE_LIST",
            gridComplete	: function(){
                var ids = $sdLocLevelDcZoneGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdLocLevelDcZoneGrid.setFocus(0);

                    var currRowData = $sdLocLevelDcZoneGrid.getRowData(ids[0]);
                    $sdLocLevelDcZoneLocGrid.paragonGridSearch(JSON.stringify({
                        bizCd:currRowData.BIZ_CD,
                        dcCd:currRowData.DC_CD,
                        zoneCd:currRowData.ZONE_CD,
                    }));
                }

            },onSelectRowEvent: function(currRowData, prevRowData){
                $sdLocLevelDcZoneLocGrid.paragonGridSearch(JSON.stringify({
                    bizCd:currRowData.BIZ_CD,
                    dcCd:currRowData.DC_CD,
                    zoneCd:currRowData.ZONE_CD,
                }));
            }
        });
    }
    /** 그리드 조회 */
    function fnListLevelDcZoneLoc(){
        $sdLocLevelDcZoneLocGrid.paragonGrid({
            url				: apiUrl + '/selectLevelDcZoneLocList',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: true,
            multiselect		: true,
//			multielonly:true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                {editable: false,name:'BIZ_CD',         width:"100px",align:"center", hidden:true},
                {editable: false,name:'DC_CD', 	        width:"100px",align:"center", hidden:true},
                {editable: false,name:'ZONE_CD', 	    width:"100px",align:"center", hidden:true},
                {editable: true,name:'LOC_CD',        width:"100px",align:"center", disabled : true},
                {editable: true,name:'LIN_CD',        width:"100px",align:"center"},
                {editable: true,name:'ROW_CD',        width:"100px",align:"center"},
                {editable: true,name:'LEV_CD',        width:"100px",align:"center"},
                {editable: true,name:'LOC_TYPE_CD',   width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLocTypeCd,}
                },
                {editable: true,name:'LOAD_GBN_CD',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLoadGbnCd,}
                },
                {editable: true,name:'HOLD_ST_CD',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridHoldStCd,}
                },
                {editable: true,name:'LOC_PRIOORD',        width:"100px",align:"center"},

                {editable: true,name:'ITEM_MIX_LOAD_YN',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridItemMixLoadYn,}
                },
                {editable: true,name:'LOT_MIX_LOAD_YN',    width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLotMixLoadYn,}
                },
                {editable: true,name:'HORIZONTAL',        width:"100px",align:"center"},
                {editable: true,name:'VERTICAL',        width:"100px",align:"center"},
                {editable: true,name:'HEIGHT',          width:"100px",align:"center"},
                {editable: true,name:'CBM',             width:"100px",align:"center"},
                {editable: true,name:'WEIGHT',          width:"100px",align:"center"},
                {editable: true,name:'REMARK',          width:"100px",align:"center"},
                {editable: true,name:'USE_YN',          width:"100px",align:"center",
                    fixed :true, required: true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn,}
                },
            ],
            pager			: "#sdLocLevelDcZoneLocGridNavi",
            domainId		: "LOC_LIST",
            gridComplete	: function(){
                var ids = $sdLocLevelDcZoneLocGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $sdLocLevelDcZoneLocGrid.setFocus(0);
                }
            }
        });
    }
    function fnAdd(){
        var idx = $sdLocLevelDcZoneGrid.jqGrid('getGridParam','selrow');
        if($sdLocLevelDcZoneGrid.getDataIDs().length > 0  && idx == null) idx = 1
        var rowData = $sdLocLevelDcZoneGrid.getRowData(idx);

        $sdLocLevelDcZoneLocGrid.paragonGridAddRow({
            addData : {
                BIZ_CD : rowData.BIZ_CD,
                DC_CD:   rowData.DC_CD,
                ZONE_CD:   rowData.ZONE_CD,
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
            zoneCd          :"ZONE_CD",
            locCd           :"LOC_CD",
            linCd           :"LIN_CD",
            rowCd           :"ROW_CD",
            levCd           :"LEV_CD",
            locTypeCd       :"LOC_TYPE_CD",
            loadGbnCd       :"LOAD_GBN_CD",
            holdStCd        :"HOLD_ST_CD",
            locPrioord      :"LOC_PRIOORD",
            itemMixLoadYn   :"ITEM_MIX_LOAD_YN",
            lotMixLoadYn    :"LOT_MIX_LOAD_YN",
            horizontal      :"HORIZONTAL",
            vertical        :"VERTICAL",
            height          :"HEIGHT",
            cbm             :"CBM",
            weight          :"WEIGHT",
            remark          :"REMARK",
            useYn           :"USE_YN",
        }

        var jsonData = $sdLocLevelDcZoneLocGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var saveUrl = apiUrl+'/saveLoc';

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
            zoneCd          :"ZONE_CD",
            locCd           :"LOC_CD"
        }

        var jsonData = $sdLocLevelDcZoneLocGrid.getSelectedJsonData("dt_grid",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        if(!fnValidate()) return false;

        var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
        var saveUrl = apiUrl+'/deleteLoc';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            fnSearch();
        }, true)
    }

    //Validation
    function fnValidate(){
        var grid = $sdLocLevelDcZoneLocGrid;

        var idx = grid.getGridParam('selarrrow');

        //로우 닫기
        for(var i = 0; i < idx.length; i++){
            grid.jqGrid('saveRow', idx[i], false,'clientArray');
        }

        //유효성검사
        for(var i = 0; i < idx.length; i++){
            var rowdata = grid.getRowData(idx[i]);

            // /* 필수값 유효성 검사 */
            // if(!(rowdata.LIN_CD)||!(rowdata.ROW_CD)||!(rowdata.LEN_CD) ){
            //     Util.alert('MSG_MST_VAL_002'); //물류센터코드 항목은 필수 입력입니다.
            //     return false;
            // }else if(rowdata.LOC_CD.trim().length == 0 ){
            //     Util.alert('MSG_MST_VAL_003'); //물류센터코드는 공백으로 입력 할 수 없습니다.
            //     return false;
            // }
            // if(!(rowdata.LOC_NM)){
            //     Util.alert('MSG_MST_VAL_004'); //물류센터명 항목은 필수 입력입니다.
            //     return false;
            // }
            // if(rowdata.LOC_NM.trim().length == 0 ){
            //     Util.alert('MSG_MST_VAL_005'); //물류센터명은 공백으로 입력 할 수 없습니다.
            //     return false;
            // }
        }
        return true;
    }

}();

$(document).ready(function() {
    SdLocApp.init();
});
