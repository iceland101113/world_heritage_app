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
import { mapState, mapActions } from 'pinia';
// 引入 hook
import { useStore } from '../store/main';

export default {
  // components: { VueMultiselect, LocationTable },
  data() {
    return {
      contentType: 'introduction',
    }
  },
  // ...
  computed: {
    // 可透過 this.counter 取得狀態
    ...mapState(useStore, ['counter', 'heritages', 'countries', 'regions']),
    // 與上方相同，但註冊為 this.storeCounter
    ...mapState(useStore, {
      storeCounter: 'counter',
      // 也可以 function 直接取得 store 進行複雜處理
      double: store => store.counter * 2,
      // 一樣可正確註冊，但 typescript 會無法正確自動推斷類型
      magicValue(store) {
        return store.someGetter + this.counter + this.double;
      },
    }),
  },
  methods: {
    ...mapActions(useStore, ['increment', 'fetchData']),
    onSwitchContent(content) {
      this.contentType = content;
    }
  },
  watch: {
  },
  mounted() {
    // this.fetchData();
  },
};
</script>
<style scoped lang="scss">
</style>
