import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/documents',
      name: 'documents',
      component: require('@/components/Documents').default
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: require('@/components/Viewer').default
    },
    {
      path: '*',
      redirect: '/documents'
    }
  ]
})
