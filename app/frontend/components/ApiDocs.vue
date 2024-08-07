<template>
  <div class="row">
    <!-- <div>
      <h1>{{ $t("greeting") }}</h1>
      <button @click="changeLanguage('en')">切換成英文</button>&nbsp;
      <button @click="changeLanguage('zh-TW')">切換成中文</button>
    </div> -->
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
  props: {
    locale_params: {
      type: String,
      required: true
    }
  },
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
    },
    // changeLanguage(newLocale) {
    //   this.$i18n.locale = newLocale;
    // },
  },
  watch: {
  },
  mounted() {
    console.log('mounted',this.locale_params)
    this.$i18n.locale = this.locale_params;
  },
};
</script>
<style scoped lang="scss">
</style>
