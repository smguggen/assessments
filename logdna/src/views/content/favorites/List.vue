<template>
    <Sidebar class="reg fixed right shadowed raised double fave-container">
        <h3>My Favourites</h3>
        <div class="fave-wrapper">
            <div class="faves empty" v-show="!favesSelected">
                <h3>No Items Here...</h3>
            </div>
            <ul id="faveList" class="faves full" v-show="favesSelected">
                <li v-for="fave in faves" :key="fave.index" class="clickable cap fave-item">
                    <div class="fave-top">
                        <span class="fave-name">{{ fave.name }}</span>
                        <el-popconfirm title="Are you sure to delete this?"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        confirmButtonType="text"
                        @onConfirm="removeFave(fave)"
                        hideIcon>
                        <span slot="reference" class="xout fave"></span> 
                    </el-popconfirm>   
                    </div>  
                    <div class="memo-wrapper" v-show="fave.memo && fave.memo.length > 0">
                        <span class="memo-title">Memo:</span>
                        <span class="memo-text">{{ fave.memo }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </Sidebar>
</template>
<script>
import Sidebar from '../../partials/Sidebar.vue'

import { mapState } from 'vuex'

export default {
    components: { Sidebar },
    computed: {
        ...mapState({
            faves: state => state.favorites.faves
        }),
        favesSelected: function() { return this.faves && this.faves.length ? true : false }
    },
    methods: {
        removeFave(fave) {
            this.$store.dispatch('favorites/remove', fave);
        }
    }
}
</script>