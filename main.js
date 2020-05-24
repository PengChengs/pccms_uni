import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import baseUrl from "utils/base.js";

Vue.prototype.$baseUrl = baseUrl

Vue.config.productionTip = false

Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
