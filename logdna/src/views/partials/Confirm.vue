<template>
    <el-dialog title="Add To Favourites" 
        :visible="visible" 
        width="30%"
    >
        <p>Add a memo if you wish:</p>
        <el-input id="memo" v-model="memo"></el-input>
        <span slot="footer">
            <el-button @click="onClose">Cancel</el-button>
            <el-button @click="toggleFave" type="info">Add</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data: function() {
        return {
            memo: ''
        }
    },
    computed: mapState({
        currentItem: state => state.items.currentItem,
        visible: state => state.items.dialogVisible
    }),
    methods: {
        toggleFave() {
            if (this.memo) {
                this.currentItem.memo = this.memo;
            }            
            this.$store.dispatch('favorites/add', this.currentItem);
            this.onClose();
        },
        onClose() {
            this.memo = '';
            this.$store.dispatch('items/removeCurrent');
        }
    }
}
</script>