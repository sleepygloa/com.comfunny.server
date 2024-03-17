var SysUserCnnLogApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0005';
	const proNm = 'sysUserCnnLog';
    const apiUrl = '/api/sys/userCnnLog';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysUserCnnLogHGrid');

    return {
        init: function () {
            fnEvents();

        	fnListH();

	    }

    };

    //이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysUserCnnLogUserId').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysUserCnnLogHSearchBtn').click(function(){
            //그리드 수정 여부 체크
            fnHSearch();
        });
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectUserCnnLogList',
			height       : '596',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
                {editable: false, name:'BIZ_CD', 	    align:'center'},
                {editable: false, name:'USER_ID',       align:'left'},
                {editable: false, name:'DC_CD',         align:'left'},
                {editable: false, name:'CLIENT_CD',     align:'left'},
                {editable: false, name:'LOGIN_IP',      align:'center'},
                {editable: false, name:'LANG_CD',       align:'center'},
                {editable: false, name:'COUNTRY_CD',    align:'center'},
                {editable: false, name:'LOGIN_OS',      align:'center'},
                {editable: false, name:'IN_DT',	        align:'center'},
	          ],
			// caption  : '공통코드 그룹 목록',
	        domainId	: "USER_LIST",
			pager    : '#sysUserCnnLogHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
			}
		});
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){

        var data = {
            userId   : $('#sysUserCnnLogUserId').val(),
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }

}();

$(document).ready(function() {
	SysUserCnnLogApp.init();
});
