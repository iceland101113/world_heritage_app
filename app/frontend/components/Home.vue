<template>
  <!-- <div class="page"> -->
    <!-- <div>{{ this.counter }}</div><button @click="increment">+</button> -->
    <div class="row">
      <div class="col">
        <div class="select">
          <div class="row">
            <div class="col">
              <VueMultiselect v-model="region" :options="regions" :allow-empty="true" label="name" track-by="name" placeholder="Select Region"></VueMultiselect>
            </div>
            <div class="col">
              <VueMultiselect v-model="country" :options="filterCountries" :allow-empty="true" label="name" track-by="name" placeholder="Select Country"></VueMultiselect>
            </div>
          </div>
          <LocationTable :location="filterHeritages" @zoom-to-location="zoomToLocation"></LocationTable>
        </div>
        <!-- <img src="/LINE_ALBUM_2310204.jpg" /> -->
      </div>
      <div class="col">
        <div id="map"></div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import L from 'leaflet';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/markercluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import VueMultiselect from 'vue-multiselect'
import LocationTable from './home/locationTable.vue';
// import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import { useStore } from '../store/main';

let openStreetMap = {};

export default {
  components: { VueMultiselect, LocationTable },
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
        .bindPopup(`<p><strong>${heritage.name_en}</strong></p><img src="/LINE_ALBUM_2310204.jpg" />`, { maxWidth: "auto" })
      ).forEach((item) => markers.addLayer(item));
      openStreetMap.addLayer(markers);
    },
    // nameWithLang ({ name, language }) {
    //   return `${name} — [${language}]`
    // }
    zoomToLocation(item) {
      openStreetMap.setView(new L.LatLng(item.latitude, item.longitude), 10);
      openStreetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
        }
      });
      let marker = L.marker([
          item.latitude,
          item.longitude,
        ]).addTo(openStreetMap)
          // .bindPopup(`<p><strong>${item.name_en}</strong></p>${item.short_description_en}`)
          .bindPopup(`<p><strong>${item.name_en}</strong></p><img src="/LINE_ALBUM_2310204.jpg" />`, { maxWidth: "auto" });
      marker.openPopup();
    }
  },
  watch: {
    country(value) {
      if (!value && !this.region) {
        this.filterHeritages = this.heritages;
        openStreetMap.setView(new L.LatLng(0, 0), 2);
      } else {
        if (!value) {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.region_en == this.region.name
          })
        } else if (!this.region) {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.states_name_en == value.name
          })
        } else {
          this.filterHeritages = this.heritages.filter((heritage) => {
            return heritage.states_name_en == value.name && heritage.region_en == this.region.name
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
          return heritage.region_en == value.name
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
    openStreetMap = L.map('map', {
      center: [0, 0],
      // 可以嘗試改變 zoom 的數值
      // 筆者嘗試後覺得 18 的縮放比例是較適當的查詢範圍
      zoom: 2,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
    }).addTo(openStreetMap);

    this.fetchData().then(() => {
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
      height: 100vh;
      width: 100%;
  }
  .select {
    margin-top: 10px;
    margin-left: 10px;
    // margin-right: 10px;
    // width: 50%;
  }
</style>
