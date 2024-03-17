var SysUserDcApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0005';
	const proNm = 'sysUserDc';
    const apiUrl = '/api/sys/userDc';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysUserDcHGrid');
    let gridUser;
    let gridDc;
    let gridUseYn;

    return {
        init: function () {

            gridUseYn   = WMSUtil.fnCombo.grid('USE_YN');

            fnEvents();

        	fnListH();

	    }

    };

    //이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysUserDcUserId').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysUserDcHSearchBtn').click(function(){
            // if(fnModCheck())
                fnHSearch();
        });
        $('#sysUserDcHAddBtn').click(function(){
            fnHAdd();
        });
        $('#sysUserDcHSaveBtn').click(function(){
            fnHSave();
        });
        $('#sysUserDcHDelBtn').click(function(){
            fnHDel();
        });

        //조회
        fnSearchUser();

        fnSearchDc();
    }

    //사용자 조회
    function fnSearchUser(){
        App.prcsStart();
        $.ajax({
            url : apiUrl + "/selectUserList",
            contentType: "application/json; charset=UTF-8",
            type : "POST",
            dataType : "json",
            async : false,
            cache : false,
            success : function(result) {
                gridUser = Util.MakeGridOptions(result);
            }
        });
        App.prcsEnd();
    }

    //물류센터 조회
    function fnSearchDc(){
        App.prcsStart();
        $.ajax({
            url : apiUrl + "/selectDcList",
            contentType: "application/json; charset=UTF-8",
            type : "POST",
            dataType : "json",
            async : false,
            cache : false,
            success : function(result) {
                gridDc = Util.MakeGridOptions(result);
            }
        });
        App.prcsEnd();
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectUserDcList',
			height       : '596',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
                {editable: false, name:'BIZ_CD', 	    align:'center'},
                {editable: true, name:'USER_ID',       align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridUser, }
                },
                {editable: true, name:'DC_CD',         align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridDc, }
                },
                {editable: true, name:'ORDR',          align:'center'},
                {editable: true, name:'RMRK',          align:'center'},
                {editable: true,  name:'USE_YN',        align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn, }
                },
                {editable: false, name:'IN_USER_ID',	align:'center'},
                {editable: false, name:'IN_DT',	        align:'center'},
	          ],
			// caption  : '공통코드 그룹 목록',
	        domainId	: "USER_LIST",
			pager    : '#sysUserDcHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
			}
		});
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){
        var data = {
            userId   : $('#sysUserDcUserId').val(),
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }



    function fnHAdd(){
        $HGrid.paragonGridAddRow({
            addData : {
                "BIZ_CD" 	: CoreSession.s_bizCd
            }
        });
    }

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveUserDc';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
            modFlag     : 'MOD_FLAG',
            bizCd       : 'BIZ_CD',
            userId      : 'USER_ID',
            dcCd        : 'DC_CD',

            ordr        : 'ORDR',
            rmrk        : 'RMRK',
            useYn       : 'USE_YN',
        };

        var jsonData = $HGrid.getSelectedJsonDataChk('dt_data', rowData, $HGrid);

        //null Check
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
            return;
        }

        //Require Check
        var ids = $HGrid.getGridParam('selarrrow');
        for(var idx in ids){
            var rowFlag = $HGrid.getRowData(idx).MOD_FLAG;
            var userId = $HGrid.getRowData(idx).USER_ID;
            var dcCd = $HGrid.getRowData(idx).DC_CD;
            var ordr = $HGrid.getRowData(idx).ORDR;
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT') continue;
            // Util.alert('MSG_COM_VAL_058', codeGrpCd);

            if(!userId){//사용자ID 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
            if(!dcCd){//물류센터 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
            if(!ordr){//순번 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
        }

        //ajax Event.
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            // $HGrid.paragonGridReload();
            fnHSearch();
        })
    }


    //[Fn]그룹코드 삭제
    //[Fn] Grid Delete Data Row. (제품관리 flag: 1 )
    function fnHDel() {

        var addFlag = $HGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = apiUrl + '/deleteUserDc';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                bizCd   : 'BIZ_CD',
                userId  : 'USER_ID',
                dcCd    : 'DC_CD'
            };

            //1. 체크된 리스트.
            var jsonData = $HGrid.getJsonData('dt_data', rowData);
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                // $HGrid.paragonGridReload();
                fnHSearch();
            })
        }
    }
    //[Fn] 코드명 가져오기 자동완성
    //[Fn 공통] 그리드 수정 여부 체크
    function fnModCheck(grid){
        return grid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

}();

$(document).ready(function() {
	SysUserDcApp.init();
});
