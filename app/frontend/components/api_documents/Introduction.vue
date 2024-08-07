<template>
  <div class="container">
    <div class="row">
      <h1>{{ $t("introduction") }}</h1>
      <div class="col-6">
        <p>{{ $t("introduction_content") }}</p>
      </div>
      <div class="col-6">
        <pre style="background-color: #f2f3f4;">
          <code>
            https://world-heritage-app.fly.dev/
          </code>
        </pre>
      </div>
      <!-- <hr> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // contentType: {
    //   type: String,
    //   default: 'token',
    // }
  },
  data() {
    return {
      // contentType: this.contentType,
    }
  },
  methods: {
  },
  watch: {
    // contentType() {
    //   console.log(this.contentType);
    // }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  // .document-content {
  //   width: 80%;
  // }
</style>
