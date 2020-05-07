import Vue from 'vue'
import Vuex from 'vuex'
import types from './store/types';
import items from './store/items';
import favorites from './store/favorites';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { types, items, favorites }
})
