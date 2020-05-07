import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    getters: {
        newsfeed: state => state.feed.map(({ title, url }, index) => {
            let saved = state.saved.find(a => a.title == title);
            let id = saved ? saved.id : null;
            return {
                index: index + 1,
                title: title,
                link: url,
                saved:saved ? true : false,
                savedId: id
            }
        }),
        savedfeed: state => state.saved.map(({ title, link, id }, index) => {
            return {
                index: index + 1,
                title: title,
                link: link,
                id: id
            }
        })
    },
    state: {
        feed: [],
        saved: []
    },
    mutations: {
        saveArticle(state, article) {
            state.saved.push(article);
        },
        removeArticle(state, id) {
            state.saved = state.saved.filter(a => a.id != id);
        },
        getArticles(state, feed) {
            state.feed = feed;
        },
        getSavedArticles(state, articles) {
            state.saved = articles;

        }
    },
    actions: {
        save(state, article) {
            state.commit('saveArticle', article);
        },
        remove(state, id) {
            state.commit('removeArticle', id);
        },
        get({commit}, feed) {
            commit('getArticles', feed);
        },
        saved({commit}, articles) {
            commit('getSavedArticles', articles);
        }
        
    }
})
