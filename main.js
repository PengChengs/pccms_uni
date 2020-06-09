import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import {http} from "@/utils/service.js"
import {baseUrl} from "@/utils/base.js";
import api from "@/utils/api.js";

Vue.prototype.$http = http
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
