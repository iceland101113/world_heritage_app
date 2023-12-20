<template>
  <div class="container">
    <div class="row">
      <h1>Introduction</h1>
      <div class="col-6">
        <p>The Heritages API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
      </div>
      <div class="col-6">
        <pre style="background-color: #f2f3f4;">
          <code>
            https://api.stripe.com
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
