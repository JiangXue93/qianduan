/**
 * Created by i-jiangxue on 2017/8/9.
 */

(function ($) {
	$.fn.extend({
		'jtree': function (option) {
			var data = [$.extend({}, defaluts, option)];
			// console.log(data);
			var jt = new JT(this, data);
			this.append('<input type="text" class="jThreex-search" placeholder="search">')
			jt.init();

			this.click(function (e) {
				// console.log(e.target.type);
				if(e.target.nodeName.toLocaleLowerCase() === "input" && e.target.type==="checkbox"){//点击checkbox
	                var $parent = $(e.target).parent();
	                var id = $parent.attr("data-id");
	                jt.data.forEach(function (child,index) {
	                    jt.setDataCheckById(child[index],id,false,true);
	                });
	                jt.setDataChildCheckById(jt.data[0][0], id);
	                jt.init();
	            }else if(e.target.nodeName.toLocaleLowerCase() === "span" && e.target.innerHTML != ""){//点击展开按钮
	            	// console.log(e.target.innerHTML);
	                var $parent = $(e.target).parent();
	                var id = $parent.attr("data-id");
	                jt.setDataById(jt.data[0][0],id,"open","toggle");
	                jt.init();
	            } 
			});

			this.find('.jThreex-search').keyup(function (e) {
					var search = $(this).val().trim().toLocaleLowerCase();
					jt.setDataSearchByVal(jt.data[0][0], search);
					jt.init();	
			});
			return jt;
		}
	})
	//默认数据
	var defaluts = [
        {
            id: 0,
            text: "grandPa",
            color: "#2c3cee",
            backgroundColor: "#90aaa8",
            icon:"",
            selectIcon:"",
            state: {
                checked: false,
                childCheck: true,
                open: true,
                wrap: true,
                search: true,
            },
            nodes: [
                {
                    id: 1,
                    text: "Parent 1",
                    color: "#2c3cee",
                    backgroundColor: "#90aaa8",
                    icon:"",
                    selectIcon:"",
                    state: {
                        checked: false,
                        childCheck: true,
                        open: true,
                        wrap: true,
                        search: true,
                    },
                    nodes: [
                        {
                            id: 11,
                            text: "Child 1",
                            color: "#2c3cee",
                            backgroundColor: "#90aaa8",
                            icon:"",
                            selectIcon:"",
                            state: {
                                checked: false,
                                childCheck: true,
                                open: true,
                                wrap: true,
                                search: true,
                            },
                            nodes: [
                                {
                                    id: 111,
                                    text: "Grandchild 11",
                                    color: "#2c3cee",
                                    backgroundColor: "#90aaa8",
                                    icon:"",
                                    selectIcon:"",
                                    state: {
                                        checked: false,
                                        childCheck: false,
                                        open: true,
                                        wrap: false,
                                        search: true,
                                    },
                                },
                                {
                                    id: 112,
                                    text: "Grandchild 12",
                                    color: "#2c3cee",
                                    backgroundColor: "#90aaa8",
                                    icon:"",
                                    selectIcon:"",
                                    state: {
                                        checked: true,
                                        childCheck: false,
                                        open: true,
                                        wrap: false,
                                        search: true,
                                    },
                                }
                            ]
                        },
                        {
                            id: 12,
                            text: "Child 2",
                            color: "#2c3cee",
                            backgroundColor: "#90aaa8",
                            icon:"",
                            selectIcon:"",
                            state: {
                                checked: true,
                                childCheck: true,
                                open: true,
                                wrap: true,
                                search: true,
                            },
                            nodes: [
                                {
                                    id: 121,
                                    text: "Grandchild 21",
                                    color: "#2c3cee",
                                    backgroundColor: "#90aaa8",
                                    icon:"",
                                    selectIcon:"",
                                    state: {
                                        checked: true,
                                        childCheck: false,
                                        open: true,
                                        wrap: false,
                                        search: true,
                                    },
                                },
                                {
                                    id: 122,
                                    text: "Grandchild 22",
                                    color: "#2c3cee",
                                    backgroundColor: "#90aaa8",
                                    icon:"",
                                    selectIcon:"",
                                    state: {
                                        checked: true,
                                        childCheck: true,
                                        open: true,
                                        wrap: true,
                                        search: true,
                                    },
                                    nodes: [
                                        {
                                            id: 1221,
                                            text: "Grandchild 221",
                                            color: "#2c3cee",
                                            backgroundColor: "#90aaa8",
                                            icon:"",
                                            selectIcon:"",
                                            state: {
                                                checked: true,
                                                childCheck: false,
                                                open: true,
                                                wrap: false,
                                                search: true,
                                            },
                                        },
                                        {
                                            id: 1222,
                                            text: "Grandchild 222",
                                            color: "#2c3cee",
                                            backgroundColor: "#90aaa8",
                                            icon:"",
                                            selectIcon:"",
                                            state: {
                                                checked: true,
                                                childCheck: false,
                                                open: true,
                                                wrap: false,
                                                search: true,
                                            },
                                        }
                                    ]
                                },
                                {
                                    id: 123,
                                    text: "Grandchild 23",
                                    color: "#2c3cee",
                                    backgroundColor: "#90aaa8",
                                    icon:"",
                                    selectIcon:"",
                                    state: {
                                        checked: true,
                                        childCheck: false,
                                        open: true,
                                        wrap: false,
                                        search: true,
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    text: "Parent 2",
                    color: "#2c3cee",
                    backgroundColor: "#90aaa8",
                    icon:"",
                    selectIcon:"",
                    state: {
                        checked: true,
                        childCheck: false,
                        open: true,
                        wrap: false,
                        search: true,
                    },
                },
                {
                    id: 3,
                    text: "Parent 3",
                    color: "#2c3cee",
                    backgroundColor: "#90aaa8",
                    icon:"",
                    selectIcon:"",
                    state: {
                        checked: true,
                        childCheck: false,
                        open: true,
                        wrap: false,
                        search: true,
                    },
                },
            ]
        }];

	var JT = function (target, data){
		this.target = target;
		this.data = data;
		this.result = {};
		//初始化操作
		this.init = function () {
			var $this = this;
			$this.target.find('ul').remove();
			$this.data.forEach( function (el, index) {
				$this.rendNode(el[index]);
			});	
		}
		//控制台输出
		this.say = function (str) {
			console.log(str);

		}
		//渲染节点
		this.rendNode = function (el, layer=0) {
			var $this = this;
			var check = el.state.checked ? 'checked':'';
	        var checkStyle;
	        if (el.state.checked){
	            checkStyle = 'checked';
	        }else if (el.state.childCheck){
	            checkStyle = 'jthreex-halfCheck';
	        }else {
	            checkStyle = '';
	        }
	        var openBtn = "";
	        if(el.state.wrap){//可以展开
	            if(el.state.open){//已经展开
	                openBtn = "-";
	            }else{//未展开
	                openBtn = "+";
	            }
	        }
	        if(!layer){//根节点ul
	            var template = '<ul class="jThreex-li" data-id="'+ el.id +'"><span class="jThreex-indent" style="width:'+15*(layer+1)+'px;">'+ openBtn+'</span><input type="checkbox" '+ check +' class="'+checkStyle+' jthreex-checkbox" />'+ el.text + '</ul>';
	            if(el.state.search){
	            	$this.target.append(template);
	            }
	        }else{//子节点li
	            var template = '<li class="jThreex-li" data-id="'+ el.id +'"><span class="jThreex-indent" style="width:'+24*layer+'px;">'+ openBtn+'</span><input type="checkbox" '+ check +' class="'+checkStyle+' jthreex-checkbox"/>'+ el.text + '</li>';
	            if(el.state.search){
	           		$this.target.children().append(template);
		        }	
	        }

	        if(el.state.wrap){//当前元素可以展开
	            if(el.state.open){//当前元素已经展开
	                if(el.nodes){//渲染子元素
	                    layer++;
	                    el.nodes.forEach(function (child) {
	                        $this.rendNode(child ,layer );
	                    });
	                }
	            }
	        }
		}
		//修改元素的选择（check）状态
		this.setDataCheckById = function (el,id,found,check) {
			var $this = this;
			if ( found ){//父已经匹配上,子节点跟随父节点的check状态
	            el.state.checked = check;
	            el.state.childCheck = check;
	        }else {//父未匹配上
	            if(parseInt(el.id) === parseInt(id)){//是当前节点
	                check = !el.state.checked;
	                el.state.checked = check;//更改当前节点状态
	                found = true;
	            }
	        }
	        //递归子元素
	        if( el.nodes ){
	            el.nodes.forEach(function (child) {
	                $this.setDataCheckById(child,id,found,check);
	            })
	        }
		}
		//通过id修改元素的属性，
		this.setDataById = function (el,id,stateProperty,value) {
			var $this = this;
			if(parseInt(el.id) === parseInt(id)){//是当前节点
	            if(value === "toggle"){
	                el.state[stateProperty] = !el.state[stateProperty];
	            }else{
	                el.state[stateProperty] = value;
	            }
	            return;
	        }
	        //递归子元素
	        if( el.nodes ){
	            el.nodes.forEach(function (child) {
	                $this.setDataById(child,id,stateProperty,value);
	            });
	        }else{
	            return;
	        }
		}
		//设置元素的半选（childCheck）状态
		this.setDataChildCheckById = function (el, id) {
			var $this = this;
	        let childCheckCount = 0;
	        if(parseInt(el.id) === parseInt(id)){//递归找到id的子节点，
	            el.state.childCheck = el.state.checked;
	            return el.state.checked?1:0;//目标节点是否被选取
	        }
	        else {//依据id非该节点，递归其子序列
	            if( el.nodes ){//递归子元素
	                el.nodes.forEach(function (child) {
	                    let temp = $this.setDataChildCheckById(child,id);
	                    if(temp > 0){
	                        childCheckCount += temp;
	                    }
	                });
	                //当前元素所有子元素已经判断完，更改自身状态并返回给父递归状态
	                if(childCheckCount === el.nodes.length){//所有子元素全选
	                    el.state.checked = true;
	                    return 1;
	                }else if(childCheckCount > 0){//不是所有子元素全选
	                    el.state.checked = false;
	                    el.state.childCheck = true;
	                    return 0.5;
	                }else {//所有子元素不选
	                    el.state.checked = false;
	                    el.state.childCheck = false;
	                    return 0;
	                }
	            }else {//无子元素
	                return el.state.checked ? 1 : 0;
	            }
	        }
	    }
	    //修改search属性
	    //found：标志位，若父元素命中则为true，其子元素渲染出来
	    this.setDataSearchByVal = function (el, val, found=false) {
	    	var count = 0;
	    	var $this = this;
	    	if(val === '' || found){
	    		el.state.search = true;//输入为空时，展示全部信息
	    	}
	    	else if(val && el.text.toLocaleLowerCase().indexOf(val) >= 0){//输入为非空，命中
	    		el.state.search = true;
	    		
	    		//递归子元素
	    		if( el.nodes ){
	    			el.state.open = true;
		            el.nodes.forEach(function (child) {
		                if($this.setDataSearchByVal(child,val,true)){
		                	count++;
		                };
		            });
		            //有子元素被search到，该路径也会被展示
		            if(count){
		            	return true;
		            }
		        }
		        return true;
			}else {//输入为非空，未命中
				el.state.search = false;
			}
			//递归子元素
			if( el.nodes ){
	            el.nodes.forEach(function (child) {
	                if($this.setDataSearchByVal(child,val,found)){
	                	count++;
	                };
	            });
	            //有子元素被search到，该路径也会被展示
	            if(count){
	            	el.state.search = true;
	            	el.state.open = true;
	            	return true;
	            }
	        }else{
	            return false;
	        }  
	    }
	}
})(jQuery);