import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import SingleFile from '../views/SingleFile.vue'
import MultiFile from '../views/MultiFile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/upload',
    name: 'upload',
    component: SingleFile
  },
  {
    path: '/multiupload',
    name: 'multiupload',
    component: MultiFile
  },
  {
    path: '/drag', name: 'drag', component: () => import(/* webpackChunkName: "contract" */ '../views/Drag.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages =['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if(authRequired && !loggedIn) {
//     return next('/login')
//   }

//   next();
// })

