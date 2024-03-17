(function($){

	function leftmenu(el,option,reloadable){
		var that = this;
		var defaults = {
				url			: "/api/sys/menu/selectLeftMenu",
				key			: "MENU_SEQ",
				val			: "MENU_NM",
				p_key		: "MENU_PARENT_SEQ",
				ico			: "MENU_ICO",
				pro_cd		: "PRO_CD",
				default_ico	: "fa-folder-open-o",
				call_url	: "CALL_URL",
				data		: {},
				autoClose 	: true,
				allOpen 	: false,
				tagId 		: "defaultMenu",
				click 		: function(data){}
		};
		var target = $(el);
		if(option == undefined){
			option.tagId = defaults.tagId;
		}
		that.userOptions = option;
		that.element = el;
		that.el = $(el);
		that.options = $.extend(defaults, option );
		var op = that.options;
		// console.log(CoreSession);

		$.ajax({
			url 	: op.url,
			type 	: "POST",
			// data 	: JSON.stringify({"A":"b","b":"c","dd":"ddd"}),
			contentType : "application/json; charset=UTF-8",
			dataType : "JSON",
			error 	: function(data,a,b,c) {
				console.error('error' ,data,a,b,c);
			},
			success : function(data) {
				if(data.dt_leftMenu == undefined || data.dt_leftMenu.length == 0) return;
				var data = data.dt_leftMenu;
				/**
				 * Data Sample
				 * CALL_URL 	: null
				 * DOMAIN_NM 	: "Inbound"
				 * MENU_ICO		: " "
				 * MENU_NM		: "입고관리"
				 * MENU_ORDER	: "210"
				 * MENU_PARENT_SEQ : 0
				 * MENU_SEQ		: 1011
				 * PDA_YN		: "Y"
				 * PRO_CD		: "PWMPDAIB100Q"
				 * */

				/** Navigation Info 2018.09
				 * WEBAPP 작업
				 * 추가 사유 ) ANDROID 화면 유사하게 세팅 하기 위함.
				 * 추가 사유 ) 이 단계에서 그려야 Domain 적용 가능.
				 *  */
				var infoDomainUserNm = "USER_NM";
				var infoDomainDcNm = "DC";
				var infoDomainClientNm = "CLIENT";

				var leftDomain = {
						userNm 		: 'USER_NM',
						dc			: 'DC',
						clientNm	: 'CLIENT'
				}
				var jsonLeftDomain = JSON.stringify(leftDomain);

				var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
				if(mobile){
					var $infoUl = $("<ul class='nav' />");
					var $infoLi = $("<li class='nav-profile' />");
					var $infoDiv = $("<div class='col-xs-10'>");
					var $infoDivUserNm = $("<div class='leftMenuDiv1'><p class='leftMenuChild1 col-xs-w100'>"+(CoreSession.sUserNm != undefined ? CoreSession.sUserNm : '' )+"</p></div>");
					var $infoDivDcNm = $("<div class='leftMenuDiv2'><p class='leftMenuChild2 col-xs-w100'>"+(CoreSession.sDcNm != undefined ? CoreSession.sDcNm : '' )+"</p></div>");
					var $infoDivClientNm = $("<div class='leftMenuDiv3'><p class='leftMenuChild3 col-xs-w100'>"+(CoreSession.sClientNm != undefined ? CoreSession.sClientNm : '' )+"</p></div>");
					$infoDiv.append($infoDivUserNm).append($infoDivDcNm).append($infoDivClientNm);

					var $infoDivLogout = $("<div id='sidebar_logout' class='sidebar-logout' />");
					var $infoDivLogoutA = $("<a href='/logout'><i class='fa fa-sign-out fa-2x' style='color:white;'></i></a>");
					$infoDivLogout.append($infoDivLogoutA);

					$infoLi.append($infoDiv).append($infoDivLogout);
					$infoUl.append($infoLi);

					target.append($infoUl);
				}else{

					var $infoUl = $("<ul class='nav' />");
					var $infoLi = $("<li class='nav-profile' />");
					$infoUl.append($infoLi);
					target.append($infoUl);
				}

				/** Navigation Menu */
				// console.log('data',data);
				var $ul = $("<ul class='nav' id='"+op.tagId+"'  />");
				for (var i = 0; i < data.length; i++) {

					var depth = ((data[i][op.p_key]) === ""||(data[i][op.p_key]) == 0)? 1 : 2;
//					var call_url = data[i][op.call_url];
					var ico = data[i][op.ico];
					var $newa = $("<a id='menu-id-"+data[i][op.key]+"' data-menu-id='"+data[i][op.key]+"'  data-menu-pid='"+data[i][op.p_key]+"'  href='javascript:;' />");
					var $newli = $("<li class='has-sub' />");
					if ($.trim(ico) == "" || ico == null  ){
						ico = op.default_ico;
					}
//					console.log(data[i][op.val] +" : "+ico);

					$newa.data( op.key	+ "", data[i][op.key] );
					$newa.data( op.val	+ "", data[i][op.val] );
					$newa.data( op.p_key	+ "", data[i][op.p_key] );
					$newa.data( op.call_url	+ "", data[i][op.call_url] );
					$newa.data( op.pro_cd	+ "", data[i][op.pro_cd] );
					$newa.data( op.ico	+ "", ico);

    				if(depth == 1){

    					var $span = $("<span/>");
    					$span.text(data[i][op.val]);
    					$newa.html($span);
    					$newli.append($newa);
    					$newli.addClass("mc"+data[i][op.key]);

						$newa.prepend('<i class="fa '+ico+'"></i>');

						if(reloadable){
							$newa.off().click(function(){
								if($(this).data(op.call_url) != "" && $(this).data(op.call_url) !== null){
									op.click({
										node : $(this),
										key : $(this).data(op.key),
										val : $(this).data(op.val),
										url : $(this).data(op.call_url),
										ico : $(this).data(op.ico),
										pro_cd : $(this).data(op.pro_cd),
										p_key : $(this).data(op.p_key)
									});

			    					//app.js 발췌
			    			        var sidebarClass = 'page-sidebar-toggled';
			    			        var targetContainer = '#page-container';

			    			        if ($(targetContainer).hasClass(sidebarClass)) {
			    			            $(targetContainer).removeClass(sidebarClass);
			    			        }
			    			        //끝
								}
								var target = $(this).next('.sub-menu');
								var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
								if ($('.page-sidebar-minified').length === 0) {
									if(op.autoClose){
										$(otherMenu).not(target).slideUp(250, function() {
											$(this).closest('li').removeClass('active');
										});
									}
									$(target).slideToggle(250, function() {
										var targetLi = $(this).closest('li');
										if ($(targetLi).hasClass('active')) {
											$(targetLi).removeClass('active');
										} else {
											$(targetLi).addClass('active');
										}
									});
								}
							});
						}else{
							$newa.click(function(){
								if($(this).data(op.call_url) != "" && $(this).data(op.call_url) !== null){
									//자식을 가지지않은 부모메뉴
									op.click({
										node : $(this),
										key : $(this).data(op.key),
										val : $(this).data(op.val),
										url : $(this).data(op.call_url),
										ico : $(this).data(op.ico),
										pro_cd : $(this).data(op.pro_cd),
										p_key : $(this).data(op.p_key)
									});

									//헤더nav 왼쪽 IMG를 쓰지않을때
									$('#navCaption').empty();
	    							var captionTxt = $('<span>'+$(this).data(op.val)+'</span>');
									$('#navCaption').append(captionTxt);

			    					//app.js 발췌
			    			        var sidebarClass = 'page-sidebar-toggled';
			    			        var targetContainer = '#page-container';

			    			        if ($(targetContainer).hasClass(sidebarClass)) {
			    			            $(targetContainer).removeClass(sidebarClass);
			    			        }
			    			        //끝
								}

								var target = $(this).next('.sub-menu');
								var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
								if ($('.page-sidebar-minified').length === 0) {
									if(op.autoClose){
										$(otherMenu).not(target).slideUp(250, function() {
											$(this).closest('li').removeClass('active');
										});
									}
									$(target).slideToggle(250, function() {
										var targetLi = $(this).closest('li');
										if ($(targetLi).hasClass('active')) {
											$(targetLi).removeClass('active');
										} else {
											$(targetLi).addClass('active');
										}
									});
								}
							});
						}
    					$ul.append($newli);
    				}else{
    					$newa.text(data[i][op.val]);
    					$newli.append($newa);
    					$newli.addClass("mc"+data[i][op.key]);
    					$newa.click(function(){
							console.log('op.call_url',op.call_url)
    						//부모의 자식 메뉴
    						if($(this).data(op.call_url) !== null && $(this).data(op.call_url) != ""){
    							op.click({
    								node : $(this),
    								key : $(this).data(op.key),
    								val : $(this).data(op.val),
    								url : $(this).data(op.call_url),
    								ico : $(this).data(op.ico),
    								pro_cd : $(this).data(op.pro_cd),
    								p_key : $(this).data(op.p_key)
    							});

    							//헤더nav 왼쪽 IMG를 쓰지않을때
    							$('#navCaption').empty();
    							var captionTxt = $('<span>'+$(this).data(op.val)+'</span>');
								$('#navCaption').append(captionTxt);
    						}
    						$(this).parent().toggleClass("expand");
	    					if ($('.page-sidebar-minified').length === 0) {
	    			            var target = $(this).next('.sub-menu');
	    			            $(target).slideToggle(250);
	    			        }
	    					//app.js 발췌
	    					//자식노드 클릭시 사이드메뉴 사라짐.
	    			        var sidebarClass = 'page-sidebar-toggled';
	    			        var targetContainer = '#page-container';

	    			        if ($(targetContainer).hasClass(sidebarClass)) {
	    			            $(targetContainer).removeClass(sidebarClass);
	    			        }
	    			        //끝
    					});
    					var $targetCodeEl =  $ul.find(".mc"+data[i][op.p_key]);

    					if($targetCodeEl.is( "li" ) && $targetCodeEl.children("ul").length == 0){
    						var $newul = $("<ul/>");
    						$newul.addClass("sub-menu");
    						$newul.append($newli);
    						$targetCodeEl.append($newul);
    						$targetCodeEl.children("a").prepend('<b class="caret pull-right"></b>');
    					}else{
    						$targetCodeEl.children("ul").append($newli);
    					}
    				}
				}

				/**
				 * sidebar, leftmenu 최소화 단추 source 추가
				 * */
//				$ul.append('<li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>');
//				alert($ul.html());
				target.append($ul);
				if(op.allOpen){
					$("#"+op.tagId+".nav > .has-sub ").addClass("active");
				}

				/**
				 * sidebar, leftmenu 최소화 단추 클릭 버튼.
				 * */
			  $('[data-click=sidebar-minify]').click(function(e) {
			        e.preventDefault();
			        var sidebarClass = 'page-sidebar-minified';
			        var targetContainer = '#page-container';
			        if ($(targetContainer).hasClass(sidebarClass)) {
			            $(targetContainer).removeClass(sidebarClass);
			            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
			                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
			            }
			        } else {
			            $(targetContainer).addClass(sidebarClass);
			            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
			                $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
			                $('#sidebar [data-scrollbar="true"]').removeAttr('style');
			            }
			            $('#sidebar [data-scrollbar=true]').trigger('mouseover');
			            $("#"+op.tagId+".nav > .has-sub ").removeClass('active');
			        }
			        $(window).trigger('resize');
			    });
			}
		});

	}
	$.fn.setLeftMenu = function(option){
		return this.each(function () {
			var instance = new leftmenu(this, option, false);
			$(this).data("menuTree", instance);
		});
	};
	$.fn.resetLeftMenu = function(){
		var thisMenu =$(this).data("menuTree");
		var option = thisMenu.options;
		$(this).find("#"+option.tagId).remove();
		return this.each(function () {
			var instance = new leftmenu(this, option, true);
			$(this).data("menuTree", instance);
		});
	};

}(jQuery));
