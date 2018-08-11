import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Container from './Views/Container.vue'
import Project from './Views/Project.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Container
        },
        {
            path: '/:project',
            component: Project
        }
    ]
})

var vm = new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router
})
