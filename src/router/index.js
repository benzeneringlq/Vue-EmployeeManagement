import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Entry',
      name: 'Entry',
      component: () => import('../components/Entry.vue')
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Home.vue')
    },
    {
      path: '/Department',
      name: 'Department',
      component: () => import('../components/Department.vue')
    },
    {
      path: '/Dimission',
      name: 'Dimission',
      component: () => import('../components/Dimission.vue')
    },
    {
      path: '/DeptTransForm',
      name: 'DeptTransForm',
      component: () => import('../components/DeptTransForm.vue')
    },
    {
      path: '/DimForm',
      name: 'DimForm',
      component: () => import('../components/DimForm.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/MonthlyForm',
      name: 'MonthlyForm',
      component: () => import('../components/MonthlyForm.vue')
    },
    {
      path: '/NewStaffForm',
      name: 'NewStaffForm',
      component: () => import('../components/NewStaffForm.vue')
    },
    {
      path: '/PositionTransForm',
      name: 'PositionTransForm',
      component: () => import('../components/PositionTransForm.vue')
    },
    {
      path: '/Position',
      name: 'Position',
      component: () => import('../components/Position.vue')
    },
    {
      path: '/Probation',
      name: 'Probation',
      component: () => import('../components/Probation.vue')
    },
    {
      path: '/StaffInfo',
      name: 'StaffInfo',
      component: () => import('../components/Staffinfo.vue')
    }
    // ,
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import('../components/Staffinfotest.vue')
    // }
  ]
})

export default router
