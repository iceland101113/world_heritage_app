<template>
  <!-- <div class="page"> -->
    <!-- <div>{{ this.counter }}</div><button @click="increment">+</button> -->

  <!-- <div>
    <h1>{{ $t("greeting") }}</h1>
    <button @click="changeLanguage('en')">切換成英文</button>&nbsp;
    <button @click="changeLanguage('zh-TW')">切換成中文</button>
  </div> -->
    <div class="row">
      <div class="col-md-4">
        <div class="select">
          <div class="row">
            <div class="col">
              <VueMultiselect v-model="region" :options="regions" :allow-empty="true" label="name" track-by="name" :placeholder="$t('select_region')"></VueMultiselect>
            </div>
            <div class="col">
              <VueMultiselect v-model="country" :options="filterCountries" :allow-empty="true" label="name" track-by="name" :placeholder="$t('select_country')"></VueMultiselect>
            </div>
          </div>
          <LocationTable :location="filterHeritages" @zoom-to-location="zoomToLocation"></LocationTable>
        </div>
        <!-- <img src="/LINE_ALBUM_2310204.jpg" /> -->
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col summary-block"><h4>Total</h4><div class="total-block">{{ total_count }}</div></div>
          <div class="col summary-block"><h4>Natural</h4><div class="natural-heritages-block">{{ natural_heritage_count }}</div></div>
          <div class="col summary-block"><h4>Cultural</h4><div class="total-block">{{ cultural_heritage_count }}</div></div>
          <div class="col summary-block"><h4>Mixed</h4><div class="total-block">{{ mixed_heritage_count }}</div></div>
        </div>
        <div class="row">
          <div id="map"></div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import L from 'leaflet';
// import 'leaflet.markercluster';
import "leaflet.markercluster/dist/leaflet.markercluster";
// import "leaflet.markercluster/dist/markercluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import VueMultiselect from 'vue-multiselect'
import LocationTable from './home/LocationTable.vue';
import { mapState, mapActions } from 'pinia';
import { useStore } from '../store/main';

let openStreetMap = {};

