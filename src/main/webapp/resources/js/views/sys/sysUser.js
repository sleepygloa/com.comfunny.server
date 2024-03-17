var SysUserApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0005';
	const proNm = 'sysUser';
    const apiUrl = '/api/sys/user';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysUserHGrid');

	// [Data]그룹코드 유형 콤보박스 데이터
    var gridUseYn;
    var gridUserPosition;
    var gridLangCd;
    var gridPrintDriver;

    return {
        init: function () {

            gridUseYn 			= WMSUtil.fnCombo.grid('YN');
            gridLangCd 			= WMSUtil.fnCombo.grid('SC0013');
            gridUserPosition 	= WMSUtil.fnCombo.grid('SC0016');
            gridPrintDriver 	= WMSUtil.fnCombo.grid('PRINT_DRIVER');

            fnEvents();

        	fnListH();

	    }

    };

    //이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysUserUserId').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysUserHSearchBtn').click(function(){
            //그리드 수정 여부 체크
            if(fnModCheck($HGrid)){
                fnHSearch();
            }
        });
        $('#sysUserHAddBtn').click(function(){
            fnHAdd();
        });
    	$('#sysUserHSaveBtn').click(function(){
    		fnHSave();
    	});
    	$('#sysUserHDelBtn').click(function(){
    	    fnHDel();
    	});
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectUserList',
			height       : '596',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
            colModel	 :[
                {name:'BIZ_CD', 	   width:"100px",	hidden:false},
                {name:'USER_ID', 	   width:"100px",	align:"center", editable:true},
                {name:'ACTIVATED',     width:"100px",	align:"center"},
                {name:'NICKNAME',      width:"100px",	align:"center", editable:true},
                // {name:'PASSWORD',       width:"100px",	align:"center"},
                {name:'USERNAME',      width:"100px",	align:"center", editable:true},
                {name:'USER_NO',       width:"100px",	align:"center"},
                // {name:'USER_NM', 	   width:"200px",	align:"center"},
                {name:'USER_POSITION', width:"150px",	align:"center", editable:true,
                    edittype:'select', formatter:'select', editoptions: { value : gridUserPosition }
                },
                {name:'USER_PHONE',	   width:"150px",	align:"center", editable:true},
                {name:'USER_EMAIL',	   width:"150px",	align:"center", editable:true},
                {name:'USE_YN',		   width:"100px",	align:"center", editable:true,
                    edittype:'select', formatter:'select', editoptions: { value : gridUseYn }
                },
                {name:'PWD_FAIL_CNT', width:"100px",	align:"center"},
                {name:'LATELY_TRY', width:"100px",	align:"center"},
                {name:'USER_JOIN_DT', width:"100px",	align:"center"},
                {name:'PUSH_ID', width:"100px",	align:"center", editable:true},
                {name:'PWD_CHG_DT', width:"100px",	align:"center"},
                {name:'USER_LANG_CD', 	   width:"150px",	align:"center", editable:true,
                    edittype:'select', formatter:'select', editoptions: { value : gridLangCd }
                },
                {name:'USER_COUNTRY_CD', width:"100px",	align:"center", editable:true},
                {name:'PRINTER_DRIVER', 	   width:"150px",	align:"center", editable:true,
                }
            ],
            domainId 	: "USER_MNG",
			pager    : '#sysUserHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
			}
		});
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){

        var data = {
            userId   : $('#sysUserUserId').val(),
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }


    function fnHAdd(){
        $HGrid.paragonGridAddRow();
    }

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveUser';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
            modFlag         : 'MOD_FLAG',
            bizCd           : 'BIZ_CD',
            userId          : 'USER_ID',
            userNm          : 'USER_NM',

            activeted        : 'ACTIVATED',
            nickname        : 'NICKNAME',
            password        : 'PASSWORD',
            username        : 'USERNAME',
            userNo          : 'USER_NO',
            userPhone       : 'USER_PHONE',
            userEmail       : 'USER_EMAIL',
            userPosition    : 'USER_POSITION',
            pwdFailCnt      : 'PWD_FAIL_CNT',
            latelyTry       : 'LATELY_TRY',
            lastLoginDt     : 'LAST_LOGIN_DT',
            pushId          : 'PUSH_ID',
            userLangCd      : 'USER_LANG_CD',
            userCountryCd   : 'USER_COUNTRY_CD',
            printerIp       : 'PRINTER_IP',
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
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT') continue;
                // Util.alert('MSG_COM_VAL_058', codeGrpCd);

            if(!userId){//그룹코드 검사
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
            var saveUrl = apiUrl + '/deleteUser';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                bizCd   : 'BIZ_CD',
                userId: 'USER_ID'
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
		return grid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009')); //변경사항이 있습니다. 계속 진행하시겠습니까?
	}

}();

$(document).ready(function() {
	SysUserApp.init();
});
