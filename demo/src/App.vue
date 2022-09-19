<!--
 * @Author: atdow
 * @Date: 2020-04-15 16:07:14
 * @LastEditors: null
 * @LastEditTime: 2022-09-17 22:36:32
 * @Description: file description
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
