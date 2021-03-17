import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Page',
            component: require('@/components/BookList/BookListPage').default
        },
        {
            path: '/ReadBook',
            name: 'ReadBook',
            component: require('@/components/ReadBook/ReadBookPage').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})