;(function () {
	'use strict';
	
	var $form_add_task = $('.add-task')
		,task_list = {}
		;
	
	init();
	// console.log(111111);
	//$form_add_task.find("button").css('color','red');
	$form_add_task.find("button").on("click", function (e) {
		var new_task = {};
		var $input = $form_add_task.find("input");
		// 禁用默认
		e.preventDefault();
		// 获取新task
		new_task.content = $input.val();
		
		//console.log(new_task);
		if(!new_task.content){
			// console.log(task_list);
			return;
		}
		$input.val('');
		var result = add_task(new_task);
		// console.log(task_list);
		if(result){
			render_task_list();
		}
	});
	//初始化
	function init() {
		// store.clear();
		task_list = store.get('task_list') || [];
		// console.log(task_list);
		if(!!task_list){
			render_task_list();
		}
		
	}
	//存输入的值
	function add_task(new_task) {
		//task存入task_list
		task_list.push(new_task);
		//存入localstorage
		store.set('task_list', task_list);
		return true;	
	}
	//更新模板
	function render_task_list() {
		var $task_list = $('.task-list');
		$task_list.html('');
		for(var i = 0; i < task_list.length; i++){
			var $task = render_task_tpl(task_list[i]);
			$task_list.append($task);
		}

	}

	function render_task_tpl(data) {
		var list_item_tpl =//生成list
			'<div class="task-item">' +
			'<span><input type="checkbox"></span>' +
			'<span class="task-content">' + data.content + '</span>' +
			'<span class="fr">'+
			'<span class="action"> 删除</span>' +
			'<span class="action"> 详细</span>' +
			'</span>' +
			'</div>';
		return list_item_tpl;

	}
})();

