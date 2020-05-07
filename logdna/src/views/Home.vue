<template>
  <div class="home">
    <el-container>
        <TypeList />
        <ItemsList />
        <FavoritesList />
    </el-container>
  </div>
</template>
<script>
import TypeList from './content/types/List.vue'
import FavoritesList from './content/favorites/List.vue'
import ItemsList from './content/items/List.vue';

export default {
    components: { TypeList, FavoritesList, ItemsList }
}
</script>