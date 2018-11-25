import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.directive('focus', {
    bind(el, binding) {
        el.addEventListener('focus', () => {
          binding.value();
        })
    },
})

Vue.directive('blur', {
    bind(el, binding) {
        el.addEventListener('blur', () => {
            // setTimeout(()=> {
            //     binding.value();
            // }, 100)
        })
    },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
