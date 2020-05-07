import Api from '../api/pokemon';
const api = new Api();

export default {
    namespaced:true,
    getters: {
        pokemons: state => state.items.map(({ pokemon }) => {
            let index = Api.getIndex(pokemon.url);
            return  {
                name: pokemon.name,
                index: index,
                url: pokemon.url
            }
        })
    },
    state: {
        items: [],
        currentItem: null,
        dialogVisible: false
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },
        setCurrentItem(state, item) {
            state.dialogVisible = true;
            state.currentItem = item;
        },
        removeCurrentItem(state) {
            state.dialogVisible = false;
            state.currentItem = null;
        }
    },
    actions: {
        set({ commit }, type) {
            api.get(`/type/${type}/`, res => {
               commit('setItems', res && res.data && res.data.pokemon ? res.data.pokemon : []); 
            });
        },
        setCurrent({ commit }, item) {
            commit('setCurrentItem', item);
        },
        removeCurrent({ commit }) {
            commit('removeCurrentItem');
        }

    }
}