/**
 * jQueryTween - The Lightest Tweening Engine for jQuery
 * License - MIT license
 * https://github.com/thednp/jQueryTween
 * @author Dan Partac / http://themeforest.net/user/dnp_theme
 */

 
;(function($) {

	"use strict";	
	// define JQueryTween main object
	var tweens = [], JQueryTween = function( item, options, callback, special ) {
			
		//get some variables
		var sct = gSC(window);	
		var el = $(item)[0];
		var rpv = '';
		var css = getComputedStyle(el, null);
		
		// these are the default start values for all tweens if not specified by user call
		var ops = $.extend(true,{
			from: {
				opacity		: 1, // integer
				width		: '', // integer/px/%
				height		: '', // integer/px/%
				color		: '', //hex/rgb
				backgroundColor : '', //hex/rgb				
				position	: {top:'',right:'',bottom:'',left:''}, // integer/%
				backgroundPosition: {x:'',y:''}, // integer/%/string[left,center,bottom,etc]
				translate	: {x:0, y:0, z:0}, // integer only
				rotate		: {x:0, y:0, z:0}, // integer only
				scale		: 1, // integer only
				scroll		: $(sct).scrollTop(), // integer only		
			},
			to: {
				opacity		: '',
				width		: '', 
				height		: '',
				color		: '',
				backgroundColor : '',
				position	: {top:'',right:'',bottom:'',left:''},
				backgroundPosition: {x: '', y: ''},			
				translate	: {x:'', y:'', z:''},
				rotate		: {x:'', y:'', z:''},
				scale		: '',
				scroll		: '',			
			},
			easing			: TWEEN.Easing.Linear.None, // we need to wrap in quotes the Easing function as jQuery does not recognize it as defined variable
			delay			: 0,
			duration		: 500,			
			repeat			: 0,	// 0 / n / 'Infinity'		
			yoyo			: false,				
		}, options );
		
		//redefine supported properties
		var ofo = ops.from.opacity;
		var ofw = ops.from.width;
		var ofh = ops.from.height;
		var ofc = ops.from.color;
		var ofbc = ops.from.backgroundColor;
		var oft = ops.from.position.top;
		var ofr = ops.from.position.right;
		var ofb = ops.from.position.bottom;
		var ofl = ops.from.position.left;
		var ofbx = ops.from.backgroundPosition.x;
		var ofby = ops.from.backgroundPosition.y;
		var oftx = ops.from.translate.x;
		var ofty = ops.from.translate.y;
		var oftz = ops.from.translate.z;
		var ofrx = ops.from.rotate.x;
		var ofry = ops.from.rotate.y;
		var ofrz = ops.from.rotate.z;
		var ofs = ops.from.scale;
		var ofsc = ops.from.scroll;

		var oto = ops.to.opacity;
		var otw = ops.to.width;
		var oth = ops.to.height;
		var otc = ops.to.color;
		var otbc = ops.to.backgroundColor;
		var ott = ops.to.position.top;
		var otr = ops.to.position.right;
		var otb = ops.to.position.bottom;
		var otl = ops.to.position.left;
		var otbx = ops.to.backgroundPosition.x;
		var otby = ops.to.backgroundPosition.y;
		var ottx = ops.to.translate.x;
		var otty = ops.to.translate.y;
		var ottz = ops.to.translate.z;
		var otrx = ops.to.rotate.x;
		var otry = ops.to.rotate.y;
		var otrz = ops.to.rotate.z;
		var ots = ops.to.scale;
		var otsc = ops.to.scroll;		
		
		//properly process repeat and handle yoyo
		if ( ops.repeat === 0 && ops.yoyo === true ) {
			rpv = 1;
		} else {
			if ( !$.isNumeric(ops.repeat) && ops.repeat !== 'Infinity' ) { // if misstyped
				rpv = 0;
			} else {
				rpv = eval(ops.repeat);			
			}
		}
		
		//fix the scrolling being interrupted via mousewheel		
		if ( cv(otsc) ) { $('body').addClass('scrolling'); }
		
		//from/initial values
		var icor = cv(ofc) ? parseInt(pc(ofc)[0]) : parseInt(truC(css.color).match(/\d+/g)[0]);
		var icog = cv(ofc) ? parseInt(pc(ofc)[1]) : parseInt(truC(css.color).match(/\d+/g)[1]);
		var icob = cv(ofc) ? parseInt(pc(ofc)[2]) : parseInt(truC(css.color).match(/\d+/g)[2]);
		
		var ibcr = cv(ofbc) ? parseInt(pc(ofbc)[0]) : parseInt(truC(css.backgroundColor).match(/\d+/g)[0]);
		var ibcg = cv(ofbc) ? parseInt(pc(ofbc)[1]) : parseInt(truC(css.backgroundColor).match(/\d+/g)[1]);
		var ibcb = cv(ofbc) ? parseInt(pc(ofbc)[2]) : parseInt(truC(css.backgroundColor).match(/\d+/g)[2]);
		
		var iwi	= cv(ofw) ? truD(ofw)[0] : truD( css.width )[0];
		var ihe	= cv(ofh) ? truD(ofh)[0] : truD( css.width )[0];
		
		var ito = cv(oft) ? truD(oft)[0] : '';
		var iri	= cv(ofr) ? truD(ofr)[0] : '';
		var ibo	= cv(ofb) ? truD(ofb)[0] : '';
		var ile	= cv(ofl) ? truD(ofl)[0] : '';
		
		var ibx, iby, bx, by;
		if ( cv( otbx ) || cv( otby ) ) {
			ibx	= cv( ofbx ) ? truX(ofbx) : bPos(el)[0];
			iby	= cv( ofby ) ? truY(ofby) : bPos(el)[1];
		} else {
			ibx	= '';
			iby	= '';		
		}
		
		var tr3d,tx,ty,tz,itx,ity,itz;
		if ( cv( ottx ) || cv( otty ) || cv( ottz ) ) {
			itx	= cv(oftx) ? truD(oftx)[0] : 0;
			ity	= cv(ofty) ? truD(ofty)[0] : 0;
			itz	= cv(oftz) ? truD(oftz)[0] : 0;
		} else {
			itx = ''; ity = ''; itz = '';
		}	
		
		var irx = cv(ofrx) ? truD(ofrx)[0] :''; //always deg
		var iry = cv(ofry) ? truD(ofry)[0] :'';
		var irz = cv(ofrz) ? truD(ofrz)[0] :'';
		
		var isa = ofs; // always int
		var iop = ofo;
		var isc = ofsc;
		
				
		//target values
		var cor = cv(otc) ? parseInt(pc(otc)[0]) : '';
		var cog = cv(otc) ? parseInt(pc(otc)[1]) : '';
		var cob = cv(otc) ? parseInt(pc(otc)[2]) : '';
		
		var bcr = cv(otbc) ? parseInt(pc(otbc)[0]) : '';
		var bcg = cv(otbc) ? parseInt(pc(otbc)[1]) : '';
		var bcb = cv(otbc) ? parseInt(pc(otbc)[2]) : '';
		
		var wi	= cv( otw ) ? truD(otw)[0] : '';
		var he	= cv( oth ) ? truD(oth)[0] : '';
				
		var top	= cv(ott) ? truD(ott)[0] : '';
		var ri	= cv(otr) ? truD(otr)[0] : '';
		var bo	= cv(otb) ? truD(otb)[0] : '';
		var le	= cv(otl) ? truD(otl)[0] : '';
		
		if ( cv( otbx ) || cv( otby ) ) {
			bx	= cv( otbx ) ? truX(otbx) : ibx;
			by	= cv( otby ) ? truY(otby) : iby;
		} else {
			bx	= '';
			by	= '';		
		}
		
		if ( cv( ottx ) || cv( otty ) || cv( ottz ) ) {
			tx	= cv( ottx ) ? truD(ottx)[0] : 0;
			ty	= cv( otty ) ? truD(otty)[0] : 0;
			tz	= cv( ottz ) ? truD(ottz)[0] : 0;		
		} else {
			tx = ''; ty = ''; tz = '';
		}
		
		var rx = cv( otrx ) ? otrx : '';
		var ry = cv( otry ) ? otry : '';
		var rz = cv( otrz ) ? otrz : '';
		
		var sa 	= cv( ots ) ?  ots : '';
		var op 	= cv( oto ) ? oto : '';
		var sc 	= cv( otsc ) ? otsc : '';

		//check unit
		var wiu	= cv( wi ) ? truD(otw)[1] : '';
		var heu	= cv( he ) ? truD(oth)[1] : '';
		
		var tou	= cv( ott ) ? truD(ott)[1] : '';
		var riu	= cv( otr ) ? truD(otr)[1] : '';
		var bou	= cv( otb ) ? truD(otb)[1] : '';
		var leu	= cv( otl ) ? truD(otl)[1] : '';
		
		var txu	= cv( tx ) ? truD(ottx)[1] : '';
		var tyu	= cv( ty ) ? truD(otty)[1] : '';
		var tzu	= cv( tz ) ? truD(ottz)[1] : '';					
						
		// init tween.js
		animateTween();
		
		var from = { w: iwi, h: ihe, t: ito, r: iri, b: ibo, l: ile, colr: icor, colg: icog, colb: icob, bgr: ibcr, bgg: ibcg, bgb: ibcb, bgX: ibx, bgY: iby, scale: isa, trX: itx, trY: ity, trZ: itz, roX: irx, roY: iry, roZ: irz, opacity: iop, scroll: isc };
		var target = { w: wi, h: he, t: top, r: ri, b: bo, l: le, colr: cor, colg: cog, colb: cob, bgr: bcr, bgg: bcg, bgb: bcb, bgX: bx, bgY: by, scale: sa, trX: tx, trY: ty, trZ: tz, roX: rx, roY: ry, roZ: rz, opacity: op, scroll: sc };
		
		var tween = new TWEEN.Tween( from )				
			.to( target, ops.duration )
			.delay( ops.delay )
			.easing( ops.easing )
			.yoyo( ops.yoyo )
			.repeat( rpv )
			.onUpdate(
				function () {
				
					//set tween values
					
					//color and background-color					
					if ( cv(cor) ) { el.style.color = rth( parseInt(this.colr),parseInt(this.colg),parseInt(this.colb) ); }
					if ( cv(bcr) ) { el.style.backgroundColor = rth( parseInt(this.bgr),parseInt(this.bgg),parseInt(this.bgb)); }

					//translate3d
					if ( cv(tx) || cv(ty) || cv(tz) ) {
						tr3d = 'translate3d(' + ((this.trX + txu) || 0) + ',' + ((this.trY + tyu) || 0) + ',' + ((this.trZ + tzu) || 0) + ')';
					} else { tr3d = ''; }

					var roxt = cv(rx) ? ' rotateX(' + this.roX + 'deg)' : '';
					var royt = cv(ry) ? ' rotateY(' + this.roY + 'deg)' : '';
					var rozt = cv(rz) ? ' rotateZ(' + this.roZ + 'deg)' : '';

					//scale
					var sca = cv(sa) ? ' scale(' + this.scale + ')' : '';

					//sum all transform
					var transform = sca + tr3d + roxt + royt + rozt;
					if ( cv(transform) ) { tr(transform); }

					//dimensions
					if ( cv(wi) ) { el.style.width = this.w + wiu; }
					if ( cv(he) ) { el.style.height = this.h + heu; }

					//positioning
					if ( cv(top) ) { el.style.top = this.t + tou; }					
					if ( cv(ri ) ) { el.style.right = this.r + riu; }
					if ( cv(bo ) ) { el.style.bottom = this.b + bou; }
					if ( cv(le ) ) { el.style.left = this.l + leu; }

					// scrolling
					if ( cv(sc) ) { sct[0].scrollTop = this.scroll; }

					//background position
					if ( cv(bx) || cv(by) ) {
						var bXX = this.bgX;
						var bYY = this.bgY;
						el.style.backgroundPosition = bXX.toString()+'% '+bYY.toString()+'%';
					}

					//opacity					
					if ( cv(op) ) { el.style.opacity = this.opacity; }

					//run special function onUpdate
					if ( special && typeof special === "function") { special(); }					
				}
			)
			.onComplete( runCallback )
			.start();
			tweens.push(tween);
		
		function animateTween(time) {
			requestAnimationFrame( animateTween );
			TWEEN.update(time);
		}
		
		//callback when tween is finished
		function runCallback() {
			if ( callback && typeof callback === "function") { 
				callback();
			}
			if ( cv(otsc) ) {
				$('body').removeClass('scrolling');
			}
		}
		
		/* Process values utils
		*
		*/
		
		//value checker
		function cv(val) {
			if ( val !== 'undefined' && val !== '' && val !== 'NaN' ) return true;
		}
		
		//get true w/h
		function truD(d){
			var v,u;
			if (/px/i.test(d)) { 
				u = 'px'; v = parseInt( d );
			} else if (/%/i.test(d)) {
				u = '%'; v = parseInt( d );
			} else {
				v = d; u = 'px';
			}	
			return [v,u];
		}
		
		//get background position true values
		function truX(x) {
			if ( x == 'left' ) { 
				return 0; 
			} else if ( x == 'center' ) { 
				return 50; 
			} else if ( x == 'right' ) { 
				return 100; 		
			} else { 
				return parseInt( x ); 
			} 			
		}
		function truY(y) {
			if ( y == 'top' ) { 
				return 0; 
			} else if ( y == 'center' ) { 
				return 50; 
			} else if ( y == 'bottom' ) { 
				return 100; 		
			} else { 
				return parseInt( y ); 
			} 			
		}
		
		//get current background position
		function bPos(elem) {	
			var sty = css.backgroundPosition,x,y;			
			var pos = sty.split(" ");
				x = truX(pos[0]);			
			if ( cv(pos[1]) ) {
				y = truY(pos[1]);
			} else {
				y = 0;
			}
			return [ x, y ]; 
		}
		
		// convert transparent to rgba()
		function truC(c) {
			if ( c === 'transparent' ) { 
				return c.replace('transparent','rgba(0,0,0,0)');
			} else if ( cv(c) ) {
				return c;
			}		
		}
		
		// process color
		function pc(c) {
			if ( cv(c) && /#/i.test(c) ) { return [htr(c).r,htr(c).g,htr(c).b]; } else { return c.replace(/[^\d,]/g, '').split(','); }
		}		
		//transform rgb to hex or vice-versa
		function rth(r, g, b) {
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		}
	
		function htr(hex) {
			//Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shr = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shr, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		}
		
		//process transform
		function tr(p) {	
			el.style.webkitTransform = p;
			el.style.MozTransform = p;
			el.style.msTransform = p;
			el.style.Transform = p;			
		}
		
		//get true container for scroll events
		function gSC(c) {
			return $(c).map(function() {
				var cnt = this,
					isWin = !cnt.nodeName || $.inArray( cnt.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;
					if (!isWin) return cnt;

				var doc = (cnt.contentWindow || cnt).document || cnt.ownerDocument || cnt;

				return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
					doc.body :
					doc.documentElement;
			});
		}
	
	}; // closing the main object
	
	//prevent mousewheel while scrolling
	$(window).on('mousewheel DOMMouseScroll',function(e) {
		if ( $('body').hasClass('scrolling') ) {
			e.preventDefault();
		}
	});		
	
	//INIT ANIMATION
	$.fn.jQueryTween = function( options, callback, special ) {
		return this.each(function() {
			new JQueryTween( this, options, callback, special );
		});
	};
	
	// PAUSE / PLAY / STOP
	['play', 'pause', 'stop'].forEach(function(prop){
		$.fn[prop] = function () {
			for ( var i = 0; i < tweens.length; i++ ) {
				tweens[i][prop]();
			}
		}
	});
	
})(jQuery);