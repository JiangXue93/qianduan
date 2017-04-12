var klass = require('./klass');

function add(klasses) {//[{laoshi:"laoshiA", xuesheng:["xueshengA1", "xueshengA2"]}, {laoshi:"laoshiB", xuesheng:["xueshengB1", "xueshengB2"]}]
	klasses.forEach(function(item, index) {
		klass.add(item.laoshi,item.xuesheng);
	})
}


exports.add = add