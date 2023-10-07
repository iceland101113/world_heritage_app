<template>
  <!-- <div class="page"> -->
    <div class="row">
      <div class="col">
        <div class="select">
          <div class="row">
            <div class="col">
              <VueMultiselect v-model="region" :options="region_list" :allow-empty="true" label="name" track-by="name" placeholder="Select Region"></VueMultiselect>
            </div>
            <div class="col">
              <VueMultiselect v-model="country" :options="showCountryList" :allow-empty="true" label="name" track-by="name" placeholder="Select Country"></VueMultiselect>
            </div>
          </div>
          <LocationTable :location="showLocations" @zoom-to-location="zoomToLocation"></LocationTable>
        </div>
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
import LocationTable from './locationTable.vue';
import axios from 'axios';

let openStreetMap = {};

export default {
  components: { VueMultiselect, LocationTable },
  data() {
    return {
      country: null,
      region: null,
      country_list: [],
      showCountryList: [],
      region_list: [],
      Map: {},
      locations: [],
      showLocations: [],
    }
  },
  // ...
  methods: {
    updateMap(openStreetMap) {
      openStreetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
        }
      });

      let markers = L.markerClusterGroup();
      this.showLocations.map(location => 
        L.marker([
          location.latitude,
          location.longitude,
        ]).bindPopup(`<p><strong>${location.name_en}</strong></p>${location.short_description_en}`)
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
        ]).addTo(openStreetMap).bindPopup(`<p><strong>${item.name_en}</strong></p>${item.short_description_en}`);
      marker.openPopup();
    }
  },
  watch: {
    country(value) {
      if (!value && !this.region) {
        this.showLocations = this.locations;
        openStreetMap.setView(new L.LatLng(0, 0), 2);
      } else {
        if (!value) {
          this.showLocations = this.locations.filter((location) => {
            return location.region_en == this.region.name
          })
        } else if (!this.region) {
          this.showLocations = this.locations.filter((location) => {
            return location.states_name_en == value.name
          })
        } else {
          this.showLocations = this.locations.filter((location) => {
            return location.states_name_en == value.name && location.region_en == this.region.name
          })
        }
        if (this.showLocations.length > 0) {
          openStreetMap.setView(new L.LatLng(this.showLocations[0].latitude, this.showLocations[0].longitude), 2);
        } else {
          openStreetMap.setView(new L.LatLng(0, 0), 2);
        }
      }
      this.updateMap(openStreetMap);
    },
    region(value) {
      if (!value) {
        this.showLocations = this.locations;
        this.showCountryList = this.country_list;
        this.country = null;
        openStreetMap.setView(new L.LatLng(0, 0), 2);
      } else {
        this.showLocations = this.locations.filter((location) => {
          return location.region_en == value.name
        })
        this.showCountryList = this.country_list.filter((country) => {
          return country.region == value.name
        })
        this.country = null;
        openStreetMap.setView(new L.LatLng(this.showLocations[0].latitude, this.showLocations[0].longitude), 2);
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

    axios.get('/api/v1/world_heritages').then((response) => {
      // console.log(response);
      this.locations = response.data.data;
      this.showLocations = response.data.data;
      this.country_list = response.data.countries;
      this.showCountryList = response.data.countries;
      this.region_list = response.data.regions;
      // this.country = this.options[0];
      this.updateMap(openStreetMap);
    });
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
  .page {
    display: flex;
  }

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
