import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeVideo: false
    },
    mutations: {
        setActiveVideo(state, videoData) {
            state.activeVideo = videoData;
        }
    },
    actions: {}
})
