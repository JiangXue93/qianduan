手势锁屏-开发/使用手册
===========
___
[TOC]
___
代码地址如下：
GitHub:[https://github.com/JiangXue93/qianduan/tree/master/%E7%BB%84%E4%BB%B6/%E6%89%8B%E5%8A%BF%E9%94%81%E5%B1%8F](https://github.com/JiangXue93/qianduan/tree/master/%E7%BB%84%E4%BB%B6/%E6%89%8B%E5%8A%BF%E9%94%81%E5%B1%8F)

&emsp;&emsp;准备参加360的前端星计划，遇到了写手势解锁这个作业。做了有大概四个晚上吧，由于之前用canvas做过简单的贝塞尔曲线，所以此次考虑直接用canvas做。过程中发现太有趣了，写代码停不下来有没有，首先看看最终的效果图吧！
&emsp;&emsp;PS.屏幕下方图片参考B站客户端输入密码界面，第一次遇到的时候被萌一脸，所以我也当致敬一下了！

电脑版：
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/1.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/1.png)

手机版：
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/7.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/7.png)



***
#开发
##亮点
1. 顶部中间时间显示为当前系统时间，电池为一个div做的动画效果；
2. 界面采用灰色+蓝色的主色调，少量粉红色，与下方图片呼应；
3. 下方图片可与canvas的监听状态做出改变；
4. canvas中的button按钮hover上会修改当前鼠标样式；
5. 已点击button按钮和未点击button按钮可从样式上明显区分；
6. 添加“重置密码”按钮，再也不怕忘记密码了；
7. 误操作（密码数少于四位，密码错误）均会触发页面抖动，提示用户；
8. 添加类似Android系统的toast提示，指引用户正确使用。




##思路
刚拿到这个题目，想了想难点也的就是密码输入的九宫格按钮。由于之前用过canvas，所以也算比较轻车熟路。核心的部分大致为canvas画图、手机适配。

###canvas的难点
1. 绘制九个圆当按钮
&emsp;&emsp;根据canvas的大小确定九个button按钮的圆心位置，存到btns数组中，然后调用drawBtns，传入颜色和线条粗细，画出button按钮。第一个按钮的圆心坐标位置为（canvas宽度的1/6，canvas宽度的1/6），后面两个横坐标依次往后加canvas宽度的1/3；满三个后，纵坐标再加canvas宽度的1/3。
2. 判断鼠标位置
&emsp;&emsp;主要通过clientY，offsetTop，scrollTop计算出鼠标相对于canvas的位置，且canvas位置的（0,0）点为左上角。由于我canvas放在一个名为wrap的div中，有一定内边距，所以我采用下面计算方法：
    `
    offsetX = canvas.offsetLeft + wrap.offsetLeft;
    var x = e.clientX - offsetX;
    `

3. 判断鼠标点击或滑动到按钮上
&emsp;&emsp;通过依次判断鼠标在canvas画布的位置和九个button圆心坐标差的平方和，如果小于等于半径的平方则说明该按钮被触发，修改相应的按钮状态即可。同时将button按钮的编号存入pass数组中。

4. 绘制已输入密码的连接划线
&emsp;&emsp;当鼠标在canvas画布中移动时，若pass数组不为空则遍历其中的密码值，依次画出线段。

###手机适配难点
1. 手机事件监听
&emsp;&emsp;touchstart、touchmove、touchend分别对应点击、移动、离开三个事件。对这三个时间处理监听后就可在chrome浏览器开发者工具的手机模式下运行。
2. 手机屏幕适配
处理方式为HTML头部添加：
`
<meta name="viewport" content="width=device-width" >
`
***
#使用
1. 点击“设置密码”输入起始验证密码：
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/001.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/001.png)
下方输出toast“请重新输入密码”，进行密码确认：
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/002.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/002.png)
继续输入密码：
错误密码
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/003.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/003.png)
正确密码
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/004.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/004.png)
密码验证正确后，流程自动切换至“验证密码”
2. 处于“验证密码”阶段：
错误密码
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/005.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/005.png)
正确密码
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/006.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/006.png)
3. 输入密码少于4个时：
![https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/007.png](https://raw.githubusercontent.com/JiangXue93/qianduan/master/markdown-img/007.png)


4.手机查看本地网页，使用anywhere，可使用npm安装，安装完成后进入本地工程文件目录在cmd输入下面代码
`
anywhare 8888
`






