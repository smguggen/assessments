<template>
    <el-main class="item-wrapper"> 
        <div class="items empty" v-show="!itemSelected">
            <h3>No Types Selected...</h3>
        </div>
        <div class="items full" v-loading="loading" v-show="itemSelected">
            <h2 class="item-name">{{ name }}</h2>
            <div class="item-list">
                <Item v-for="item in items" :key="item.index" :item="item"/>
            </div>
        </div>
        <Confirm />
    </el-main>
</template>
<script>
import Item from './Item.vue';
import Confirm from '../../partials/Confirm.vue';

import { mapState, mapGetters } from 'vuex'

export default {
    components: { Item, Confirm },
    computed: {
        ...mapState({
            selected: state => state.types.selected
        }),
        ...mapGetters('items', {
            items: 'pokemons'
        }),
        ...mapGetters('types', {
           pokeTypes: 'pokeTypes' 
        }),
        itemSelected: function() { return this.selected ? true : false },
        name: function() {
            let type = this.pokeTypes.find(type => type.index == this.selected);
            if (type && type.name) {
                return type.name;
            }
            return '';
        },
        loading: function() { return !this.items || !this.items.length }
    }
}
</script>