document.getElementById('app').innerHTML="this is my first webpack programe!";

require("./first.js");
// require("!style-loader!css-loader!./style.css");//webpack ./entry.js bundle.js
require("./style.css");//webpack ./entry.js bundle.js --module-bind "css=style\!css"

// var Vue = require("vue");
new Vue ({
	el: "body", 
	data: {
		message: "Hello vue.js"
	}
});