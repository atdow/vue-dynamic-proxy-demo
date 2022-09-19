<!--
 * @Author: atdow
 * @Date: 2020-04-15 16:07:14
 * @LastEditors: null
 * @LastEditTime: 2022-09-18 00:40:53
 * @Description: file description
-->
<template>
  <div id="index">
    <button @click="sendRequest">发送</button>
  </div>
</template>

<script>
import { apiTest } from "@/api/test.js";
export default {
  name: "Index",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
  methods: {
    sendRequest() {
      apiTest({}).then((res) => {
        console.log("res:", res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>