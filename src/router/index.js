import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
    children: [{
      path: 'home',
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: 'cmpMng',
      meta:{
        title:'企业管理'
      },
      component: () => import('@/components/parentCmp/parentCmp.vue'),
      children:[
        {
          path: 'employeeMng',
          meta:{
            title:'员工管理'
          },
          component: () => import('@/views/cmpMng/employeeMng/employeeMng.vue'),
        },
        {
          path: 'roleMng',
          meta:{
            title:'角色管理'
          },
          component: () => import('@/views/cmpMng/roleMng/roleMng.vue'),
        },
        {
          path: 'cmpInfo',
          meta:{
            title:'企业信息'
          },
          component: () => import('@/views/cmpMng/cmpInfo/cmpInfo.vue'),
        }
      ]
    },{
      path: 'financeMng',
      component: () => import('@/components/parentCmp/parentCmp.vue'),
      meta:{
        title:'财务管理'
      },
      children:[
        {
          path: 'categoryMng',
          meta:{
            title:'分类管理'
          },
          component: () => import('@/views/financeMng/categoryMng/categoryMng.vue'),
        }
      ]
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
