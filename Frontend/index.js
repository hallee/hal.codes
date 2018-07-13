import Vue from 'vue'
import VueResource from 'vue-resource'
import Container from './Views/Container.vue'

Vue.use(VueResource)

var vm = new Vue({
    el: '#app',
    template: '<Container/>',
	components: { Container }
})
