/**
 * Created by i-jiangxue on 2017/7/12.
 */
(function ($) {
    $.fn.extend({
        "jThreex":function (data) {
            var three = [$.extend({},defaluts,data)];
            return this.each(function () { //这里的this就是jQuery对象
                var $this = $(this); //获取当前dom的jQuery对象，这里的this是当前循环的dom
                initThree($this,three);

                $this.click(function (e) {
                    if(e.target.nodeName.toLocaleLowerCase() === "input"){//点击checkbox
                        var $parent = $(e.target).parent();
                        var id = $parent.attr("data-id");
                        three.forEach(function (child,index) {
                            setDataCheckById(child[index],id,false,true);
                        });
                        setDataChildCheckById(three[0][0],id);
                        initThree($this,three);
                    }else if(e.target.nodeName.toLocaleLowerCase() === "span" ){//点击展开按钮
                        var $parent = $(e.target).parent();
                        var id = $parent.attr("data-id");
                        setDataById(three[0][0],id,"open","toggle");
                        initThree($this,three);
                    } else{
                        // console.log(e.target);
                    }
                })
            })
        }
    });
    //默认参数
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
                    },
                },
            ]
        }];
    //公共的格式化方法.
    // $.fn.highLight.format = function  () {
    //     return "this is format";
    // }
    //私有方法
    function initThree($tree,tree) {//刷新DOM
        $tree.empty();
        tree.forEach( function (el, index) {
            rendDomNode($tree,el[index]);
        });
    };
    function rendDomNode ($parentDom, el, layer=0) {
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
        if(!layer){//根节点
            var template = '<ul data-id="'+ el.id +'"><span class="indent" style="width:'+15*(layer+1)+'px;">'+ openBtn+'</span><input type="checkbox" '+ check +' class="'+checkStyle+' jthreex-checkbox" />'+ el.text + '</ul>';
            $parentDom.append(template);
        }else{
            var template = '<li data-id="'+ el.id +'"><span class="indent" style="width:'+24*layer+'px;">'+ openBtn+'</span><input type="checkbox" '+ check +' class="'+checkStyle+' jthreex-checkbox"/>'+ el.text + '</li>';
            $parentDom.children().append(template);
        }

        if(el.state.wrap){//当前元素可以展开
            if(el.state.open){//当前元素已经展开
                if(el.nodes){//渲染子元素
                    layer++;
                    el.nodes.forEach(function (child) {
                        rendDomNode( $parentDom, child ,layer );
                    });
                }
            }
        }
    }
    //设置元素的半选（childCheck）状态
    function setDataChildCheckById (el, id) {
        let childCheckCount = 0;
        if(parseInt(el.id) === parseInt(id)){//递归找到id的子节点，
            el.state.childCheck = el.state.checked;
            return el.state.checked?1:0;//目标节点是否被选取
        }
        else {//依据id非该节点，递归其子序列
            if( el.nodes ){//递归子元素
                el.nodes.forEach(function (child) {
                    let temp = setDataChildCheckById(child,id);
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
    //修改元素的选择（check）状态
    function setDataCheckById(el,id,found,check) {
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
                setDataCheckById(child,id,found,check);
            })
        }
    }
    function setDataById(el,id,stateProperty,value){
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
                setDataById(child,id,stateProperty,value);
            });
        }else{
            return;
        }
    }
})(jQuery);