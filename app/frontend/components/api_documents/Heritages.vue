<template>
  <div class="container">
    <div class="row">
      <h1>Heritages</h1>
      <div class="col-6">
        <p>This is the API for retrieve the world heritages information. You can pass below params to filter the return result.</p>
        <table class="table">
          <thead>
            <tr>
              <th>Query Params</th>
              <th>Description</th>
              <th>Value</th>
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
        <pre style="background-color: #f2f3f4;">
          <code>
            GET /api/v1/heritages
          </code>
        </pre>
      </div>
      <hr>
      <div class="col-6">
        <p>The following elements are the attribute returned in the Heritages API response</p>
        <table class="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
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
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <pre style="background-color: #f2f3f4;">
          <code>
            {
              "data": [
                {
                  "id": 1,
                  "unique_number": "H1",
                  "name_en": "Royal Exhibition Building and Carlton Gardens",
                  "name_fr": "Royal Exhibition Building and Carlton Gardens",
                  "short_description_en": "The Royal Exhibition Building and Carlton Gardens are of historical,
                                          architectural, aesthetic, social and scientific (botanical) significance 
                                          to the State of Victoria.",
                  "short_description_fr": "The Royal Exhibition Building and Carlton Gardens are of historical,
                                          architectural, aesthetic, social and scientific (botanical) significance 
                                          to the State of Victoria.",
                  "longitude": 144.971,
                  "latitude": -37.804,
                  "category": "World Heritage",
                  "date_inscribed": "2004-07-01",
                  "states_name_en": "Australia",
                  "states_name_fr": "Australie",
                  "region_name_en": "Australia and New Zealand",
                  "region_name_fr": "Australie et Nouvelle-Zélande"
                },
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
