
 (function ( $ ) {
//	var paragonTabs = function () {
//		return {
//	        getId: function () {
//	        	return $(".main-tab.active").val();
//		    }
//	    };
//	};
 	var tabs = [];
 	$.fn.coreWebapp = function(options) {
 		var settings = $.extend({
 			proCd: "",
 			menuSeq: ""
        }, options );

 		return this;
 	};

 	$.fn.viewProgram = function(options){
 		var settings = $.extend({
            // These are the defaults.
 			proCd: "PC0001",
            title: "텝타이틀",
            closable: true

        }, options );

 		//접속한 장치에 대한 확인
    	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

    	var device = 'web';

    	if (mobile) {
    		// 유저에이전트를 불러와서 OS를 구분합니다.
    		var userAgent = navigator.userAgent.toLowerCase();
    		Util.setServerLog(userAgent);
    		if (userAgent.search("android") > -1){
    			device = "android";
    		}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("ipad") > -1)){
    			device =  "ios";
    		}else{
    			device = "web";
    		}
    	} else {
    		device = "web";
    	}


 		//1. 웹
 		//기존 탭형태와 같다

 		//2. 웹앱
 		//개발도중 미진행

 		//3. 웹뷰
 		//기존 탭형태에서 대쉬보드와 그외 1개의 프로그램만 존재
    	var webAppFlag = false;

    	//탭 열어놓을 개수
    	tabLength = 2;

 		//탭 생성 유무.
		// console.log('webAppFlag', webAppFlag);
 		//웹앱 일때
 		if(device == 'android' || device == 'ios' || webAppFlag){
			// $('.content').css('margin-top', '-42px');
 		}else{

			$('.content').css('margin-top', '0px');
			$('.content').css('padding', '10px');
			$('.content').css('background-color', '#2D353C');


			this.addClass("panel panel-inverse panel-with-tabs main-tab");

			var tabHead = $('<div class="panel-heading p-0"  />')
			var tabWrap = $('<div class="tab-overflow"/>')
			tabHead.append(tabWrap)

			//맨처음 화면 로딩시 탭없을때 0
			if(this.find('.nav-tabs.main-tab').length==0){
				tabWrap.append($('<ul/>', {class: 'nav nav-tabs main-tab nav-tabs-inverse'}).sortable({
					connectWith: this
				}));
				this.append(tabHead);
				//대쉬보드 로딩 이후 탭 1개 이상일때
			}else{
				this.find('.nav-tabs.main-tab').sortable({
					connectWith: this
				});
			}
		}

 		var that = this;
 		settings.key = settings.id;
 		if(!settings.id){
 			settings.menuSeq = "menu-id-"+trataId(settings.id);
 			settings.id = "main-tab-id-"+trataId(settings.title);
 		}else{
 			settings.menuSeq = "menu-id-"+trataId(settings.id);
 			settings.id = "main-tab-id-"+trataId(settings.id)
 		}

 		/**
 		 * 프로그램클릭시 id 값 확인하여
 		 * 그대로 둘 것인지 (id >= 0)
 		 * 페이지 전환 할 것 인지 (id == -1)
 		 * */
 		if(tabs.indexOf(settings.id) != -1){
 			var aba = this.find('.nav-tabs.main-tab').find('li.main-tab').find('a[href="#'+settings.id+'"]');
 			aba.tab('show');
 			$(settings.id).tab('show');
 		}else{
 	 		if(this.find('.tab-content.main-tab').length == 0){
 	 			this.append($('<div/>', {class: 'tab-content main-tab'}));
 	 			this.find('.tab-content.main-tab').append($('<a/>', {class: 'active', "data-proCd" : settings.proCd, "data-proNm" : settings.title}));
 	 		}else{

 	 			//웹뷰, 웹
 	 			if(device == 'android' || device == 'ios'){
// 	 				var aba = this.find('.nav-tabs.main-tab').find('li.main-tab').find('a[href="#'+settings.id+'"]');
// 	 	 			aba.tab('show');
// 	 	 			console.log(aba);

// 	 				this.find('.tab-content.main-tab').append($('<a/>', {class: 'active', "data-proCd" : settings.proCd}));
 	 		 		if(!webAppFlag){

 	 		 		}else{
 	 		 			this.empty();
 	 	 				this.append($('<div/>', {class: 'tab-content main-tab'}));
 	 	 				this.find('.tab-content.main-tab').append($('<a/>', {class: 'active', "data-proCd" : settings.proCd, "data-proNm" : settings.title}));
 	 		 		}
 	 				//웹앱
 	 			}else{


 	 			}
 	 		}

			if(settings.ajaxUrl){
				$.ajax({
		            mimeType	: 'text/html; charset=utf-8',
		            url			: settings.ajaxUrl,
		            type		: 'GET',
		            beforeSend 	: function(xhr){
		    			xhr.setRequestHeader("AjaxType", "paragon");
		    			xhr.setRequestHeader("proCd", settings.proCd);
		        	},
		            success: function(data) {
//WMS
		            	//디바이스
		            	if(device == 'android' || device == 'ios'){

		            		//웹뷰, 웹
		 	 		 		if(!webAppFlag){
		 	 		 			//대쉬보드 있음.
		 	 		 			tabs.length = 1;
	 	 		 			//웹앱
		 	 		 		}else{
		 	 		 			//대쉬보드 없음.
		 	 		 			tabs.length = 0;

		 	 		 		}
		            	}
		            	tabs.push(settings.id);

		     			btn_close = $('<i class="fa fa-times btn btn-xs btn-icon btn-circle btn-default tab-close-btn" style="margin-top: -20px; margin-left: 5px; margin-right: -11px;" ></i>').click(function(){
		     				closer = $(this);
		     				a = closer.parent();
		     				href = a.attr('href');
		     				a.parent().remove();
		     				var ativo = $(href).hasClass('active');
		     				$(href).remove();
		     				var idx = href.substring(1)
		     				var tabIdx = tabs.indexOf(idx);
		     				tabs.splice(tabIdx,1);
		     				if(ativo){
		     					var tabLen =$('.nav-tabs.main-tab li.main-tab').length;
		     					var showIdx = tabIdx;
		     					if(tabLen == 1){
		     						showIdx = 0;
		     					}else if(tabLen == showIdx){
		     						showIdx = tabLen-1;
		     					}
		     					$('.nav-tabs.main-tab li.main-tab:eq('+showIdx+') a').tab('show');
		     				}

		     			});

		     			that.find('.main-tab.active').removeClass('active');


		     			var ancora = '';

//		     			if(device == 'android' || device == 'ios'){
		     				ancora = $('<a/>',{
			     				href: '#'+settings.id,
			     				'data-proCd': settings.proCd,
			     				'data-proNm': settings.title,
			     				'data-toggle': 'tab'
			     			});
//		     			}else{
//		     				ancora = $('<a style="display:none;/>',{
//			     				href: '#'+settings.id,
////			     				'data-proCd': settings.proCd,
//			     				'data-toggle': 'tab'
//			     			});
//		     			}
		     			ancora.data("proCd",settings.proCd);
		     			if(settings.closable){
		     				ancora.mousedown(function(e) {
		     					e.stopPropagation();
		     					if(e.which == 2){
		     						a = $(this);
		     						href = a.attr('href');
		     						a.parent().remove();
		     						var ativo = $(href).hasClass('active');
		     						$(href).remove();
		     						var idx = href.substring(1)
		     						tabs.splice(tabs.indexOf(idx),1);
		     						if(ativo){
		     							$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');
		     						}
		     						return false;
		     					}
		     				})
		     			}

		     			ancora.prepend(settings.title)
		     			if(settings.icon){
		     				ancora.prepend(' ').prepend($('<i/>').addClass('fa '+settings.icon+' fa-lg'));
		     			}

		     			if(settings.closable){
		     				ancora.append(btn_close);
		     			}

		    			if(settings.loadScripts){

		    				if(typeof(settings.loadScripts) == 'string'){
		    					var script = $('<script/>',{
		    						type:"text/javascript",
		    						src: settings.loadScripts
		    					});
		    					$('head').append(script);
		    					btn_close.on('click',function(){
		    						script.remove();
		    					})
		    				}else if(typeof(settings.loadScripts) == 'object'){
		    					var scripts = [];
		    					for(var i = 0 ; i < settings.loadScripts.length; i++){
		    						var script = $('<script/>',{
		    							type:"text/javascript",
		    							src: settings.loadScripts[i]
		    						});
		    						scripts.push(script);
		    						$('head').append(script);

		    					}
		    					btn_close.on('click',function(){
		    						for(var i = 0 ; i < scripts.length; i++){
		    							scripts[i].remove();
		    						}
		    					})
		    				}
		    			}

		    			if(settings.loadStyles){
		    				if(typeof(settings.loadStyles) == 'string'){
		    					var style = $('<link/>',{
		    						href: settings.loadStyles,
		    						rel: 'stylesheet',
		    						type: 'text/css'
		    					});
		    					$('head').append(style);
		    					btn_close.on('click', function(){
		    						style.remove();
		    					})

		    				}else if(typeof(settings.loadStyles) == 'object'){
		    					var styles = [];
		    					for(var i = 0 ; i < settings.loadStyles.length; i++){
		    						var style = $('<link/>',{
		    							href: settings.loadStyles[i],
		    							rel: 'stylesheet',
		    							type: 'text/css'
		    						});
		    						styles.push(style);
		    						$('head').append(style);
		    					}
		    					btn_close.on('click',function(){
		    						for(var i = 0 ; i < styles.length; i++){
		    							styles[i].remove();
		    						}

		    					})
		    				}
		    			}

		    			//탭이 변수개 이상일때 마지막 탭을 지우고 그림.
		    			//length 0 에러
		    			//length 1 대쉬보드를  지우면서 그림
		    			//length 2 이상 length 화면 지우면서 새로그림.
		    			if(that.find('.main-tab.tab-pane').length > 0
		    					&& that.find('.main-tab.tab-pane').length == tabLength){
		    				that.find('.nav-tabs.main-tab').children('li').last().remove();
		    				that.find('.tab-content.main-tab').children('div').last().remove();
		    			}

		    			that.find('.nav-tabs.main-tab').append($('<li/>', {class:'main-tab active'}).append(ancora));

		            	that.find('.tab-content.main-tab').append($('<div/>', {
		    				class:'main-tab tab-pane active',
		    				id: settings.id
		    			}));

		    			var pagina = that.find('.tab-content.main-tab').find('#'+settings.id);

		    			if(settings.text){
		    				pagina.text(settings.text)
		    			}

		    			if(settings.html){
		    				pagina.html(settings.html)
		    			}
		    			/*Pace.restart();*/
//		            	try {
//		            		if($.parseJSON(data)){
//		            			var result = $.parseJSON(data);
//		            			if(result == -1){
//		            				alert(result.msgTxt);
//		            			}
//		            			return;
//		            		}
//						}catch(e){
//
//						}
		            	pagina.html(data);
		            	pagina.find(".page-header").html("<i>"+settings.title+'</i><small class="program-code">['+settings.proCd+']</small>');
		            	pagina.find("[data-authRule]").hide();
//		            	if(session.s_adminYn =="Y"){
//		            		pagina.find(".admin-yn").removeClass("admin-yn");
//		            	}
		            	var thisMenuNode = $("#"+settings.menuSeq);
						//data-domain-id 처리
		            	fnTabAuthCheck(pagina);
		            	if(thisMenuNode.text()){
		            		var bookmark = '';
		            		if(settings.bookmark){
		            			bookmark = '<i class="fa fa-star" ></i>';
		            		}
		            		var htmls = '<li class="active">'+thisMenuNode.text()+bookmark+'</li>';
		            		var currNode = thisMenuNode;
		            		if(currNode.data("menu-pid") != 0 ){
		            			for (var i = 0; i < 10; i++) {
		            				var parentNode = $("#menu-id-"+currNode.data("menu-pid"));
		            				htmls = '<li><a href="javascript:;">'+parentNode.text()+'</a></li>'+htmls;
		            				if(parentNode.data("menu-pid") =="" || parentNode.data("menu-pid") === null ){
		            					break;
		            				}
		            				currNode =parentNode;
		            			}
		            		}
		            		htmls = '<li><a href="javascript:;">Home</a></li>'+htmls;
		            	}
		            	pagina.find(".breadcrumb").html(htmls);
//		            	var aspUserYn = session.s_aspUserYn;
//		            	if(aspUserYn != "Y"){
//		            		pagina.find(".customer-hide").hide();
//		            	}
		            	if(settings.bookmark){
			            	pagina.find(".breadcrumb i.fa").click(function(){
			            		if($(this).hasClass("active")){
			            			$(this).removeClass("active");
			            		}else{
			            			$(this).addClass("active");
			            		}
			            	});
		            	}
		            },
		            dataType: "html"
		        });
			}



		}
		return this;

	}

	$.fn.closeById = function(id){
		a = this.find('.nav-tabs.main-tab').find('a[href="#'+id+'"]');
		href = a.attr('href');
		a.parent().remove();
		var ativo = $(href).hasClass('active');
		$(href).remove();
		var idx = href.substring(1)
		tabs.splice(tabs.indexOf(idx),1);
		if(ativo){
			$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');
		}
	}

	$.fn.closeThis = function(){
		a = this.find('.nav-tabs.main-tab').find('.active').find('a');
		href = a.attr('href');
		a.parent().remove();
		var ativo = $(href).hasClass('active');
		$(href).remove();
		var idx = href.substring(1)
		tabs.splice(tabs.indexOf(idx),1);
		if(ativo){
			$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');
		}
	}

	function trataId(s){
		return s;
	}
	function fnTabAuthCheck(checkPage){
		const domainArr = checkPage.find("[data-domain-id]");
		for(let i = 0 ; i < domainArr.length ; i++){
			const el = domainArr[i];
			const domainCd = $(el).attr("data-domain-id");

			const txt = (CoreDomain[domainCd] != undefined ? CoreDomain[domainCd] : domainCd);
			if($(el).is("input[type=text]")){
				$(el).attr("placeholder", txt);
			}else{
				$(el).text(txt);
			}
		}
	}



}( jQuery ));
