<template>
  <div class="document-content">
    <br>
    <slot name="heritages"></slot>
    <slot name="introduction"></slot>
  </div>  
</template>
<script>

export default {
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  .document-content {
    width: 90%;
  }
</style>
