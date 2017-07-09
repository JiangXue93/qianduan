// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Apple from './components/apple'
import Banana from './components/banana'
import redApple from './components/redApple'

Vue.config.productionTip = false;
Vue.use(VueRouter);

let router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path: '/apple',
			component: Apple,
			children: [
				{
					path:'red',
					component: redApple
				}
			]
		},
		{
			path: '/banana',
			component: Banana
		},
	],
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  render: function (h) {
  	return h(App)
  }
})

