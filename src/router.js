import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Picker from './views/Picker.vue'
import Editor from './views/Editor.vue'
import Data from './views/Data.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/editor',
    name: 'editor',
    component: Picker
  }, {
    path: '/editor/edit',
    name: 'edit',
    component: Editor,
    props: true
  }, {
    path: '/data',
    name: 'data',
    component: Data
  }]
})
