import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: require('@/components/BookListPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
