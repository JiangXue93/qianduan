(function($){
	$.fn.extend({
		"jOptionx": function (selectbx, selected, input) {
			var data = [$.extend({},dataFormat(defaults),dataFormat(input))][0];
			return this.each( function () {//返回jq对象
				init (selectbx,selected,data);

				$('.search').keyup(function (e) {
					init(selectbx, selected, data);
				});
			});
		}
	});

	var defaults = {
					'A':['Agular','Ali'],
					'B':['Baicai','Byebye','black'],
					'C':['Caoyuan','Cat','Cow']
					};
	function say(data){
		console.log(data);
	}
	//重绘
	function init (selectbx,selected,data) {
		$(selectbx).empty();
		$(selected).empty();
		render(selectbx,selected,data);

		$('.option').dblclick(function (e) {
			var target = $(e.target);
			// say(e);
			var id = target.attr('data-id');
			// say(target.attr('data-id'));
			togle(id, 'chosed', data);
			
			init(selectbx,selected,data);
		});
		
	}
	//绘dom
	function render (selectbx,selected,data) {
		var $selectbx = $(selectbx);
		var $selected = $(selected);
		// say(data);
		for(var el in data) {
			var templateGroup = '<div class="option select-group">' + el + '</div>',
				template = '',
				templateSel = '',
				count = 0;
			var search = $('.search').val().toLowerCase();

			data[el].forEach( function (e) {
				var chosed = e.chosed ? ' chosed':'';


				if(search && e.value.toLowerCase().indexOf(search) >= 0){
					var headStr = e.value.slice(0,e.value.toLowerCase().indexOf(search));
					var bodyStr = e.value.slice(e.value.toLowerCase().indexOf(search),e.value.toLowerCase().indexOf(search)+search.length);
					var footStr = e.value.slice(e.value.toLowerCase().indexOf(search)+search.length);
					template += '<div class="option'+ chosed +'" data-id="'+e.id+'">'+headStr+'<span class="search-target">'+ bodyStr+'</span>'+ footStr+'</div>';
				}else if(!search){//搜索框为空时候
					template += '<div class="option'+ chosed +'" data-id="'+e.id+'">'+e.value+'</div>';
				}


				if (e.chosed) {//计算选中个数，用于类别标签的展示
					templateSel += '<div class="option" data-id="'+e.id+'">'+e.value+'</div>';
					count++;//
				}
			});

			if(count != data[el].length){//非所有被选中，渲染类别标签
				$selectbx.append(templateGroup);
				$selectbx.append(template);
			}
			if(count>0){//有被选中
				$selected.append(templateGroup);
				$selected.append(templateSel);
			}

		}
	}
	//数据重构
	function dataFormat (data) {
		if(!data){
			return;
		}
		var newData = {};
		var count = 0;
		for(var el in data) {
			newData[el] = [];
			data[el].forEach( function (e) {
				newData[el].push({id:count++,value: e,chosed: false});
			})
		}
		return newData;
	}

	//更改属性状态
	function togle(id, target, data){
		for(var el in data) {
			data[el].forEach( function (e) {
				if(e.id == id){
					e[target] = !e[target];
				}
			});
		}
	}
})(jQuery);