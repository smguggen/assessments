<template>
  <div id="app">
      <el-container>
        <el-header class="darker flex center-v raised">
            <h1>Pokedex</h1>
        </el-header>
        <RouterView />
      </el-container>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap');

body {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
