import Vue from 'vue'
import App from './App.vue'
import { Input,Button,Table,TableColumn} from 'element-ui'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Input)
   .use(Button)
   .use(Table)
   .use(TableColumn)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
