import Vue from 'vue'
import Container from './Views/Container.vue'

var vm = new Vue({
    el: '#app',
    template: '<Container/>',
	components: { Container }
})
