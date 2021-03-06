import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'cover',
            component: require('@/components/Cover').default
        },
        {
            path: '/page',
            name: 'Page',
            component: require('@/components/BookList/BookListPage').default
        },
        {
            path: '/ReadBook',
            name: 'ReadBook',
            component: require('@/components/ReadBook/ReadBookPage').default
        },
        {
            path: '/Settings',
            name: "Settings",
            component: require('@/components/Settings/SettingsPage').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})