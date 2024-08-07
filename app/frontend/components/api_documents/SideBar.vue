<template>
  <div class="side-bar">
    <br>
    <div class="container">
      <div class="row">
        <h4><strong>APIs</strong></h4>
        <span class="nav-item" @click="switchContent('introduction')">{{ $t("introduction") }}</span>
        <span class="nav-item" @click="switchContent('heritages')">{{ $t("heritage") }}</span>
      </div>  
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    switchContent(content) {
      this.$emit('switch-content', content);
    }
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  .side-bar {
    height: 500vh;
    width: 10%;
    background-color: lightgrey;
    padding-right: 0%;
  }
  .nav-item {
    display: block;
  }
  .nav-item:hover {
    background-color: whitesmoke;
  }
</style>
