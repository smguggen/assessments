import Api from '../api/pokemon';
const api = new Api();

export default {
    namespaced:true,
    getters: {
        pokeTypes: state => state.types.reduce((acc, { name, url }) => {
            let index = Api.getIndex(url);
            let query = state.query ? state.query.toLowerCase() : '';
            if (!query.length || (query.length && name.indexOf(query) > -1)) {
                if (query.length) {
                    let regex = new RegExp(`(${query})`, 'i');
                    name = name.replace(regex, '<strong>$1</strong>');
                }
                acc.push({
                    name: name,
                    index: index,
                    url: url
                });
            }
            return acc;
        }, [])
    },
    state: {
        types: [],
        selected: null,
        query: ''
    },
    mutations: {
        setTypes(state, types) {
            state.types = types;
        },
        selectType(state, select) {
            state.selected = select;
        },
        changeQuery(state, query) {
            state.query = query;
        }
    },
    actions: {
        set({ commit }) {
            api.get('/type', res => {
                if (res && res.data && res.data.results) {
                    commit('setTypes', res.data.results);
                }
            });
        },
        select({ commit }, type) {
            commit('selectType', type);
        },
        setQuery({ commit }, query) {
            commit('changeQuery', query);
        }
    }
}