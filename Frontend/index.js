import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './Views/Home.vue'
import Project from './Views/Project.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/:project', component: Project },
    { path: '*', redirect: '/' }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scripts/service-worker.js');
  });
}