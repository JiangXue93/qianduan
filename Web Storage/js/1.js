function checkStorageSuport(){
	if(window.sessionStorage){
		console.log("sessionStorage");
	}else{
		console.log("sessionStorage NOT");
	}
	if(window.localStorage){
		console.log("localStorage");
	}else{
		console.log("localStorage NOT");
	}

}
function setStorage(str){
	window.sessionStorage.setItem('myFirstKey',str);

}
function getStorage(){
	console.log(window.sessionStorage.key(0));
	console.log(window.sessionStorage.length);
	return window.sessionStorage.getItem('myFirstKey');
}

function displayStorageEvent(e){
	var logged = "key:"+e.key+",newValue:"+e.newValue+",oldValue:"+e.oldValue+",url:"+e.url+",storageArea:"+e.storageArea;
	console.log(logged);
}

window.addEventListener("storage",displayStorageEvent,true);
checkStorageSuport();
setStorage('-.-lalala');
console.log(getStorage());