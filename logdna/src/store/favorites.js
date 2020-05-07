export default {
    namespaced:true,
    state: {
        faves: []
    },
    mutations: {
        addFave(state, fave) {
            state.faves.push(fave);
        },
        removeFave(state, fave) {
            state.faves = state.faves.filter(f => f.index != fave.index);
        }
    },
    actions: {
        add({ commit }, fave) {
            commit('addFave', fave);
        },
        remove({ commit }, fave) {
            commit('removeFave', fave);
        }
    }
}