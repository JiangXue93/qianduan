window.onload=function(){
	
	var btn1 = document.getElementById('btn');
	btn1.addEventListener('click',addCover);
}


function addCover(){
	var body = document.getElementsByTagName("body")[0];
	//创建元素
	var cover = document.createElement("div");
	var container = document.createElement("div");
	var header = document.createElement("div");	
	var btnClose = document.createElement("button");
	var btnYes = document.createElement("button");
	var btnNo = document.createElement("button");

	container.innerHTML = '这里是内容';
	header.innerHTML = '这里是标题';
	btnClose.innerHTML = '关';
	btnYes.innerHTML = '确认';
	btnNo.innerHTML = '关闭';
	
	//添加到dom
	body.appendChild(cover); 
	body.appendChild(container);
	container.appendChild(header);
	header.appendChild(btnClose);
	container.appendChild(btnYes);
	container.appendChild(btnNo);

	//更改基本css
	body.style.overflow = "hidden";//去除body滚动条

	cover.setAttribute("id","cover");
	cover.style.width = myClientWidth()+"px";
	cover.style.height = myClientHeight()+"px";
	cover.style.position = "fixed";//相对视口
	cover.style.left = "0";
	cover.style.top = "0";
	cover.style.background = "#000";
	cover.style.opacity = "0.6"; 
	cover.style.zIndex = "999" ;//注意层叠位置

	container.setAttribute("id","container");
	container.style.width="250px";
	container.style.height="200px";
	container.style.background = "#fff";
	container.style.position = "fixed";
	container.style.left = "50%";//设置居中
	container.style.top = "50%";
	container.style.transform="translate(-125px,-100px)";
	container.style.opacity = "1";
	container.style.lineHeight = "200px";
	container.style.zIndex = "1000" ;

	header.style.width="250px";
	header.style.height="30px";
	header.style.background = "lightblue";
	header.style.position = "absolute";
	header.style.left = "0";
	header.style.top = "0";
	header.style.lineHeight = "30px";
	// header.style.display = "none";

	btnClose.style.width="30px";
	btnClose.style.height="30px";
	btnClose.style.background = "red";
	btnClose.style.position = "absolute";
	btnClose.style.right = "0";
	btnClose.style.top = "0";
	
	btnYes.style.width = "125px";
	btnYes.style.height="30px";
	btnYes.style.position = "absolute";
	btnYes.style.left = "0px";
	btnYes.style.bottom = "0px";
	btnYes.style.background = "lightblue";

	btnNo.style.width = "125px";
	btnNo.style.height="30px";
	btnNo.style.position = "absolute";
	btnNo.style.right = "0px";
	btnNo.style.bottom = "0px";
	btnNo.style.background = "lightblue";

	//绑定监听
	btnClose.addEventListener('click',hidden);
	btnYes.addEventListener('click',hidden);
	btnNo.addEventListener('click',hidden);

	


}
//网页可见区域宽
function myClientWidth(){  
    var n=document.documentElement.clientWidth   
    || document.body.clientWidth || 0;  
    return n;  
}  
//网页可见区域高  
function myClientHeight(){  
    var n=document.documentElement.clientHeight   
    || document.body.clientHeight || 0;  
    return n;  
}  
//删除遮罩弹窗元素
function hidden(){
	var cover = document.getElementById("cover");
	var container = document.getElementById("container");
	// container.style.display = "none";
	// cover.style.display = "none";
	document.getElementsByTagName("body")[0].style.overflow = "scroll";
	//清除DOM元素
	cover.parentNode.removeChild(cover);
	container.parentNode.removeChild(container);


}

