<template>
    <Sidebar class="dark fixed left invisiscroll" paddingTop="60px">
        <div class="search-wrapper">
            <el-input class="search" placeholder="Type..." v-model="input" @input="search" /><span class="xout" @click="clearInput"></span>
        </div>
        <ul id="typeList">
            <li v-for="type in types" :key="type.index" @click="select(type.index)" :class="{ selected: type.index == selected }" class="clickable cap" v-html="type.name" />
        </ul>
    </Sidebar>
</template>
<script>
import Sidebar from '../../partials/Sidebar.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    components: { Sidebar },
    data: function() {
      return {
          input: ''
      }  
    },
    computed: {
        ...mapState({
            selected: state => state.types.selected,
            query: state => state.types.query
        }),
        ...mapGetters('types', {
           types:'pokeTypes' 
        })
    },
    methods: {
        select: function(type) {
            this.$store.dispatch('items/set', type);
            this.$store.dispatch('types/select', type)
        },  
        search: function() {
            this.$store.dispatch('types/setQuery', this.input);
        },
        clearInput: function() {
            this.input = '';
            this.search();
        }
    },
    beforeCreate: function() {
        this.$store.dispatch('types/set');
    }
}
</script>
