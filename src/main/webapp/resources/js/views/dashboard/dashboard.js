var Dashboard = function(){
	"use strict";

	//프로그램 코드, 명
	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'dashboard';

	var favoriteHeight = '150';
	var dashData = {};

	return {
		init : function(){

			// WMSUtil.fnCombo.selectBox('dashboardProdGrp', 'PROD_GRP_CD', CoreSession.s_prodGrpCd);

//			WMSUtil.fnCombo.selectBox('dashboardPrintDriver', 'PRINT_DRIVER', ParagonSession.s_printDriver);

			// fnEvents();

			// fnSetSession();
		}
	}

	function fnEvents(){

		Util.SessionInit();

        $.ajax({
            url      : "/api/sys/code/getCodeDescListForSelectBox",
            data     : {codeGrpCd:'PRINT_DRIVER'},
            type     : "POST",
            dataType : "json",
            async	 : false, //필수
//            cache    : false,
            success  : function(result) {
            	Util.MakeSelectOptions($('#dashboardPrintDriver'), result);

            }
        });

    	if(CoreSession.s_printDriver != undefined){
    		$('#dashboardPrintDriver option[value="'+CoreSession.s_printDriver+'"]').attr('selected','selected');
    	}

    	//세션값 사용.
		var workYmd = CoreSession.s_workYmd;
//		console.log(workYmd)
		if(workYmd != undefined){
			$('#dashboardWorkYmdDatePicker').datepicker("setDate", new Date(workYmd));
		}else{
			$('#dashboardWorkYmdDatePicker').datepicker("setDate", new Date());
		}


		$('#dashboardWorkYmd').change(function(){
			if(CoreSession.s_workYmd != $(this).val){
				fnSetSession();
			}
		});
		$('#dashboardProdGrp').change(function(){
			if(CoreSession.s_prodGrpCd != $(this).val()){
				fnSetSession();
			}
		});

		$('#dashboardPrintDriver').change(function(){
			if(CoreSession.s_printDriver != $(this).val()){
				fnSetSession();
			}
		});

		//
		$('#dashboardWorkYmdBtn').click(function(){
			$('#dashboardWorkYmd').trigger('click');
		})

		fnMenu();

	};

	//데이터 저장
	function fnSetData(){
		return {
				ymd 			: $('#dashboardWorkYmd').val(),
				prodGrpCd		: $('#dashboardProdGrp').val(),
				prodGrp			: $('#dashboardProdGrp option:selected').text(),
//				printDriver		: $('#dashboardPrintDriver').val(),
//				printDriverIp	: $('#dashboardPrintDriver option:selected').text(),
				printDriver		: $('#dashboardPrintDriver option:selected').val(),

		}
	}

	//세션 등록
	function fnSetSession(){
		$.ajax({
			url			: '/ctrl/dashboard/updateSetSession',
			async		: false,
			data		: fnSetData(),
			success		: function(data){
				Util.SessionInit();
			}
		})
	}

	function fnMenu(){
		   /**
		    * LEFT(Side) 메뉴 설정
		    * */
		$.ajax({
			url 	: '/api/pda/dashboard/getPdaDashboardFavoriteMenu',
			type	: 'GET',
			async	: true,
			success	: function(data){
				console.log(data);
				var dt_grid = data;
				$('#dashboardMenuGrp').empty();

				for(var i in dt_grid){

					var icoStyle = "";
					var menuIco = $('<span />');
					var menuImgUrl = "";

					//아이콘 경로가 font-awesome 클래스인지. url 인지 검사
					//font-awesome 이면
					if(dt_grid[i].MENU_ICO == undefined){
					}else if((dt_grid[i].MENU_ICO).indexOf('fa') != -1){
						icoStyle = "display:inline-block;position:absolute;top:30%;left:50%;transform: translate(-50%, -50%);";
						menuIco.addClass('fa fa-2x '+dt_grid[i].MENU_ICO);
					//url 이면
					}else{
						icoStyle = "display:inline-block;position:absolute;top:30%;left:50%;transform: translate(-50%, -50%); height:50%; padding:0px 20px";
					}


//					console.log(dt_grid[i]);
					var menuStr = $('<div class="form-group pdaDashIconDiv favorite"  />');


					var menuContainerIco = $('<div class="input-group input-group-sm col-xs-w100" style="'+ icoStyle +'" />');
					var menuContainer = $('<div class="input-group input-group-sm col-xs-w100" style="display:inline-block;position:absolute;top:70%;left:50%;transform: translate(-50%, -50%); padding:0px 5px;" />');

					if(dt_grid[i].MENU_ICO == undefined){
					}else if((dt_grid[i].MENU_ICO).indexOf('fa') == -1){
						menuImgUrl = dt_grid[i].MENU_ICO;

						var menuContainerIcoDiv = $('<img src="'+menuImgUrl+'" style="width:70%;height:100%;"/>');

						menuContainerIco.append(menuContainerIcoDiv);
//						menuContainerIco.css('background-', 'url(/img/program/prodExam.png)');
					//url 이면
					}else{
						menuContainerIco.append(menuIco);
					}

					var menuSpan = $('<span class="pdaDashIconDivText" />');

					menuSpan.css({
						'color' 		: '#555',
						'font-weight' 	: '700'
					});

					if(CoreSession.s_language == 'ko'){
						menuSpan.css('font-size', '1.2em');
					}else{
						if(dt_grid[i].MENU_NM.length > 20){
							menuSpan.css('font-size', '0.7em');
						}else{
							menuSpan.css('font-size', '0.8em');
						}
					}

					menuStr.css('text-align', 'center');
					menuStr.css('border', '1px solid #8080803b');

					menuSpan.text(dt_grid[i].MENU_NM);


					menuContainer.append(menuSpan);
					menuStr.append(menuContainerIco);
					menuStr.append(menuContainer);

					menuStr.data("CALL_URL", dt_grid[i].CALL_URL );
					menuStr.data('MENU_NM', dt_grid[i].MENU_NM);
					menuStr.data('MENU_SEQ', dt_grid[i].MENU_SEQ);
					menuStr.data('PRO_CD', dt_grid[i].PRO_CD);

					$('#dashboardMenuGrp').append(menuStr);
				}

				$('.favorite').click(function(){
					var menuNm = $(this).data('MENU_NM');
					$('#tabs').viewProgram({
						title	: menuNm,
						id		: $(this).data('MENU_SEQ'),
						ajaxUrl	: $(this).data('CALL_URL'),
						proCd	: $(this).data('PRO_CD'),
					});

					//헤더nav 왼쪽 IMG를 쓰지않을때
					$('#navCaption').empty();
					var captionTxt = $('<span>'+menuNm+'</span>');
					$('#navCaption').append(captionTxt);
				})

			}
		})
	}
}();

$(document).ready(function() {
    App.initAction();
    Dashboard.init();
});