export default {
  components: { VueMultiselect, LocationTable },
  props: {
    locale_params: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      country: null,
      region: null,
      filterCountries: [],
      filterHeritages: [],
      Map: {},
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
    total_count() {
      if (this.filterHeritages.length == 0) {
        return this.heritages.length;
      } else {
        return this.filterHeritages.length;
      }
    },
    natural_heritage_count() {
      if (this.filterHeritages.length == 0) {
        return this.heritages.filter((heritage) => {
          return heritage.category == 'Natural'
        }).length
      } else {
        return this.filterHeritages.filter((heritage) => {
          return heritage.category == 'Natural'
        }).length
      }
    },
    cultural_heritage_count() {
      if (this.filterHeritages.length == 0) {
        return this.heritages.filter((heritage) => {
          return heritage.category == 'Cultural'
        }).length
      } else {
        return this.filterHeritages.filter((heritage) => {
          return heritage.category == 'Cultural'
        }).length
      }
    },
    mixed_heritage_count() {
      if (this.filterHeritages.length == 0) {
        return this.heritages.filter((heritage) => {
          return heritage.category == 'Mixed'
        }).length
      } else {
        return this.filterHeritages.filter((heritage) => {
          return heritage.category == 'Mixed'
        }).length
      }
    },
  },
  methods: {
    ...mapActions(useStore, ['increment', 'fetchData']),
    updateMap(openStreetMap) {
      openStreetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
        }
      });

      let markers = L.markerClusterGroup();
      this.filterHeritages.map(heritage => 
        L.marker([
          heritage.latitude,
          heritage.longitude,
        ])
        // .bindPopup(`<p><strong>${location.name_en}</strong></p>${location.short_description_en}`)
        // .bindPopup(`<p><strong>${heritage.name}</strong></p><img src="/LINE_ALBUM_2310204.jpg" />`, { maxWidth: "auto" })
        .bindPopup(`<p><strong>${heritage.name}</strong></p><img src="https://myfistbucket20200429.s3.ap-northeast-1.amazonaws.com/world_heritages/${heritage.unique_number}.jpg" rel="preload"/>`, { maxWidth: "auto" })
      ).forEach((item) => markers.addLayer(item));
      openStreetMap.addLayer(markers);
    },
    // nameWithLang ({ name, language }) {
    //   return `${name} — [${language}]`
    // }
    zoomToLocation(item) {
      // openStreetMap.on("popupopen", (event) => {
      //   const popupPixelCoords = openStreetMap.project(event.popup.getLatLng());
      //   const popupHeight = event.popup.getElement().clientHeight;
      //   popupPixelCoords.y -= popupHeight / 2; // move the popup vertical axis location down (distance: half of popup height)
      //   openStreetMap.panTo(openStreetMap.unproject(popupPixelCoords), { animate: true }); // pan to calculated location
      // });

      // openStreetMap.setView(new L.LatLng(item.latitude, item.longitude), 10);
      if (item == null) {
        if (this.filterHeritages.length > 0) {
          openStreetMap.setView(new L.LatLng(this.filterHeritages[0].latitude, this.filterHeritages[0].longitude), 2);
        } else {
          openStreetMap.setView(new L.LatLng(0, 0), 2);
        }
        this.updateMap(openStreetMap);
      } else {
        openStreetMap.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            openStreetMap.removeLayer(layer);
            console.log('removeLayer')
          }
        });
        let marker = L.marker([
            item.latitude,
            item.longitude
          ]).bindPopup(`<p><strong>${item.name}</strong></p><img src="https://myfistbucket20200429.s3.ap-northeast-1.amazonaws.com/world_heritages/${item.unique_number}.jpg" rel="preload" />`, { maxWidth: "auto" });
          // .bindPopup(`<p><strong>${item.name}</strong></p><img src="/pic/${item.unique_number}.jpg" rel="preload" />`, { maxWidth: "auto" });
        marker.getPopup().getContent();   
        marker.addTo(openStreetMap);
        openStreetMap.setView(new L.LatLng(item.latitude, item.longitude), 10);
        setInterval(() => {
          marker.openPopup(); 
        }, 500);
      }
    },
    // changeLanguage(newLocale) {
    //   this.$i18n.locale = newLocale;
    // },
  },
  watch: {
    country(value) {
      if (!value && !this.region) {
        this.filterHeritages = this.heritages;
        openStreetMap.setView(new L.LatLng(0, 0), 2);
      } else {
        if (!value) {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.region == this.region.name
          })
        } else if (!this.region) {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.country == value.name
          })
        } else {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.country == value.name && heritage.region == this.region.name
          })
        }
        if (this.filterHeritages.length > 0) {
          openStreetMap.setView(new L.LatLng(this.filterHeritages[0].latitude, this.filterHeritages[0].longitude), 2);
        } else {
          openStreetMap.setView(new L.LatLng(0, 0), 2);
        }
      }
      this.updateMap(openStreetMap);
    },
    region(value) {
      if (!value) {
        this.filterHeritages = this.heritages;
        this.filterCountries = this.countries;
        this.country = null;
        openStreetMap.setView(new L.LatLng(0, 0), 2);
      } else {
        this.filterHeritages = this.heritages.filter((heritage) => {
          return heritage.region == value.name
        })
        this.filterCountries = this.countries.filter((country) => {
          return country.region == value.name
        })
        this.country = null;
        openStreetMap.setView(new L.LatLng(this.filterHeritages[0].latitude, this.filterHeritages[0].longitude), 2);
      }
      this.updateMap(openStreetMap);
    }
  },
  mounted() {
    // ...
    // const L = window['L'];
    openStreetMap = L.map('map', {
      center: [0, 0],
      // 可以嘗試改變 zoom 的數值
      // 筆者嘗試後覺得 18 的縮放比例是較適當的查詢範圍
      zoom: 1,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
    }).addTo(openStreetMap);

    console.log('mounted',this.locale_params)

    this.$i18n.locale = this.locale_params;
    this.fetchData(this.locale_params).then(() => {
      this.filterHeritages = this.heritages
      this.filterCountries = this.countries
      this.updateMap(openStreetMap)
      // console.log(this.heritages)
      // console.log(this.countries)
      // console.log('fetchData');
    })
    // axios.get('/api/v1/world_heritages').then((response) => {
      // console.log(response);
      // this.locations = response.data.data;
      // this.showLocations = response.data.data;
      // this.country_list = response.data.countries;
      // this.showCountryList = response.data.countries;
      // this.country = this.options[0];
      // this.updateMap(openStreetMap);
    // });
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
  // .page {
  //   display: flex;
  // }

  #map {
      // margin-top: 150px;
      // position: relative;
      height: 75vh;
      width: 100%;
  }
  .select {
    margin-top: 10px;
    margin-left: 10px;
    // margin-right: 10px;
    // width: 50%;
  }
  .summary-block {
    text-align: center;
    font-size: 40px;
    padding-right: 0;
    padding-left: 0;
    h4 {
      margin-bottom: 0;
      padding-top: 10px;
      background-color: lightgrey;
    }
  }
  .total-block {
    text-align: center;
    line-height: 100px;
    background-color: lightgrey;
    vertical-align: middle;
  }
  .natural-heritages-block {
    text-align: center;
    line-height: 100px;
    background-color: lightgrey;
    vertical-align: middle;
  }
</style>
