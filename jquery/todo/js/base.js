;(function () {
	'use strict';
	
	var $form_add_task = $('.add-task')
		, task_list = {}
		, $task_delete_btn
		, $task_detail_btn
		, $task_detail = $('.task-detail')
		, $task_detail_mask = $('.task-detail-mask')
		, curent_index
		, $update_form
		, $task_detail_content
		, $task_detail_content_input
		, $checkbox_complete
		;
	
	init();
	// console.log(111111);
	//$form_add_task.find("button").css('color','red');
	$form_add_task.find("button").on('click', add_task_form_submit);
	$task_detail_mask.on('click',hide_task_detail);
	//"添加"按钮监听
	function add_task_form_submit(e) {
		var new_task = {};
		var $input = $form_add_task.find("input");
		// 禁用默认
		e.preventDefault();
		// 获取新task
		new_task.content = $input.val();
		
		//console.log(new_task);
		if(!new_task.content){
			return;
		}
		$input.val('');
		var result = add_task(new_task);
		// console.log(task_list);
		if(result){
			render_task_list();
		}
	}
	
	//删除监听
	function delete_listen() {
		$task_delete_btn.on('click',function(){
			var $this = $(this);
			var $item = $this.parent().parent();
			var index = $item.data('index');
			var r = confirm('确定删除？')
			
			r ? delete_task(index) : null;
		//console.log($item.data('index'));
		})
	}

	function listen_task_detail() {
		var index;
		$('.task-item').on('dblclick', function(){
			index = $(this).data('index');
			show_task_detail(index);
		})

		$task_detail_btn.on('click',function() {
			var $this = $(this);
			var $item = $this.parent().parent();
			index = $item.data('index');

			//console.log($item.data('index'));
			show_task_detail(index);

		})

	}
	//checkbox的监听
	function listen_checkbox_complete() {
		$checkbox_complete.on('click', function() {
			var $this = $(this);
			var is_complete = $this.is(':checked');
			var index = $this.parent().parent().data('index');
			var item = get(index);
			if(item.complete){
				update_task(index, {complete:false});
				
			}else{
				update_task(index, {complete:true});
				
			}
			//update_task(index, {complete:is_complete});
		})

	}
	//获取localstorage中index位置的值
	function get(index) {
		return store.get('task_list')[index];
	}
	//查看当前详情
	function show_task_detail(index) {
		curent_index = index;
		render_task_detail(index);
		$task_detail.show();
		$task_detail_mask.show();
	}

	function hide_task_detail() {
		$task_detail.hide();
		$task_detail_mask.hide();
	}
	


	//初始化
	function init() {
		// store.clear();
		task_list = store.get('task_list') || [];
		// console.log(task_list);
		if(!!task_list){
			render_task_list();
		}
		task_remind_check()
	}
	function task_remind_check(){
		var current_timestamp,task_timestamp;
		var itl= setInterval(function(){
			for(var i = 0; i < task_list.length; i++){
				var item = get(i);
				if(!item || !item.remind_date) continue;
				// console.log(item);
				if(!item.complete){
					current_timestamp = (new Date()).getTime();
					task_timestamp = (new Date(item.remind_date).getTime());
					//console.log(current_timestamp+" "+task_timestamp);
					if(current_timestamp - task_timestamp >=1){
						notify(item.content);
					}
				}
			
			}
		},500);
		
	}
	function notify(content){
		console.log(content);

	}
	//存输入的值
	function add_task(new_task) {
		//task存入task_list
		task_list.push(new_task);
		//存入localstorage
		refresh_storage();	
		return true;
	}
	//刷新localstorage并更新页面
	function refresh_storage() {
		store.set('task_list', task_list);
		render_task_list();
		//return true;
	}
	//删除一条task
	function delete_task(index){
		if(index === undefined || !task_list[index]) return;

		delete task_list[index];
		//存入localstorage
		refresh_storage();
	}
	//更新所有模板
	function render_task_list() {
		var $task_list = $('.task-list');
		$task_list.html('');
		// var complete_items = [];
		for(var i = 0; i < task_list.length; i++){
			var item = task_list[i];
			if (!item) continue;

			var $task = render_task_item(item, i);
			if( item.complete){
				//complete_items.push(item);
				// $task.addClass('checkedaaaaaaa');
				$task_list.append($task);
			}else{
				

				$task_list.prepend($task);
			}	
		}
		
		// for(var j = 0; j< complete_items.length; j++){
		// 	var $task = render_task_item(complete_items[j], j);
		// 	if (!$task) continue;
			
		// 	$task_list.find('[data-index='+complete_items[j].data("index")+']').addClass('completed');
		// 	$task_list.append($task);
		// }

		$task_delete_btn = $('.action.delete');
		$task_detail_btn = $('.action.detail');
		$checkbox_complete = $('.task-item .complete')
		delete_listen();
		listen_task_detail();
		listen_checkbox_complete();

	}
	//更新指定task的详细信息
	function render_task_detail(index) {
		if(index === undefined || !task_list[index]) return;

		var item = task_list[index];

		var task_detail_tpl = 
		'<form>'+
			'<div class="content">'+ item.content +'</div>'+
			'<div><input style="display:none;" type="text" name="content" value="'+ item.content +'"></div>' +
			'<div>'+
				'<dic class="desc">'+
					'<textarea name="desc">' + (item.desc || '') + '</textarea>'+
				'</dic>'+
			'</div>'+
			'<div class="remind">'+
				'<label>提醒时间:</label>' +
				'<input class="datetime" name="remind_date" type="text" value="'+ (item.remind_date||'') +'">'+
			'</div>'+
			'<div><button type="submit">更新</button></div>'
		'</form>';

		$task_detail.html('');
		$task_detail.html(task_detail_tpl);
		$('.datetime').datetimepicker();
		$update_form = $task_detail.find('form');
		$task_detail_content = $update_form.find('.content');
		$task_detail_content_input = $update_form.find('[name = content]');
		$task_detail_content.on('dblclick',function(){
			$task_detail_content_input.show();
			$task_detail_content.hide();
		})
		$update_form.on('submit',function(e) {
			e.preventDefault();
			var data = {};
			data.content = $task_detail_content_input.val();//$(this).find('[name = content]').val();
			data.desc = $(this).find('[name = desc]').val();
			data.remind_date = $(this).find('[name = remind_date]').val();
			// console.log($(this).find('[class = content]'));
			// console.log(data);
			update_task(index,data);
			hide_task_detail()
		});

	}
	//task_detail更新描述后更新task_list
	function update_task(index, data) {
		if( index === undefined || !task_list[index]){
			return;
		} 
		task_list[index] = $.extend({}, task_list[index], data);
		refresh_storage();

	}
	//构建一条模板
	function render_task_item(data, index) {
		if(!data || index === undefined) return;
		var list_item_tpl =//生成list
			'<div class="task-item'+(data.complete ? " completed" : "") +'" data-index="'+ index +'">' +
			'<span><input type="checkbox" ' + (data.complete ? 'checked' :'') + ' class="complete"></span>' +
			'<span class="task-content">' + data.content + '</span>' +
			'<span class="fr">'+
			'<span class="action delete"> 删除</span>' +
			'<span class="action detail"> 详细</span>' +
			'</span>' +
			'</div>';
		return list_item_tpl;
	}
})();

