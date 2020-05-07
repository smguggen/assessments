<template>
    <el-aside width="300px" :style="{ paddingTop: paddingTop }">
        <slot></slot>
    </el-aside>
</template>
<script>
export default {
    props: {
        paddingTop: String
    }
}
</script>