<template>
  <!-- <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in location" :key="key">
        <td @click="zoomToLocation(item)">{{ item.name_en }}</td>
        <td>{{ item.states_name_en }}</td>
      </tr>
    </tbody>
  </table> -->
  <el-table class="info-table" :data="location" stripe @expand-change="handleExpandChange">
    <el-table-column type="expand">
      <template #default="props">
        <p>{{ props.row.short_description_en }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="name_en" />
    <el-table-column label="Country" prop="states_name_en" />
  </el-table>
</template>

<script>
import { ElTable, ElInput } from 'element-plus'

export default {
  components: {
    ElTable, ElInput
  },
  props: {
    location: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      country: { name: 'AU' },
      options: [],
      // country : 'AU',
    }
  },
  methods: {
    handleExpandChange(row, expandedRows) {
      console.log(row);
      console.log(expandedRows);
      if (expandedRows.length > 0) {
        this.$emit('zoom-to-location', row);
      }
      // } else {
      //   this.$emit('zoom-to-location', null); 
      // }
    }
  },
};
</script>
<style scoped lang="scss">
  .info-table {
    width: 100%;
    margin-top: 20px;
    // text-align: center;
  }
</style>
