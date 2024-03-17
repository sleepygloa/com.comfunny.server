var MainContent = function(){
	"use strict"

	return {
		init : function(){

			/** LEFT MENU 값 설정*/
			$('#leftMenuUserNm').text(CoreSession.s_userNm);
			$('#leftMenuDcNm').text(CoreSession.s_dcNm_Prioord);
			$('#leftMenuClientNm').text(CoreSession.s_clientNm_Prioord);

		   /**
		    * LEFT(Side) 메뉴 설정
		    * */

			$("#leftMenu").empty();
			$("#leftMenu").setLeftMenu({
				allOpen	: false,
				click	: function(data){

					// if(CoreSession.loginOs == "mobile"){
						tabs.viewProgram({
							title	: data.val,
							id		: data.key,
							ajaxUrl	: data.url,
							proCd	: data.pro_cd,
							icon	: data.ico,
							proNm	: data.menu_nm
						});
					// }
					// if(CoreSession.loginOs == "web"){
					// 	tabs.addTab({
					// 		title	: data.val,
					// 		id		: data.key,
					// 		ajaxUrl	: data.url,
					// 		proCd	: data.pro_cd,
					// 		icon	: data.ico,
					// 		proNm	: data.menu_nm
					// 	});
					// }
				}
			});

			//Paragon Core App
			var dcComboJson;

		   /**
		    * 로딩 후 초기화면
		    * */
			var tabs = $('#tabs');

		   tabs.viewProgram({
		       title		: 'Dashboard',
		       id			: 'dashboard',
//		       closable		: false,
		       ajaxUrl		: '/api'+(CoreSession.loginOs == "web" || CoreSession.loginOs == ""  || CoreSession.loginOs == undefined ? '' : '/'+CoreSession.loginOs)+'/dashboard/dashboard',
		       proCd		: 'PC0001',
		       icon			: 'fa fa-home fa-lg'
		  });

			// tabs.addTab({
			// 	title: 'Dashboard',
			// 	id: 'dashboard',
			// 	closable: false,
			// 	ajaxUrl: '/dashboard',
			// 	proCd: 'PC0001',
			// 	icon: 'fa fa-home fa-lg'
			// });

		   /**
		    * 폰트설정
		    * */
			var saveFont = localStorage.getItem('saveFont');

			if(saveFont){
		       if(saveFont == "S"){
		           $("#mainMasterBody").addClass("master-grid-S ");
		           $("#RadomainFontSizeS").prop("checked",true)

		       }else if(saveFont == "M"){
		           $("#mainMasterBody").addClass("master-grid-M ");
		           $("#RadomainFontSizeM").prop("checked",true)

		       }else if(saveFont == "L"){
		           $("#mainMasterBody").addClass("master-grid-L ");
		           $("#RadomainFontSizeL").prop("checked",true)

		           }
			}
			var deviceWidth = window.innerWeight;

			$('#navHome').click(function(e){
				e.preventDefault();
				location.href="/";
			});

		}
	}
}();

$(document).ready(function(){
	App.init();
	MainContent.init();
});
