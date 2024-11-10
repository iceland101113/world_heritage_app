<template>
  <div class="container">
    <div class="row">
      <h1>{{ $t("heritage") }}</h1>
      <!-- <h1>{{ $t("heritage") }}</h1> -->
      <div class="col-6">
        <p>{{ $t("heritage_api_query_params_information") }}</p>
        <table class="table">
          <thead>
            <tr>
              <th>{{ $t("query_params") }}</th>
              <th>{{ $t("description") }}</th>
              <th>{{ $t("field_value") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>category</strong></td>
              <td>heritage category</td>
              <td>Cultural, Natural</td>
            </tr>
            <tr>
              <td><strong>date_inscribed</strong></td>
              <td>date of heritage inscribed</td>
              <td>1979 ~ 2023</td>
            </tr>
            <tr>
              <td><strong>states_name_en</strong></td>
              <td>country name of heritage in English</td>
              <td>Check detail on Country list</td>
            </tr>
            <tr>
              <td><strong>region_name_en</strong></td>
              <td>region name of heritage in English</td>
              <td>Check detail on Region list</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        Get All Heritages
        <pre style="background-color: #f2f3f4;">
          <code>
            GET /public/api/v1/heritages
          </code>
        </pre>
        Get Heritages with Query Params
        <pre style="background-color: #f2f3f4;">
          <code>
            GET /public/api/v1/heritages?category=Cultural&date_inscribed=1980&states_name_en=Ghana&region_name_en=Africa
          </code>
        </pre>
      </div>
      <hr>
      <div class="col-6">
        <p>{{ $t("heritage_api_response") }}</p>
        <table class="table">
          <thead>
            <tr>
              <th>{{ $t("field") }}</th>
              <th>{{ $t("description") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ID</strong></td>
              <td>primary key</td>
            </tr>
            <tr>
              <td><strong>unique_number</strong></td>
              <td>unique number of heritage</td>
            </tr>
            <tr>
              <td><strong>name_en</strong></td>
              <td>heritage name in English</td>
            </tr>
            <tr>
              <td><strong>name_fr</strong></td>
              <td>heritage name in French</td>
            </tr>
            <tr>
              <td><strong>short_description_en</strong></td>
              <td>heritage short description in English</td>
            </tr>
            <tr>
              <td><strong>short_description_fr</strong></td>
              <td>heritage short description in French</td>
            </tr>
            <tr>
              <td><strong>longitude</strong></td>
              <td>longitude of heritage location</td>
            </tr>
            <tr>
              <td><strong>latitude</strong></td>
              <td>latitude of heritage location</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>category</strong></td>
              <td>category of heritage</td>
            </tr>
            <tr>
              <td><strong>date_inscribed</strong></td>
              <td>date of heritage inscribed</td>
            </tr>
            <tr>
              <td><strong>states_name_en</strong></td>
              <td>country name of heritage in English</td>
            </tr>
            <tr>
              <td><strong>states_name_fr</strong></td>
              <td>country name of heritage in French</td>
            </tr>
            <tr>
              <td><strong>region_name_en</strong></td>
              <td>region name of heritage in English</td>
            </tr>
            <tr>
              <td><strong>region_name_fr</strong></td>
              <td>region name of heritage in French</td>
            </tr>
            <tr>
              <td><strong>created_at</strong></td>
              <td>heritage created date</td>
            </tr>
            <tr>
              <td><strong>updated_at</strong></td>
              <td>heritage updated date</td>
            </tr>
            <tr>
              <td><strong>name_zh</strong></td>
              <td>heritage name in Chinese</td>
            </tr>
            <tr>
              <td><strong>short_description_zh</strong></td>
              <td>heritage short description in Chinese</td>
            </tr>
            <tr>
              <td><strong>region_zh</strong></td>
              <td>region name of heritage in Chinese</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <pre style="background-color: #f2f3f4;">
          <code>
            {
              "total_pages": 47,
              "current_page": 1,
              "data": [
                {
                  "id": 1928,
                  "unique_number": 39,
                  "name_en": "Asante Traditional Buildings",
                  "name_fr": "Bâtiments traditionnels ashanti",
                  "short_description_en": "To the north-east of Kumasi, these are the last material remains of the great Asante civilization, which reached its high point in the 18th century. Since the dwellings are made of earth, wood and straw, they are vulnerable to the onslaught of time and weather.",
                  "short_description_fr": "Au nord-est de Koumassi subsistent les derniers t&eacute;moins mat&eacute;riels de la grande civilisation des Ashantis qui connut son apog&eacute;e au XVIII<sup>e</sup> si&egrave;cle. Les maisons de bois, de terre et de chaume sont peu &agrave; peu menac&eacute;es de destruction sous l'effet du temps et du climat.",
                  "justification_en": null,
                  "justification_fr": null,
                  "date_inscribed": 1980,
                  "secondary_dates": null,
                  "danger": 0,
                  "longitude": "-1.6258333",
                  "latitude": "6.4011111",
                  "area_hectares": "0.0",
                  "criteria_txt": "(v)",
                  "category": "Cultural",
                  "states_name_en": "Ghana",
                  "states_name_fr": "Ghana",
                  "region_en": "Africa",
                  "region_fr": "Afrique",
                  "created_at": "2024-08-07T15:11:58.637Z",
                  "updated_at": "2024-08-07T15:11:58.637Z",
                  "name_zh": "阿散蒂傳統建築",
                  "states_name_zh": "迦納",
                  "short_description_zh": "位於庫馬西東北部，這些是阿散蒂文明的最後物質遺跡，該文明在18世紀達到巔峰。由於住宅建築物主要由泥土、木材和稻草建造而成，因此容易受到時間和天候的侵蝕。這些遺跡代表著阿散蒂文明的重要歷史價值，被列為世界遺產。",
                  "region_zh": "非洲"
                }
                ...
              ]
            }  
          </code>
        </pre>
      </div>
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
