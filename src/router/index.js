import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/nested/menu1/index'),
      meta: { title: 'Home', icon: 'home' }
    }]
  },
  {
    path: '/error',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: '管制值設定',
        meta: { title: '管制值設定' , icon: 'grade'}
      }
    ]
  },
  {
    path: '/tree',
    component: Layout,  
    children: [
      {
        path: '',
        name: '即時監控',
        component: () => import('@/views/tree/index'),
        meta: { title: '即時監控', icon: 'computer' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: '',
        name: '歷史趨勢',
        component: () => import('@/views/table/index'),
        meta: { title: '歷史趨勢', icon: 'trend' }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: '帳號設定',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '帳號設定', icon: 'user' }
  //     }
  //   ]
  // },
  // {
  //   path: '/menu2',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: '健康分數',
  //       meta: { title: '健康分數' , icon: 'grade'}
  //     }
  //   ]
  // },
  // {
  //   path: '/menu1-1',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/nested/menu1/menu1-1'),
  //       name: '管制值設定',
  //       meta: { title: '管制值設定', icon: 'form' }
  //     },
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
