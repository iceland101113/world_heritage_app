import { defineStore } from 'pinia';
import axios from 'axios';

// 這邊 defineStore 會自動動態註冊模組，回傳值為 hook function
export const useStore = defineStore('usestore', {
  // 注意 state 是一個 function，推薦使用 arrow function
  // 可幫助 typescript 更好進行類型推斷
  state: () => ({
    counter: 1,
    heritages: [],
    countries: [],
    regions: [],
  }),
  getters: {},
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
    async fetchData(locale) { 
      await axios.get('/api/v1/world_heritages?locale=' + locale).then((response) => {
        // console.log('vuex',response);
        this.heritages = response.data.data;
        this.countries = response.data.countries;
        this.regions = response.data.regions;
      });
    }
  },
})
