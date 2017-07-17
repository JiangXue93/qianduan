jThreex
=============
基于jquery的多级列表树

准备工作
-----
1. 下载jquery.js和jThreex.js

使用
-----
1. html引入上面两个js文件,
```
    <script src="./js/jquery"></script>
    <script src="./js/jThreex.js"></script>
```
2. html中jThree挂载的位置
```
<div id="test">自定义数据</div>
<div id="test2">插件原始数据</div>
```
3. 数据准备
html页面的javascript标签中，将数据格式化如下，若有多个子节点，可继续往下循环嵌套：<br>
### 重要：<br>
* 数据为数组，且只有一个元素（根节点只有一个）
* 节点属性nodes为子节点的数组

### 数据解释
    id：Number，唯一索引
    color：#XXXXXX，字体颜色
    backgroundColor: #XXXXXX，背景颜色
    icon，selectIcon: String，树添加icon，下版本预留
    
    state: 节点状态 
    checked:boolean，节点被选
    childCheck: boolean,子孙节点被选
    open: boolean,节点是否展开
    wrap: boolean,节点是否可以展开
    
    nodes: 数组，子节点的数组

```
var myData = [{
            id: 0,
            text: "食材",
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
                    text: "肉",
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
                            text: "飞的",
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
                                    text: "鸡",
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
                                    text: "鸭",
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
                      ]
                    }];
                      
```

4. 调用
我们已经封装为jquery插件，你只需要使用jquery将挂载点选择后调用jThreex()函数即可：
```
$("#test").jThreex(myData);//用户自定义数据渲染
$("#test2").jThreex();//默认数据渲染
```

5. 样式处理
在挂载点的父节点可以通过css更改列表树的样式：
字体大小，行高:
'''
 --fount-size: 20px;
 --height: 24px;
'''
半选样式:
```
.jthreex-halfCheck::after {
            content: '';
            display: inline-block;
            width: 50%;
            height: 50%;
            line-height: 1;
            margin-top:20%;
            margin-left: 20%;
            border-radius: 2px;
            background-color: #313131;
        }
```
