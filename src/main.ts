import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
	methods: {
		$show() {
			console.log(...arguments)
			return arguments
		}
	},
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
