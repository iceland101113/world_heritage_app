<template>
  <div class="row">
    <SideBar @switch-content="onSwitchContent"></SideBar>
    <Content>
      <template v-slot:[contentType]>
        <div v-if="contentType == 'heritages'">
          <Heritages></Heritages>
        </div>
        <div v-else>
          <Introduction></Introduction>
        </div>
      </template>
    </Content>
  </div>
</template>
<script>
import SideBar from './api_documents/SideBar.vue';
import Content from './api_documents/Content.vue';
import Heritages from './api_documents/Heritages.vue';
import Introduction from './api_documents/Introduction.vue';

export default {
  components: { SideBar, Content, Heritages, Introduction },
  data() {
    return {
      contentType: 'introduction',
    }
  },
  // ...
  computed: {
  },
  methods: {
    onSwitchContent(content) {
      this.contentType = content;
    }
  },
  watch: {
  },
  mounted() {
  },
};
</script>
<style scoped lang="scss">
</style>
