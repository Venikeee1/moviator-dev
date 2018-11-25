import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VideoPage from './views/VideoPage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,

        },
        {
            path: '/:id',
            name: 'video-page',
            component: VideoPage,
        }
    ]
})
