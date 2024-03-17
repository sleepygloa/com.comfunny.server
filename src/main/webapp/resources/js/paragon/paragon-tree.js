(function ($) {
	$.fn.paragonTreeSearch = function(input){
		var tree = $(this);
		input.keyup(function(){
			tree.jstree('search', input.val());
		});
	}
	
	$.fn.chkData = function(){
		var tree = $(this);
//		var plugin = tree.jstree(true).settings.plugin;
		if(!tree.jstree(true).settings.checkBox){
			return false;
		}
		return tree.jstree('get_chkData',true);
	}
	
	$.fn.getNode = function(){
		var tree = $(this);
		
		tree.bind('select_node.jstree', function(event, data){
			modFlag = '';
		    originalNode = data;
		    node = data.node.original;
		    
		    return node;
		    
		});
	}
	
	$.fn.update = function(){
		var tree = $(this);
		var jstree = tree.jstree(true);
		var currentNode = tree.jstree("get_selected");
		var ajaxUrl = jstree.settings.ajaxUrl;
		var resultKey = jstree.settings.resultKey;
		var length = jstree.settings.core.data.length;
	
		$.ajax({
			url: ajaxUrl,
			mimeType: 'text/html; charset=utf-8',
			type: 'GET',
			success: function(result) {
				var treeData = result[resultKey];
				jstree.settings.core.data = treeData;
				if(treeData.length > length){
					tree.jstree('open_node', currentNode);
				}
				jstree.refresh();
				tree.jstree('selected_node', currentNode);
			}
		});
	}
	
	$.fn.refresh = function(){
		var tree = $(this);
		var currentNode = tree.jstree("get_selected");
		tree.jstree('selected_node', currentNode);
	}
	
	$.fn.paragonTree = function(options) {
		var tree = $(this);
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			data:{},
			resultKey:"dt_tree",
			plugins:["types","wholerow","search"],
			checkBox:false,
			core : {
				check_callback : true,
				themes : {
					"responsive" : false
				},
				data : []
			},
           	types:{
	           	"default":{
	           		"icon":"fa fa-building text-primary fa-lg"
	           	},
	           	"file":{
	           		"icon" : "fa fa-building-o text-inverse fa-lg"
	           	}
	        },
	        search: {
	        	"case_insensitive": true,
	        	"show_only_matches" : true
	        },
	        checkbox : {
	        	"three_state": false,
		        "whole_node" : false, //checkbox가 부모 자식노드 상관이 체크되도록
		        "cascade"	 : 'down'
		    }
		}, options)
	
		if(settings.checkBox === true){
			settings.plugins.push("checkbox");
		}
		
		if(options.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				data: settings.data,
				mimeType: 'text/html; charset=utf-8', 
				type: 'GET',
				success: function(result) {
					var treeData = result[settings.resultKey];
					settings.core.data = treeData;
					tree.jstree(settings);
				}
			 });
		 }
		 
		 function customMenu(node){
			 var parent = node.id;
			 var items = {
					 createItem: {
						 label: "Create",
						 action: function (obj) {
							 console.log(obj);
							 
						 }
					 },
					 updateItem: {
						 label: "Update",
						 action: function(node) { 
							 alert("dd");
							 this.rename(node);
						 }
					 },
					 deleteItem: {
						 label: "Delete",
						 action: function(){
						 }
					 }
			 };
			 return items;
		 }
	 }
	 
	 
 }(jQuery));

