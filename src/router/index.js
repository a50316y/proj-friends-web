import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import index from '@/components/index'
import index2 from '@/components/index2'
import memberCenter from '@/components/memberCenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { requiresAuth: false } //需驗證 
    },       
    {
      path: '/index2',
      name: 'index2',
      component: index2,
      meta:{ requiresAuth: true } //需驗證 
    },        
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false } //需驗證 
    },        
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { requiresAuth: false } //需驗證 
    },     
    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: memberCenter,
      meta: { requiresAuth: true } //需驗證 
    },           
  ]
})
