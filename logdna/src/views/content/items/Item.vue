<template>
    <el-collapse-transition>
        <el-card class="item" shadow="never" >
            <label class="star-container">
                <input type="checkbox" style="display:none" v-model="isFavorite" @click="setItem"/>
                <span class="star el-icon-star-on" :class="{ on: isFavorite }" />
            </label>
            <div class="card-btm">
                <h2>{{ item.name }}</h2>
                <el-tag class="tag">#{{ item.index }}</el-tag>
            </div>
        </el-card>
    </el-collapse-transition>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: {
        item: Object
    },
    computed: {
        ...mapState({
            favorites: state => state.favorites.faves
        }),
        isFavorite:  {
           get(){
                return this.favorites.find(fav => fav.index == this.item.index) ? true : false;
           },
           set(isFave){
             return isFave;
           }
        }
    },
    methods: {
        setItem(e) {
            if (e.target.checked) {
                this.$store.dispatch('items/setCurrent', this.item);
            } else {
                e.target.checked = true;
            }
        },
    }
}
</script>